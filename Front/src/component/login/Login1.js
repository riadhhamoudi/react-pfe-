import React, { useState } from 'react';
import '../login/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Define navigate before using it

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });
      navigate("/dashfournisseur")
      const token = response.data.token;
      localStorage.setItem('token', token);
      
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className='all'>
      <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className='form-container sign-up'>
          <form>
            <h1>forgot password</h1>
            <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <button>send mail</button>
          </form>
        </div>
        <div className='form-container sign-in'>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange} />
            {errorMessage && <p>{errorMessage}</p>}
            <button>Sign In</button>
          </form>
        </div>
        <div className='toggle-container'>
          <div className='toggle'>
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
