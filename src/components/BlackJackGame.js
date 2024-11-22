import React, { useState } from 'react';
import './BlackJackGame.css';

const BlackJackGame = () => {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  const getRandomCard = () => {
    const card = Math.floor(Math.random() * 10) + 1; // 隨機 1-10
    return card;
  };

  const calculateScore = (cards) => {
    return cards.reduce((acc, card) => acc + card, 0);
  };

  const handleHit = () => {
    const newCard = getRandomCard();
    const newPlayerCards = [...playerCards, newCard];
    const newPlayerScore = calculateScore(newPlayerCards);
    setPlayerCards(newPlayerCards);
    setPlayerScore(newPlayerScore);

    if (newPlayerScore > 21) {
      setMessage('你爆牌了！你輸了！');
      setGameOver(true);
    }
  };

  const handleStand = () => {
    let newDealerCards = [...dealerCards];
    let newDealerScore = dealerScore;

    while (newDealerScore < 17) {
      const card = getRandomCard();
      newDealerCards.push(card);
      newDealerScore = calculateScore(newDealerCards);
    }

    setDealerCards(newDealerCards);
    setDealerScore(newDealerScore);

    if (newDealerScore > 21) {
      setMessage('電腦爆牌了！你贏了！');
    } else if (newDealerScore >= playerScore) {
      setMessage('電腦贏了！');
    } else {
      setMessage('你贏了！');
    }

    setGameOver(true);
  };

  const handleRestart = () => {
    setPlayerCards([]);
    setDealerCards([]);
    setPlayerScore(0);
    setDealerScore(0);
    setGameOver(false);
    setMessage('');
  };

  return (
    <div className="blackjack">
      <h2>21點遊戲</h2>
      <div className="cards">
        <div>
          <h3>玩家的牌 ({playerScore})</h3>
          <div>{playerCards.join(', ') || '無牌'}</div>
        </div>
        <div>
          <h3>電腦的牌 ({gameOver ? dealerScore : '?'})</h3>
          <div>
            {gameOver ? dealerCards.join(', ') : dealerCards.map(() => 'X').join(', ')}
          </div>
        </div>
      </div>
      {!gameOver && (
        <div>
          <button onClick={handleHit}>抽牌</button>
          <button onClick={handleStand}>停止</button>
        </div>
      )}
      {gameOver && (
        <div>
          <p>{message}</p>
          <button onClick={handleRestart}>再玩一次</button>
        </div>
      )}
    </div>
  );
};

export default BlackJackGame;
