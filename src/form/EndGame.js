import React from "react";

class EndGame extends React.Component{
    constructor(props){
        super(props)
        this.changeEndGame = this.changeEndGame.bind(this);
        this.makeEndGameStartEndBox = this.makeEndGameStartEndBox.bind(this);
        this.state = {
            changeEndGameUsed: '',
        }
    }

    changeEndGame(event){
        this.props.changeEndGameUsed(event);
        this.setState({changeEndGameUsed: event.value})
    }

    makeEndGameStartEndBox(){
        return(
            this.props.makeEndGameStartEndBox(this.state.changeEndGameUsed)
        )
    }

    render(){
        return(
            <div>
                <label> {"End Game: "}
                    <select onChange={this.changeEndGame}>
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

export default EndGame;