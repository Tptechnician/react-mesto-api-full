import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import headerLogo from '../images/header-logo.svg';

function Header(props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function toggleMenu() {
    setIsOpenMenu(!isOpenMenu)
  }

  function clickLoggedOut() {
    setIsOpenMenu(false);
    props.onLoggedOut();
  }

  return (
    <header className={!isOpenMenu ? 'header' : 'header header_menu-open'}>
      <div className='header__container-main'>
        <img className="header__logo" src={headerLogo} alt="лого" />
        <button className={`${!isOpenMenu ? 'header__button-menu' : `header__button-menu header__button-menu_open`} ${!props.loggedIn ? 'header__button-menu_loggedout' : ''}`}
          onClick={toggleMenu}
        />
      </div>
      <Switch>
        <Route path="/sign-in">
          <div className={`header__container ${!props.loggedIn ? 'header__container_loggedout' : ''}`}>
            <nav>
              <Link
                className='header__link'
                to="/sign-up"
              >
                Регистрация
              </Link>
            </nav>
          </div>
        </Route>
        <Route path="/sign-up">
          <div className={`header__container ${!props.loggedIn ? 'header__container_loggedout' : ''}`}>
            <nav>
              <Link
                className='header__link'
                to="/sign-in"
              >
                Войти
              </Link>
            </nav>
          </div>
        </Route>
        <Route exact path="/">
          <div className={!isOpenMenu ? 'header__container' : 'header__container header__container_open'}>
            <p className='header__email'>{props.userEmail}</p>
            <button
              className='header__button-out'
              onClick={clickLoggedOut}
            >
              Выйти
            </button>
          </div>
        </Route>
      </Switch>


    </header>
  );
}

export default Header;
