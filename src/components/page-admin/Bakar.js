import React, {useState, useEffect, useRef} from 'react'
import {Button, Form} from 'react-bootstrap'

function App(props) {
    const {data, lineNumber, isEditable, removeSelf} = props
    const id = lineNumber - 1
    const handleChange = (e) => {
        e.target.className = e.target.value != e.target.defaultValue
                        ? "form-control text-danger" : "form-control"
    }

    return (
        <tr>
            <td>{lineNumber}</td>
            <td>
                <Form.Control
                    name={"full_name-"+id}
                    placeholder="לדוגמא: אחשוורוש המלך"
                    defaultValue={data.full_name}
                    disabled={!isEditable}
                    onChange={handleChange} />
                <h3>{data.full_name}</h3>
            </td>
            <td>
                <Form.Control
                    name={"short_name-"+id}
                    placeholder="לדוגמא: אחשווי"
                    defaultValue={data.short_name}
                    disabled={!isEditable}
                    onChange={handleChange} />
            </td>
            <td>
                <Form.Control
                    type="color"
                    name={"color-"+id}
                    style={{padding: "4px"}}
                    defaultValue={data.color}
                    disabled={!isEditable}/>
            </td>
            {isEditable && <td><Button variant="outline-danger" onClick={removeSelf}>הסר</Button></td>}
        </tr>
    );
}

export default App;
