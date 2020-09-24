import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck'

function App(props) {
  let id = props.id
  if (props.header === 'ערב') id++
  else if (props.header === 'לילה') id += 2

  return (
    <td>
      { props.shifts[id] && props.shifts[id].map(shift => 
        <h5>{shift['label']}</h5>
      )}
    </td>
  );
}


export default App;
