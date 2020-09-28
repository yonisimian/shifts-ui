import React from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'
import { Form } from 'react-bootstrap'
import { weekToString } from '../../../scripts'

function App(props) {
  const shifts = ["בוקר", "ערב", "לילה"]
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const week = weekToString(props.week)

  return (
    <div className="ready-table">
      <h4>טבלת המשמרות לשבוע {week}</h4>
      <Table striped bordered hover>
        <tr>
          <th></th>
          {days.map(day => 
            <th>{day}</th>
          )}
        </tr>

        {shifts.map((shift) => 
          <Row header={shift} shifts={props.shifts} dictionary={props.dictionary}/>
        )}

      </Table>
      <Form.Control
        as="textarea"
        className="unresizeable"
        disabled>{props.comments}</Form.Control>
    </div>
  );
}

export default App;
