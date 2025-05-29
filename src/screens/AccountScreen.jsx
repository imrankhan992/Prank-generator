import React, { useState, useEffect } from 'react';
import Panel from '../components/Panel';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import '../styles/screens/AccountScreen.css';
import accountProfile from "../assets/profile.png";

const AccountScreen = ({ progress, onContinue }) => {
  const [playerInfo, setPlayerInfo] = useState({
    id: '#000000',
    name: 'Player',
    trophies: 0,
    victories3v3: 0,
    victoriesSolo: 0,
    victoriesDuo: 0,
    level: 1
  });

  const [isLoading, setIsLoading] = useState(false);
const [searchIcon, setsearchIcon] = useState(true)
  useEffect(() => {
    // Get player data from localStorage when component mounts
    const playerData = JSON.parse(localStorage.getItem('playerData'));
    
    if (playerData) {
      setPlayerInfo({
        id: playerData.tag || '#000000',
        name: playerData.name || 'Player',
        trophies: playerData.trophies || 0,
        victories3v3: playerData['3vs3Victories'] || 0,
        victoriesSolo: playerData.soloVictories || 0,
        victoriesDuo: playerData.duoVictories || 0,
        level: playerData.expLevel || 1
      });
    }
  }, []);

  useEffect(() => {
    // Automatically continue when progress reaches 100%

   if(progress>50){
      setsearchIcon(false)
    
   }
    if (progress <= 100) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // onContinue();
      }, 1000); // Small delay for better UX
      
      return () => clearTimeout(timer);
    }
  }, [progress, onContinue]);

  return (
    <Panel title="Account">
    {
      searchIcon &&   <div className='search-container'>
        <img src="https://brawlerhub.com/generator/img/icon_search.png" alt="" />
      </div>
    }
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
              <div className="level-badge">{playerInfo.level}</div>
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
        
        <ProgressBar progress={progress} text={progress < 100 ? "Transfer in progress..." : "Transfer complete!"} />
        
        {/* <Button 
          text={isLoading ? "Processing" : "Continue"} 
          // onClick={onContinue}
          type="primary"
          // disabled={progress < 100 || isLoading}
        /> */}
      </div>
    </Panel>
  );
};

export default AccountScreen;