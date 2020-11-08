import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert'

function App(props) {
    const count = props.count
    const [showAlert, setShowAlert] = useState(count !== 0)

    useEffect(() => {
        setShowAlert(count !== 0)
    }, [props.count])

    return (
        showAlert &&
        <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>שים לב, יש {props.count} בקרים שעושים 8-8.</Alert.Heading>
        </Alert>
    );
}


export default App;
