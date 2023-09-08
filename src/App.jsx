import React, { useState } from 'react';
import {FiSearch} from "react-icons/fi";
import './style.css';
import api from './services/api';



function App() {
  const[input,setInput] = useState('')
  const [cep,setCep] = useState({});

  async function handleSearch(){
    //01310930/json/
     
    if(input === ''){
      alert(" Preencha algum endereço!:")
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }catch {
        alert("Ops erro ao buscar");
        setInput("")
    }
  }
  return (  
      <div className="container">
        <h1 className="title">Buscador de Endereços</h1>

        <div className="containerInput">
        <input 
        type="text"
        placeholder="Digite seu endereço..."
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
           <FiSearch size={25} color = "#FFF "/>
        </button>
      </div>
      

      {Object.keys(cep).length>0 && (
          <main className="main">
                <h2>Morada: {cep.cep}</h2>
      
                <spam>{cep.logadouro}</spam>
                <spam>  Complemento:{cep.complemento}</spam>
                <spam> Bairro:{cep.bairro}</spam>
                <spam>{cep.localidade}</spam>
           
       </main>
      )}
      
    </div>
  );
}
export default App;  
