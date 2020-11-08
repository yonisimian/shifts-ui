import React from 'react';
import Item from './Table Item';

function App(props) {
  const numbers = [0, 3, 6, 9, 12, 15, 18];
  const listItems = numbers.map((i) =>
    <Item header={props.header} id={i} shifts={props.shifts} dictionary={props.dictionary}/>
  )

  return (
    <tr>
      <th>{props.header}</th>
      {listItems}
    </tr>
  );
}

export default App;
