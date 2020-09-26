import React, {useState, useEffect, useRef} from 'react'
import {Button, Form} from 'react-bootstrap'

function App(props) {
    const {data, lineNumber, isEditable, removeSelf} = props
    const { full_name, short_name, color } = data
    const id = lineNumber - 1

    const [fullName, setFullName] = useState(full_name)
    const [shortName, setShortName] = useState(short_name)
    const [backGroundColor, setBGColor] = useState(color)
    const handleChange = (e) => {
        //e.target.className = e.target.value != e.target.defaultValue ? "form-control text-danger" : "form-control"
        switch (e.target.id) {
            case "fullName":
                setFullName(e.target.value);
                e.target.className = e.target.value != full_name ? "form-control text-danger" : "form-control"
                break;
            case "shortName":
                setShortName(e.target.value);
                e.target.className = e.target.value != short_name ? "form-control text-danger" : "form-control"
                break;
            case "color":
                setBGColor(e.target.value);
                break;
        }
    }

    return (
        <tr>
            <td>{lineNumber}.</td>
            <td>
                <Form.Control
                    name={"full_name-"+id}
                    id={"fullName"}
                    placeholder="לדוגמא: אחשוורוש המלך"
                    value={fullName}
                    style={{backgroundColor: backGroundColor}}
                    disabled={!isEditable}
                    onChange={handleChange} />
            </td>
            <td>
                <Form.Control
                    name={"short_name-"+id}
                    id={"shortName"}
                    placeholder="לדוגמא: אחשווי"
                    value={shortName}
                    style={{backgroundColor: backGroundColor}}
                    disabled={!isEditable}
                    onChange={handleChange} />
            </td>
            <td>
                <Form.Control
                    type="color"
                    name={"color-"+id}
                    id={"color"}
                    style={{padding: "3px", width: "36px", margin: "auto"}}
                    value={backGroundColor}
                    onChange={handleChange}
                    disabled={!isEditable}/>
            </td>
            {isEditable && <td><Button variant="outline-danger" onClick={removeSelf}>הסר</Button></td>}
        </tr>
    );
}

export default App;
