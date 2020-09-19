import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
    return (
        <main className="App">
            <Jumbotron>
            <Row>
                <Col sm="2"/>
                <Col sm="8"><h2>היסטורית סידורים</h2></Col>
                <Col sm="2"/>
            </Row>
            <Row>
                {/*TODO: import all past block-tables from database*/}
            </Row>
            </Jumbotron>
        </main>
    );
}

export default App;
