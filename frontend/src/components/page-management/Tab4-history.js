import React, {useState} from 'react'
import ShiftsTable from './shifts-table/Table'
import MiniTable from './mini-table/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from '../general/Pagination'
import { weekToString } from '../../scripts'

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
                                    <Col ><h5>טבלת המשמרות לשבוע {shift.week.slice(6,8)} בתאריכים {weekToString(shift.week)}</h5></Col>
                                </Row>
                                <Row>
                                    <ShiftsTable
                                        shifts={shift.shifts}
                                        comments={shift.comments}
                                        dictionary={props.dictionary} />
                                    <MiniTable
                                        counts={shift.shift_counts}
                                        _88={shift._8_8_shifts}
                                        specials={shift.specials}
                                        dictionary={props.dictionary} />
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
