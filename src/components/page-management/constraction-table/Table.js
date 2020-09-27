import React, { useState, useEffect } from 'react'
import Row from './Table Row'
import Table from 'react-bootstrap/Table'
import {myConfig} from '../../../config'
import _ from 'lodash'

function App(props) {
  //const bakarimDB = props.bakarim == undefined ? [] : props.bakarim
  const bakarim = myConfig.bakarim
  //let bakarimShort = bakarimDB.map(value => value.full_name)
  //const bakarimFull = bakarimDB.map(value => value.full_name)
  const defaultConstraints = Array.from(Array(21).keys()).map(i => bakarim)
  const defaultUnavailable = Array.from(Array(21).keys()).map(i => [])

  let constraints = defaultConstraints
  let unavailable = defaultUnavailable
  // suggestions = constraints - unavailable
  const [suggestions, setSuggestions] = useState(defaultConstraints)
  let curState = defaultUnavailable // tracking the table

  const upsert = (array, list) => {
    list.forEach(item => {
      let i = array.findIndex(_item => _item.id == item.id)
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

  useEffect(() => {
    curState = defaultUnavailable
    unavailable = defaultUnavailable

    fetch("/weekconstraints?week="+props.week, {method: 'GET'})
    .then(res => res.json())
    .then((result) => {
      let bakarimLists = Array.from(Array(21).keys())
                     .map(i => bakarim
                     .filter(bakar => result['week_constraints']
                     .filter(v => v.name === bakar)[0].shifts[i]==null))
        constraints = bakarimLists
        setSuggestions(bakarimLists)
        bakarimLists.map(list => list.length == 0 ? props.setShowAlert2(true) : void 0)
    })
    .catch(error => {
        constraints = defaultConstraints
        unavailable = defaultUnavailable
        setSuggestions(defaultConstraints)
        //alert("construction table error: " + error)
    })
  }, [props.week])

  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) =>
    <Row
      header={shift}
      week={props.week}
      bakarim={suggestions}
      handleChange={handleChange}/>
  )
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const day_titles = days.map((day) => 
    <th>{day}</th>
  )

  return (
    <div>
      <Table striped bordered hover size="sm">
        <tr>
          <th></th>
          {day_titles}
        </tr>
        {table_rows}
      </Table>
    </div>
  );
}

export default App;
