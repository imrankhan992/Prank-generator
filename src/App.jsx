import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import Character from './components/Character';
import GemPacksScreen from './screens/GemPacksScreen';
import PlayerIdScreen from './screens/PlayerIdScreen';
import AccountScreen from './screens/AccountScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import './styles/App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('gemPacks');
  const [selectedGemPack, setSelectedGemPack] = useState(null);
  const [playerId, setPlayerId] = useState('');
  const [playerInfo, setPlayerInfo] = useState(null);
  const [transferProgress, setTransferProgress] = useState(0);
  const [selectedGem, setselectedGem] = useState(null)
  const [characterMessage, setCharacterMessage] = useState(
    '  . Welcome Brawler! 🎮 Today\'s Special: FREE Gems Event! Choose your gem package 💎!'
  );
  const [messageType, setMessageType] = useState('');
  
  useEffect(() => {
      let timeout;

    // Update character message based on current screen
    switch(currentScreen) {
      case 'gemPacks':
        setCharacterMessage('. Welcome Brawler! 🎮 Today\'s Special: FREE Gems Event! Choose your gem package 💎!');
        setMessageType('');
        break;
      case 'playerId':
        setCharacterMessage(' Awesome choice! Enter your Player ID to continue');
        setMessageType('');
        break;
    case 'account':
      setCharacterMessage(" Let me connect your account first! 🧠🔌");
      setMessageType('');
      
      // Change the message after 3 seconds
      timeout = setTimeout(() => {
        setCharacterMessage(" Awesome kiyee! 🎉 Let me add gems to your account. Please wait a moment ⏳💎");
        setMessageType('');
      }, 4000);
      break;
      case 'confirmation':
        setCharacterMessage(' CONGRATULATIONS kiyee, 💎 Your gems are ready to claim!');
        setMessageType('success');
        break;
       
      default:
        setCharacterMessage(' Welcome to Brawl Stars!');
    }
  }, [currentScreen]);
  
  // Simulate account data loading and progress
  useEffect(() => {
    if (currentScreen === 'account' ) {
      const interval = setInterval(() => {
        setTransferProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 5) + 1;
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [currentScreen, playerInfo]);
  
  const handleSelectPack = (pack) => {
    setSelectedGemPack(pack);
    setCurrentScreen('playerId');
  };
  
  const handleSubmitPlayerId = (id) => {
    setPlayerId(id);
    
    // Simulate player data
    setPlayerInfo({
      id: id,
      name: 'kiyee',
      trophies: 7,
      victories3v3: 0,
      victoriesSolo: 0,
      victoriesDuo: 0
    });
    
    setCurrentScreen('account');
  };
  
  const handleContinueFromAccount = () => {
    setCurrentScreen('confirmation');
  };
  
  const handleFinish = () => {
    // Reset and start over
    setCurrentScreen('gemPacks');
    setSelectedGemPack(null);
    setPlayerId('');
    setPlayerInfo(null);
    setTransferProgress(0);
  };
  
  // Render current screen based on state
  const renderCurrentScreen = () => {
    switch(currentScreen) {
      case 'gemPacks':
        return <GemPacksScreen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} setselectedGem={setselectedGem} selectedGem={selectedGem} onSelectPack={handleSelectPack} handleSubmitPlayerId={handleSubmitPlayerId} />;
      
      case 'account':
        return (
          <AccountScreen 
            playerInfo={playerInfo} 
            progress={transferProgress} 
            onContinue={handleContinueFromAccount}
            currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}
          />
        );
      case 'confirmation':
        return (
          <ConfirmationScreen 
            gemPack={selectedGemPack} 
            playerInfo={playerInfo}
            onFinish={handleFinish}
            selectedGem={selectedGem}
            currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}
            setCharacterMessage={setCharacterMessage}
            setMessageType={setMessageType}
          />
        );
      default:
        return <GemPacksScreen currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} setselectedGem={setselectedGem} selectedGem={selectedGem} onSelectPack={handleSelectPack} handleSubmitPlayerId={handleSubmitPlayerId} />;
    }
  };
  
  return (
    <div className="app-container">
      <div className="background-pattern"></div>
      
      <Logo />
      
      <div className="main-content">
        {renderCurrentScreen()}
      </div>
      
      <div className="character-section">
        <Character message={characterMessage} messageType={messageType} />
      </div>
    </div>
  );
}

export default App;