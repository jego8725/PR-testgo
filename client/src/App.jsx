import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'


function App() {
  const [dataUser, setDataUser] = useState({
    name: '',
    lastName: '',
    documentation: '',
    email: '',
    phone: ''
  });

  const onChangeField = (element)=> {
    let updatedValue = {};
    updatedValue[element.name] = element.value;
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
          body: JSON.stringify(dataUser)
      });

      const data = await response.json();
      console.log(data);
  }

  return (
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
  )
}

export default App
