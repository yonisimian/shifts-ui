import React, { useState, useEffect } from 'react'
import Row from './Table Row'
import Table from 'react-bootstrap/Table'
import _ from 'lodash'
import { myConfig } from '../../../config'

function App(props) {
  //const bakarimDB = props.bakarim == undefined ? [] : props.bakarim
  const bakarim = props.bakarim.map(value => value.full_name)
  const defaultConstraints = Array.from(Array(21).keys()).map(i => bakarim)
  const defaultUnavailable = Array.from(Array(21).keys()).map(i => [])

  let constraints = defaultConstraints
  let unavailable = defaultUnavailable
  // suggestions = constraints - unavailable
  const [suggestions, setSuggestions] = useState(defaultConstraints)
  let curState = defaultUnavailable // tracking the table

  const upsert = (array, list) => {
    list.forEach(item => {
      let i = array.findIndex(_item => _item.id === item.id)
      if (i === -1) array.push(item)
    })
  }

  const updateUnavailable = (id) => {
    let unAv = []
    let min = Math.max(id - 2, 0)
    let max = Math.min(id + 2, 20)
    Array.from(Array(max - min + 1).keys()).map(i => 
      upsert(unAv, curState[i + min])
    )

    unavailable[id] = unAv
  }

  const handleChange = (values, shiftID) => {
    return null
    curState[shiftID] = (values === null) ? [] : values.map(val => val.value)
    let min = Math.max(shiftID - 2, 0)
    let max = Math.min(shiftID + 2, 20)
    Array.from(Array(max - min + 1).keys()).map(i => {
      updateUnavailable(i + min) 
    })
    alert(JSON.stringify(curState))
    ///////////////////////////////////////////////////////////
    //                                                       //
    //   for some reason, curState is affected by line 34.   //
    //   I don't understand why. fuck this.                  //
    //                                                       //
    ///////////////////////////////////////////////////////////

    
    let newSuggestions = constraints.map((list, shiftNumber) =>
      _.difference(list, unavailable[shiftNumber])
    )
    setSuggestions(newSuggestions)
  }

  const updateTable = (ignore) => {
    curState = defaultUnavailable
    unavailable = defaultUnavailable

    if (ignore)
    {
        constraints = defaultConstraints
        setSuggestions(defaultConstraints)
    }
    else
    {
      try {
        let bakarimLists = Array.from(Array(21).keys())
          .map(i => bakarim
          .filter(bakar => props.data
          .filter(v => v.name === bakar)[0].shifts[i]==null))
        constraints = bakarimLists
        setSuggestions(bakarimLists)
        bakarimLists.map(list => list.length === 0 ? props.setShowAlert2(true) : void 0)
      }
      catch (error) {
        constraints = defaultConstraints
        unavailable = defaultUnavailable
        setSuggestions(defaultConstraints)
      }    
    }
  }

  useEffect(() => {
    updateTable(props.ignore)
  }, [props.week, props.ignore])

  const shifts = myConfig.shift_kinds
  const days = myConfig.days_long

  return (
    <div>
      <Table className="q" striped bordered hover size="sm">
        <tr>
          <th></th>
          {days.map((day) => 
            <th>{day}</th>
          )}
        </tr>
        {shifts.map((shift) =>
          <Row
            header={shift}
            myConfig={myConfig}
            week={props.week}
            bakarim={suggestions}
            dictionary={props.dictionary}
            handleChange={handleChange}/>
        )}
      </Table>
    </div>
  );
}

export default App;
