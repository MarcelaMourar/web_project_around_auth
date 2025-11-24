import { useContext } from "react";
import Popup from "../Popup/Popup.jsx";
import NewCard from "../NewCard/NewCard.jsx";
import EditProfile from "../EditProfile/EditProfile.jsx";
import EditAvatar from "../EditAvatar/EditAvatar.jsx";
import caneta from "../../images/caneta.png";
import vector from "../../images/Vector(1).png";
import Card from "../Cards/Card.jsx"
import RemoveCard from "../RemoveCard/RemoveCard.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
   onOpenPopup,
  onClosePopup,
  popup,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  cards,
   }) {
  const { currentUser } = useContext(CurrentUserContext); 
 const newCardPopup = { title: "Novo Card", children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} /> };
  const editProfilePopup = { title: "Editar Perfil", children: <EditProfile /> };
  const editAvatarPopup = { title: "Alterar Avatar", children: <EditAvatar /> };
const removeCardPopup = (card) => ({
  title: "",
   className: "popup__container popup__container_delete",
  children: (
    <RemoveCard
      onConfirm={() => onCardDelete(card)}
      onClose={onClosePopup}
    />
  ),
});


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="profile__avatar"
          />
          <img
            src={caneta}
            alt="Editar o avatar"
            className="profile__avatar-icon"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <span className="profile__name">
            {currentUser?.name || "Jacques Cousteau"}
          </span>
          <span className="profile__title">{currentUser?.about}</span>
        </div>

        <button
          className="profile__edit-button"
          onClick={() => onOpenPopup(editProfilePopup)}
        >
          <img src={caneta} alt="Editar perfil" className="profile__edit-caneta" />
        </button>

        <button
          className="profile__action-button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img src={vector} alt="Adicionar novo card" className="profile__action-vector" />
        </button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onOpenPopup={onOpenPopup}
              onDeleteCard={onCardDelete}
               removeCardPopup={removeCardPopup}
              onCardLike={onCardLike}
              currentUserId={currentUser._id}
            />
          ))}
        </ul>
      </section>
  
      {popup && (
  <Popup
    onClose={onClosePopup}
    title={popup.title}
    type={popup.type}
    className={popup.className}
  >
    {popup.children}
  </Popup>
)}

    </main>
  );
}