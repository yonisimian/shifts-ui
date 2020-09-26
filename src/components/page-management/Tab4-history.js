import React, {useState, useEffect} from 'react'
import ShiftsTable from './shifts-table/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Pagination } from 'react-bootstrap'

function App() {
    const [shifts, setShifts] = useState()
    useEffect(() => {
        fetch('/schedules', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setShifts(data['schedules'])
        })
        .catch(error => {
            alert("tab4 error: " +error)
        })
    }, [])

    return (
        <main className="App">
            <Jumbotron>
                <Row>
                    <Col />
                    <Col sm="8"><h2>היסטורית סידורים</h2></Col>
                    <Col />
                </Row>
                {shifts &&
                    // <Pagination>
                    //     <Pagination.First />
                    //     <Pagination.Prev />
                        shifts.map((shift, index) => 
                            <>
                                <Row>
                                    <ShiftsTable
                                        week={shift.week}
                                        shifts={shift.shifts}
                                        comments={shift.comments}/>
                                </Row>
                                <hr/>
                            </>
                        )
                    //     <Pagination.Next />
                    //     <Pagination.Last />
                    // </Pagination>
                }
            </Jumbotron>
        </main>
    );
}

export default App;
