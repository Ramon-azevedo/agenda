
import './App.css'

function App() {

  return (
    <div className='container'>
        <div className='bloco'>
          <h1>Agenda</h1>
          
          <form className='form'>
            <div className='addItem'>
              <h3>Adicionar item:</h3>
              <input type="text" name="" id=""
                placeholder='O que você vai fazer?'
              />
              <button type="submit"><i className="fa-thin fa-plus"></i></button>
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
            <div className="agn">
                <h3>Estou fazendo algo...</h3>
                <button className="finalizarTarefa">
                    <i className="fa-solid fa-check"></i>
                </button>
                <button className="editarTarefa">
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button className="removerTarefa">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
