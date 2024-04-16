import React, { useState } from 'react';
import "../login/Login.css";
import { useNavigate } from 'react-router-dom'



function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

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
      console.log('E-mail:', email, 'Mot de passe:', password);
      // You can add your logic here to send the email and password for validation
    }
  };
  
  const navigate=useNavigate()
  return (
    <div className='all'>
      <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className="form-container sign-up">
          <form>
            <h1>forgot password</h1>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <button>send mail</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            {errorMessage && <p>{errorMessage}</p>}
            <button onClick={(e)=>(navigate('/formulaire'))} >Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>reset password!</h1>
              <p>Enter your email to reset your password</p>
              <button className="hidden" onClick={handleToggle} id="login">Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello!</h1>
              <p>if you forgot your password press this button</p>
              <button className="hidden" onClick={handleToggle} id="register">forgot password</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;