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
  const [edit, setEdit] = useState({id: null, status: false});

  const handleSave = (e) => {
    e.preventDefault();
    let data = [...contacs];

    if(edit.status) {
      data.forEach(item => {
        if(item.id === edit.id) {
          item.name = name;
          item.no = no;
        }
      })
    } else {
      data.push({id: uid(), name: name, no: no});
    }
    setContacs(data);
    setEdit({id: null, status: false});
    setName('');
    setNo('');
  }

  const handleEdit = (id) => {
    let data = [...contacs];
    let cariData = data.find(i => i.id === id);
    setName(cariData.name);
    setNo(cariData.no);
    setEdit({id: id, status: true});
  };

  const handleDelete = (id) => {
    let data = [...contacs];
    let cariData = data.filter(i => i.id != id);
    setContacs(cariData)
  }

  return (
    <div className="app">
      <div className="app__input">
        <h1>Contact App</h1>
        <Form className="input__form" onSubmit={handleSave}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>No Hp</Form.Label>
            <Form.Control type="text" placeholder="Enter your number" value={no} onChange={(e) => setNo(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
        <ListContacts contacs={contacs} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>
    </div>
  );
}

export default App;