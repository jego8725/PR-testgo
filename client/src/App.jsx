import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Hello world</h1>
      <button onClick={async ()=>{
          const response = await fetch('http://localhost:3000/users');
          const data = await response.json();
          console.log(data);
      }
      }>Obtener datos</button>
    </div>
  )
}

export default App
