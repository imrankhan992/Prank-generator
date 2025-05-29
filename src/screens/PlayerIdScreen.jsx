import React, { useEffect, useRef, useState } from 'react';
import Panel from '../components/Panel';
import Button from '../components/Button';
import '../styles/screens/PlayerIdScreen.css';
import close from "../assets/close.png";
import video from "../assets/tut-video.mp4";
const PlayerIdScreen = ({ onSubmit, setShowDialog,setCurrentScreen }) => {
  const [playerId, setPlayerId] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [showvideoDialgo, setshowvideoDialgo] = useState(false);
  
 const handleSubmit = async () => {
  setError('');

  if (!playerId || playerId.length < 3) {
    setError('Please enter a valid Player ID (at least 3 characters).');
    return;
  }

  // Remove '#' from the input
  const tag = playerId.replace('#', '').trim();
  setIsLoading(true);

  try {
    const response = await fetch(
      `https://brawlslars.shop/brawl2/brawl_api.php?tag=${encodeURIComponent(tag)}`,
      {
        headers: { 'Accept': 'application/json' }
      }
    );

    const data = await response.json();

    if (!response.ok || data.error) {
      // Check for "Not Found" error specifically
      if (data.reason?.includes("Not Found") || data.message?.includes("Not Found")) {
        throw new Error('Please enter a correct Player Tag. The tag you entered is invalid or does not exist.');
      }
      throw new Error(data.reason || data.message || 'Failed to fetch player data');
    }

    if (!data.tag || !data.name) {
      throw new Error('Invalid player data received');
    }

    localStorage.setItem("playerData", JSON.stringify(data));
    setShowDialog(false);
    onSubmit(playerId);

  } catch (err) {
    console.error('Player fetch error:', err);
    // Set user-friendly error message
    if (err.message.includes('Not Found') || err.message.includes('invalid')) {
      setError('Please enter a correct Player Tag. The tag you entered is invalid or does not exist.');
    } else {
      setError(err.message || 'Something went wrong. Please try again.');
    }
  } finally {
    setShowDialog(true);
    setIsLoading(false);
  }
};
  const videoRef = useRef(null);


  useEffect(() => {
    if (showvideoDialgo && videoRef.current) {
      const video = videoRef.current;
    
      setTimeout(() => {
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen(); // Safari
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen(); // IE11
        }
      }, 100);
    }
  }, [showvideoDialgo]);

  return (
    <div className="panel-dialog-playeid">
      <div className="panel-header-playerid">
        <h2 className="panel-title">Player ID</h2>
        <img 
          src={close} 
          alt="Close dialog" 
          className='close-imager' 
          onClick={() => {setShowDialog(false); setCurrentScreen('gemPacks'); }} 
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
                const value = e.target.value.toUpperCase();
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
            <div onClick={()=>setshowvideoDialgo(true)} className="info-icon" title="Your Brawl Stars player tag starting with #">i</div>
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
       {showvideoDialgo && (
                <div className="dialog-overlay">
                  <div className="panel-dialog-playeid">
                    <div className="panel-header-playerid">
                      <h2 className="panel-title">PLAYER ID</h2>
                      <img onClick={()=>setshowvideoDialgo(false)} src={close} alt="close" className="close-imager" />
                    </div>
      
                    <div className="panel-content">
                      <div className="vs-fv-w">
                        <div className="embed-responsive1 embed-responsive-4by3">
                          <video ref={videoRef} id="vs-video" controls autoPlay playsInline  >
                            <source src={video} type="video/mp4" />
                            Your browser doesn't support the HTML5 video tag.
                          </video>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              )}
    </div>
  );
};

export default PlayerIdScreen;
