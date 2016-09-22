import React, { Component } from 'react';
import './animate.css'
import './App.css';
import {Timer, TimeSelector, PomodoroCount} from "./timer.js";
import controlPomodoro from "./controlPomodoro.js";

/* - app
      -pomodoro clock
        - timeSelector
        - currentElapsedTime
          -start
          -stop
      - todo list
        - list item
        - delete all
        - save as file.
        
TODO: difference between pause and reset
If not paused, but reset, make current timer update after increase decrease of 
*/



class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      timeIsUp: false,
      isTimerActive: false,
      timerType: "work",
      timeLeft: 25*60*1000,
      workTime: 25*60*1000,
      breakTime: 5*60*1000
    };
  }
  
  componentWillMount(){
    controlPomodoro.updateViewState(this);
  }
  
  convertMsToHumanReadable(ms){
    var timeLeft = Math.floor(ms / 1000);
    var seconds = timeLeft % 60;
    timeLeft = Math.floor(timeLeft/ 60);
    var minutes = timeLeft % 60;
    if(minutes < 10){minutes = "0"+minutes.toString()}
    if(seconds < 10){seconds = "0"+seconds.toString()}
    return minutes+":"+seconds;
  }
  
  onStartTimer(){
    controlPomodoro.onStartTimer(this);
  }
  
  onResetTimer(){
    controlPomodoro.onResetTimer(this);
  }
  
  onPauseTimer(){
    controlPomodoro.onPauseTimer(this);
  }
  
  onBreakPlus(){
    controlPomodoro.incrementBreakTimer();
    controlPomodoro.updateViewState(this);
  }
  
  onBreakMinus(){
    controlPomodoro.decrementBreakTimer();
    controlPomodoro.updateViewState(this);
  }
  
  onWorkPlus(){
    controlPomodoro.incrementWorkTimer();
    controlPomodoro.updateViewState(this);
  }
  
  onWorkMinus(){
    controlPomodoro.decrementWorkTimer();
    controlPomodoro.updateViewState(this);
  }

  render() {
    var classes = "App ";
    if(this.state.timeIsUp){
      classes += "animated shake";
    }
    return (
      <div className={classes}>
        <div className="selectors">
        <div className="duration-selector">
        Session Duration:
        
        <TimeSelector selectedTime={this.convertMsToHumanReadable(this.state.workTime)}
                      onPlus={this.onWorkPlus.bind(this)}
                      onMinus={this.onWorkMinus.bind(this)} />
        </div>
        <div className="duration-selector">
        Break Duration:
        
        <TimeSelector selectedTime={this.convertMsToHumanReadable(this.state.breakTime)}
                      onPlus={this.onBreakPlus.bind(this)}
                      onMinus={this.onBreakMinus.bind(this)} />
        </div>
        </div>
        <div className="main-timer">
        <Timer onStartTimer={this.onStartTimer.bind(this)}
               onPauseTimer={this.onPauseTimer.bind(this)}
               onResetTimer={this.onResetTimer.bind(this)}
               timerType={this.state.timerType}
               timerActive={this.state.isTimerActive}
               timeLeft={this.convertMsToHumanReadable(this.state.timeLeft)}/>
        <PomodoroCount count={this.state.pomodoroCount}/>
        </div>
      </div>
    );
  }
}

export default App;
