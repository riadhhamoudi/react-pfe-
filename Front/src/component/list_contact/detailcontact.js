import React, { useState } from 'react';
import './List_contact.css';
import Onecontact from './Onecontact';
import { MdOutlineMoreHoriz, MdEmail, MdDeleteForever } from "react-icons/md";
import axios from 'axios';

const Detailcontact = ({ feedbacks }) => {
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [detailedFeedback, setDetailedFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedbackDetail = async (id) => {
    if (selectedFeedbackId === id) {
      setSelectedFeedbackId(null);
      setDetailedFeedback(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3000/api/reclamation/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setSelectedFeedbackId(id);
      setDetailedFeedback(response.data);
    } catch (err) {
      console.error('Error fetching detail:', err);
      setError('Failed to load details');
      setSelectedFeedbackId(null);
      setDetailedFeedback(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette réclamation ?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:3000/api/del_rec/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const updatedFeedbacks = feedbacks.filter(feedback => feedback.id !== id);
        setSelectedFeedbackId(null);  // Clear selection
        setDetailedFeedback(null);  // Clear details view
        alert('Réclamation supprimée avec succès');
      } catch (err) {
        console.error('Error deleting feedback:', err);
        setError('Failed to delete feedback');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleContact = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <div key={feedback.id} className="feedback-item">
          <h3>{feedback.title}</h3>
          {selectedFeedbackId !== feedback.id && (
            <div>
              <button onClick={() => fetchFeedbackDetail(feedback.id)} className="detail-button">
                <MdOutlineMoreHoriz />
              </button>
              <button onClick={() => handleContact(feedback.email)} className="contact-button">
                <MdEmail />
              </button>
              <button onClick={() => handleDelete(feedback.id)} className="contact-button">
                <MdDeleteForever />
              </button>
            </div>
          )}
          {selectedFeedbackId === feedback.id && detailedFeedback && (
            <div>
              <Onecontact feedbackDetail={detailedFeedback} />
              <button onClick={() => setSelectedFeedbackId(null)} className="close-detail-button">
                Close
              </button>
            </div>
          )}
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Detailcontact;
