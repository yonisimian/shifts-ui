import React, {useState, useEffect} from 'react'
import ShiftsTable from '../shifts-table/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from './Pagination'

function App(props) {
    const [shifts, setShifts] = useState([])
    useEffect(() => {
        fetch('/schedules', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setShifts(data['schedules'])
        })
        .catch(error => {
            alert("tab4 error: " +error)
            setShifts([])
        })
    }, [])

    const [dictionary, setDict] = useState([])
    props.bakarim && props.bakarim.map(value => {
        setDict([...dictionary, {
            name: value.full_name,
            color: value.color
        }])
    })

    const [curPage, setCurPage] = useState(0)
    const shiftsPerPage = 4
    const pagination = <Pagination
                            shifts={shifts}
                            shiftsPerPage={shiftsPerPage}
                            curPage={curPage}
                            setCurPage={setCurPage} />

    return (
        <main className="App">
            {pagination}
            <Jumbotron>
                <Row>
                    <Col sm="12"><h2>היסטורית סידורים</h2></Col>
                </Row>
                {shifts.filter((shift, index) =>
                    index >= curPage * shiftsPerPage && index < (curPage + 1) * shiftsPerPage)
                        .map((shift, index) => 
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
                }
                <Row>
                    {pagination}
                </Row>
            </Jumbotron>
        </main>
    );
}

export default App;
