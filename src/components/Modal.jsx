import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg'


function Modal({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) {

    const [mensaje, setMensaje] = useState('');
    
    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [fecha, setFecha] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria);
            setId(gastoEditar.id);
            setFecha(gastoEditar.fecha);
          }
    }, [])

    const ocultarModal = () =>{  
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = e =>{
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('');
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn} 
                alt='Cerrar Modal'
                onClick={ocultarModal}
            />
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre</label>
                <input value={nombre} onChange={e => setNombre(e.target.value)} type="text" id="nombre" placeholder='Introduce el nombre del gasto'/>
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input value={cantidad} onChange={e => setCantidad(Number(e.target.value))} type="number" id="cantidad" placeholder='Introduce la cantidad'/>
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                <select value={categoria} onChange={e => setCategoria(e.target.value)} id="categoria">
                    <option disabled value="">-- Selecciona la categoría --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
        </form>
    </div>
  )
}

export default Modal