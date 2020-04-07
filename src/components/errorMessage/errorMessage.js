import React from 'react';
import './errorMessage.css';

const ErrorMessage = () => (
  <div className="errorBlock">
    <img src={process.env.PUBLIC_URL + '/img/says-Daenerys.jpg'} alt="error"></img>
    <span className="errorText">Something goes wrong</span>
  </div>
)

export default ErrorMessage;