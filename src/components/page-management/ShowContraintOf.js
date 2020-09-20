import React, {useState, useEffect} from 'react'
import BlocksTable from './blocks-table/Table'
import ChooseBakar from '../general/chooseBakar.js'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Row, Col} from 'react-bootstrap'

function App() {
    const [items, setItems] = useState(null)
    const [a, setA] = useState(0)

    const handleChange = (e) => {
        fetch("/empconstraints?name="+e.target.value, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems({
                'name': result['emp_constraints'][0].name,
                'date': result['emp_constraints'][0].date,
                'shifts': result['emp_constraints'][0].shifts,
                'comments': result['emp_constraints'][0].comments
            })
            //setA(result.shifts)
        })
        .catch(error => {
            alert(error + '\n(כנראה שהבקר לא הגיש משמרות)')
        })
    }

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
                                    onChange={handleChange} /></Col>
                    <Col md="1" />
                </Row>
                <br></br>
                <Row>
                    {/*TODO: import relevant block-table from database*/}
                    {items != null ? <BlocksTable name={items.name} week={items.date} blocks={Object.values(a)}/> : ''}
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default App;
