import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import ListContacts from "./components/ListContacts";
import { uid } from "uid";
import axios from "axios";

function App() {

  //1. Membuat state untuk di kirim ke List
  const [contacs, setContacts] = useState([
    // {
    //   id: 1,
    //   name: 'Example',
    //   telp: '089087654345'
    // }
  ]);

  useEffect(() => {
    axios.get('http://localhost:3000/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.log(err))
  },[])
  //4. Membuat state untuk Update
  const [isUpdate, setIsUpdate] = useState({id: null, status: false})

  //2. Menangkap inputan form
  const [formData, setFormData] = useState({
    name: '',
    telp: '',
  })

  const handleChange = (e) => {
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data)
  }

  const handleEdit = (id) => {
    let data = [...contacs];
    let foundData = data.find((contac) => contac.id === id);
    setFormData({ name: foundData.name, telp: foundData.telp});
    setIsUpdate({id: id, status: true})
  }

  //3. Masukan inputan ke state contacts
  const handleSubmit = (e) => {
    e.preventDefault()
    let data = [...contacs];

    if(formData.name === '') {
      return false
    } 
    if(formData.telp === '') {
      return false
    }

    if(isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
        }
      })

      axios.put(`http://localhost:3000/contacts/${isUpdate.id}`, {
        name: formData.name,
        telp: formData.telp
      })
        .then(res => alert('berhasil mengupdate data'))
    } else {
      let newData = {id: uid(), name: formData.name, telp: formData.telp};
      data.push(newData) //manual
      axios.post('http://localhost:3000/contacts', newData)
        .then(res => alert('Data berhasil ditambahkan'))
    }
    setContacts(data)
    setFormData({name: '', telp: ''})
    setIsUpdate({id: null, status: false})
  }



  const handleDel = (id) => {
    let data = [...contacs];
    let filterData = data.filter((constact) => constact.id != id )

    axios.delete(`http://localhost:3000/contacts/${id}`)
      .then(res => alert('data berhasil dihapus'))
    setContacts(filterData);
  }



  return (
    <div className="App">
      <div className="fixed-top bg-white pb-3 mx-auto" style={{ width: 400 }}>
        <h1 className="px-3 py-3 font-weight-bold">My Contact List</h1>
        <form onSubmit={handleSubmit} className="px-3 py-4">
          <div className="form-group">
            <label htmlFor="">Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.name}
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="">No. Telp</label>
            <input
              type="text"
              className="form-control"
              name="telp" 
              value={formData.telp}
              onChange={handleChange}

            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-100 mt-3">
              Save
            </button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 350 }}>
        <ListContacts handleDel={handleDel} handleEdit={handleEdit} data={contacs}/>
      </div>
    </div>
  );
}

export default App;