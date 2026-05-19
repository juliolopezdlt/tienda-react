import { useNavigate } from "react-router-dom";

function Carrito({ carrito, eliminarDelCarrito, setCarrito }) {
  const navigate = useNavigate();

  //recibe el id del producto y la cantidad
  const cambiarCantidad = (id, cantidad) => {
    //si es menos que uno elimina
    if (cantidad < 1) {
      eliminarDelCarrito(id);
    } else {
      //recorre el carrito, encuentra el producto por id, cambia la cantidad y actualiza
      const nuevo = carrito.map((p) => {
        if (p.id === id) {
          p.cantidad = cantidad;
        }
        return p;
      });
      //actualiza
      setCarrito(nuevo);
    }
  };
  //recorre el array, va sumando precio x cantidad por cada producto
  //acc es una variable que se inventa el reuce
  //el 0 es el valor inicial
  //acc es el acumulador
  const total = carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0);

  const finalizarPedido = () => {
    alert("pedido realizado con exito");
    setCarrito([]);
    navigate("/");
  };

  //si el carrito esta vacio
  if (carrito.length === 0) return <p>El carrito esta vacio</p>;

  return (
    <div className="vistaCarrito">
      <h1>Carrito</h1>
      {carrito.map((producto) => (
        <div key={producto.id} className="itemCarrito">
          <img
            src={producto.images[0]}
            alt={producto.title}
            onError={(e) => (e.target.src = "https://placehold.co/80x80")}
          />
          <div>
            <h3>{producto.title}</h3>
            <p>{producto.price} €</p>
          </div>
          <button
            onClick={() => cambiarCantidad(producto.id, producto.cantidad - 1)}
          >
            -
          </button>
          <span>{producto.cantidad}</span>
          <button
            onClick={() => cambiarCantidad(producto.id, producto.cantidad + 1)}
          >
            +
          </button>
          <button onClick={() => eliminarDelCarrito(producto.id)}>
            Eliminar
          </button>
        </div>
      ))}
      <p className="totalCarrito">Total: {total} €</p>
      <button className="botonFinalizar" onClick={finalizarPedido}>
        Finalizar pedido
      </button>
    </div>
  );
}

export default Carrito;
