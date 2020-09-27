import React, {useState, useEffect, useRef } from 'react'
import useWindowDimensions from '../../general/useWindowDimensions'
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
import Spinner from 'react-bootstrap/Spinner'

function App(props) {
    const {windowWidth, windowHeight} = useWindowDimensions()
    const minWindowSize = 85.0
    const form = useRef(null)
    const [data, setData] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const [ignore, setIgnore] = useState(false)
    const [week, setWeek] = useState(getWeek(1))
    const [showAlert2, setShowAlert2] = useState(false)
    const [empConstraints, setEmpConstraints] = useState({})
    const [remain_bakarim, setRB] = useState(myConfig.bakarim) // TODO: get Bakarim from the DB
    useEffect(() => {
        setLoaded(false)
        fetch("/weekconstraints?week="+week, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            let data = result['week_constraints']
            setData(data)
            let submitted = data.map(val => val.name)
            // TODO: get Bakarim from the DB
            let remain = [...myConfig.bakarim.filter(x => !submitted.includes(x))]
            setRB(remain.map(val => <li>{val}</li>))

            let constraints = {}
            data.map(cons => 
                constraints[cons.name] = {
                    'name': cons.name,
                    'shifts': cons.shifts,
                    'comments': cons.comments
                }
            )
            setEmpConstraints(constraints)
            setConsJumbo(<ShowConstraintOf week={week} items={constraints} />)
            setLoaded(true)
        })
        .catch(error => {
            alert("tab1 error: " + error)
            setLoaded(true)
        })
    }, [week])

    const [consJumbo, setConsJumbo] = useState()
    const handleChangeWeek = (e) => {
        setShowAlert2(false)
        setWeek(e.target.value)
        setConsJumbo(<ShowConstraintOf week={e.target.value} items={empConstraints}/>)
    }

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
        .then(data => setShowModal(true))
        .catch(error => alert('משהו נדפק, המשמרות לא הוגשו בהצלחה :('))
    }

    return (
        !isLoaded ? 
            <Spinner animation="border" variant="primary"/>
        :
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
                                <Col sm="6"><h3>הכנת הסידור לשבוע: </h3></Col>        
                                <Col sm="6"><ChooseWeek week={week} defaultWeek={1} onChange={handleChangeWeek}/></Col>
                            </Form.Row>
                            <Form.Row>
                                    <Form.Check
                                        type="switch"
                                        label="התעלם מאילוצים"
                                        id="ignore"
                                        checked={ignore}
                                        onClick={(e) => setIgnore(!ignore)}/>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Row>
                                <Col sm="12">
                                    {(windowWidth > minWindowSize && isLoaded) ?
                                        <Table
                                            data={data}
                                            week={week}
                                            bakarim={props.bakarim}
                                            setShowAlert2={(e) => setShowAlert2(e)}
                                            ignore={ignore}
                                            />
                                    :
                                        <>
                                            <h2>תגדיל ת'חלון אבא</h2>
                                            <input style={{display: "none"}} required/>
                                        </>
                                    }
                                </Col>
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
            <Jumbotron>
                {consJumbo}
            </Jumbotron>
        </main>
    );
}

export default App;
