import React from 'react';
import './Authorization.css';

const Authorization = () => {
  return (
    <div className="authorization">
      <form className='autor-form'>
        <label>
          e-mail: <input type="email" name="name" />
        </label>
        <label>
          Password: <input type="password" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Authorization;