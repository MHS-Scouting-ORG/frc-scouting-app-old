import React from "react";

class StationDropDown extends React.Component{
    constructor(props){
        super(props)
        this.changeChargeStation = this.changeChargeStation.bind(this);
        
        this.state = {
            chargeStationUsed: ' ',
        }
    }

    changeChargeStation(event){
        this.props.setChargeStation(event);
        this.setState({chargeStationUsed: event.value})
        
    }

    render(){
        return(
            <div>
                <select onChange={this.changeChargeStation()}>
                    <option>Select Option</option>
                    <option value='dockEngage'>Docked & Engaged</option>
                    <option value='dockedNotEngaged'>Docked & Not Enaged</option>
                    <option value='parked'>Parked</option>
                    <option value='attempted'>Attempted</option>
                </select>
            </div>
        )
    }
}

export default StationDropDown;