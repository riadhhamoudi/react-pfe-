import React, { useState } from 'react';
import axios from 'axios';
import '../add_user/Add_user.css';
import Navbar1 from '../navbar/Navbar_Ag';

function Add() {
  const [name, setFirstName] = useState('');
  const [secondary_name, setLastName] = useState('');
  const [telephone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [profil, setProfil] = useState('fournisseur');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setPasswordMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordMatch(event.target.value === newPassword);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse email valide.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Le mot de passe doit avoir au moins 8 caractères.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Prepare the data to be sent
    const userData = {
      name,
      secondary_name,
      telephone,
      address,
      email,
      profil,
      password: newPassword
    };

    try {
      const response = await axios.post('http://localhost:3000/api/admin', userData);
      console.log('User added:', response.data);
      alert('User added successfully!');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error);
      alert('Failed to add user.');
    }
  };

  return ( 
    <div>
      <Navbar1/>
      <div className="containers rounded bg-white mt-5 mb-5" style={{ marginLeft: "10%" }}>
        <div className="row">
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Ajouter un utilisateur</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nom</label>
                  <input type="text" className="form-control" placeholder="nom" onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Prénom</label>
                  <input type="text" className="form-control" placeholder="prénom" onChange={e => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">N.téléphone</label>
                  <input type="text" className="form-control" placeholder="N.téléphone" onChange={e => setPhone(e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Adresse</label>
                  <input type="text" className="form-control" placeholder="adresse" onChange={e => setAddress(e.target.value)} />
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Email</label>
                  <input type="text" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                  {emailError && <p className="error-message">{emailError}</p>}
                </div>
                <div className="col-md-6">
                  <label className="labels">Profil</label>
                  <select id="objet" name="objet" required onChange={e => setProfil(e.target.value)}>
                    <option defaultValue={'fournisseur'}>fournisseur</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-1 vertical-separator"></div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="col-md-12">
                <label className="labels">Nouveau mot de passe</label>
                <input type="password" className="form-control" placeholder="nouveau mot de passe" onChange={handleNewPasswordChange} />
              </div>
              <div className="col-md-12">
                <label className="labels">Retapez le nouveau mot de passe</label>
                <input type="password" className="form-control" placeholder="Retapez le nouveau mot de passe" onChange={handleConfirmPasswordChange} />
                {passwordError && <p className="password-error">{passwordError}</p>}
                {!passwordMatch && <p className="password-error">Les mots de passe ne correspondent pas.</p>}
              </div>
              <button className="btn btn-primary profile-button" type="button" onClick={handleSubmit}>Enregistrer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
