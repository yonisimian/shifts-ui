import React from 'react';

function App(props) {
  let id = props.id
  if (props.header === 'ערב') id++
  else if (props.header === 'לילה') id += 2

  const x = (props.blocks[id] === 'on' ? 'X' : '')

  return (
    <td>
      <h5 style={{color: "red"}}>{x}</h5>
    </td>
  );
}


export default App;
