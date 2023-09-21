import { useState, useEffect } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal';
import { generarId } from './helpers';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/filtros';

function App() {

  
    const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
    );
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
    
    const [modal, setModal] = useState(false);
    const [animarModal, setAnimarModal] = useState(false);
    
    const [gastos, setGastos] = useState(
      [...JSON.parse(localStorage.getItem('gastos')) ?? []]
      );

    const [gastoEditar, setGastoEditar] = useState({});

    const [filtro, setFiltro] = useState('');
    const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(()=> {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(()=> {
        setAnimarModal(true);
      }, 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])      
  }, [gastos])

  useEffect(() => {  
    if (filtro) {
      //Filtrar gastos
      const gastosFiltrados = gastos.filter(gastoEffect => gastoEffect.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])
  
  
  
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])
  

  const hanldeNuevoGasto = () => {
    setModal(true);
    setGastoEditar({});

    setTimeout(()=> {
      setAnimarModal(true);
    }, 500)
  }

  const eliminarGasto = (id) => {
    const gastosActualizado = gastos.filter(gastoState => gastoState.id !== id );

    setGastos(gastosActualizado);
  }

  const guardarGasto = gasto => {

    if (gasto.id) {
      // Actualiza gasto
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);

      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }


    setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 500);
  } 

  return (
    <>
      <div className={modal ? 'fijar' : undefined}>
        <Header
          gastos = {gastos}
          setGastos = {setGastos}
          presupuesto = {presupuesto}
          setPresupuesto = {setPresupuesto}
          isValidPresupuesto = {isValidPresupuesto}
          setIsValidPresupuesto = {setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros
                filtro = {filtro}
                setFiltro = {setFiltro}
              />
              <ListadoGastos
                gastos = {gastos}
                setGastoEditar = {setGastoEditar}
                eliminarGasto = {eliminarGasto}
                filtro = {filtro}
                gastosFiltrados = {gastosFiltrados}
              />
            </main>
            <div className="nuevo-gasto">
              <img 
                src={IconoNuevoGasto} 
                alt="Icono nuevo gasto" 
                onClick={hanldeNuevoGasto}
                />
            </div>
          </>
        )}

        {modal && (
          <Modal
            setModal = {setModal}
            animarModal = {animarModal}
            setAnimarModal = {setAnimarModal}
            guardarGasto = {guardarGasto}
            gastoEditar = {gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        ) }
      </div>
    </>
  )
}

export default App