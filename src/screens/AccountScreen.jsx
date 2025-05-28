import React from 'react';
import Panel from '../components/Panel';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import '../styles/screens/AccountScreen.css';
import accountProfile from "../assets/profile.png"
const AccountScreen = ({ playerInfo, progress, onContinue }) => {
  return (
    <Panel title="Account">
      <div className="account-container">
        <div className="player-profile">
          <div className="player-avatar-container">
            <img 
              src={accountProfile}
              alt="Player Avatar" 
              className="player-avatar" 
            />
            <div className="player-id">{playerInfo.id}</div>
          </div>
          
          <div className="player-info">
            <div className="player-name">{playerInfo.name}</div>
            <div className="player-level">
              <div className="level-badge">1</div>
            </div>
          </div>
        </div>
        
        <div className="stats-container">
          <div className="stat-row">
            <div className="stat-label">Trophies</div>
            <div className="stat-value">
              <img 
                src="https://brawlerhub.com/generator/img/icon_trophy_medium.png" 
                alt="Trophy" 
                className="stat-icon" 
              />
              <span>{playerInfo.trophies}</span>
            </div>
          </div>
          
          <div className="stat-row">
            <div className="stat-label">3v3 Victories</div>
            <div className="stat-value">
              <img 
                src="https://brawlerhub.com/generator/img/3v3.png" 
                alt="3v3" 
                className="stat-icon" 
              />
              <span>{playerInfo.victories3v3}</span>
            </div>
          </div>
          
          <div className="stat-row">
            <div className="stat-label">Solo Victories</div>
            <div className="stat-value">
              <img 
                src="https://brawlerhub.com/generator/img/Showdown.png" 
                alt="Solo" 
                className="stat-icon" 
              />
              <span>{playerInfo.victoriesSolo}</span>
            </div>
          </div>
          
          <div className="stat-row">
            <div className="stat-label">Duo Victories</div>
            <div className="stat-value">
              <img 
                src="https://brawlerhub.com/generator/img/Duo-Showdown.png" 
                alt="Duo" 
                className="stat-icon" 
              />
              <span>{playerInfo.victoriesDuo}</span>
            </div>
          </div>
        </div>
        
        <ProgressBar progress={progress} text="Transfer in progress" />
        
        <Button 
          text="Continue" 
          onClick={onContinue}
          type="primary"
          // disabled={progress < 100}
        />
      </div>
    </Panel>
  );
};

export default AccountScreen;