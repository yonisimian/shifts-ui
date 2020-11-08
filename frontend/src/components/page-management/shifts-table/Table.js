import React, {useState} from 'react'
import Row from './Table Row.js'
import Table from 'react-bootstrap/Table'
import { Form } from 'react-bootstrap'
import './jump.css'

function App(props) {
  const shifts = ["בוקר", "ערב", "לילה"]
  const days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  const [style, setStyle] = useState('ready-table')

  const switchStyle = () => {
    setStyle(style === 'ready-table' ? 'ready-table box bounce-7' : 'ready-table')
  }

  return (
    <div className={style}>
      <Table striped bordered hover>
        <tr>
          <th onDoubleClick={switchStyle}></th>
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

      {style !== 'ready-table' && 
      <>
        <br/>
        <h6 dir='ltr'>Special thanks to Bana ♥</h6>
      </>}
    </div>
  );
}

export default App;
