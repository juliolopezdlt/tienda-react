import { useState } from "react";
import { useNavigate } from "react-router-dom";

//necesita setusuario para guardarlo
function Login({ setUsuario }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = () => {
    fetch("https://api.escuelajs.co/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        //manda los datos si responde con un access token guarda usuario y te manda a la pagina
        if (data.access_token) {
          setUsuario({ email: email, token: data.access_token });
          navigate("/");
        } else {
          //muestra error
          setError("Email o contraseña incorrectos");
        }
      });
  };

  return (
    <div className="formulario">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} //actualiza el estado al escribir
      ></input>
      <input
        type="password"
        placeholder="contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={iniciarSesion}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
}
export default Login;
