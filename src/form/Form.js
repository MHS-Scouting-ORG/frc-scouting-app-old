import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import StationDropDown from './StationDropDown';

class Form extends React.Component{
    constructor(props){
        super(props)

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeElmType =  this.changeElmType.bind(this);
        this.makeMatchDropDown = this.makeMatchDropDown(this);

        this.state = {
            matchType: ' ',
            matchNum: ' ',
            elmNum: ' ',
            matchData: 'not found',
            teamNumber: ' ',
            teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
            chargeStation: [' ', ' ',' ', ' ', ' '],

        }
    }


    changeMatchType(event){
        let matchType = event ? matchType === 'qm': this.setState({elmNum:''});
        this.setState({matchType:event});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber: ' '});
    }

    changeElmType(event){
        this.setState({elmNum:event});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber: ' '});
    }

    makeMatchDropDown(){
        return(
            <div>
                <MatchDropDown
                    setMatchType={this.changeMatchType}
                    setElmType={this.changeElmType}
                />
            </div>
        )
    }

    async getMatchTem(){
        let matchkey = /*put this years event key here*//* "event_key" (change this) *//* */ await api.getRegional() /* */ +'_'+ this.state.matchType + this.state.elmNum + 'm' + this.state.matchNum;
        const team = async() => {
            await fetch('https://www.thebluealliance.com/api/v3/event/' + /* 'event_key' (change this) */ /**/ await api.getRegional() /**/ + '/matches',{
                mode: 'cors',
                headers:{
                    //"x-TBA-Auth-Key:  Auth_Key (add later)"  //
                    'X-TBA-Auth-Key': await api.getBlueAllianceAuthKey()
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                date.map((matches) => {
                    this.setState({matchData:matches});
                    this.setState({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});
                    console.log(matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys));
                })
            })
        }
        
    }

    render(){
        <div>
            <h1> FORM </h1>
            <form>
            </form>
        </div>
    }
}

export default Form;