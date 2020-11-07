import React from 'react'
import Row from './Table Row'
import Table from 'react-bootstrap/Table'
import { myConfig } from '../../../config'

function App() {
  const shifts = myConfig.shift_kinds
  const table_rows = shifts.map((shift) => 
    <Row header={shift} myConfig={myConfig} />
  )
  const days = myConfig.days
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
