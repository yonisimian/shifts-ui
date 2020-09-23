import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import { myConfig } from '../../../config'
import Select from 'react-select'

function App(props) {
  // TODO: get the Bakarim list from the DB
  const bakarim_options = /*myConfig.*/props.bakarim.map((name) => 
    <option value={name}>{name}</option>
  )
  const bakarim_options2 = props.bakarim.map((name) => (
    { value: name, label: name }
  ))
  const placeholder = '-'+props.bakarim.length+'-'
  const [isRequired, setIsRequired] = useState(true)

  return (
    <td>
      <>
        <Select
          className="select-bakarim"
          // TODO: add colors via styles
          placeholder={placeholder}
          options={bakarim_options2}
          onChange={value => setIsRequired(value == null || value.length === 0)}
          isMulti
        />
          {
            <input
              tabIndex={-1}
              autoComplete="off"
              style={{ opacity: 0, height: 0 }}
              required={isRequired}
            />
          }
      </>
    </td>
  )

  // return (
  //   <td>
  //     <Form.Control as="select" className="selectpicker" multiple required>
  //       <option value="" selected>-{props.bakarim.length}-</option>
  //       {bakarim_options}
  //       {/*TODO: if there's only 1 bakar, choose him in advance*/}
  //     </Form.Control>
  //   </td>
  // );
}


export default App;
