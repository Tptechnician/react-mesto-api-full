import React, { useEffect } from 'react';

function Popup(props) {
  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => { document.removeEventListener('keydown', handleEscClose); }
  }, [props.isOpen]);

  function handleClickClose(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  };

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      props.onClose();
    };
  }

  return (
    <div
      onClick={handleClickClose}
      className={`popup popup_type_${props.name} ${props.modification || ''} ${props.isOpen ? 'popup_opened' : ''}`}
    >
      {props.children}
    </div>
  );
}

export default Popup;
