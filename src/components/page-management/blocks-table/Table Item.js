import React from 'react';
import FormCheck from 'react-bootstrap/FormCheck'

function App(props) {
  let id = props.id
  if (props.header === 'ערב') id++
  else if (props.header === 'לילה') id += 2

  const x = (props.blocks[id] === 'on' ? 'X' : '')

  return (
    <td>
      <h5 className="red">{x}</h5>
    </td>
  );
}


export default App;
