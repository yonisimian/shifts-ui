import React from 'react';
import { getWeek } from '../../scripts.js';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function App(props) {
    return (
        <Form.Row>
            {props.withTitle && <Form.Label column xs="3">שבוע: </Form.Label>}
            <Col xs="9">
                <Form.Control
                    type="week" // TODO: make it from sunday to saturday
                    id="week" 
                    name="week"
                    min="2020-W01" 
                    defaultValue={props.week ? props.week : getWeek(props.defaultWeek)}
                    onChange={props.onChange}
                    required
                />
            </Col>
        </Form.Row>
    );
}


export default App;
