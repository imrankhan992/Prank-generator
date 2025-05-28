import React, { useState } from 'react';
import Panel from '../components/Panel';
import '../styles/screens/GemPacksScreen.css';
import img30 from "../assets/30.png";
import img80 from "../assets/80.png";
import img170 from "../assets/170.png";
import img360 from "../assets/360.png";
import img950 from "../assets/950.png";
import img2000 from "../assets/2000.png";
import star from "../assets/star-white.png";
import PlayerIdScreen from './PlayerIdScreen';

const GemPacksScreen = ({ currentScreen,onSelectPack,handleSubmitPlayerId,selectedGem, setselectedGem }) => {
  const [activePack, setActivePack] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
const gemImages = {
  30: img30,
  80: img80,
  170: img170,
  360: img360,
  950: img950,
  2000: img2000,
};
  const gemPacks = [
    { amount: 30, price: '2.29', isFree: true },
    { amount: 80, price: '5.49', isFree: true },
    { amount: 170, price: '10.99', isFree: true },
    { amount: 360, price: '21.99', isFree: true },
    { amount: 950, price: '54.99', isFree: true },
    { amount: 2000, price: '109.99', isFree: true }
  ];

  const handlePackClick = (index,amount) => {
    // Set the active pack
    setActivePack(index);
    setselectedGem(amount);
    // Show the rotating star
    // After 3 seconds, show dialog and reset active pack
    setTimeout(() => {
      setShowDialog(true);
      setActivePack(null);
      
     
    }, 3000);
  };

  return (
    <Panel title="Gem Packs">
      <div className="gem-packs-container">
        {gemPacks.map((pack, index) => (
          <div className={`gem-pack-container-pack ${activePack === index ? 'active' : ''}`} key={index}>
           <img 
  onClick={() => handlePackClick(index,pack?.amount)}
  src={gemImages[pack.amount]} 
  alt={`${pack.amount} Gems`} 
  className="gem-image" 
/>
            {activePack === index && (
              <img src={star} alt="" className='star-rotating' />
            )}
          </div>
        ))}
      </div>

      {/* Dialog that appears after 3 seconds */}
      {showDialog && (
        <div className="dialog-overlay">
           <PlayerIdScreen selectedGem={selectedGem} onSubmit={handleSubmitPlayerId} setShowDialog={setShowDialog} />
           
          {/* <button onClick={() => setShowDialog(false)}>Close</button> */}
        </div>
      )}
    </Panel>
  );
};

export default GemPacksScreen;