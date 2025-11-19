import { useState } from "react";
import "../../blocks/auth.css";

function Register ({ handleRegister }) {
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    function onSubmit (e) {
        e.preventDefault();
        handleRegister(email, password);
    }

return (
    <section className="auth">
      <h2 className="auth__title">Inscrever-se</h2>

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
         Inscrever-se
        </button>
       <p className="auth__text">
       Já é um membro? <Link to="/signin" className="auth__link">Faça o login aqui!</Link>
        </p>
      </form>
      
    </section>
  );
}

export default Register;