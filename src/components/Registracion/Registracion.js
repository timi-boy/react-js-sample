import React from 'react';
import './Registracion.css';

const Registrations = () => {
  return (
    <div className="registrations">
      <h1>Вход</h1>
      <h2>Авторизация</h2>
      <form className='autor-form'>
        <label>
          e-mail: <input type="email" name="name" />
        </label>
        <label>
          Password: <input type="password" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h2>Регистрация</h2>
      <form className='autor-form'>
        <label>
          Name: <input type="text" name="name" />
        </label>
        <label>
          e-mail: <input type="email" name="name" />
        </label>
        <label>
          Password: <input type="password" name="name" />
        </label>
        <label>
          Confirm Password: <input type="password" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Registrations;