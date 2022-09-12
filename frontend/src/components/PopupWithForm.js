import React from 'react';
import Popup from './Popup.js';

function PopupWithForm(props) {
  return (
    <Popup
      name={props.name}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        >
        </button>
        <h3 className="popup__title">{props.title}</h3>
        <form
          className="popup__form"
          name={`formPopup${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className={`popup__save ${!props.isDisabled ? 'popup__save_no-active' : ''}`} type="submit" disabled={!props.isDisabled}>
            {props.isLoading ? 'Сохранение...' : props.buttonText}
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default PopupWithForm;
