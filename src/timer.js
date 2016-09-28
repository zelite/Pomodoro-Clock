import React, { Component }  from 'react';

function firstCap(str){
    return str.slice(0,1).toUpperCase()+str.slice(1);
}

class TimeSelector extends Component{
    render(){
        return (
        <div className="timeSelector">
            <button className="increase" onClick={this.props.onPlus}>+</button>
            <div className="selectedTime">{this.props.selectedTime}</div>
            <button className="decrease" onClick={this.props.onMinus}>–</button>
        </div>
        );
    }
}

class Timer extends Component{
    render(){
        var startPauseButton;
        if(this.props.timerActive){
            startPauseButton = (<button onClick={this.props.onPauseTimer}>
                                <i className="material-icons">pause</i>
                                Pause Timer</button>);
        }else{
            startPauseButton = (<button onClick={this.props.onStartTimer}>
                                <i className="material-icons">play_arrow</i>
                                Start Timer</button>);
        }
        return (
            <div className="Timer">
                <div className={"what-time "+this.props.timerType}>
                    {firstCap(this.props.timerType)} Time
                </div>
                <div className={this.props.timerType+" timeLeft"}>
                {this.props.timeLeft}
                </div>
                {startPauseButton}
                <button onClick={this.props.onResetTimer}>
                <i className="material-icons">replay</i>
                Reset Timer</button>
            </div>
            );
    }
}

class PomodoroCount extends Component{
    render(){
        var one_tomato = <i className="material-icons animated fadeIn">brightness_1</i>;
        var pomodoros = Array(this.props.count).fill(one_tomato);
        return(
            <div className="pomodoros">{pomodoros}</div>
            );
    }
}

export {Timer, TimeSelector, PomodoroCount};