import React, { useEffect, useState } from 'react'
import './pomodoro.scss'

import { faArrowUp, faArrowDown, faPlay, faPause, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import endAudio from "./assets/knocking.mp3"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TimeConfig from './components/TimeConfig'

const DEFAULT_BREAK = 5
const DEFAULT_SESSION = 25
const MIN = 0
const MAX = 60

export default function Pomodoro() {
    
    const [breakTime, setBreakTime] = useState(DEFAULT_BREAK)
    const [sessionTime, setSessionTime] = useState(DEFAULT_SESSION)

    const [timeRemaining, setTimeRemaining] = useState(( DEFAULT_SESSION * 60))
    const [isSession, setIsSession] = useState(true)
    const [playing, setPlaying] = useState(false)


    useEffect(() => {
      let interval;

      if(playing && timeRemaining > 0){

        interval = setInterval( () => {
          setTimeRemaining(timeRemaining - 1)
        }, 1000)

      } else if( timeRemaining == 0){

        document.getElementById("beep").play()
        
        setTimeout(function()
          {
            setIsSession(!isSession)
          }, 2000);

      }

      return () => clearInterval(interval);
    }, [playing, timeRemaining])

    useEffect(() => {
      setTimeRemaining( isSession ? sessionTime * 60 : breakTime * 60) 
    }, [isSession, sessionTime, breakTime])

    const changePlaying = () => {
      setPlaying(!playing)
    }

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    
      return `${formattedMinutes}:${formattedSeconds}`
    }

    const setReset = () => {
      setPlaying(false)
      setIsSession(true)
      
      setBreakTime(5)
      setSessionTime(25)
      setTimeRemaining( 25 * 60)  

      const audio = document.getElementById("beep");
      audio.pause();
      audio.currentTime = 0;
    }

    const changeBreakTime = (action) => {

      if (action == "decrement") {
        if(breakTime - 1 > MIN) { 
          setBreakTime( () => breakTime - 1) 
        }
      } else{
        if(breakTime + 1 <= MAX) { setBreakTime( (prev) => (prev + 1)) }
      }
    }

    const changeSessionTime = (action) => {
      if (action === "decrement") {
        if (sessionTime - 1 > MIN) {
          setSessionTime(() => {
            const newSessionTime = sessionTime - 1;
            setTimeRemaining(newSessionTime * 60);
            return newSessionTime;
          });
        }
      } else {
        if (sessionTime + 1 <= MAX) {
          setSessionTime(() => {
            const newSessionTime = sessionTime + 1;
            setTimeRemaining(newSessionTime * 60);
            return newSessionTime;
          });
        }
      }
    };
    
  return (
    <div className='index'>

        <TimeConfig 
          name="break"
          label= "Break"
          defaultTime={5}
          min={MIN}
          max={MAX}
          time={breakTime}
          setTime={changeBreakTime}
          setTimeRemaining={setTimeRemaining}
        />
        
        <TimeConfig 
          name="session"
          label="Session"
          defaultTime={25}
          min={MIN}
          max={MAX}
          time={sessionTime}
          setTime={changeSessionTime}
          setTimeRemaining={setTimeRemaining}
        />
  
        <div className="timer">
          <div id="timer-label">
            { isSession ? 'Session' : 'Break'}
          </div>
          <div id="time-left"
            style={{ color: playing ? "#df4040" : "#213547" }}
          >
            {formatTime(timeRemaining)}
          </div>
          <div className="buttons">
          <div onClick={ changePlaying } id='start_stop'>
            <FontAwesomeIcon icon={ !playing ? faPlay : faPause}  className='timer-button' />
          </div>
          <div onClick={setReset} id='reset'>
          <FontAwesomeIcon icon={faArrowRotateLeft} className='timer-button' />
          </div>
          <audio id="beep" src={endAudio} volume={1} />
          </div>
        </div>
    </div>
  )
}
