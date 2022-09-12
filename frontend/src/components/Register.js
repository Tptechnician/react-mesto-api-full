import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form.js';
import { FormValidator } from './FormValidator.js';

function Register(props) {
  const { values, isValid, errors, resetErrors, handleChange } = FormValidator({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(values);
    resetErrors();
  }

  const linkAuthorization = (<p className='form__paragraph'>Уже зарегистрированы? <Link className='form__link' to="/sign-in">Войти</Link></p>)
  return (
    <Form
      name='register'
      title='Регистрация'
      buttonText='Зарегистрироваться'
      onSubmit={handleSubmit}
      isDisabled={isValid}
      linkAuthorization={linkAuthorization}
    >
      <input
        className={`popup__input ${errors.email ? 'popup__input_type_error' : ''} popup__input_type_authentication`}
        type="Email"
        value={values.email || ''}
        name="email"
        id="input-email"
        placeholder="Email"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-email-error">
        {isValid ? '' : errors.email}
      </span>
      <input
        className={`popup__input popup__input_type_authentication ${errors.password ? 'popup__input_type_error' : ''}`}
        type="password"
        value={values.password || ''}
        name="password"
        id="input-password"
        placeholder="Пароль"
        minLength="2"
        maxLength="20"
        required
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-password-error">
        {isValid ? '' : errors.password}
      </span>
    </Form>
  );
}

export default Register;