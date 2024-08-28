"use client";
import React, { useState, useEffect } from "react";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Time's up!");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleStartPause = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={handleStartPause}>{isActive ? "Pause" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default PomodoroTimer;
