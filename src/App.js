import React, { useState } from 'react';
import ScratchCardGame from './components/ScratchCardGame';
import BlackJackGame from './components/BlackJackGame';
import './App.css';

import scratchImage from './assest/刮刮樂.jpg';
import blackjackImage from './assest/blackjack.jpg';
import luckImage from './assest/luck.jpg';
import woodFishImage from './assest/wood-fish.png'; // 新增木魚圖片

function App() {
  const [game, setGame] = useState(null);
  const [meritCount, setMeritCount] = useState(0);
  const [woodFishScale, setWoodFishScale] = useState(1); // 控制木魚圖片大小

  const handleSelectGame = (selectedGame) => {
    setGame(selectedGame);
  };

  const handleBackToMenu = () => {
    setGame(null);
    setMeritCount(0); // 返回主選單時將功德數歸零
    setWoodFishScale(1); // 重置木魚大小
  };

  const handleLuckKeyPress = (event) => {
    if (event.key === 'c') {
      setMeritCount(meritCount + 1); // 增加功德數
      setWoodFishScale(1.2); // 放大木魚圖片
      setTimeout(() => setWoodFishScale(1), 200); // 短暫回復原大小
    }
  };

  return (
    <div className="App" onKeyPress={handleLuckKeyPress} tabIndex={0}>
      {!game && (
        <div className="menu">
          <h1>🏮 過年小遊戲 🏮</h1>
          <div className="menu-buttons">
            <button onClick={() => handleSelectGame('scratch')}>
              <img src={scratchImage} alt="新年刮刮樂" />
              新年刮刮樂
            </button>
            <button onClick={() => handleSelectGame('blackjack')}>
              <img src={blackjackImage} alt="好運21點" />
              好運21點
            </button>
            <button onClick={() => handleSelectGame('luck')}>
              <img src={luckImage} alt="功德＋1" />
              功德＋1
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
      {game === 'luck' && (
        <div className="luck-container">
          <h2>收集運氣</h2>
          <p>按下 "C" 鍵即可增加功德！</p>
          <img
            src={woodFishImage}
            alt="木魚"
            style={{
              transform: `scale(${woodFishScale})`, // 使用 scale 控制大小
              transition: 'transform 0.2s ease', // 動畫效果
              width: '150px', // 木魚圖片大小
              height: 'auto',
            }}
          />
          <p className="merit-text">功德：+{meritCount}</p>
          <button onClick={handleBackToMenu}>返回主選單</button>
        </div>
      )}
    </div>
  );
}

export default App;
