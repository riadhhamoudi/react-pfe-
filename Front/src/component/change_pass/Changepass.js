import React, { useState } from 'react';
import './Change_pass.css';
import NavbarAg from '../navbar/NavbarF.js';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Pass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isVisible, setIsVisible] = useState(false); // State to toggle visibility

    const handleOldPasswordChange = (event) => {
        setOldPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordMatch(event.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === newPassword);
    };

    const handleSubmit = async (event) => { 
        event.preventDefault();
        if (newPassword !== confirmPassword) {
            console.log('Les mots de passe ne correspondent pas !');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Aucun jeton trouvé, veuillez vous reconnecter.');
            return;
        }

        try { 
            const decodedToken = jwtDecode(token);
            const email = decodedToken.email;

            const response = await axios.post('http://localhost:3000/api/change-password', {
                email: email,
                currentPassword: oldPassword,
                newPassword: newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Mot de passe mis à jour avec succès');
            alert(response.data.message);
        } catch (error) {
            console.error('Échec de la mise à jour du mot de passe', error);
            alert(error.response ? error.response.data.error : 'Erreur de serveur interne');
        }
    };


    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className="allP"> 
            <NavbarAg />
            <div className='pos1'>
                <h1 style={{ padding: "1%", marginLeft: "10%" }}>Mettre à jour vos informations personnelles</h1>
                <div className='Form1'> 
                    <div className="info-card">
                        <div className="avatar-container">
                            <img src="avatar.jpg" alt="Avatar" className="avatar" />
                        </div>
                        <div className="info-container">
                            <h2 className="info-title">Information Personnel</h2>
                            <label>Direction:</label>
                            <input
                                type="text"
                                className="statistic"
                                placeholder="Direction centrale des finances"
                              defaultValue={'Direction centrale des finances'}
                              readOnly
                            />
                            <label>Responsabilité:</label>
                            <input
                                type="text"
                                className="statistic"
                                placeholder="Responsabilité"
                                readOnly
                               
                            />
                            <label>Téléphone:</label>
                            <input
                                type="text"
                                className="statistic"
                                placeholder="numéro de Téléphone"
                              
                            />
                            <label>Adresse:</label>
                            <input
                                type="text"
                                className="statistic"
                                placeholder="Enter your email"
                                
                            />
                        </div>
                    </div>
                    <button onClick={toggleVisibility} className='BB '>Changer le mot de passe</button>
                </div>
                {isVisible && (
                    <div className="password-change-form">
                        <form onSubmit={handleSubmit} className='chang_form'>
                            <label htmlFor="old-password">Mot de passe actuel:</label>
                            <input type="password" id="old-password" className='old-password' name="old-password" value={oldPassword} onChange={handleOldPasswordChange} required />
                            <label htmlFor="new-password">Nouveau mot de passe:</label>
                            <input type="password" id="new-password" className='new-password' name="new-password" value={newPassword} onChange={handleNewPasswordChange} required />
                            <label htmlFor="confirm-password">Confirmer le nouveau mot de passe :</label>
                            <input type="password" id="confirm-password" className='confirm-password' name="confirm-password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                            {!passwordMatch && <p className="password-error">Les mots de passe ne correspondent pas.</p>}
                            <div className="button-group1">
                                <button className='BS' type="submit">Enregistrer</button>
                               
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pass;

