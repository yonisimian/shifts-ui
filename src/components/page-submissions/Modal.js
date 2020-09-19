import React from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function App(props) {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            ביי
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            אחלה
          </Button>
        </Modal.Footer>
    </Modal>
  );
}


export default App;
