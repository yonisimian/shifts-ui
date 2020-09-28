import React from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import {weekToString} from '../../../scripts'

function App(props) {
  const shifts = ["בוקר", "ערב", "לילה"]
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const week = weekToString(props.week)

  return (
    <Form.Group className="ready-table">
      <h4>טבלת החסימות של {props.name} לשבוע {week}</h4>
      <Table striped bordered hover>
        <tr>
          <th></th>
          {days.map((day) => 
            <th>{day}</th>
          )}
        </tr>

        {shifts.map((shift) => 
          <Row header={shift} blocks={props.blocks}/>
        )}

      </Table>
      <Form.Control
        as="textarea"
        className="unresizeable"
        disabled>{props.comments}</Form.Control>
    </Form.Group>
  );
}

export default App;
