import React from 'react';
import './checkbox.css'

function App(props) {
  let id = props.id
  if (props.header === 'ערב') id++
  else if (props.header === 'לילה') id += 2

  return (
    <td>
      <input type="checkbox" name={"shift-"+id} id={"shift-"+id} className="check-box" />
      <label for={"shift-"+id}></label>
    </td>
  );
}


export default App;
