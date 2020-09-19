import React from 'react'
import Row from './C-Table Row.js'
import Table from 'react-bootstrap/Table'

function App() {
  const shifts = ["בוקר", "ערב", "לילה"]
  const table_rows = shifts.map((shift) => 
    <Row header={shift} />
  )
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const day_titles = days.map((day) => 
    <th>{day}</th>
  )
  return (
    <div className="App">
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
