import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Work: ');

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (sessionType === 'Work') {
              setSessionType('Break');
              setMinutes(5);
            } else {
              setSessionType('Work');
              setMinutes(25); 
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, minutes, seconds, sessionType]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSessionType('Work');
    setMinutes(25);
    setSeconds(0);
  };

  const addFiveMinutes = () => {
    setMinutes(minutes + 5);
  };

  const subtractOneMinute = () => {
    if (minutes > 0) {
      setMinutes(minutes - 5);
    }
  };

  return (
    <div className="pomodoro my-5 mx-auto" style={{width: "25rem",}}>
      <h1 className='fw-bold'>Pomodoro Timer</h1>
      <div className="timer">
        <span className='fw-bold'>{sessionType}</span>
        <span>
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </span>
      </div>
      <div className="controls">
      <button className="btn btn-success" onClick={addFiveMinutes}>+5</button>
        <button className='btn btn-secondary' onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button className='btn btn-secondary' onClick={resetTimer}>Reset</button>
        <button className="btn btn-danger" onClick={subtractOneMinute}>-5</button>
      </div>
    </div>
  );
}

export default App;
