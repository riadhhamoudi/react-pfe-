import React, { useState } from 'react';
import axios from 'axios';
import './Change_pass.css';
import NavbarAg from '../navbar/Navbar_admin.js';
import { jwtDecode } from 'jwt-decode';

function Pass() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

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
            console.log('Passwords do not match!');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('No token found, please log in again.');
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

            console.log('Password updated successfully');
            alert(response.data.message);
        } catch (error) {
            console.error('Failed to update password', error);
            alert(error.response ? error.response.data.error : 'Internal Server Error');
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
                        <div className="info-container ">
                            <h2 className="info-title">Information Personnel</h2>
                            <p className="statistic">Direction: Riadh</p>
                            <p className="statistic">Responsabilité: Agent BOF</p>
                            <p className="statistic">Tel: 95111780</p>
                            <p className="statistic">Adresse: riadhhamoudi11@gmail.com</p>
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
                                <button className='BB' type="button">Ignorer</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Pass;
