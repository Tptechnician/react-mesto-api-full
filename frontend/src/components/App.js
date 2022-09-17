import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup.js';
import DeletePlacePopup from './DeletePlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ProtectedRoute from './ProtectedRoute.js';
import AddPlacePopup from './AddPlacePopup.js';
import InfoTooltip from './InfoTooltip.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.js';
import auth from '../utils/auth.js';
import api from '../utils/api.js';
import Header from './Header.js';
import Footer from './Footer.js';
import Login from './Login.js';
import Main from './Main.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setisInfoTooltipPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [jwt, setJwt] = React.useState('');
  console.log(jwt);

  const [isSuccessRegistration, setisSuccessRegistration] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  function handleEditInfoTooltipOpen() {
    setisInfoTooltipPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeletePopupOpen(true);
  }

  function closeAllPopups() {
    setisInfoTooltipPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  useEffect(() => {
    api.getUserData(jwt)
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards(cards.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id, jwt)
      .then(() => {
        setCards(cards.filter((currentCard) => currentCard._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data, jwt)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data, jwt)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.addCard(data, jwt)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegistration(data) {
    auth.register(data)
      .then(
        (data) => {
          setisSuccessRegistration(true);
          handleEditInfoTooltipOpen();
          history.push('/sign-in');
        },
        (err) => {
          console.log(err);
          setisSuccessRegistration(false);
          handleEditInfoTooltipOpen();
        })
  }

  function handleAuthorization(data) {
    setUserEmail(data.email);
    auth.authorize(data)
      .then(
        (data) => {
          localStorage.setItem('jwt', data.data._id);
          setCurrentUser(data.data);
          setLoggedIn(true);
          history.push('/');
        },
        (err) => {
          console.log(err);
        }
      )
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
      setJwt(jwt)
      auth.checkToken(jwt)
        .then(
          (data) => {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
          },
          (err) => {
            console.log(err);
          }
        )
  }

  function handleLoggedOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      handleCheckToken();
    }
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleCardClickDelete(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLoggedOut={handleLoggedOut}
        />
        <Switch>
          <Route path="/sign-up">
            <Register
              onSubmit={handleRegistration}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              onSubmit={handleAuthorization}
            />
          </Route>

          <ProtectedRoute
            expect path="/"
            loggedIn={loggedIn}
            component={Main}
            onDeletePlacePopup={handleDeleteCardClick}
            onCardClickDelete={handleCardClickDelete}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardDelete={handleCardDelete}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            cards={cards}
          />
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <DeletePlacePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={selectedCard}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccessRegistration={isSuccessRegistration}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
