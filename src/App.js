import './App.css';
import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
//import Controls from './components/Controls'
/* import throttle from 'lodash/throttle'; */

function App() {

  let defaultStartTime = 3 //25 * 60 * 60

  const initialState = {
    timeLeft: defaultStartTime,
    isTimerOn: false
  }
  /*   const toggleTimerThrottled = throttle(toggleTimer,1000); */

  const reducer = (state, action) => {
    //console.log(action.type)
    //console.log(state)

    switch (action.type) {
      case "+H":
        return {
          ...state,
          timeLeft: state.timeLeft + 60 * 60 //adds 60 seconds/minute x 60 minutes/hour = 3600 seconds
        }
      case "+M":
        return {
          ...state,
          timeLeft: state.timeLeft + 60 //adds 60 seconds/minute = 60 seconds
        }
      case "-H":
        return {
          ...state,
          timeLeft: (state.timeLeft > 60 * 60) ? state.timeLeft - 60 * 60 : state.timeLeft //subtracts 1 hr only if timeleft is >1hr
        }
      case "-M":
        return {
          ...state,
          timeLeft: (state.timeLeft > 60) ? state.timeLeft - 60 : state.timeLeft //subtracts 1 minute only if timeleft is >1 minute
        }

      case "Start/Stop":
        if (state.isTimerOn) {
          return {
            ...state,
            isTimerOn: false
          }
        }
        else {
          return {
            ...state,
            isTimerOn: true
          }
        }
      case "Reset":
        return {
          ...state,
          timeLeft: defaultStartTime
        }

      case "DecrementTimer":
        if (state.timeLeft === 0) {
          alert("Timer is up!")
          return {
            ...state,
            isTimerOn: false
          }
        }
        return {
          ...state,

          timeLeft: state.timeLeft - 1
        }
      default:
        console.log("Unknown action type")
    }
  }

  //logic
  /*   function controlTime(props) {
      //console.log("Time changed")
      switch (props) {
        case "+H":
          setTimeLeft(prevTimeLeft => prevTimeLeft + 60 * 60)
          break;
        case "+M":
          setTimeLeft(prevTimeLeft => prevTimeLeft + 60)
          break;
        case "-H":
          setTimeLeft(prevTimeLeft => (prevTimeLeft > 60 * 60) ? prevTimeLeft - 60 * 60 : prevTimeLeft)
          break;
        case "-M":
          setTimeLeft(prevTimeLeft => (prevTimeLeft > 60) ? prevTimeLeft - 60 : prevTimeLeft)
          break;
  
        default:
      }
    } */


  /*  function toggleTimer() {
     setTimerOn(prevIsTimerOn => !prevIsTimerOn)
   }*/


  /*   function decrementTime() {
      setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
    } */

  /*
  function endTimer() {
    setTimerOn(false)
    //setTimeLeft(0)
    clearTimeout(timerID)
  }
 */





  const [state, dispatch] = useReducer(reducer, initialState);

  let hoursLeft = Math.floor(state.timeLeft / (60 * 60));
  let minutesLeft = Math.floor(state.timeLeft % (60 * 60) / 60);
  let seccondsLeft = Math.floor(state.timeLeft % (60));

  function Timer() {
    return (
      <div className="Timer">
        <h1>{hoursLeft}:{minutesLeft}:{seccondsLeft}</h1>
      </div>
    )
  }

  useEffect(() => {
    /* if (isTimerOn && timeLeft !== 0) {
      setTimeout(() => decrementTime(), 1000)
      //setTimerID( () => { return setTimeout(() =>decrementTime(), 1000)})
    } else if (timeLeft === 0 || isTimerOn === false) {
      endTimer()
    } */
    if (state.isTimerOn) {
      const timer = setTimeout(() => dispatch({ type: "DecrementTimer" }), 1000)
      return () => clearTimeout(timer)
    }
  }, [state.isTimerOn, state.timeLeft])

  //Controls
  function Controls() {
    return (
      <div className="Controls">
        <div className="rowPanel">
          <div className="btn add-hours" onClick={() => dispatch({ type: "+H" })}>+ Hours</div>
          <div className="btn sub-hours" onClick={() => dispatch({ type: "-H" })}>- Hours</div>
          <div className="btn add-minutes" onClick={() => dispatch({ type: "+M" })}>+ Minutes</div>
          <div className="btn sub-minutes" onClick={() => dispatch({ type: "-M" })}>- Minutes</div>
        </div>
        <br />
        {/* <div className="btn" onClick={toggleTimerThrottled}>Start/Stop</div> */}
        <div className="btn startStop" onClick={() => dispatch({ type: "Start/Stop" })}>Start/Stop</div>
        <div className="btn reset" onClick={() => dispatch({ type: "Reset" })}>Reset</div>
        <br />
      </div>
    )
  }



  return (
    <div className="App">
      <h1>Gosu Lab's Pomodoro App</h1>
      <p>This a simple frontend app built from scratch using React. Unlike most tutorials which use useState hooks to effect the controls on the timer, this version utilizes useReducer to allow for a "Start/Stop" button functionality.
        <br />
        <br />
        In short, there was a significant bug introduced by the "Start/Stop" button if it was repeatedly and rapidly pressed.
        What would be observed is a erratic counter due to multiple timers being instantiated as a result of the async nature of the hooks.</p>
      <Timer />
      <Controls />
    </div>
  );
}

export default App;
