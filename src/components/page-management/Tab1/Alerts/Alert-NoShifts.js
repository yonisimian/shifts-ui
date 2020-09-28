import React, {useState, useEffect} from 'react';
import Alert from 'react-bootstrap/Alert'
import {weekToString} from '../../../../scripts'

function App(props) {
    const [showAlert, setShowAlert] = useState(true)
    const week = weekToString(props.week)

    useEffect(() => {
        setShowAlert(true)
    }, [props.week])

    return (
        showAlert ? 
            props.bakarim.length > 0 ?
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>הבקרים הבאים טרם הגישו משמרות לשבוע {week}:</Alert.Heading>
                <p>
                    <ul style={{textAlign: "right"}} >
                        {props.bakarim}
                    </ul>
                </p>
            </Alert>
            :
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                <Alert.Heading>הידד! כל הבקרים הגישו משמרות לשבוע {week} :)</Alert.Heading>
            </Alert>
        : ''
    );
}


export default App;
