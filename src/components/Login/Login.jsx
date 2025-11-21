import { useState } from "react";
import { Link } from "react-router-dom";
import "../../blocks/auth.css";


function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    handleLogin(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Entrar</h2>

      <form className="auth__form" onSubmit={onSubmit}>
        <input
          type="email"
          className="auth__input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="auth__input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth__button" type="submit">
          Entrar
        </button>
         <p className="auth__text">
        Ainda não é  membro? <Link to="/signup" className="auth__link">Inscreva-se aqui!</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;