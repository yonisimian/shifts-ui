import React, {useState, useEffect, useRef } from 'react'
import useWindowDimensions from '../../general/useWindowDimensions'
import Table from '../constraction-table/Table'
import ShowConstraintOf from './ShowContraintOf'
import NoBakarimDBAlert from './Alerts/Alert-NoBakarimDB'
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
    const [week, setWeek] = useState(null)
    const [showAlert2, setShowAlert2] = useState(false)
    const [showAlert3, setShowAlert3] = useState(false)
    const [empConstraints, setEmpConstraints] = useState({})
    const [remain_bakarim, setRB] = useState([]) 
    useEffect(() => {
        if (week == null) return
        setLoaded(false)
        fetch("/weekconstraints?week="+week, {method: 'GET'})
        .then(res => res.json())
        .then((result) => {
            let data = result['week_constraints']
            setData(data)
            let submitted = data.map(val => val.name)
            let remain = [...props.bakarim.map(value => value.full_name).filter(x => !submitted.includes(x))]
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
            setConsJumbo(<ShowConstraintOf week={week} items={constraints} bakarim={props.bakarim} />)
            setLoaded(true)
        })
        .catch(error => {
            alert("tab1 error: " + error)
            setLoaded(true)
        })
    }, [week])

    useEffect(() => {
        if (props.bakarim.length !== 0) {
            setShowAlert3(false)
            setWeek(getWeek(1))
        }
        else
        {
            const timer = setTimeout(() => {
                setShowAlert3(true)
                setLoaded(true)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [props.bakarim])

    const [consJumbo, setConsJumbo] = useState()
    const handleChangeWeek = (e) => {
        setShowAlert2(false)
        setWeek(e.target.value)
        setConsJumbo(<ShowConstraintOf week={e.target.value} items={empConstraints} bakarim={props.bakarim}/>)
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
        showAlert3 ? 
            <NoBakarimDBAlert />
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
                                    {(windowWidth > minWindowSize) ?
                                        <Table
                                            data={data}
                                            week={week}
                                            bakarim={props.bakarim}
                                            dictionary={props.dictionary}
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
