import React from 'react'
import Table from 'react-bootstrap/Table'

function App(props) {
  const {counts, _88, specials, dictionary} = props

  return (
    <div className="mini-table">
      <Table striped bordered hover>
        <tr>
          <th>בקר</th>
          <th>משמרות</th>
          <th>8-8</th>
          <th>מיוחדות</th>
        </tr>

        {counts && Object.keys(counts).map(name =>
          <tr>
            <td style={{backgroundColor: dictionary[name]}}>{name}</td>
            <td>{counts[name]}</td>
            <td>{_88[name] || 0}</td>
            <td>{specials[name] || 0}</td>
          </tr>
        )}

      </Table>
    </div>
  );
}

export default App;
