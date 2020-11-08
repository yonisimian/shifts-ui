import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function App(props) {
    const titles = ['תודה רבה', 'תודוש', 'אש עליך', 'יפה מאוד', 'הצליח לך הפעם']
    const bodyText = 'המשמרות הוגשו בהצלחה'
    const buttonTexts = ['אחלה', 'מגניב', 'יש לי טחורים', 'ווהוווו', 'ביי', 'אסטה לה ווינדוס וויסטה']
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
