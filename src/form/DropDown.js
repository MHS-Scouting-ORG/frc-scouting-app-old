import React from 'react';

class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.dropDownChange = this.dropDownChange.bind(this);

        this.state={
            choice: props.choices
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
                    {this.props.choices.map((choice) => <option key={this.props.choice}>{this.props.choice}</option>)}
                </select>
            </div>
        )
    }
}

export default DropDown;