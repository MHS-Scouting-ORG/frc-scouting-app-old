import React from 'react';

class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.changeDropsDownState = this.changeDropsDownState.bind(this);
    }

    changeDropsDownState(){
        this.props.changeDropsDownState(this.props.place)
    }

    render(){
        return(
            <div>
                <select onChange={this.dropDownChange}>
                    <option key={"empty"}></option>
                    {this.props.options.map((option) => <option key={option}>{option}</option>)}
                </select>
            </div>
        )
    }
}

export default DropDown;