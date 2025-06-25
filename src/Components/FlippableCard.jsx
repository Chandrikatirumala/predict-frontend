import React from 'react';
import './FlippableCard.css';

export default function FlippableCard({ label, name, meaning, image, flipped, onClick }) {
  return (
    <div className={`flippable-card ${flipped ? 'flipped' : ''}`} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={image} alt={name} className="card-image" />
          <div className="card-label">{label}</div>
        </div>
        <div className="card-back">
          <h3>{name}</h3>
          <p>{meaning}</p>
        </div>
      </div>
    </div>
  );
}
