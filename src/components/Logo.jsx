import React from 'react';
import '../styles/components/Logo.css';
import logoImage from "../assets/logo_outlined_noBG.png"
const Logo = () => {
  return (
    <div className="logo-container">
      <img 
        src={logoImage} 
        alt="Brawl Stars Logo" 
        className="logo" 
      />
    </div>
  );
};

export default Logo;