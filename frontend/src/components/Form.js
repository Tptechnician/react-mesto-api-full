import React from 'react';

function Form(props) {
  return (
    <div className="popup__content popup__content_type_authentication">
      <h3 className="popup__title popup__title_type_authentication">{props.title}</h3>
      <form
        className="popup__form form"
        name={`formPopup${props.name}`}
        noValidate
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button className={`popup__save ${!props.isDisabled ? 'popup__save_no-active' : ''} popup__save_type_authentication`} type="submit" disabled={!props.isDisabled}>
          {props.buttonText}
        </button>
        {props.linkAuthorization}
      </form>
    </div>
  );
}

export default Form;