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
        const input = document.getElementById(this.props.place)
        this.setState((state) => ({
            counter: ( (val >= 0) ? state.counter + increment : 0),
        }));
        input.value = parseInt(this.state.counter) + 1;
    }

    countChanged(event) {
        console.log("apple cider");
        this.setState({counter: event.target.value});
        this.props.setState(event, this.props.place);
    }

    render() {
        return(
            <div> 
                <label>{this.props.title}</label>
                <button onClick={() => this.updateCounter(-1)}>-</button>
                <input type="number" id={this.props.place} onChange={this.countChanged}/>
                <button onClick={() => this.updateCounter(1)}>+</button>
            </div>
        );
    }
}

export default CounterBox;