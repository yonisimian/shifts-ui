import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert'

function App(props) {
    const [showAlert, setShowAlert] = useState(true)

    useEffect(() => {
        setShowAlert(true)
    }, [props.week])

    return (
        showAlert ? 
            props.bakarim.length > 0 ?
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>הבקרים הבאים עדיין לא הגישו משמרות לשבוע {props.week}:</Alert.Heading>
                <p>
                    <ul className='text-align-right' >
                        {props.bakarim}
                    </ul>
                </p>
            </Alert>
            :
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>הידד! כל הבקרים הגישו את המשמרות לשבוע {props.week} :)</Alert.Heading>
            </Alert>
        : ''
    );
}


export default App;
