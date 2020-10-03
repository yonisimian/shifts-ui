import React, {useState, useEffect, useRef} from 'react'
import {Jumbotron, Container, Row, Col, Table, Button, Form} from 'react-bootstrap'
import _ from 'lodash'
import Item from './List Item'

function App() {
    const form = useRef()
    const [bakarim, setBakarim] = useState([])
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

    const saveChanges = (e) => {
        let length = bakarim ? bakarim.length : 0
        let data = new FormData(form.current)
        fetch('/submitemployees?num_of_emps='+length, {method: 'POST', body: data})
        .then(res => res)
        .then(data => {
        })
        .catch(error => alert(error))

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
        let newBakarim = bakarim.filter((val, key) => key !== id)
        setBakarim(newBakarim)
    }

    return (
        <main>
            <Jumbotron>
                <Container fluid>
                    <Form ref={form} onSubmit={saveChanges}>
                        <Row>
                            <Col md="12"><h3 onClick={() => alert(JSON.stringify(bakarim))}>רשימת בקרים</h3></Col>
                        </Row>
                        <Row>
                            {!isEditable ?
                                <Button variant="outline-primary" onClick={() => /*setisEditable(true)*/ alert("Work In Progress")}>ערוך</Button>
                            :
                                <>
                                    <br />
                                    <Button variant="outline-success" type="submit">שמירה</Button>
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
                                        <th>צבע</th>
                                        {isEditable && bakarim.length > 0 && <th/>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {bakarim.map((bakar, index) => (
                                        <Item
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
                                            <td />
                                        </tr>
                                    }
                                </tbody>
                            </Table>
                        </Row>
                    </Form>
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
