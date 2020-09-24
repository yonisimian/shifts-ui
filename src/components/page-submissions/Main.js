import React, { useState, useRef } from 'react'
import Table from './submission-table/Table'
import ChooseBakar from '../general/chooseBakar'
import ChooseWeek from '../general/chooseWeek'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Modal from './Modal'

function App() {
    const [isModalShown, setShowModal] = useState(false)
    const showModal = () => setShowModal(true)
    const hideModal = () => {
        setShowModal(false)
        window.location.reload()
    }

    const form = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData(form.current)
        fetch('/submitconstraints', {method: 'POST', body: data})
        .then(res => res.json())
        .then(data => {
            setShowModal(true)
        })
        .catch(error => {
            alert('משהו נדפק, המשמרות לא הוגשו בהצלחה :(')
        })
    }

    return (
        <main className="submission-form">
            <Modal show={isModalShown} handleClose={hideModal} />
            <Jumbotron>
                <Form ref={form} onSubmit={handleSubmit} method='POST'>
                    <Form.Group>
                        <Col sm="6"><ChooseBakar withTitle={true}/></Col>
                    </Form.Group>
                    <Form.Group>
                        <Col sm="6"><ChooseWeek defaultWeek={1} withTitle={true}/></Col>
                    </Form.Group>
                    <Form.Group>
                        <Table />
                    </Form.Group>
                    <Form.Group>
                        <Form.Row>
                            <Form.Label className="text-align-right">הערות: </Form.Label>
                            <Form.Control as="textarea" name='comments' rows="4" />
                        </Form.Row>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">שלח/י</Button>
                </Form>
            </Jumbotron>
        </main>
    );
}

export default App;
