import React, { useState, useEffect } from 'react'
import Row from './C-Table Row.js'
import Table from 'react-bootstrap/Table'
import {myConfig} from '../../../config'

function App(props) {
  const bakarimTEMP = myConfig.bakarim
  const [arr, setArr] = useState(Array.from(Array(21).keys()).map(i => bakarimTEMP))
  useEffect(() => {
    fetch("/weekconstraints?week="+props.week, {method: 'GET'})
    .then(res => res.json())
    .then((result) => {
        setArr(Array.from(Array(21).keys())
        .map(i => bakarimTEMP
        .filter(bakar => result['week_constraints']
        .filter(v => v.name === bakar)[0].shifts[i]==null)))
    })
    .catch(error => {
        setArr(Array.from(Array(21).keys()).map(i => bakarimTEMP))
        //alert("construction table error: " + error)
    })
  }, [props.week])

  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) =>
    <Row header={shift} bakarim={arr}/>
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
