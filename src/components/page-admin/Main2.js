import React, {useState, useEffect, useRef} from 'react'
import {Jumbotron, Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import { findAllInRenderedTree } from 'react-dom/test-utils'
import Bakar from './Bakar2'

function App() {
    const [bakarim, setBakarim] = useState([''])
    const [editable, setEditable] = useState(false)

    useEffect(() => {
        fetch('/getemployees', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setBakarim(data['all_emps'].map((value, key) => 
                <Bakar bakar={value} id={key} editable={editable} removeBakar={() => removeLine(key)}/>
            ))
            
        })
        .catch(error => alert(error))
    }, [editable])

    const saveChanges = () => {
        setEditable(false)
    }

    const cancelChanges = () => {
        setEditable(false)
    }

    const addLine = () => {
        setBakarim([...bakarim, <Bakar
                                    bakar={{}}
                                    id={bakarim.length}
                                    editable={editable}
                                    removeBakar={() => removeLine(bakarim.length)} />])
    }

    const removeLine = (id) => {
        //alert('TODO: add are you sure?')
        //setBakarim(bakarim.filter((value, key) => key != id))
        setBakarim(bakarim.slice(0, id).concat(bakarim.slice(id + 1, bakarim.length)))
        /*let data = {
            full_name: ''
        }
        fetch('/removeemployee', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res)
        .then(data => {
            alert(data.ok ? "removed succsessfuly" : 'not removed')
            setEditable(!editable)
        })
        .catch(error => alert(error))*/
    }

    return (
        <section>
            <Jumbotron>
                <Container fluid>
                    <Row>
                        <Col md="1" />
                        <Col md="10"><h3>רשימת בקרים</h3></Col>
                        <Col md="1" />
                    </Row>
                    <br></br>
                    <Row>
                        {!editable ?
                            <Button variant="outline-primary" onClick={() => setEditable(true)}>ערוך</Button>
                        :
                            <>
                            <Button variant="outline-success" onClick={saveChanges}>שמירה</Button>
                            <Button variant="outline-secondary" onClick={cancelChanges}>ביטול</Button>
                            </>
                        }
                    </Row>
                    <Row className='text-align-right'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>שם מלא</th>
                                    <th>שם מקוצר</th>
                                    {editable ? <th></th> : ''}
                                </tr>
                            </thead>
                            <tbody>
                                {bakarim}
                                {editable ?
                                    <tr>
                                        <td />
                                        <td><Button variant="outline-primary" onClick={addLine}>הוסף בקר חדש</Button></td>
                                        <td />
                                        <td />
                                    </tr>
                                : '' }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </Jumbotron>
        </section>
    );
}

export default App;
