import React, {useState, useEffect} from 'react'
import BlocksTable from '../blocks-table/Table'
import ChooseBakar from '../../general/chooseBakar.js'
import { Container, Row, Col } from 'react-bootstrap'


function App(props) {
    const items = props.items
    const [curItem, setCurItem] = useState()

    return (
        <Container fluid>
            <Row>
                <Col md="6"><h3>הצג אילוץ של הבקר/ית: </h3></Col>
                <Col md="6"><ChooseBakar 
                                title="הצג טבלת אילוצים של הבקר/ית: "
                                isHeader
                                showChooseBakar
                                onChange={e => setCurItem(items[e.target.value])} /></Col>
            </Row>
            <br></br>
            <Row>
                {curItem && <BlocksTable
                                    name={curItem.name}
                                    week={props.week}
                                    blocks={curItem.shifts}
                                    comments={curItem.comments}/>}
            </Row>
        </Container>
    );
}

export default App;
