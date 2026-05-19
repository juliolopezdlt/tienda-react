import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const registrarse = () => {
    fetch("https://api.escuelajs.co/api/v1/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //le dices q le vas a pasar un json
      body: JSON.stringify({
        //el json q le pasas
        name: nombre,
        email: email,
        password: password,
        avatar: "https://i.imgur.com/LDOO4Qs.jpg",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          alert("Usuario creado con éxito, ya puedes iniciar sesión");
          navigate("/login");
        } else {
          setError("Error al registrarse");
        }
      });
  };

  return (
    <div className="formulario">
      <h1>Registro</h1>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      ></input>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={registrarse}>Registrarse</button>
      {error && <p>{error}</p>}
    </div>
  );
}
export default Registro;
