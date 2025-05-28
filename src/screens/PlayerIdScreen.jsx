import React, { useState } from 'react';
import Panel from '../components/Panel';
import Button from '../components/Button';
import '../styles/screens/PlayerIdScreen.css';
import close from "../assets/close.png";

const PlayerIdScreen = ({ onSubmit, setShowDialog }) => {
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async () => {
    setError('');

    if (!playerId.trim()) {
      return setError('Please enter your Player ID');
    }

    if (!playerId.startsWith('#')) {
      return setError('Player ID must start with #');
    }

    const cleanTag = playerId.replace('#', '');
    if (!/^[0-9A-Za-z]{3,15}$/.test(cleanTag)) {
      return setError('Invalid Player ID (3–15 alphanumeric characters after #)');
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/brawl-api?tag=${encodeURIComponent(playerId)}`,
        {
          headers: { 'Accept': 'application/json' }
        }
      );

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.reason || data.message || 'Failed to fetch player data');
      }

      if (!data.tag || !data.name) {
        throw new Error('Invalid player data received');
      }

      onSubmit({
        tag: data.tag,
        name: data.name,
        icon: data.icon?.id || null,
        trophies: data.trophies,
        club: data.club?.name || 'No club',
        brawlers: data.brawlers || []
      });

      setShowDialog(false);

    } catch (err) {
      console.error('Player fetch error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="panel-dialog-playeid">
      <div className="panel-header-playerid">
        <h2 className="panel-title">Player ID</h2>
        <img 
          src={close} 
          alt="Close dialog" 
          className='close-imager' 
          onClick={() => setShowDialog(false)} 
        />
      </div>
     
      <div className="panel-content">
        <div className="player-id-container">
          <div className="input-label">Enter Player ID:</div>
          <div className="input-container">
            <input
              type="text"
              className="player-id-input"
              value={playerId}
              onChange={(e) => {
                const value = e.target.value;
                if (value && !value.startsWith('#')) {
                  setPlayerId('#' + value.replace(/#/g, ''));
                } else {
                  setPlayerId(value);
                }
                setError('');
              }}
              placeholder="#ABCD123"
              maxLength={16}
            />
            <div className="info-icon" title="Your Brawl Stars player tag starting with #">i</div>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <Button 
            text={isLoading ? "Loading..." : "Continue"} 
            onClick={handleSubmit}
            type="primary"
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerIdScreen;
