import { Link } from "react-router-dom";

//RECIBE TRES PROPS, LOS QUE SE LE PASAN POR APP
function Navbar({ carrito, usuario, setUsuario }) {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/carrito">Carrito ({carrito.length})</Link>

      {usuario ? (
        //SI USUARIO EXISTE MUESTRA CERRAR SESION
        //VA CAMBIANDO EL VALOR DE SET USUARIO SEGUN LO Q PULSE
        <button onClick={() => setUsuario(null)}>Cerrar sesión</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/registro">Registro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
