import React, {useState} from 'react'
import Table from './submission-table/Table.js'
import ChooseBakar from '../general/chooseBakar.js'
import ChooseWeek from '../general/chooseWeek.js'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from './Modal'

function App() {
    const [isModalShown, setShowModal] = useState(false)
    const showModal = () => setShowModal(true)
    const hideModal = () => setShowModal(false)

    const handleSubmit = () => {
        fetch('/supersonic', {method: 'POST'})
        .then(res => res.json())
        .then(data => {
            alert("success: " + data)
            //setShowModal(true)
        })
        .catch(error => {
            alert("error: " + error)
        })
    }

    return (
        <main className="App">
            <Modal show={isModalShown} handleClose={hideModal} title="כוורת"/>
            <Form onSubmit={handleSubmit}>
                <Container>
                    <Row>
                        <Col sm="6"><ChooseBakar withTitle={true}/></Col>
                    </Row>
                    <Row>
                        <Col sm="6"><ChooseWeek defaultWeek={1} withTitle={true}/></Col>
                    </Row>
                    <Row>
                        <Col sm="10"><Table /></Col>
                    </Row>
                    <Row>
                        <Col sm="3" />
                        <Col sm="6"><Button variant="primary" type="submit">שלח/י</Button></Col>
                    </Row>
                </Container>
            </Form>
        </main>
    );
}

export default App;
