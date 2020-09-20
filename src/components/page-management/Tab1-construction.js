import React, {useState, useEffect} from 'react'
import Table from './constraction-table/Construction Table'
import ShowConstraintOf from './ShowContraintOf'
import BlocksTable from './blocks-table/Table'
import ChooseBakar from '../general/chooseBakar.js'
import ChooseWeek from '../general/chooseWeek.js'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Row, Col} from 'react-bootstrap'

function App() {
    return (
        <main className="App">
            <Jumbotron>
                <Container fluid>
                    <form action="/supersonic" method="post">
                        <Row>
                            <Col sm="2" />
                            <Col sm="4"><h3>הכנת הסידור לשבוע: </h3></Col>        
                            <Col sm="5"><ChooseWeek defaultWeek={1} /></Col>
                            <Col sm="1" />
                        </Row>
                        <Row>
                            <Col sm="12"><Table /></Col>
                        </Row>
                        <Button variant="primary" type="submit">שגר!</Button>
                    </form>
                </Container>
            </Jumbotron>
            <ShowConstraintOf />
        </main>
    );
}

export default App;
