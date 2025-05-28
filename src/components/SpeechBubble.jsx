import React, { useState, useEffect } from 'react';
import '../styles/components/SpeechBubble.css';

const SpeechBubble = ({ message, type }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    setIsTyping(true);
    setDisplayText('');
    
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayText((prev) => prev + message.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [message]);
  
  return (
    <div className={`speech-bubble ${type || ''}`}>
      <div className="speech-content">
        {displayText}
        {isTyping && <span className="typing-cursor">|</span>}
      </div>
      <div className="speech-pointer"></div>
    </div>
  );
};

export default SpeechBubble;