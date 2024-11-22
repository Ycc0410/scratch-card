import React, { useState } from 'react';
import ScratchCardGame from './components/ScratchCardGame';
import BlackJackGame from './components/BlackJackGame';
import './App.css';

import scratchImage from './assest/刮刮樂.jpg';
import blackjackImage from './assest/blackjack.jpg';

function App() {
  const [game, setGame] = useState(null);

  const handleSelectGame = (selectedGame) => {
    setGame(selectedGame);
  };

  const handleBackToMenu = () => {
    setGame(null);
  };

  return (
    <div className="App">
      {!game && (
        <div className="menu">
          <h1>🎉 歡迎來到遊戲中心 🎉</h1>
          <div className="menu-buttons">
            <button onClick={() => handleSelectGame('scratch')}>
              <img src={scratchImage} alt="刮刮樂" />
              刮刮樂
            </button>
            <button onClick={() => handleSelectGame('blackjack')}>
              <img src={blackjackImage} alt="21點" />
              21點
            </button>
          </div>
        </div>
      )}
      {game === 'scratch' && (
        <div>
          <button onClick={handleBackToMenu}>返回主選單</button>
          <ScratchCardGame />
        </div>
      )}
      {game === 'blackjack' && (
        <div>
          <button onClick={handleBackToMenu}>返回主選單</button>
          <BlackJackGame />
        </div>
      )}
    </div>
  );
}

export default App;
