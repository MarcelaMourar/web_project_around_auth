import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Header ({ loggedIn, onLogout }) {
    return(
        <header className="header">
        <img
          src={logo}
          alt="imagem da logo"
          className="header__logo"
        />
        <div className="header__auth">
        {loggedIn ? (
          <button className="header__logout" onClick={onLogout}>
            Sair
          </button>
        ) : (
          <Link className="header__link" to="/signin">
            Faça o login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;