import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect } from 'react';
import { useSyncExternalStore } from 'react';


function App() {
  const [arrUser, setArrUser] = useState([]);
  const [dataUser, setDataUser] = useState({
    name: '',
    lastName: '',
    documentation: 0,
    email: '',
    phone: 0
  });

  useEffect(()=> {
      loadUsers();
  });

  const loadUsers = async ()=> {
      const response = await fetch('/users');
      const data = await response.json();
      setArrUser(data.users);
  }

  const onChangeField = (element)=> {
    let updatedValue = {};
    var valueIns = element.name === 'documentation' || element.name === 'phone' ? parseInt(element.value) : element.value;
    updatedValue[element.name] = valueIns;
    setDataUser(dataUser => ({
      ...dataUser,
      ...updatedValue
    }));

    console.log(dataUser)
  }

  const  handleSubmit = async (e)=> {
      e.preventDefault();
      const response = await fetch('/users', {
          method: 'POST',
          body: JSON.stringify(dataUser),
          headers: {
            "Content-Type": "application/json"
          }
      });

      const data = await response.json();
      loadUsers();
  }

  return (
    <>
      <div className='container-main'>
        <form onSubmit={handleSubmit}>
          <label>Formulario guardar usuario</label>
          <input type="name" placeholder="Coloca tu nombre" name="name" onChange={(e)=> onChangeField(e.target)}/>
          <input type="name" placeholder="Coloca tu apellido" name="lastName" onChange={(e)=> onChangeField(e.target)}/>
          <input type="number" placeholder="Coloca tu número de identificación" name="documentation" onChange={(e)=> onChangeField(e.target)}/>
          <input type="email" placeholder="Coloca tu correo" name="email" onChange={(e)=> onChangeField(e.target)}/>
          <input type="number" placeholder="Coloca tu teléfono" name="phone" onChange={(e)=> onChangeField(e.target)}/>

          <button>Guardar</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>APELLIDO</th>
              <th>DOCUMENTO</th>
              <th>CORREO ELECTRÓNICO</th>
              <th>TELÉFONO</th>
            </tr>
          </thead>
          <tbody>
            {
              arrUser.map(user => {
                return (
                  <tr key={user._id}>
                    <td key={user._id} >{user._id}</td>
                    <td key={user.name}>{user.name}</td>
                    <td key={user.lastName}>{user.lastName}</td>
                    <td key={user.email}>{user.email}</td>
                    <td key={user.phone}>{user.phone}</td>
                  </tr>                  
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
