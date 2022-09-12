import React, { useState } from 'react';

export function FormValidator() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest('.popup__form').checkValidity());
  }

  function resetErrors() {
    setErrors({});
    setValues({});
    setIsValid(false);
  }
  return { values, errors, isValid, resetErrors, handleChange, setValues }
}
