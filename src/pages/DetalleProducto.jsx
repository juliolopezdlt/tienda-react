import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DetalleProducto({ agregarAlCarrito }) {
  //empieza en null pq no le hemos pedido nada a la api
  const [producto, setProducto] = useState(null);
  const { id } = useParams(); //lee el id de la URL, sin esto no sabemos q producto mostrar
  const navigate = useNavigate(); //para poder volver atras

  useEffect(() => {
    //Llama a la API con el id concreto
    fetch("https://api.escuelajs.co/api/v1/products/" + id)
      .then((res) => res.json())
      .then((data) => setProducto(data));
  }, [id]); //el corchete con id significa, repite esto si el id cambia

  if (!producto) return <p>Cargando..</p>; //mientras carga

  return (
    <div className="detalleProducto">
      <button onClick={() => navigate("/")}>Volver</button>
      <h1>{producto.title}</h1>

      <img //es un array [0], porque cada producto puede tener varias imagenes, parra coger la primera
        src={producto.images[0]}
        alt={producto.title}
        width="300"
      ></img>
      <p //el .description y todo eso sale del objeto que devuelve la api
      >
        {producto.description}
      </p>
      <p>Precio: {producto.price}</p>
      <p>Categoria: {producto.category.name}</p>
      <button onClick={() => agregarAlCarrito(producto)}>
        Añadir al carrito
      </button>
    </div>
  );
}

export default DetalleProducto;
