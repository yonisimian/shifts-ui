import React, {useState, useEffect} from 'react'
import Table from '../constraction-table/Construction Table'
import ShowConstraintOf from './ShowContraintOf'
import NoShiftsAlert from './Alert'
import ChooseWeek from '../../general/chooseWeek.js'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Row, Col, Alert} from 'react-bootstrap'
import { getWeek } from '../../../scripts'
import { myConfig } from '../../../config'

function App() {
    const [week, setWeek] = useState(getWeek(1))
    const [consJumbo, setConsJumbo] = useState(<ShowConstraintOf week={week} />)
    const handleChange = (e) => {
        setWeek(e.target.value)
        setConsJumbo(<ShowConstraintOf week={e.target.value} />)
    }

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

    return (
        <main className="min-size-900">
            <NoShiftsAlert bakarim={remain_bakarim} week={week} />
            <Jumbotron>
                <Container fluid>
                    <form action="/supersonic" method="post">
                        <Row>
                            <Col sm="2" />
                            <Col sm="4"><h3>הכנת הסידור לשבוע: </h3></Col>        
                            <Col sm="5"><ChooseWeek defaultWeek={1} onChange={handleChange}/></Col>
                            <Col sm="1" />
                        </Row>
                        <Row>
                            <Col sm="12"><Table /></Col>
                        </Row>
                        <Button variant="primary" type="submit">שגר!</Button>
                    </form>
                </Container>
            </Jumbotron>
            {consJumbo}
        </main>
    );
}

export default App;
