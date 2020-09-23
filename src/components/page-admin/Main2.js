import React, {useState, useEffect, useRef} from 'react'
import {Jumbotron, Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import _ from 'lodash'
import Bakar from './Bakar2'

function App() {
    const [bakarim, setBakarim] = useState()
    const [original, setOriginal] = useState()
    const [isEditable, setisEditable] = useState(false)

    useEffect(() => {
        fetch('/getemployees', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setBakarim(data['all_emps'])
            setOriginal(_.clone(data['all_emps']))
        })
        .catch(error => alert(error))
    }, [])

    const saveChanges = () => {
        setisEditable(false)
    }

    const cancelChanges = () => {
        setBakarim(original)
        setisEditable(false)
    }

    const addBakar = () => {
        setBakarim([...bakarim, {}])
    }

    const removeBakar = (id) => {
        //alert('TODO: add are you sure?')
        //alert("id: " + id + ", new length: " + bakarim.slice(0, id).concat(bakarim.slice(id + 1, bakarim.length)).length)
        //setBakarim(bakarim.splice(id, 1))
        setBakarim(bakarim.slice(0, id).concat(bakarim.slice(id + 1, bakarim.length)))
        //setBakarim(bakarim.filter((val, key) => key !== id))
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
            setisEditable(!isEditable)
        })
        .catch(error => alert(error))*/
    }

    return (
        <section>
            <Jumbotron>
                <Container fluid>
                    <Row>
                        <Col md="12"><h3>רשימת בקרים</h3></Col>
                    </Row>
                    <Row>
                        {!isEditable ?
                            <Button variant="outline-primary" onClick={() => setisEditable(true)}>ערוך</Button>
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
                                    {isEditable && bakarim.length > 0 && <th/>}
                                </tr>
                            </thead>
                            <tbody>
                                {(bakarim || []).map((bakar, index) => (
                                    <Bakar
                                        data={bakar}
                                        lineNumber={index+1}
                                        isEditable={isEditable}
                                        removeSelf={() => removeBakar(index)} />
                                ))}
                                {isEditable &&
                                    <tr>
                                        <td />
                                        <td><Button variant="outline-primary" onClick={addBakar}>הוסף בקר חדש</Button></td>
                                        <td />
                                        {bakarim.length > 0 && <td />}
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </Jumbotron>
        </section>
    );
}

export default App;
