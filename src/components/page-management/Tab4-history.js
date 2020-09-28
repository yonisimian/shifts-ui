import React, {useState} from 'react'
import ShiftsTable from './shifts-table/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from './Pagination'

function App(props) {
    const shifts = props.shifts

    const [curPage, setCurPage] = useState(0)
    const [curSection, setCurSection] = useState(0)
    const shiftsPerPage = 1
    const pagesPerSection = 5
    const pagination = <Pagination
                            items={shifts}
                            itemsPerPage={shiftsPerPage}
                            curPage={curPage}
                            setCurPage={setCurPage}
                            pagesPerSection={pagesPerSection}
                            curSection={curSection}
                            setCurSection={setCurSection} />

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
                                        comments={shift.comments}
                                        dictionary={props.dictionary}/>
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
