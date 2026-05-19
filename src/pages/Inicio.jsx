import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//se le pasa la funcion q le hemos pasado por App
//AgregarCarrito
function Inicio({ agregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  //PARA saber desde que producto cargar el siguiente bloque
  const [offset, setOffset] = useState(0);
  //booleano para mostrar cargando mientras carga la api
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  //aaqui es donde se carga la api completa
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/categories")
      .then((res) => res.json())
      //el <=5 es para que cargue solo las 5 oficiales, porque cualquiera puede crear categorias y aparecerian muchas
      .then((data) => setCategorias(data.filter((cat) => cat.id <= 5))); //para filtrar las 5 categorias oficiales, no las de todos los usuarios
    cargarProductos(0, null);
    //el array vacio es para que solo se ejecute una vez al cargar la pagina, si no seria un bucle infinito
  }, []);

  //el ofset es para cargar mas, va cargando de 10 en 10, los añade a los q ya habia con concat
  const cargarProductos = (currentOffset, categoriaId) => {
    setCargando(true);
    let url = "";
    if (categoriaId) {
      //si hay categoria seleccionada filtramos para que solo muestre los de esa categoria
      url = `https://api.escuelajs.co/api/v1/categories/${categoriaId}/products?limit=10&offset=${currentOffset}`;
    } else {
      //para cargar mas, va cargando de 10 en 10
      url = `https://api.escuelajs.co/api/v1/products?limit=10&offset=${currentOffset}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //AQUI ES DONDE SE VAN INCREMENTANDO LOS PRODUCTO
        //EL OFFSET EMPIEZA DE 0 A 9 PRODUCTOS
        if (currentOffset === 0) {
          setProductos(data);
        } else {
          //SI LE DAMOS A CARGAR MAS VA CONCATENANDO
          setProductos(productos.concat(data));
        }
        setOffset(currentOffset + 10);
        setCargando(false);
      });
  };

  const seleccionarCategoria = (id) => {
    //guarda que categoria has elegido
    setCategoriaSeleccionada(id);
    //resetea el offset a 0 pq empiezas de 0 con esa categoria
    setOffset(0);

    cargarProductos(0, id);
  };

  const verTodos = () => {
    //igual q categoria pero al reves, quita la categoria y pone null

    setCategoriaSeleccionada(null);
    setOffset(0);
    cargarProductos(0, null);
  };

  return (
    <div>
      <h1>Productos</h1>

      <div className="listaCategorias">
        <button onClick={verTodos}>Todos</button>
        {categorias.map((cat) => (
          <button key={cat.id} onClick={() => seleccionarCategoria(cat.id)}>
            {cat.name}
          </button>
        ))}
      </div>
      <div className="listaProductos">
        {productos.map((producto) => (
          //se recorre el array de productos y por cada uno pinta una tarjeta
          //el key es obligatorio para que sepa cual es cada elemento
          <div key={producto.id} className="tarjetaProducto">
            <img
              //el replace es para limpiar la URL de las imagenes porque la API las devuelve con cosas raras
              src={producto.images[0].replace(/[\[\]"]/g, "")}
              alt={producto.title}
              width="200"
            />{" "}
            <h3>{producto.title}</h3>
            <p>{producto.price} €</p>
            <button
              onClick={() =>
                navigate(
                  //EL NAVIGATE PARA NAVEGAR A LA PAGINA DETALLE PRODUCTO
                  "/producto/" + producto.id,
                )
              }
            >
              Ver detalle
            </button>
            <button onClick={() => agregarAlCarrito(producto)}>
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      {cargando && <p>Cargando...</p>}
      <button
        className="botonCargarMas"
        onClick={() => cargarProductos(offset, categoriaSeleccionada)}
      >
        Cargar más
      </button>
    </div>
  );
}

export default Inicio;
