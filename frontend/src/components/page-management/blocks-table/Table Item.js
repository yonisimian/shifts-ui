import React from 'react';

function App(props) {
  let i = 0
  while (props.header !== props.shift_kinds[i])
    i++;
  let id = props.id + i

  const x = (props.blocks[id] === 'on' ? 'X' : '')

  return (
    <td>
      <h5 style={{color: "red"}}>{x}</h5>
    </td>
  );
}


export default App;
