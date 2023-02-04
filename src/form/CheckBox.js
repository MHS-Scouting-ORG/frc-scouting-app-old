import React from 'react';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.changeCheckBoxState = this.changeCheckBoxState.bind(this);
    }

    changeCheckBoxState(){
        this.props.changeCheckBoxState(this.props.place)
    }

    render(){   
        <div>
            <input type="checkbox" checked={this.props.checked} onChange={this.changeCheckBoxState}></input>
        </div>
    }
}

export default CheckBox;