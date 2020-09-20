import React, { useState, useRef } from 'react'
import Table from './submission-table/Table.js'
import ChooseBakar from '../general/chooseBakar.js'
import ChooseWeek from '../general/chooseWeek.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
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
            <Form /*action='submitconstraints'*/ ref={form} onSubmit={handleSubmit} method='POST'>
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
                <Button variant="primary" type="submit">שלח/י</Button>
            </Form>
        </main>
    );
}

export default App;
