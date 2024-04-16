import React, { useState } from 'react';
import './Change_pass.css';

function Pass() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === newPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if passwords match before submitting
    if (newPassword === confirmPassword) {
      // Submit form or perform desired action
      console.log('Passwords match!');
    } else {
      // Handle case where passwords do not match
      console.log('Passwords do not match!');
    }
  };

  return (
    <div>
      <div className='title1'>
    <h1> change your personnel information </h1>
    </div>
    <div className='Form'>
      <p className="info-note">Mettre à jour vos informations personnelles</p>


      <form className='info_personnel'>
        <div className="info-card">
          <div className="avatar-container">
            <img src="avatar.jpg" alt="Avatar" className="avatar" />
          </div>
          <div className="info-container">
            <h2 className="info-title">Information Personnel</h2>
            <p className="info-item">
              
             
            </p>
            <p className="info-item">
              <p className="statistic">direction: riadh</p>
            </p>
            <p className="info-item">
             <p className="statistic">responsabilité: agent BOF</p>
            </p>
            <p className="info-item">
            <p className="statistic">tel: 95111780</p>
            </p>
            <p className="info-item">
             <p className="statistic">adresse: riadhhamoudi11@gmail.com </p>


             {/* <p className="statistic">Last name: {users[0].lastname}</p> */}
            </p>
          </div>
        </div>
      </form>

      <div className="password-change-form">
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">mot de passe actuel:</label>
          

          <input
            type="password"
            id="old-passsword"
            name="old-password"
       
            required
          />

          <label htmlFor="new-password">Nouveau mot de passe:</label>  

          <input
            type="password"
            id="new-password"
            name="new-password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
          />

          <label htmlFor="confirm-password">Confirmer le nouveau mot de passe:</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />

          {!passwordMatch && <p className="password-error">Les mots de passe ne correspondent pas.</p>}

          <div className="button-group">
            <button type="submit">Enregistrer</button>
            <button type="button">Ignorer</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Pass;