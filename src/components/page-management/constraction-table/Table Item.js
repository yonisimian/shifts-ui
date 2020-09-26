import React, { useState, useEffect } from 'react'
import Select from 'react-select'

function App(props) {
  const bakarim = props.bakarim
  const bakarim_options2 = bakarim.map((name) => (
    { value: name, label: name }
  ))
  const temp = bakarim.length == 1 ? { value: bakarim[0], label: bakarim[0] } : undefined

  const [isRequired, setIsRequired] = useState(true)
  const [myValue, setMyValue] = useState(/*temp*/)
  
  useEffect(() => {
    setMyValue(null)
  }, [props.week])

  return (
    <td>
      <>
        <Select
          className="select-bakarim"
          // TODO: add colors via styles
          placeholder={'-'+bakarim.length+'-'}
          value={myValue}
          options={bakarim_options2}
          onChange={value => {
            props.handleChange(value, props.id)
            setIsRequired(value == null || value.length === 0)
            setMyValue(value)
          }}
          isMulti
        />
          {
            <input
              name={"shift-"+props.id}
              tabIndex={-1}
              autoComplete="off"
              style={{ display: "none", opacity: 0, height: 0 }}
              value={JSON.stringify(myValue)}
              //required={isRequired}
            />
          }
      </>
    </td>
  )
}


export default App;
