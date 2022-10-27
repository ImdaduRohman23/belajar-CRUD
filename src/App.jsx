import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ListContacts from "./components/ListContacts";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { uid } from "uid";
import swal from 'sweetalert';
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [contacs, setContacs] = useState([]);
  const [name, setName] = useState('');
  const [no, setNo] = useState('');
  const [edit, setEdit] = useState({id: null, status: false});

  useEffect(() => {
    axios.get('http://localhost:3000/contacts')
      .then(res => setContacs(res.data))
  }, [])

  const handleSave = (e) => {
    e.preventDefault();
    let data = [...contacs];

    if(edit.status) {
      data.forEach(item => {
        if(item.id === edit.id) {
          item.name = name;
          item.no = no;
        }

        axios.put(`http://localhost:3000/contacts/${edit.id}`, {
          name: name,
          no: no
        })
      })
    } else {
      let newContacts = {id: uid(), name: name, no: no};
      data.push(newContacts);
      axios.post('http://localhost:3000/contacts', newContacts)
    }
    setContacs(data);
    swal("Data berhasil ditambahkan!", "", "success");
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
    axios.delete(`http://localhost:3000/contacts/${id}`)
    setContacs(cariData);
    swal({
      title: "Data berhasil dihapus!",
      icon: "warning",
    });
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
            <Form.Label>No Telp.</Form.Label>
            <Form.Control type="text" placeholder="Enter your number" value={no} onChange={(e) => setNo(e.target.value)} />
          </Form.Group>
          {
            !edit.status ? 
            <Button variant="primary" type="submit">Save</Button> : <Button variant="warning" type="submit">Ok</Button>
          }

        </Form>
        <ListContacts contacs={contacs} handleEdit={handleEdit} handleDelete={handleDelete}/>
      </div>

    </div>
  );
}

export default App;