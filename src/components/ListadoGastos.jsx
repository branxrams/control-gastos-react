import Gasto from "./Gasto"

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (
    <div className="listado-gastos contenedor">
        

        {filtro ? (
          <>
            <h2>{gastosFiltrados.length ? 'Gastos': 'No hay gastos en esta categoria'}</h2>
            {gastosFiltrados.map(gast => (
                <Gasto
                    key={gast.id}
                    gasto={gast}
                    setGastoEditar = {setGastoEditar}
                    eliminarGasto = {eliminarGasto}
                />
              ))}
          </>
          
        ) : (
          <>
          <h2>{gastos.length ? 'Gastos': 'No hay gastos aun'}</h2>
            {gastos.map(gast => (
              <Gasto
                  key={gast.id}
                  gasto={gast}
                  setGastoEditar = {setGastoEditar}
                  eliminarGasto = {eliminarGasto}
              />
            ))}
          </>

        )}
    </div>
  )
}

export default ListadoGastos