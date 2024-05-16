import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar1 from '../navbar/Navbar_Ag';
import './Edit.css';

function Editoneuser() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profil: '',
    telephone: '',
    secondary_name: '',
    address: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://localhost:3000/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUserData(response.data);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      alert('Error fetching user data');
    });
  }, [id]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem('token');

    e.preventDefault();
    axios.put(`http://localhost:3000/api/user/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}` 
      }
    })
    .then(response => {
      alert('User updated successfully');
      window.location.href = '/User';
    })
    .catch(error => {
      console.error('Failed to update user:', error);
      alert('Failed to update user');
    });
  };

  return (
    <div className="container_edit1">
      <Navbar1 />
      
      <h1 style={{ padding: "1%", marginLeft: "-40%" }}>modification d'utilisation</h1>
      
      <form className="form_edit1" onSubmit={handleSubmit} >
     
        <label htmlFor="name">Nom</label>
        <input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="input-field"  />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} className="input-field"  />

        <label htmlFor="profil">Profil</label>
        <input type="text" id="profil" name="profil" value={userData.profil} onChange={handleChange} className="input-field"  />


        <label htmlFor="telephone">Téléphone</label>
        <input type="text" id="telephone" name="telephone" value={userData.telephone} onChange={handleChange} className="input-field"  />

        <label htmlFor="secondary_name">Prénom</label>
        <input type="text" id="secondary_name" name="secondary_name" value={userData.secondary_name} onChange={handleChange}  className="input-field" />

        <label htmlFor="address">Adresse</label>
        <input type="text" id="address" name="address" value={userData.address} onChange={handleChange}  className="input-field" />

        <button type="submit" className="button_edit1">enregistrer</button>
      
      </form>
    </div>
  );
}

export default Editoneuser;
