import React, { useState, useEffect } from 'react';
import ChooseBakar from '../general/chooseBakar.js';
import ChooseWeek from '../general/chooseWeek.js';
import { Jumbotron, Container, Row, Col, Form } from 'react-bootstrap';
import BlocksTable from './blocks-table/Table'
import { getWeek } from '../../scripts'
import Pagination from './Pagination'

function App(props) {
    const [items, setItems] = useState([])
    const [curPage, setCurPage] = useState(0)
    const [curSection, setCurSection] = useState(0)
    const itemsPerPage = 1
    const pagesPerSection = 5

    const handleChangeWeek = (e) => {
        if (e == null) return
        let week = (typeof e == typeof 'string') ? e : e.target.value
        fetch("/weekconstraints?week="+week, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems(result['week_constraints'])
            setCurPage(0)
            setCurSection(0)
        })
        .catch(error => {
            setItems([])
            alert("couln't import week's constraints from DB: " + error)
        })
    }

    const handleChangeEmp = (e) => {
        if (e == null) return
        let name = (typeof e == typeof 'string') ? e : e.target.value
        fetch("/empconstraints?name="+name, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            setItems(result['emp_constraints'])
            setCurPage(0)
            setCurSection(0)
        })
        .catch(error => {
            setItems([])
            alert("couln't import employees' constraints from DB: " + error)
        })
    }

    const [secondSelect, setSecondSelect] = useState(0)
    // 0 = choose week, 1 = choose bakar

    useEffect(() => {
        handleChangeWeek(getWeek(1))
    }, [])

    const handleChange = (e) => {
        setSecondSelect(e.target.value)
        e.target.value === '1' ?
            setItems([])
        :
            handleChangeWeek(getWeek(1))
    }

    const pagination = <Pagination
                            items={items}
                            itemsPerPage={itemsPerPage}
                            curPage={curPage}
                            setCurPage={setCurPage}
                            pagesPerSection={pagesPerSection}
                            curSection={curSection}
                            setCurSection={setCurSection} />
    
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
                            {secondSelect === 0 ?
                                <ChooseWeek defaultWeek={1} onChange={handleChangeWeek}/>
                            :
                                <ChooseBakar title="בחר בקר/ית: " bakarim={props.bakarim.map(val => val.full_name)} onChange={handleChangeEmp} showChooseBakar/>
                            }
                        </Col>
                    </Row>
                    <br></br>
                    {items && (secondSelect === 1 ?
                                items.filter((item, index) => index >= curPage * itemsPerPage && index < (curPage + 1) * itemsPerPage)
                            :
                                items).map(value => 
                            <>
                                <Row>
                                    <BlocksTable
                                        name={value.name}
                                        week={value.week}
                                        blocks={value.shifts}
                                        comments={value.comments}/>
                                </Row>
                                <hr/>
                            </>
                        )
                    }
                    {secondSelect === 1 && pagination}
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
