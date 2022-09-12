import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { FormValidator } from './FormValidator.js';

function AddPlacePopup(props) {
  const {values, isValid, errors, resetErrors, handleChange} = FormValidator({});

  useEffect(() => {
    resetErrors();
  }, [props.isOpen]);

  
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace(values);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name='addimage'
      title='Новое место'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDisabled={isValid}
    >
      <input 
        className={`popup__input ${errors.name ? 'popup__input_type_error' : ''}`}
        type="text" 
        name="name"
        id="input-title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-title-error">
        {isValid ? '' : errors.name}
      </span>
      <input 
        className={`popup__input ${errors.link ? 'popup__input_type_error' : ''}`} 
        type="url" 
        name="link" 
        id="input-link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__form-error" id="input-link-error">
        {isValid ? '' : errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;