import React, {useState, useEffect} from 'react'
import Table from './constraction-table/Construction Table'
import BlocksTable from './blocks-table/Table'
import ChooseBakar from '../general/chooseBakar.js'
import ChooseWeek from '../general/chooseWeek.js'
import Button from 'react-bootstrap/Button'
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container, Row, Col} from 'react-bootstrap'

function App() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [a, setA] = useState(0)

      useEffect(() => {
        fetch("/allData")
          .then(res => res.json())
          .then(
              (result) => {
                setIsLoaded(true)
                setItems(result)
                setA(result.shifts)
              },
              (error) => {
                setIsLoaded(true)
                setError(error)
                alert(error)
              }
          )
    }, [])

    return (
        <main className="App">
            <Jumbotron>
                <Container fluid>
                    <form action="/supersonic" method="post">
                        <Row>
                            <Col sm="2" />
                            <Col sm="4"><h3>הכנת הסידור לשבוע: </h3></Col>        
                            <Col sm="5"><ChooseWeek defaultWeek={1} /></Col>
                            <Col sm="1" />
                        </Row>
                        <Row>
                            <Col sm="12"><Table /></Col>
                        </Row>
                        <Button variant="primary" type="submit">שגר!</Button>
                    </form>
                </Container>
            </Jumbotron>
            <Jumbotron>
                <Container fluid>
                    <Row>
                        <Col md="1" />
                        <Col md="5"><h3>הצג אילוץ של הבקר/ית: </h3></Col>
                        <Col md="5"><ChooseBakar title="הצג טבלת אילוצים של הבקר/ית: " isHeader={true}/></Col>
                        <Col md="1" />
                    </Row>
                    <Row>
                        {/*TODO: import relevant block-table from database*/}
                        {<BlocksTable name={items.name} week={items.date} blocks={Object.values(a)}/>}
                    </Row>
                </Container>
            </Jumbotron>
        </main>
    );
}

export default App;
