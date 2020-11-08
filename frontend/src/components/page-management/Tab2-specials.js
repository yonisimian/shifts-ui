import React from 'react';
import { getCurrentMonth } from '../../scripts.js'
import { Jumbotron, Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App(props) {
    return (
        <main className="App">
            <Jumbotron>
                <Container>
                    <Row>
                        <Col sm="1"/>
                        <Col sm="5"><h3>טבלת מיוחדים לחודש: </h3></Col>
                        <Col sm="5">
                            <Form.Control
                                type='month'
                                name="name"
                                defaultValue={getCurrentMonth()}
                            />
                        </Col>
                        <Col sm="1"/>
                    </Row>
                    <Row>
                        {/*TODO: import relevant specials-table from database*/}
                    </Row>
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
