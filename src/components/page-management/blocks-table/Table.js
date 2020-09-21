import React from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'

function App(props) {
  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) => 
    <Row header={shift} blocks={props.blocks}/>
  )
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const day_titles = days.map((day) => 
    <th>{day}</th>
  )
  return (
    <div>
      <h4>טבלת החסימות של {props.name} לשבוע {props.week}</h4>
      <Table striped bordered hover>
        <tr>
          <th></th>
          {day_titles}
        </tr>

        {table_rows}

      </Table>
      <textarea disabled>{props.comments}</textarea>
    </div>
  );
}

export default App;
