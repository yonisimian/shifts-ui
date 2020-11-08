import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function App(props) {
    const titles = ['תודה רבה', 'תודוש', 'אש עליך', 'יפה מאוד', 'כל הכבוד']
    const bodyText = 'הסידור הוגש בהצלחה'
    const buttonTexts = ['יאייייי', 'יאללה צא צא', 'הוגש אתה אומר?', 'יוני המלך', 'הבשר טעים יותר מלוח', 'פצצה']
    let title = titles[Math.floor(Math.random() * titles.length)] + '!'
    return (
        <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{textAlign: "right"}}>{bodyText}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose} autoFocus>
                    {buttonTexts[Math.floor(Math.random() * buttonTexts.length)]}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}


export default App;
