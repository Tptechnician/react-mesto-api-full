import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-button"
            type="button"
            onClick={props.onEditAvatar}
          >
          </button>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          <div className="profile__list">
            <div className="profile__list-line">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                onClick={props.onEditProfile}
              >
              </button>
            </div>
            <p className="profile__activity">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        >
        </button>
      </section>

      <section className="elements">
        <ul className="elements__cards">
          {props.cards.map((card) =>
          (<Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            onDeletePlacePopup={props.onDeletePlacePopup}
            onCardClickDelete={props.onCardClickDelete}
          />)
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;
