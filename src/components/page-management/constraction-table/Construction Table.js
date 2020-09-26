import React, { useState, useEffect } from 'react'
import Row from './C-Table Row.js'
import Table from 'react-bootstrap/Table'
import {myConfig} from '../../../config'
import _ from 'lodash'

function App(props) {
  const bakarimTEMP = myConfig.bakarim
  const defaultSuggestion = Array.from(Array(21).keys()).map(i => bakarimTEMP)
  const defaultUnavailable = Array.from(Array(21).keys()).map(i => [])

  const [suggestedBakarim, setSuggestedBakarim] = useState(defaultSuggestion)
  const [unavailable, setUnavailable] = useState(defaultUnavailable)
  const [bakarim, setBakarim] = useState(defaultSuggestion)

  const handleChange = (values, shiftId) => {
    if (values.length == 0)
      return;
    let min = Math.max(shiftId - 2, 0)
    let max = Math.min(shiftId + 2, 20)
    let newUnavailable = unavailable.map((val, key) => 
      (key >= min && key <= max) ? 
        [...unavailable[key], values[values.length-1].value]
      :
        [...unavailable[key]]
    )
    let newBakarim = suggestedBakarim.map((list, shiftNumber) =>
      _.difference(list, newUnavailable[shiftNumber])
    )

    setUnavailable(newUnavailable)
    setBakarim(newBakarim)
  }

  useEffect(() => {
    fetch("/weekconstraints?week="+props.week, {method: 'GET'})
    .then(res => res.json())
    .then((result) => {
      let bakarimLists = Array.from(Array(21).keys())
                     .map(i => bakarimTEMP
                     .filter(bakar => result['week_constraints']
                     .filter(v => v.name === bakar)[0].shifts[i]==null))
        setSuggestedBakarim(bakarimLists)
        setBakarim(bakarimLists)
        bakarimLists.map(list => list.length == 0 ? props.setShowAlert2(true) : void 0)
    })
    .catch(error => {
        setBakarim(defaultSuggestion)
        setSuggestedBakarim(defaultSuggestion)
        setUnavailable(defaultUnavailable)
        //alert("construction table error: " + error)
    })
  }, [props.week])

  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) =>
    <Row
      header={shift}
      week={props.week}
      bakarim={bakarim}
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
