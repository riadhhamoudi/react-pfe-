import React from 'react';

const Onecontact = ({ feedbackDetail }) => {
  return (
    <div>
      <h4>Détails:</h4>
      <h2>{feedbackDetail.email}</h2>

            <p>{feedbackDetail.description}</p>
    </div>
  );
};

export default Onecontact;
