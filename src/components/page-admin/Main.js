import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import ChooseBakar from '../general/chooseBakar'
import BakarDetails from './Bakar'

function App() {
    const [bakarim, setBakarim] = useState([''])
    const [details, setDetails] = useState(<BakarDetails/>)
    const handleChange = (e) => {
        if (e.target.value === 'addNew') {
            setDetails(<BakarDetails />)
        }
        else {
            let theChosenOne = bakarim.filter(v => v.full_name === e.target.value)[0]
            setDetails(<BakarDetails bakar={theChosenOne} />)
        }
    }

    useEffect(() => {
        fetch('/getemployees', {method: 'GET'})
        .then(res => res.json())
        .then(data => {
            setBakarim(data['all_emps'].map(value => {
                return {
                    full_name: value.full_name,
                    short_name: value.short_name
                }})
            )
        })
        .catch(error => alert(error))
    }, [])

    return (
        <main>
            <Container fluid>
                <Row>
                    <Col md="1" />
                    <Col md="5"><h3>הצג את פרטי הבקר/ית: </h3></Col>
                    <Col md="5"><ChooseBakar 
                                    title="הצג את פרטי הבקר/ית: "
                                    isHeader
                                    addNew
                                    onChange={handleChange} /></Col>
                    <Col md="1" />
                </Row>
                <br></br>
                <Row className='text-align-right'>
                    <Col md="2" />
                    <Col md='7'>{details}</Col>
                </Row>
                {/*bakarim.filter(v => v.full_name === 'גיא שמיליאן')[0]*/}
            </Container>
        </main>
    );
}

export default App;
