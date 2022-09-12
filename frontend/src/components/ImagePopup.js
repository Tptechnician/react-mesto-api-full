import React from 'react';
import Popup from './Popup.js';

function ImagePopup(props) {
  return (
    <Popup
      name='viewimage'
      isOpen={props.isOpen}
      onClose={props.onClose}
      modification='popup_type_background'
    >
      <div className="popup__wrapper">
        <img 
          className="popup__image"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          className="popup__close popup__close-viewimage"
          type="button"
          onClick={props.onClose}
        >
        </button>
        <h3 className="popup__title popup__title_viewimage">{props.card.name}</h3>
      </div>
    </Popup>
  );
}

export default ImagePopup;
