
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';



function App() {

  const [itensGet, setItensGet] = useState(null);
  const [error, setError] = useState(null);
  const [itemAdd, setItemAdd] = useState(null);
  const [itemPut, setItemPut] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/agenda/getAgenda")
      .then((response) => {
        setItensGet(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar agenda de itens:", error);
        setError("Erro ao carregar a Agenda.");
      })
  })

  const handleAddItem = (() => {
    if (itemAdd == null) {
      return window.alert("Erro. Digite um item.");
    } else {
      fetch("http://localhost:8080/api/agenda/postAgenda", {
        method: "POST" ,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item: itemAdd,
        }),
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item criado com sucesso:", data);
        setItemAdd("");
      })
      .catch((error) => {
        console.log("Erro ao criar item:", error);
      });
    }
    
  })

  const handleDeleteItem = (itemId) => {
      fetch(`http://localhost:8080/api/agenda/deleteAgenda/${itemId}`,  {
        method: "DELETE",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Item Deletado com sucesso:", data);
      })
      .catch((error) => {
        console.log("Erro ao deletar item:", error);
      });
    
  };

  const handlePutItem = (itemId2, item) =>  {
    setItemPut(item);
    fetch(`http://localhost:8080/api/agenda/putAgenda/${itemId2}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: itemPut,
      }),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item editado com sucesso:", data);
      setItemPut("");
    })
    .catch((error) => {
      console.log("Erro ao editar item:", error);
    });
  }

  return (
    <div className='container'>
        <div className='bloco'>
          <h1>Agenda</h1>
          
          <form className='form'>
            <div className='addItem'>
              <h3>Adicionar item:</h3>
              <input type="text" name="" id=""
                placeholder='O que você vai fazer?'
                value={itemAdd}
                onChange={(e) => setItemAdd(e.target.value)}
                required

              />
              <button type="submit" onClick={handleAddItem}><i className="fa-thin fa-plus"></i></button>
            </div>

            <div className='filt'>
              <h3>Filtrar:</h3>
              <select name="filtrar" id="filtrar">
                <option value="Todos">Todos</option>
                <option value="Feitos">Feitos</option>
                <option value="A fazer">A fazer</option>
              </select>
            </div>
          </form>

          <div className="allAgenda">
            {error && <p>{error}</p>}
            {itensGet ? (
              <div className="allAgenda">
                {itensGet.map(item1 => (
                  <div key={item1.id} className="agn">
                    <h3>{item1.item}</h3>
                    <div className='btn'>
                      <button className="finalizarTarefa">
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button className="editarTarefa" value={item1.id} onClick={() => handlePutItem(item1.id, item1.item)}>
                        <i className="fa-solid fa-pen"></i>
                      </button>
                      <button className="removerTarefa" value={item1.id} onClick={() => handleDeleteItem(item1.id)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                  ))}
              </div>
                ) : ( <p>Nenhum dado carregado.</p> )}
          </div>
        </div>
    </div>
  )
}

export default App
