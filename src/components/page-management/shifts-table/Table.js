import React from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'
import { Form } from 'react-bootstrap'

function App(props) {
  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) => 
    <Row header={shift} shifts={props.shifts}/>
  )
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const day_titles = days.map((day) => 
    <th>{day}</th>
  )
  return (
    <div className="ready-table">
      <h4>טבלת המשמרות לשבוע {props.week}</h4>
      <Table striped bordered hover>
        <tr>
          <th></th>
          {day_titles}
        </tr>

        {table_rows}

      </Table>
      <Form.Control
        as="textarea"
        className="unresizeable"
        disabled>{props.comments}</Form.Control>
    </div>
  );
}

export default App;
