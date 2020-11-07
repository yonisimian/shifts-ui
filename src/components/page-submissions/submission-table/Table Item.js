import React from 'react';
import './checkbox.css'

function App(props) {
  let header = props.header
  let shift_kinds = props.shift_kinds
  let i = 0
  while (header !== shift_kinds[i])
    i++;
  let id = props.id + i

  return (
    <td>
      <input type="checkbox" name={"shift-"+id} id={"shift-"+id} className="check-box" />
      <label for={"shift-"+id}></label>
    </td>
  );
}


export default App;
