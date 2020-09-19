import React, { useState } from 'react';
import ChooseBakar from '../general/chooseBakar.js';
import ChooseWeek from '../general/chooseWeek.js';
import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

function App() {
    const CB = <ChooseBakar title="בחר בקר/ית: "/>
    const CW = <ChooseWeek defaultWeek={0}/>
    const [secondSelect, setSecondSelect] = useState(CW)
    
    return (
        <main className="App">
            <Jumbotron>
                <Container>
                    <Row>
                        <Col sm="2"/>
                        <Col sm="8"><h2>טבלת אילוצים מורחבת</h2></Col>
                        <Col sm="2"/>
                    </Row>
                    <br></br>
                    <Row>
                        <Col sm="2">
                            <Form.Label>הצג את: </Form.Label>
                        </Col>
                        <Col sm="5">
                            <Form.Control as="select" onChange={(e) => setSecondSelect((e.target.value === "1" ? CB : CW))} autofocus>
                                <option value="0">כל המשמרות בשבוע מסוים</option>
                                <option value="1">כל המשמרות של בקר מסוים</option>
                            </Form.Control>
                        </Col>
                        <Col sm="5">
                            {secondSelect}
                        </Col>
                    </Row>

                    <Row>
                        
                    </Row>

                {/*TODO: import relevant tables from database*/}
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
