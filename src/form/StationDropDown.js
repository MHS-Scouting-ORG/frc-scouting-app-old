import React from "react";

class StationDropDown extends React.Component{
    constructor(props){
        super(props)
        this.changeChargeStation = this.changeChargeStation.bind(this);
        this.makeChargeStationStartEndTimeBoxes = this.makeChargeStationStartEndTimeBoxes.bind(this);
        this.state = {
            chargeStationUsed: '',
        }
    }

    changeChargeStation(event){
        this.props.changeChargeStationUsed(event);
        this.setState({chargeStationUsed: event.value})
    }

    makeChargeStationStartEndTimeBoxes(){
        return(
            this.props.makeChargeStationStartEndTimeBoxes(this.state.chargeStationUsed)
        )
    }

    render(){
        return(
            <div>
                <label> {"Charge Station: "}
                    <select onChange={this.changeChargeStation}>
                        <option></option>
                        <option value='None'>None</option>
                        <option value='DockEngage'>Docked & Engaged</option>
                        <option value='DockedNotEngaged'>Docked & Not Enaged</option>
                        <option value='Parked'>Parked</option>
                        <option value='Attempted'>Attempted</option>
                    </select>
                </label>
            </div>
        )
    }
}

export default StationDropDown;