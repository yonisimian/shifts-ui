import React from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'

function App() {
  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) => 
    <Row header={shift} />
  )
  //const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const days = ["א", "ב", "ג", "ד", "ה", "ו", "ש"]
  const day_titles = days.map((day) => 
    <th>{day}</th>
  )
  return (
    <div>
      <Table striped bordered hover>
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
