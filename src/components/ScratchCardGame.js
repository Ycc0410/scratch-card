import React, { useState, useEffect, useRef } from 'react';
import './ScratchCardGame.css';

const ScratchCardGame = () => {
  const [isScratched, setIsScratched] = useState(false);
  const [result, setResult] = useState(null);
  const canvasRef = useRef(null);

  const generateResult = () => {
    const chance = Math.random();
    if (chance < 0.5) return 0; // 沒中獎 50%
    if (chance < 0.75) return 100; // 100：25%
    if (chance < 0.9) return 500; // 500：15%
    if (chance < 0.97) return 1000; // 1000：7%
    if (chance < 0.99) return 5000; // 5000：3%
    return 10000; // 10000：1%
  };

  const handleScratch = () => {
    if (!isScratched) {
      setResult(generateResult());
      setIsScratched(true);
    }
  };

  const resetGame = () => {
    setIsScratched(false);
    setResult(null);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOverlay();
  };

  const handleMouseMove = (e) => {
    if (!isScratched) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawOverlay = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (canvas && ctx) {
      ctx.fillStyle = '#aaa'; // 遮罩顏色
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    drawOverlay();
  }, []);

  return (
    <section className="scratch-game">
      <h2>試著刮開卡片，看看結果！</h2>
      <div className="scratch-card" onClick={handleScratch}>
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          onMouseMove={handleMouseMove}
        />
        {isScratched && (
          <div className="result">
            {result === 0 ? '😢 很遺憾，沒有中獎！' : `🎉 恭喜！你贏了 ${result} 元！`}
          </div>
        )}
      </div>
      {isScratched && (
        <button className="reset-btn" onClick={resetGame}>
          再玩一次
        </button>
      )}
    </section>
  );
};

export default ScratchCardGame;
