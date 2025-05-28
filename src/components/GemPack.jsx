import React from 'react';
import '../styles/components/GemPack.css';
import image from "../assets/30.png"
const GemPack = ({ amount, price, onSelect, isFree = false }) => {
  return (
    <div className="gem-pack" onClick={onSelect}>
      <div className="gem-amount">{amount}</div>
      <div className="gem-image-container">
        <img 
          src={image} 
          alt={`${amount} Gems`} 
          className="gem-image" 
        />
      </div>
      <div className="gem-price-tag">
        <div className={`gem-price-label ${isFree ? 'free' : ''}`}>
          {isFree ? 'FREE' : ''}
        </div>
        <div className="gem-price-value">{price} €</div>
      </div>
    </div>
  );
};

export default GemPack;