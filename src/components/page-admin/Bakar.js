import React, {useState, useRef, useCallback} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'

function App(props) {
    const form = useRef(null)
    const functionA = (e) => {
        e.preventDefault()
        /*let data = new FormData(form.current)
        fetch('/addemployee', {method: 'POST', body: data})
        .then(res => res.json())
        .then(data => {
            alert('wi')
        })
        .catch(error => alert(error))*/
        alert('submit')
    }

    return (
        <div>
            <Form onSubmit={functionA} ref={form}>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>שם מלא:</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name='full_name'
                            value={props.bakar != null ? props.bakar.full_name : undefined}
                            placeholder="דוגמא: אחשוורוש המלך"
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>שם מקוצר:</Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            type="text"
                            name='short_name'
                            value={props.bakar != null ? props.bakar.short_name : undefined}
                            placeholder="דוגמא: אחשווי"
                            required
                        />
                    </Col>
                </Form.Group>
                {props.bakar != null ?
                    <>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="outline-success">שמור נתונים</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="outline-danger">מחק בקר</Button>
                            </Col>
                        </Form.Group>
                    </>
                    :
                    <>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button
                                    variant="outline-primary"
                                    type='submit'>הוסף בקר</Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button variant="outline-secondary">נקה טופס</Button>
                            </Col>
                        </Form.Group>
                    </> 
                }
            </Form>
        </div>
    );
}

export default App;
