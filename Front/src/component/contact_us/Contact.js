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
    console.log('User ID from localStorage:', userId);

    if (!userId || !token) {
      console.error('Authentication details not found');
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
      console.log('Reclamation created:', response.data);
      // Optionally reset form or give user feedback
    } catch (error) {
      console.error('Failed to create reclamation:', error.response.data);
    }
  }
  
  return (
    <div>
      <Navbar1/>
      <div className="contact-form">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label><br />
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /><br />
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          /><br />
          <label htmlFor="description">Message:</label><br />
          <textarea
            id="description"
            name="description"
            placeholder="Enter your message"
            value={description}
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
