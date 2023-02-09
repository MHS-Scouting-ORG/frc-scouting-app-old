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
        this.props.changeChargeStationUsed(event);
        this.setState({chargeStationUsed: event.value})
        
    }

    render(){
        return(
            <div>
                <label> {"Charge Station: "}
                    <select onChange={this.changeChargeStation()}>
                        <option value='none'>None</option>
                        <option value='dockEngage'>Docked & Engaged</option>
                        <option value='dockedNotEngaged'>Docked & Not Enaged</option>
                        <option value='parked'>Parked</option>
                        <option value='attempted'>Attempted</option>
                    </select>
                </label>
            </div>
        )
    }
}

export default StationDropDown;