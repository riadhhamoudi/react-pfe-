import React, { useState } from 'react';
import "../login/Login.css";
//import Navbar from '../navbar/Navbar';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setErrorMessage('Le mot de passe doit comporter au moins 8 caractères.');
    } else {
      setErrorMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length >= 8) {
      // Envoyer l'e-mail et le mot de passe pour la validation
      console.log('E-mail:', email, 'Mot de passe:', password);
    }
  };

  return (
    <div>
      
      <div className="App">
        <div className="container">
          <div className="form-box">
            <div className="header-form"></div>
            <div className="body-form">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <input type="email" className="form-control" id="email" value={email} onChange={handleEmailChange} placeholder="enter your email address" required />
                </div>
                <div className="input-group">
                  <input type="password" className="form-control" id='password' value={password} placeholder="Password" onChange={handlePasswordChange} required />
                </div>
                <div className='btncenteeer'>
                  <button type="submit" className="btn">LOGIN</button>
                </div>
                <div className="message">
                  <div><input type="checkbox" /> Remember ME</div>
                  <div><a href="#">Forgot your password</a></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;