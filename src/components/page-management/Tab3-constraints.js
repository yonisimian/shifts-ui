import React, { useState, useEffect } from 'react';
import ChooseBakar from '../general/chooseBakar.js';
import ChooseWeek from '../general/chooseWeek.js';
import { Jumbotron } from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import BlocksTable from './blocks-table/Table'
import { getWeek } from '../../scripts'

function App() {
    const [items, setItems] = useState(null)
    const [curWeek, setCurWeek] = useState(null)
    const [curEmp, setCurEmp] = useState(null)

    const handleChangeWeek = (e) => {
        if (e == null) return
        let week = (typeof e == typeof 'string') ? e : e.target.value
        fetch("/weekconstraints?week="+week, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems(result['week_constraints'].map(value => 
                <Row>
                    <BlocksTable
                        name={value.name}
                        week={value.week}
                        blocks={value.shifts}
                        comments={value.comments}/>
                </Row>)
            )
            setCurWeek(week)
        })
        .catch(error => {
            setItems(null)
            alert("tab3 error: " + error)
        })
    }

    const handleChangeEmp = (e) => {
        if (e == null) return
        let name = (typeof e == typeof 'string') ? e : e.target.value
        fetch("/empconstraints?name="+name, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems(result['emp_constraints'].map(value => 
                <Row>
                    <BlocksTable
                        name={value.name}
                        week={value.week}
                        blocks={value.shifts}
                        comments={value.comments}/>
                </Row>)
            )
            setCurEmp(name)
        })
        .catch(error => {
            setItems(null)
            alert("tab3 error: " + error)
        })
    }

    const CW = <ChooseWeek defaultWeek={1} onChange={handleChangeWeek}/>
    const CB = <ChooseBakar title="בחר בקר/ית: " onChange={handleChangeEmp} showChooseBakar/>
    const [secondSelect, setSecondSelect] = useState(CW)

    useEffect(() => {
        handleChangeWeek(getWeek(1))
    }, [])

    const handleChange = (e) => {
        if (e.target.value === '1') {
            setSecondSelect(CB)
            setItems(null)
        }
        else {
            setSecondSelect(CW)
            handleChangeWeek(getWeek(1))
        }
    }
    
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
                            <Form.Control as="select" onChange={handleChange} autofocus>
                                <option value="0">כל המשמרות בשבוע מסוים</option>
                                <option value="1">כל המשמרות של בקר מסוים</option>
                            </Form.Control>
                        </Col>
                        <Col sm="5">
                            {secondSelect}
                        </Col>
                    </Row>
                    <br></br>
                    {items}
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
