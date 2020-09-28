import React, {useState, useEffect} from 'react'
import { myConfig } from '../../config.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function App(props) {
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
                    {props.bakarim.map((name) => 
                        <option value={name}>{name}</option>
                    )}
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
