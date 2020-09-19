import React from 'react'
import { myConfig } from '../../config.js'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function App(props) {
    const bakarim_options = myConfig.bakarim.map((name) => 
        <option value={name}>{name}</option>
    )
    const title = props.withTitle ? <Form.Label column xs="3">בקר/ית: </Form.Label> : null;

    return (
        <Form.Row>
            {title}
            <Col xs="9">
                <Form.Control as="select" name="name">
                    {/*<option value="" disabled selected>בחר/י בקר/ית</option>*/}
                    {bakarim_options}
                </Form.Control>
            </Col>
        </Form.Row>
    );
}


export default App;
