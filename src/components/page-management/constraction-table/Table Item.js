import React, { useState, useEffect } from 'react'
import Select from 'react-select'

function App(props) {
  const dictionary = props.dictionary
  const bakarim = props.bakarim.map(name => ({value: name, label: dictionary["short " + name]}))
  const temp = bakarim.length == 1 ? { value: bakarim[0], label: bakarim[0] } : undefined

  const [isRequired, setIsRequired] = useState(true)
  const [myValue, setMyValue] = useState(/*temp*/)
  
  useEffect(() => {
    setMyValue(null)
  }, [props.week])

  const customStyles = {
    /*option: (provided, {data}) => ({
      ...provided,
      backgroundColor: dictionary[data.value],
    }),*/
    multiValue: (provided, {data}) => ({
      ...provided,
      backgroundColor: dictionary[data.value],
    })
  }

  return (
    <td>
      <>
        <Select
          className="select-bakarim"
          styles={customStyles}
          placeholder={'-'+bakarim.length+'-'}
          value={myValue}
          options={bakarim}
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
