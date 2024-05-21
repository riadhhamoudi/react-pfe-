import React, { useState } from 'react';
import Navbar1 from '../navbar/NavbarF.js';
import './Contact.css';
import axios from 'axios';

const Form = () => {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('user_id');  // Retrieve the user ID from local storage
    const token = localStorage.getItem('token');     // Retrieve the token from local storage
    console.log('ID utilisateur de localStorage :', userId);

    if (!userId || !token) {
      console.error('Détails d’authentification introuvables');
      return; // Early return if user ID or token is not found
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/reclamation', {
        user_id: userId,
        title,
        description,
        email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        } 
      });
      console.log('Récupération créée :', response.data);
      alert(response.data.message);
    } catch (error) {
      console.error('Échec de la création de la récupération :', error.response.data);
    }
  }
  
  return ( 
    <div>
      <Navbar1/>
      <div className="contact-form">
        <h2>déposer une réclamation</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">sujet:</label><br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Entrez votre titre"
            value={title}
            required

            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <label htmlFor="email">Addresse Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Entrez votre adresse e-mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <label htmlFor="description">description:</label><br />
          <textarea
            id="description"
            name="description"
            placeholder="Entrez votre message"
            value={description}
            required

            onChange={(e) => setDescription(e.target.value)}
          /><br />

          <button className='BB_C'>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24" 
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>envoyer</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
