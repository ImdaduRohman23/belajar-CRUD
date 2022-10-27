import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListContacts from "./components/ListContacts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {

  return (
    <div className="app">
      <div className="app__input">
        <h1>Contact App</h1>
        <Form className="input__form">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>No Hp</Form.Label>
            <Form.Control type="number" placeholder="Enter your number" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <ListContacts />
      </div>
    </div>
  );
}

export default App;