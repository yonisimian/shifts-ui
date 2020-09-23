import React, {useState, useEffect, useRef} from 'react'
import {Button, Form} from 'react-bootstrap'

function App(props) {
    const {data, lineNumber, isEditable, removeSelf} = props
    const handleChange = (e) => {
        e.target.className = e.target.value != e.target.defaultValue
                        ? "form-control text-danger" : "form-control"
    }

    return (
        <tr>
            <td>{lineNumber}</td>
            <td>
                <Form.Control
                    name="full name"
                    placeholder="לדוגמא: אחשוורוש המלך"
                    value={data.full_name}
                    disabled={!isEditable}
                    onChange={handleChange} />
                <h3>{data.full_name}</h3>
            </td>
            <td>
                <Form.Control
                    name="short name"
                    placeholder="לדוגמא: אחשווי"
                    value={data.short_name}
                    disabled={!isEditable}
                    onChange={handleChange} />
            </td>
            {isEditable && <td><Button variant="outline-danger" onClick={removeSelf}>הסר</Button></td>}
        </tr>
    );
}

export default App;
