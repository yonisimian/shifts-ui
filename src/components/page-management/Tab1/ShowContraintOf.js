import React, {useState, useEffect} from 'react'
import BlocksTable from '../blocks-table/Table'
import ChooseBakar from '../../general/chooseBakar.js'
import { Jumbotron, Container, Row, Col } from 'react-bootstrap'


function App(props) {
    const items = props.items
    const [curEmp, setCurEmp] = useState('')

    return (
        <Jumbotron>
            <Container fluid>
                <Row>
                    <Col md="1" />
                    <Col md="5"><h3>הצג אילוץ של הבקר/ית: </h3></Col>
                    <Col md="5"><ChooseBakar 
                                    title="הצג טבלת אילוצים של הבקר/ית: "
                                    isHeader
                                    showChooseBakar
                                    onChange={e => setCurEmp(e.target.value)} /></Col>
                    <Col md="1" />
                </Row>
                <br></br>
                <Row>
                    {items[curEmp] && <BlocksTable
                                        name={items[curEmp].name}
                                        week={props.week}
                                        blocks={items[curEmp].shifts}
                                        comments={items[curEmp].comments}/>}
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default App;
