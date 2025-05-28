import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Button from "../components/Button";
import Confetti from "../components/Confetti";
import "../styles/screens/ConfirmationScreen.css";
import PlayerIdScreen from "./PlayerIdScreen";
import close from "../assets/close.png";
import video from "../assets/au2.mp4";
import captcha from "../assets/captcha.png";
const ConfirmationScreen = ({ gemPack, playerInfo, onFinish,selectedGem, setselectedGem }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Delay the confetti to make it appear after the screen transition
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  const [activePack, setActivePack] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handlePackClick = (index) => {
    // Set the active pack
    setActivePack(index);

    // Show the rotating star
    // After 3 seconds, show dialog and reset active pack

    setShowDialog(true);
    setActivePack(null);
  };
  return (
    <>
      {showConfetti && showDialog !== true && <Confetti />}
      <Panel title={playerInfo.name}>
        <div className="confirmation-container">
          <div className="gem-reward">
            <img
              src="https://brawlerhub.com/generator/img/gem_pack_0030.png"
              alt="Gems"
              className="gem-reward-image"
            />
            <div className="gem-amount">{selectedGem}</div>
          </div>

          <div
            className="buttton-container-confirmation"
            onClick={handlePackClick}
          >
            <div id="ufcb-b" class="ufcb-b">
              <div class="ufcb-b-t-w">Free gems event</div>
              <span>Continue</span>
            </div>
          </div>
        </div>
        {/* Dialog that appears after 3 seconds */}
        {showDialog && (
          <div className="dialog-overlay">
            <div className="panel-dialog-playeid">
              <div className="panel-header-playerid">
                <h2 className="panel-title">Follow the instructions</h2>
                <img
                  src={close}
                  alt=""
                  className="close-imager"
                  onClick={() => setShowDialog(false)}
                />
              </div>

              <div className="panel-content">
                <div className="vs-fv-w">
                  <div class="vs-fv-w">
                    <div class="embed-responsive embed-responsive-4by3">
                      <video id="vs-video" controls autoPlay playsInline>
                        <source src={video} type="video/mp4"  />
                        Your browser doesn't support the HTML5 video tag.
                      </video>
                    </div>
                  </div>
                  <div className="captcha-image">
                    <img src={captcha} alt="" srcset="" />
                    <img src="https://brawlerhub.com/generator/img/hand.gif" className="hand" alt="" />
                  </div>
                </div>
              </div>
            </div>

            {/* <button onClick={() => setShowDialog(false)}>Close</button> */}
          </div>
        )}
      </Panel>
    </>
  );
};

export default ConfirmationScreen;
