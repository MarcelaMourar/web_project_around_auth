import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main.jsx"
import Footer from "../Footer/Footer";
import api from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "../../components/InfoTooltip/InfoTooltip.jsx";


function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
   const [cards, setCards] = useState([]);
   const [ tooltipStatus, setTooltipStatus] = useState (null);

   
useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    auth
      .checkToken(token)
      .then((user) => {
        setLoggedIn(true);
        setCurrentUser(user.data);
        navigate("/");
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);



   useEffect(() => {
    if (!loggedIn) return;

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData.reverse());
      })
      .catch((err) =>
        console.error("Erro ao carregar dados iniciais:", err)
      );
  }, [loggedIn]);
 
  async function handleCardLike(card) {
    try {
      const newCard = await api.changeLikeCardStatus(card._id, !card.isLiked);
      setCards((state) =>
        state.map((c) => (c._id === card._id ? newCard : c))
      );
    } catch (error) {
      console.error("Erro ao curtir/descurtir o card:", error);
    }
  }

  
  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Erro ao excluir o card:", error);
    }
  }

   
   async function handleAddPlaceSubmit(data) {
    try {
      const newCard = await api.createCard(data);
      setCards ([newCard, ...cards]);
      handleClosePopup();
      } catch (err) {
        console.error("Erro ao adicionar card:", err);
      }
  };


  const handleOpenPopup = (popupData) => setPopup(popupData);
  const handleClosePopup = () => setPopup(null);

   const handleUpdateUser = (data) => {
    (async () => {
      try {
        const newData = await api.setUserInfo(data);
        setCurrentUser(newData);
        handleClosePopup();
      } catch (error) {
        console.error(error);
      }
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      try {
        const newData = await api.setUserAvatar(data);
        setCurrentUser(newData);
        handleClosePopup();
      } catch (error) {
        console.log(error);
      }
    })();
  };


function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(() => setTooltipStatus(false));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setTooltipStatus(true);
        navigate("/signin");
      })
      .catch(() => setTooltipStatus(false));
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }
  
 return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
      }}
    >
      <Header loggedIn={loggedIn} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main
                onOpenPopup={handleOpenPopup}
                onClosePopup={handleClosePopup}
                popup={popup}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
              />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/signin"
          element={<Login handleLogin={handleLogin} />}
        />

        <Route
          path="/signup"
          element={<Register handleRegister={handleRegister} />}
        />

        <Route
          path="*"
          element={
            loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
          }
        />
      </Routes>

      <InfoTooltip status={tooltipStatus}
      onClose={() => setTooltipStatus(null)} />
    </CurrentUserContext.Provider>
  );
}

export default App;