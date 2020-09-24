import React, {useState, useEffect} from 'react'
import BlocksTable from '../blocks-table/Table'
import ChooseBakar from '../../general/chooseBakar.js'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Row, Col } from 'react-bootstrap'


function App(props) {
    const [items, setItems] = useState(null)
    const [curEmp, setCurEmp] = useState('')

    const handleChange = (e) => {
        let name = (typeof e == typeof 'string') ? e : e.target.value
        fetch("/empweekconstraints?name="+name+"&week="+props.week,
            {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems({
                'name': result.name,
                'week': result.week,
                'shifts': result.shifts,
                'comments': result.comments
            })
            setCurEmp(name)
        })
        .catch(error => {
            setItems(null)
            //alert("showConstraintsOf error: " + error)
        })
    }

    useEffect(() => handleChange(curEmp), [props.week])

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
                    {items && <BlocksTable
                                        name={items.name}
                                        week={items.week}
                                        blocks={items.shifts}
                                        comments={items.comments}/>}
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default App;
