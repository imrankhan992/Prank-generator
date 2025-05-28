import React from 'react';
import SpeechBubble from './SpeechBubble';
import '../styles/components/Character.css';
import characterImage from '../assets/brawler_icon.png'
const Character = ({ message, messageType }) => {
  return (
    <div className="character-container">
      <div className="character-image-container">
        <img 
          src={characterImage} 
          alt="Brawl Stars Character" 
          className="character-image" 
        />
      </div>
      <SpeechBubble message={message} type={messageType} />
    </div>
  );
};

export default Character;