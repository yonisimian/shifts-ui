import React from 'react';
import Item from './Table Item';

function App(props) {
  const getID = (i) => {
    let id = i
    if (props.header === 'ערב') id++
    else if (props.header === 'לילה') id += 2
    return id
  }

  const numbers = [0, 3, 6, 9, 12, 15, 18];
  const listItems = numbers.map((i) => 
    <Item
      header={props.header}
      bakarim={props.bakarim[getID(i)]}
      id={getID(i)}
      week={props.week}
      handleChange={props.handleChange}/>
  )

  return (
    <tr>
      <th>{props.header}</th>
      {listItems}
    </tr>
  );
}

export default App;
