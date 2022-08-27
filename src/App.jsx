import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import ListContacts from "./components/ListContacts";
import { uid } from "uid";

function App() {
  const [contacs, setContacts] = useState([
    {
      id: 1,
      name: 'Example',
      telp: '089087654345'
    }
  ]);

  const [formData, setFormData] = useState({
    name: 'coba',
    telp: '123',
  })

  const handleChange = (e) => {
    let data = {...formData};
    data[e.target.name] = e.target.value;
    setFormData(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let data = [...contacs];

    data.push({id: uid(), name: formData.name, telp: formData.telp})
    setContacts(data)

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
        <ListContacts data={contacs}/>
      </div>
    </div>
  );
}

export default App;