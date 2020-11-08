import React from 'react';
import Item from './Table Item';

function App(props) {
  const [shift_kinds, days] = [props.myConfig.shift_kinds, props.myConfig.days]

  const getID = (i) => {
    let index = 0
    while (props.header !== shift_kinds[index])
      index++;
    return i + index
  }

  const numbers = Array.from(Array(days.length), (v,k) => k *= shift_kinds.length)
  // numbers = [0, 3, 6, 9, 12, 15, 18]
  const listItems = numbers.map((i) => 
    <Item
      header={props.header}
      bakarim={props.bakarim[getID(i)]}
      dictionary={props.dictionary}
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
