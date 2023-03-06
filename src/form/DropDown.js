import React from 'react';

class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.dropDownChange = this.dropDownChange.bind(this);
        
        this.state={
            choices: props.choices
        }
    }

    dropDownChange(event){
        this.props.setState(event,this.props.place);
    }

    render(){
        return (
            <div>
                <label>{this.props.title}</label>
                <select onChange={this.dropDownChange}>
                    <option key={"empty"}></option>
                    {this.state.choices.map((choice) => <option key={choice}>{choice}</option>)}
                </select>
            </div>
        )
    }
}

export default DropDown;