import React from "react";

class StationTimer extends React.Component{
    constructor(props){
        super(props);
        this.startTimer = this.startTimer.bind(this)
        this.endTimer = this.endTimer.bind(this)
        this.state = {
            counter: 0,
            startTime: false,
            pressed: false
        }
    }

    startTimer(){
        console.log("starting")
        this.setState({pressed: true})
        if (this.state.startTime === false) {
            let count = 0;
            setInterval(function() {
                count += .1
                console.log(Math.round(count * 10) / 10);
            }, 100);
            this.setState((state) => ({
                counter: state.counter + Math.round(count * 10) / 10
            }));
        } 
        else {
            return;
        }
    }

    endTimer(){
        console.log("ending");
        this.setState({startTime: true, pressed: false});
    }

    render(){
        return(
            <div>
                <input value={this.state.counter}/>
                <button onClick={() => (this.state.pressed === false) ? this.startTimer() : this.endTimer()}>Start/Stop</button>
            </div>
        )
    }
}

export default StationTimer;