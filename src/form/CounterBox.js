import React from 'react';

class CounterBox extends React.Component{
    constructor(props) {
        super(props);
        this.updateCounter = this.updateCounter.bind(this);
        this.countChanged = this.countChanged.bind(this);
        this.state = {
            counter: 0
        }
    }

    updateCounter(increment) {
        let val = increment + this.state.counter;
        this.setState((state) => ({
            counter: ( (val >= 0) ? state.counter + increment : 0),
        }));
    }

    countChanged(event) {
        console.log("aaa")
        this.setState({counter: event.target.value});
        this.props.setState(event, this.props.place);
    }

    render() {
        return(
            <div> 
                <label>{this.props.label}</label>
                <button onClick={() => this.updateCounter(-1)}>-</button>
                <input value={this.state.counter} id={this.props.place} onChange={this.countChanged}/>
                <button onClick={() => this.updateCounter(1)}>+</button>
            </div>
        );
    }
}

export default CounterBox;