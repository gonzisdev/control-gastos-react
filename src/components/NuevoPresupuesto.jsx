import { useState } from "react";
import Mensaje from "./Mensaje";

function NuevoPresupuesto({presupuesto, setPresupuesto, setIsValidPresupuesto}) {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) =>{
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('El presupuesto no es válido')
            return;
        } 
        setMensaje('');
        setIsValidPresupuesto(true);
    }
  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>¿Cúal es tu presupuesto?</label>
                <input onChange={e => setPresupuesto(Number(e.target.value))} className="nuevo-presupuesto" type="number" placeholder="Introduce una cantidad" value={presupuesto}/>
            </div>
            <input type="submit" value="Añadir" />
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto