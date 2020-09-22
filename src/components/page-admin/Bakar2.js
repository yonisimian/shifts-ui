import React, {useState, useEffect, useRef} from 'react'
import {Button, Form} from 'react-bootstrap'

function App(props) {

    return (
        <tr>
            <td>{props.id+1}</td>
            <td>
                <Form.Control
                    as="input"
                    type="text"
                    placeholder="לדדגמא: אחשוורוש המלך"
                    defaultValue={props.bakar.full_name}
                    disabled={!props.editable}
                    onChange={(e) => e.target.className = e.target.value != e.target.defaultValue
                        ? "form-control text-danger" : "form-control"} />
            </td>
            <td>
            <Form.Control
                    as="input"
                    type="text"
                    placeholder="לדדגמא: אחשווי"
                    defaultValue={props.bakar.short_name}
                    disabled={!props.editable}
                    onChange={(e) => e.target.className = e.target.value != e.target.defaultValue
                        ? "form-control text-danger" : "form-control"} />
            </td>
            {props.editable ?
                <td><Button variant="outline-danger" onClick={props.removeBakar}>הסר</Button></td>
            : '' }
        </tr>
    );
}

export default App;
