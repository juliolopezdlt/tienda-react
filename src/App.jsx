import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Inicio from "./pages/Inicio.jsx";
import DetalleProducto from "./pages/DetalleProducto.jsx";
import Carrito from "./pages/Carrito.jsx";
import Login from "./pages/Login.jsx";
import Registro from "./pages/Registro.jsx";
import { useState, useEffect } from "react";

function App() {
  //empieza leyengo el localstorage por si ya tenemos algo guardado,
  //sino vacío
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });

  //empieza en null, no hay nadi logueado
  const [usuario, setUsuario] = useState(null);

  //cada vez q el carrito guarda algo, este lo guarda en localstorage asi no pierdes nada
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  //comprueba si existe el producto en el carrito, si existe suma 1, sino lo pone en nuevo
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((p) => p.id === producto.id);
    if (existe) {
      const nuevo = carrito.map((p) => {
        if (p.id === producto.id) {
          p.cantidad = p.cantidad + 1;
        }
        return p;
      });
      setCarrito(nuevo);
    } else {
      //si no existe, lo pone como 1 y lo suma al carrito
      producto.cantidad = 1;
      setCarrito(carrito.concat(producto));
    }
  };

  //elimina un elemento del carrito, hace filter y devuelve el array sin ese producto
  const eliminarDelCarrito = (id) => {
    const nuevo = carrito.filter((p) => p.id !== id);
    setCarrito(nuevo);
  };

  return (
    //el Navbar le pasa los props de carrito y usuario y la funcion para cambiar el usuario
    //SETUSUARIO Y SETCARRITO SE PASAN POR USESTATE
    <BrowserRouter>
      <Navbar carrito={carrito} usuario={usuario} setUsuario={setUsuario} />
      <Routes>
        <Route
          //CADA RUTA ES UNA PAGINA
          path="/"
          //le pasa la funcion agregarAlCarrito a inicio para que puedan añadir cosas al carrito
          element={<Inicio agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          //EL :ID ES DINAMICO, ES SEGUN EN EL PPRODUCTO QUE ESTEMOS METIDOS
          path="/producto/:id"
          element={<DetalleProducto agregarAlCarrito={agregarAlCarrito} />}
        />
        <Route
          path="/carrito"
          element={
            //le pasa a carrito las dos funciones para eliminar y agregar producto
            <Carrito
              carrito={carrito}
              eliminarDelCarrito={eliminarDelCarrito}
              setCarrito={setCarrito}
            />
          }
        />
        <Route path="/login" element={<Login setUsuario={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
