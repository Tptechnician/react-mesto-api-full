import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';

function EditAvatarPopup(props) {
  const { values, isValid, errors, resetErrors, handleChange } = FormValidator({});

  useEffect(() => {
    resetErrors();
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name='avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      isLoading={props.isLoading}
      isDisabled={isValid}
    >
      <input
        className={`popup__input ${errors.avatar ? 'popup__input_type_error' : ''}`}
        type="url"
        name="avatar"
        id="input-avatar"
        placeholder="Ссылка на картинку"
        required
        value={values.avatar || ''}
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-avatar-error">
        {isValid ? '' : errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;