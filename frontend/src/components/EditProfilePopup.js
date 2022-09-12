import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, isValid, errors, resetErrors, handleChange, setValues } = FormValidator({});

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser(values);
  }

  React.useEffect(() => {
    resetErrors();
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='profile'
      title='Редактировать профиль'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDisabled={isValid}
    >
      <input
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        type="text"
        value={values.name || ''}
        name="name"
        id="input-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-name-error">
        {isValid ? '' : errors.name}
      </span>
      <input
        className={`popup__input ${errors.about ? 'popup__input_type_error' : ''}`}
        type="text"
        value={values.about || ''}
        name="about"
        id="input-activity"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-activity-error">
        {isValid ? '' : errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;