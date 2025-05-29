import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Confetti from "../components/Confetti";
import "../styles/screens/ConfirmationScreen.css";
import close from "../assets/close.png";
import video from "../assets/au2.mp4";
import captcha from "../assets/robot.png";

const ConfirmationScreen = ({
  setCharacterMessage,
  setCurrentScreen,
  mgemPack,
  playerInfo,
  onFinish,
  selectedGem,
  setselectedGem,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("Loading...");

  // Run on component mount
  useEffect(() => {
    // Show confetti after slight delay
    const confettiTimer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);

    // Enable button after 5s and show dialog instantly
    const buttonTimer = setTimeout(() => {
      setButtonDisabled(false);
      setButtonText("Continue");

      // Show dialog immediately
      setCharacterMessage(" Please watch the video and follow the instructions.");
      setShowDialog(true);
    }, 5000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(buttonTimer);
    };
  }, [setCharacterMessage]);

  const handlePackClick = () => {
    if (!buttonDisabled) {
      setCharacterMessage(" Please watch the video and follow the instructions.");
      setShowDialog(true);
    }
  };

  return (
    <>
      {showConfetti && !showDialog && <Confetti />}

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
            style={{ cursor: buttonDisabled ? "not-allowed" : "pointer" }}
          >
            <div id="ufcb-b" className="ufcb-b">
              <div className="ufcb-b-t-w">Free gems event</div>
              <span>{buttonText}</span>
            </div>
          </div>
        </div>

        {showDialog && (
          <div className="dialog-overlay">
            <div className="panel-dialog-playeid">
              <div className="panel-header-playerid">
                <h2 className="panel-title">Follow the instructions</h2>
                <img
                  src={close}
                  alt="close"
                  className="close-imager"
                  onClick={() => setShowDialog(false)}
                />
              </div>

              <div className="panel-content">
                <div className="vs-fv-w">
                  <div className="embed-responsive embed-responsive-4by3">
                    <video id="vs-video" controls autoPlay playsInline>
                      <source src={video} type="video/mp4" />
                      Your browser doesn't support the HTML5 video tag.
                    </video>
                  </div>
                  <div className="captcha-image">
                    <img src={captcha} alt="captcha" />
                    <img
                      src="https://brawlerhub.com/generator/img/hand.gif"
                      className="hand"
                      alt="hand"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>
    </>
  );
};

export default ConfirmationScreen;
