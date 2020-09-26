import React from 'react';

function App(props) {
  let id = props.id
  if (props.header === 'ערב') id++
  else if (props.header === 'לילה') id += 2

  return (
    <td className="shifts-td">
      { props.shifts[id] && props.shifts[id].map(shift => 
        <p className="shifts-bakar" style={{backgroundColor: "yellow"}}>{shift['label']}</p>
      )}
    </td>
  );
}


export default App;
