import React from 'react';

class CounterBox extends React.Component{
    constructor(props){
        super(props);
        this.inputChange = this.inputChange.bind(this);
        this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
        this.state = {
            inputValue:0
        }
    }

    buttonMinus(event){
        this.props.minusButton(event,this.props.place);
        const input = document.getElementById(this.props.place);
        let value = parseInt(this.state.inputValue);
        if(value > 0){
            this.setState({inputValue:parseInt(this.state.inputValue) - 1})
            input.value = parseInt(this.state.inputValue) - 1;
        } else{
            this.setState({inputValue:0})
            input.value = 0;
        }
    }

    buttonPlus(event){
        this.props.plusButton(event,this.props.place);
        const input = document.getElementById(this.props.place);
        let value = parseInt(this.state.inputValue);
        if(value >= 0){
            this.setState({inputValue:parseInt(this.state.inputValue) + 1})
            input.value = parseInt(this.state.inputValue) + 1;
        } else{
            this.setState({inputValue:0});
            input.value = 0;
        }
    }

    inputChange(event){
        if(event.target.value === ''){
            this.setState({inputValue:0});
        } else{
            this.setState({inputValue:event.target.value});
        }
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <div>
	                <button value={this.props.state} onClick={this.buttonMinus}>-</button>
	                <input  type='number' min={0} id={this.props.place} onChange={this.inputChange}></input>
	                <button value={this.props.state} onClick={this.buttonPlus}>+</button>
                </div>
            </div>
        );
    }/*
    
    /*constructor(props) {
        super(props);
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

    render() {
        return(
            <div>
                <button onClick={() => this.updateCounter(-1)}>-</button>
                <input value={this.state.counter}/>
                <button onClick={() => this.updateCounter(1)}>+</button>
            </div>
        );
    }*/
}

export default CounterBox;