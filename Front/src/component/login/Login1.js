import React, { useState } from 'react';
import '../login/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../logo/pngegg.png';

function Login() {
 const [isSignUp, setIsSignUp] = useState(false);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [errorMessage, setErrorMessage] = useState('');

 const navigate = useNavigate();

 const handleToggle = () => {
    setIsSignUp(!isSignUp);
 };

 const handleEmailChange = (e) => {
    setEmail(e.target.value);
 };

 const handlePasswordChange = (e) => {
    setPassword(e.target.value);
 };

 const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
 };

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('veuillez entrer votre email et MDP');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Format de l\'email invalide');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });
      const { token, profil } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_id', response.data.user_id);

      if (profil === 'fournisseur') {
        navigate("/liste_facture");
      } else if (profil === 'agent BOF') {
        navigate("/liste_factureAG");
      } else if (profil === 'admin') {
        navigate("/Fact_Admin");
      } else if (profil === 'responsable finance') {
        navigate("/Fact_res"); 
      } else {  
        setErrorMessage('Profil invalide');
      }
    } catch (error) {
      setErrorMessage('Adresse email ou mot de passe invalide');
    }
 };

 return (
    <div className='all'>
      <div className='titre_login'> 
        <h4>Office de Commande Numérique</h4>
        <h4>Bureau d'Ordre Numérique</h4>
        <h4>Direction Centrale des Finances</h4>
        <h4>Tunisie Telecom</h4>
      </div>
      <img className="logo-TT" loading="lazy" src={logo} width="15%" alt="Logo Tunisie Telecom" />
      <div className={`container ${isSignUp ? 'active' : ''}`}>
        <div className='form-container sign-up'>
          <form>
            <h1>Mot de passe oublié</h1>
            <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <button>Envoyer</button>
          </form> 
        </div>
        <div className='form-container sign-in'>
          <form onSubmit={handleSubmit}>
            <h1>Connectez-vous à votre compte</h1>
            <input type='email' placeholder='Email' value={email} onChange={handleEmailChange} />
            <input type='password' placeholder='Mot de passe' value={password} onChange={handlePasswordChange} />
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <button>Connexion</button>
          </form>
        </div>
        <div className='toggle-container'>
          <div className='toggle'>
            <div className="toggle-panel toggle-left">
              <h1 >Réinitialisez </h1>
              <h1>votre mot de passe!</h1>
              <p>Entrez votre adresse email pour </p>
              <p>réinitialiser votre mot de passe</p>
              <button className="hidden" onClick={handleToggle} id="login">Connexion</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Bienvenue!</h1>
              <p>Si vous avez oublié votre mot de passe, </p>
              <p>cliquez sur ce bouton</p>
              <button className="hidden" onClick={handleToggle} id="register">Mot de passe oublié</button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}

export default Login;
 