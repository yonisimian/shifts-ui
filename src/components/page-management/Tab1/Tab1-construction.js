import React, {useState, useEffect, useRef } from 'react'
import Table from '../constraction-table/Table'
import ShowConstraintOf from './ShowContraintOf'
import NoShiftsAlert from './Alerts/Alert-NoShifts'
import NoSubmitAlert from './Alerts/Alert-NoSubmit'
import _88Alert from './Alerts/Alert-8-8s'
import SuccessModal from './Modal'
import ChooseWeek from '../../general/chooseWeek.js'
import { Container, Col, Form, Jumbotron, Button } from 'react-bootstrap'
import { getWeek } from '../../../scripts'
import { myConfig } from '../../../config'

function App(props) {
    const form = useRef(null)
    const [week, setWeek] = useState(getWeek(1))
    const [consJumbo, setConsJumbo] = useState(<ShowConstraintOf week={week} />)
    const handleChange = (e) => {
        setShowAlert2(false)
        setWeek(e.target.value)
        setConsJumbo(<ShowConstraintOf week={e.target.value} />)
    }

    const [showAlert2, setShowAlert2] = useState(false)
    const [remain_bakarim, setRB] = useState(myConfig.bakarim) // TODO: get Bakarim from the DB
    useEffect(() => {
        fetch("/weekconstraints?week="+week, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            let submitted = result['week_constraints'].map(val => val.name)
            // TODO: get Bakarim from the DB
            let remain = [...myConfig.bakarim.filter(x => !submitted.includes(x))]
            setRB(remain.map(val => <li>{val}</li>))
        })
        .catch(error => alert("tab1 error: " + error))
    }, [week])

    const [_88count, set88Count] = useState(0)

    const [isModalShown, setShowModal] = useState(false)
    const hideModal = () => {
        setShowModal(false)
        window.location.reload()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData(form.current)
        fetch('/submitschedule', {method: 'POST', body: data})
        .then(res => res)
        .then(data => {
            setShowModal(true)
        })
        .catch(error => {
            alert('משהו נדפק, המשמרות לא הוגשו בהצלחה :(')
        })
    }

    return (
        <main>
            <SuccessModal show={isModalShown} handleClose={hideModal} />
            <NoShiftsAlert bakarim={remain_bakarim} week={week}/>
            <NoSubmitAlert showAlert={showAlert2} />
            <_88Alert count={_88count} />
            <Jumbotron>
                <Container fluid>
                    <Form ref={form} onSubmit={handleSubmit} method="post">
                        <Form.Group>
                            <Form.Row>
                                <Col />
                                <Col sm="5"><h3>הכנת הסידור לשבוע: </h3></Col>        
                                <Col sm="5"><ChooseWeek defaultWeek={1} onChange={handleChange}/></Col>
                                <Col />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="12"><Table
                                                week={week}
                                                bakarim={props.bakarim}
                                                setShowAlert2={(e) => setShowAlert2(e)}
                                                /></Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Form.Label>הערות: </Form.Label>
                                <Form.Control as='textarea' name='comments' rows="3" />
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col />
                                    <Button variant="outline-primary" type="submit">שגר!</Button>
                                <Col />
                            </Form.Row>
                        </Form.Group>
                    </Form>
                </Container>
            </Jumbotron>
            {consJumbo}
        </main>
    );
}

export default App;
