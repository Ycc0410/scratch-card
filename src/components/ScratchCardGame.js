import React, { useState, useEffect, useRef } from 'react';
import './ScratchCardGame.css';
import redEnvelope from '../assest/red-envelope.png'; // 確保圖片路徑正確

const ScratchCardGame = () => {
  const [isScratched, setIsScratched] = useState(false);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false); // 是否顯示結果
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

  const handleMouseMove = (e) => {
    if (!showResult) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out'; // 擦除模式
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2); // 圓形擦除區域
      ctx.fill();

      checkScratchProgress(); // 檢查刮開進度
    }
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++; // 計算透明像素
    }

    const transparentPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (transparentPercentage > 50) {
      setShowResult(true); // 當刮開超過 50% 時顯示結果
      setIsScratched(true);
      setResult(generateResult());
    }
  };

  const resetGame = () => {
    setIsScratched(false);
    setResult(null);
    setShowResult(false);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOverlay();
  };

  const drawOverlay = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = redEnvelope;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // 畫紅包圖片作為遮罩
    };
  };

  useEffect(() => {
    drawOverlay(); // 初始加載遮罩
  }, []);

  return (
    <section className="scratch-game">
      <h2>試著刮開紅包，看看結果！</h2>
      <div className="scratch-card">
        <canvas
          ref={canvasRef}
          width={300}
          height={200}
          onMouseMove={handleMouseMove} // 刮卡時觸發
        />
        {showResult && (
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
