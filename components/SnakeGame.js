import React, { useState, useEffect } from 'react';
import styles from '../styles/SnakeGame.module.css';  // Assurez-vous du bon chemin vers le fichier CSS Module

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
          setDirection('LEFT');
          break;
        case 38:
          setDirection('UP');
          break;
        case 39:
          setDirection('RIGHT');
          break;
        case 40:
          setDirection('DOWN');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const moveSnake = () => {
      const newSnake = [...snake];
      let head = { ...newSnake[0] };

      switch (direction) {
        case 'LEFT':
          head.x -= 1;
          break;
        case 'UP':
          head.y -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        default:
          break;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        });
      } else {
        newSnake.pop();
      }

      if (
        head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
        newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
      }

      setSnake(newSnake);
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [snake, direction, food, gameOver]);

  return (
    <div className={styles['game-container']}>
      {gameOver && <h1>Game Over</h1>}
      <div className={styles.grid}>
        {[...Array(20)].map((_, rowIndex) =>
          [...Array(20)].map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={ 
                snake.some(segment => segment.x === colIndex && segment.y === rowIndex)
                  ? styles['snake-segment']
                  : food.x === colIndex && food.y === rowIndex
                  ? styles.food
                  : ''
              }
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

export default SnakeGame;
