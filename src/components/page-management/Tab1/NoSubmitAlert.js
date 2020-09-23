import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert'

function App(props) {
    const [showAlert, setShowAlert] = useState(props.showAlert)

    useEffect(() => {
        setShowAlert(props.showAlert)
    }, [props.showAlert])

    return (
        showAlert &&
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>אבוי! משמרת אחת או יותר נחסמו ע"י כל הבקרים :(</Alert.Heading>
            <p>
                <ul className='text-align-right' >
                    {props.bakarim}
                </ul>
            </p>
        </Alert>
    );
}


export default App;
