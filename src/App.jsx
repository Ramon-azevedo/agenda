
import { useEffect, useState } from 'react'
import { useRef } from 'react';
import './App.css'
import axios from 'axios';



function App() {

  const inputRef = useRef(null);

  const [itensGet, setItensGet] = useState(null);
  const [error, setError] = useState(null);
  const [itemAdd, setItemAdd] = useState("");
  const [itemPut, setItemPut] = useState(null);
  const [itemPutId, setItemPutId] = useState(null);

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
  }, []);

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
        setItensGet((prevItens) => [...prevItens, data]);
        setItemAdd("");
      })
      .catch((error) => {
        console.log("Erro ao criar item:", error);
      });
    }
    
  })

  const handleDeleteItem = (itemId) => {
      setItemPutId("");
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
        setItensGet((prevItens) => prevItens.filter((item) => item.id !== itemId));

      })
      .catch((error) => {
        console.log("Erro ao deletar item:", error);
      });
    
  };

  const handlePutItem = (itemId) =>  {

    if (!itemPut.trim()) {
      alert("O item não pode estar vazio.");
      return;
    }
    
    fetch(`http://localhost:8080/api/agenda/putAgenda/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: itemPut,
      }),
    })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Item editado com sucesso:", data);

      setItensGet((prevItens) =>
        prevItens.map((item) => (item.id === itemId ? data : item))
      );


        setItemPut("");
        setItemPutId(null);
    })
    .catch((error) => {
      console.log("Erro ao editar item:", error);
    });
  }

  const handleEditClick = (item) => {
    setItemPut(item.item);
    setItemPutId(item.id);
    inputRef.current.focus();
  }

  return (
    <div className='container'>
        <div className='bloco'>
          <h1>Agenda</h1>
          
          <form className='form'>
            <div className='addItem'>
              <h3>{itemPutId ? "Editar item:" :  "Adicionar item:"}</h3>
              <input
                type="text"
                placeholder='O que você vai fazer?'
                value={itemPutId ? itemPut : itemAdd}
                onChange={(e) => {
                  if (itemPutId) {
                    setItemPut(e.target.value);
                  } else {
                    setItemAdd(e.target.value);
                  }
                }}
                required
                ref={inputRef}

              />
              <button type="submit"
              onClick={(e) => {
                e.preventDefault();
                if (itemPutId) {
                  handlePutItem(itemPutId);
                } else {
                  handleAddItem();
                }
              }}
              
              
              >
                <i className="fa-thin fa-plus"></i></button>
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
                      <button className="editarTarefa" value={item1.id} onClick={() => handleEditClick(item1)}>
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
