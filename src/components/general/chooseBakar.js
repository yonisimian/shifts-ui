import React, {useState, useEffect} from 'react'
import { myConfig } from '../../config.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function App(props) {
    const bakarim_options = props.bakarim.map((name) => 
        <option value={name}>{name}</option>
    )
    const [b2, setB2] = useState(undefined)
    useEffect(() => {
        fetch('/getemployees', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setB2(data['all_emps'].map(v => 
                <option value={v.full_name}>{v.full_name}</option>
            ))
        })
        .catch(error => alert(error))
    }, [])

    const title = props.withTitle ? <Form.Label column xs="3">בקר/ית: </Form.Label> : null;

    return (
        <Form.Row>
            {title}
            <Col xs="9">
                <Form.Control
                    as="select"
                    name="name"
                    onChange={props.onChange}
                >
                    {props.showChooseBakar ? <option value="" disabled selected>בחר/י בקר/ית</option> : ''}
                    {bakarim_options}
                    {props.addNew ?
                        <>
                            <option disabled>--------</option>
                            <option value="addNew">הוספת בקר/ית חדש/ה</option>
                        </>
                    : ''}
                </Form.Control>
            </Col>
        </Form.Row>
    );
}


export default App;
