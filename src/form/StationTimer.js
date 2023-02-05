import React from "react";

class StationTimer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            startTime: false
        }
    }

    startTimer(){
        console.log("starting")
        if (!this.state.startTime) {
            setInterval(function() {
                let currCount = this.state.count; //ERROR: Uncaught TypeError: Cannot read properties of undefined (reading 'count')
                this.setState({
                    counter: currCount + .1,
                });
            }, 100);
        }
    }

    endTimer(){
        console.log("ending");
        this.setState(({
            startTime: true
        }));
    }

    render(){
        return(
            <div>
                <input value={this.state.counter}/>
                <button onClick={() => (!this.state.startTime) ? this.startTimer() : this.endTimer()}>Start/Stop</button>
            </div>
        )
    }
}

export default StationTimer;