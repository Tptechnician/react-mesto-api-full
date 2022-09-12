import React from 'react';
import Popup from './Popup.js';

import registrationIconFalse from '../images/registrationIconFalse.svg';
import registrationIconTrue from '../images/registrationIconTrue.svg';

function InfoTooltip(props) {
  return (
    <Popup
      name='infotooltip'
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <div className="popup__content popup__content_type_infotooltip">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        >
        </button>
        <img
          className='popup__icon'
          src={props.isSuccessRegistration ? registrationIconTrue : registrationIconFalse}
          alt={props.isSuccessRegistration ? 'иконка успешной регистрации' : 'иконка не успешной регистрации'}
        />
        <h3 className="popup__title popup__title_type_infotooltip">{props.isSuccessRegistration ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Пропробуйте ещё раз.'}</h3>
      </div>
    </Popup>
  )
}

export default InfoTooltip;