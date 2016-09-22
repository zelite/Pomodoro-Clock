var model = {
  init: function() {
    this.workTimer = 25 * 60 * 1000; //25mins
    this.timerActive = false;
    this.timeLeft = this.workTimer;
    this.breakTimer = 25 * 60 * 1000; //5mins
    this.pomodoroCount = 0;
    this.timerType = "work";
    this.timeIsUp = false;
  },
  reset: function() {
    this.init();
  },
  incrementTimer: function(timerName) {
    this[timerName] += 60*1000; //add one minute
    if(timerName.startsWith(this.timerType)){
      this.timeLeft += 60*1000;
    }
  },
  decrementTimer: function(timerName) {
    if(this[timerName] < 60*1000){
      this[timerName] = 0;
    }else{
    this[timerName] -= 60*1000;
    }//decrease one minute
    if(timerName.startsWith(this.timerType)){
      if(this.timeLeft < 60*1000){
        this.timeLeft = 0;
      }else{
      this.timeLeft -= 60*1000;
      }
    }
  }
};

model.init();

var controlPomodoro = {
  getCurrentTime: function() {
    return model.currentTimer;
  },
  incrementWorkTimer: function() {
    model.incrementTimer("workTimer");
  },
  incrementBreakTimer: function() {
    model.incrementTimer("breakTimer");
  },
  decrementWorkTimer: function() {
    model.decrementTimer("workTimer");
  },
  decrementBreakTimer: function() {
    model.decrementTimer("breakTimer");
  },
  setTimeLeft: function(timeLeft) {
    model.timerActive = true;
    model.timeLeft = timeLeft;
  },
  toggleState: function() {
    model.timerActive = !model.timerActive;
  },
  isActive: function() {
    return model.timerActive;
  },
  onPauseTimer: function(){
    //The start timer function will Pause and update things when it sees that the timer
    //is inactive
    model.timerActive = false;
  },
  onStartTimer: function(view) {
    if(model.timerActive)
    {
      //if we start timer again when it is active
      //it will keep several setInterval instances running and time will go faster
      return;
    }else{
    model.timerActive = true;
    }
    var startTime = new Date();
    var tickTack = setInterval(function() {
      if (model.timerActive) {
        var currentTime = new Date();
        var timeElapsed = currentTime - startTime;
        var timeLeft = model.timeLeft - timeElapsed;
        if (timeLeft < 0) {
          model.timeLeft = 0;
          model.timerActive = false;
          this.switchTimerType(view);
          this.onTimeIsUp();
          clearInterval(tickTack);
        }
        else {
          model.timeLeft = timeLeft;
          startTime = currentTime;
        }
      }else{
        clearInterval(tickTack);
      }
      this.updateViewState(view);
    }.bind(this), 50);
  },
  onTimeIsUp: function(){
    model.timeIsUp = true;
    setInterval(function(){
      model.timeIsUp = false;
    }, 5000);
  },
  onResetTimer: function(view){
    this.onPauseTimer();
    model.timerType = "work";
    model.timeLeft = model.workTimer;
    model.pomodoroCount = 0;
    this.updateViewState(view);
  },
  switchTimerType: function(view) {
    if (model.timerType === "work") {
      model.timerType = "break";
      model.pomodoroCount += 1;
    }
    else {
      model.timerType = "work";
    }
    model.timeLeft = model[model.timerType + "Timer"]+900;//addin some milliseconds 
    //so that the initial time does not flash so fast.
    if (model.timerType === "break" && model.pomodoroCount === 4) {
      model.pomodoroCount = 0;
      model.timeLeft *= 5; //if we made 4 pomodoros, we deserve a longer break;
    }
    this.updateViewState(view);
    this.onStartTimer(view);
  },
  updateViewState: function(view){
    view.setState({
      timerType: model.timerType,
      timeLeft: model.timeLeft,
      workTime: model.workTimer,
      breakTime: model.breakTimer,
      isTimerActive: model.timerActive,
      pomodoroCount: model.pomodoroCount,
      timeIsUp: model.timeIsUp
    });
  }
};

export default controlPomodoro;