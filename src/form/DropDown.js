import React from 'react';

class DropDown extends React.Component{
    constructor(props){
        super(props);
        this.changeDropDown = this.changeDropDown.bind(this);
    }

    changeDropDown(){
        this.props.changeDropsDownState(this.props.place)
    }

    render(){
        return (
            <div>
                <select onChange={this.changeDropDown}>
                    <option key={"empty"}></option>
                    {this.props.choices.map((choice) => <option key={choice} > {choice} </option>)}
                </select>
            </div>
        )
    }
}

export default DropDown;