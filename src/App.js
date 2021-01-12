import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [timeLeft, setTimeLeft] = useState(25*60*60);
  const [timerOn, setTimerOn] = useState(false);
  const [timerID, setTimerID] = useState("")
  let hoursLeft = Math.floor(timeLeft / (60* 60)); 
  let minutesLeft = Math.floor(timeLeft % (60 * 60)/ 60) ;
  let seccondsLeft = Math.floor(timeLeft % (60));

  useEffect(() => {
    //console.log("Timer effect")
    if(timerOn) 
    setTimerID(setInterval(() => {
     setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
   }, 1000))
 },[timerOn]) 

  function Timer(){
    return (
      <div className="Timer">
        <h1>{hoursLeft}:{minutesLeft}:{seccondsLeft}</h1>
      </div>
    )
  }
  
  function addTime(props){
    //console.log("Time changed")
    switch(props) {
      case "+H":
        setTimeLeft(prevTimeLeft => prevTimeLeft + 60*60)
        break;
      case "+M":
        setTimeLeft(prevTimeLeft => prevTimeLeft + 60)
        break;
      case "-H":
        setTimeLeft(prevTimeLeft => (prevTimeLeft > 60*60)?prevTimeLeft - 60*60:prevTimeLeft)
        break;
      case "-M":
        setTimeLeft(prevTimeLeft => (prevTimeLeft > 60)?prevTimeLeft - 60:prevTimeLeft)
        break;

      default:
    }
  }

  function toggleTimer(){
    //console.log("Start/stop pressed")
    if (timerOn) {
      setTimerOn(false);
      clearInterval(timerID);
    }
    else
      setTimerOn(true);
  }


  function Controls(){
    return(
      <div className="Controls">
        <div className="btn add-hours" onClick={() => addTime("+H")}>+ Hours</div>
        <div className="btn sub-hours" onClick={() => addTime("-H")}>- Hours</div>
        <div className="btn add-minutes" onClick={() => addTime("+M")}>+ Minutes</div>
        <div className="btn sub-minutes" onClick={() => addTime("-M")}>- Minutes</div>
        <div className="btn" onClick={toggleTimer}>Start/Stop</div>
      </div>
    )
    }
  
  


  return (
    <div className="App">
      <Timer />
      <Controls />
    </div>
  );
}

export default App;
