import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function DeletePlacePopup(props) {


  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSubmit(props.card);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      isDisabled={true}
      name='delete'
      title='Вы уверены?'
      buttonText='Да'
    />
  );
}

export default DeletePlacePopup;