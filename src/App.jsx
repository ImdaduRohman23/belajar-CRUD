import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListContacts from "./components/ListContacts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [contacs, setContacs] = useState([]);
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const handleSave = (e) => {
    e.preventDefault();
    let data = [...contacs];
    data.push({id: uid(), name: name, no: no})
    setContacs(data)
  }

  return (
    <div className="app">
      <div className="app__input">
        <h1>Contact App</h1>
        <Form className="input__form" onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>No Hp</Form.Label>
            <Form.Control type="text" placeholder="Enter your number"  onChange={(e) => setNo(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <ListContacts contacs={contacs}/>
      </div>
    </div>
  );
}

export default App;