import React from "react";

class StationTimer extends React.Component{
    constructor(props){
        super(props);
        this.runTimer = this.runTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.timeChanged = this.timeChanged.bind(this);
        this.state = {
            timer: 0,
            debounce: 0,
            stop: false
        }
    }

    runTimer() {
        this.setState({stop: false, debounce: this.state.debounce + 1});
        console.log(this.state.debounce);
        if (this.state.debounce < 1 && this.state.stop === false) {
            setInterval(() => {
                if (this.state.stop === true) {
                    return;
                }
                this.setState({timer: Math.round((this.state.timer + .1) * 10) / 10})
            }, 100)
        } else {
            return;
        }
    }
    
    stopTimer() {
        this.setState({stop: true, debounce: 0});
    }

    timeChanged(event) {
        this.props.setState(event, this.props.place);
    }
    

    render(){
        return(
            <div>
                <p onChange={this.timeChanged}>{this.state.timer}s</p>
                <button onClick={this.runTimer}>Start</button>
                <button onClick={this.stopTimer}>Stop</button>
            </div>
        )
    }
}

export default StationTimer;