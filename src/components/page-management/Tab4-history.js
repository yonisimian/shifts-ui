import React, {useState, useEffect} from 'react'
import BlocksTable from './blocks-table/Table'
import Jumbotron from 'react-bootstrap/Jumbotron'
//import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function App() {
    const [shifts, setShifts] = useState([])
    useEffect(() => {
        fetch('/allData', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setShifts(data['all_data']['Constraints'].map(value => 
                <Row>
                    <BlocksTable
                        name={value.name}
                        week={value.week}
                        blocks={value.shifts}
                        comments={value.comments}/>
                </Row>)
            )
        })
        .catch(error => alert("tab4 error: " + error))
    }, [])

    return (
        <main className="App">
            <Jumbotron>
            <Row>
                <Col sm="2"/>
                <Col sm="8"><h2>היסטורית סידורים</h2></Col>
                <Col sm="2"/>
            </Row>
            {shifts}
            </Jumbotron>
        </main>
    );
}

export default App;
