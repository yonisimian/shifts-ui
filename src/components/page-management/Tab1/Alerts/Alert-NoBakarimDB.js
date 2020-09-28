import React, {useState} from 'react';
import Alert from 'react-bootstrap/Alert'
import { routeURLs as url } from '../../../../config'

function App() {
    const [showAlert, setShowAlert] = useState(true)

    return (
        showAlert &&
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
            <Alert.Heading>אופס! נראה כי אין בכלל בקרים בדאטאבייס :O</Alert.Heading>
            <h6>נסו <Alert.Link href={url.adminPage}>להכניס בקרים למאגר</Alert.Link> על מנת שתוכלו להכין משמרות.</h6>
        </Alert>
    );
}


export default App;
