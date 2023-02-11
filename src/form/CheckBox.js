import React from 'react';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.changeCheckBoxState = this.changeCheckBoxState.bind(this);
    }

    changeCheckBoxState(){
        this.props.changeCheckBoxState(this.props.place, this.props.label);
    }

    render(){
        return(   
            <div>
                <label>{this.props.label.substring(0, this.props.label.length - 1) + ': '}</label>
                <input type="checkbox" checked={this.props.checked} onChange={this.changeCheckBoxState} id={this.props.label}></input>
            </div>
        )
    }
}

export default CheckBox;