import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import StationDropDown from './StationDropDown';
import CounterBox from './CounterBox';

class Form extends React.Component{
    constructor(props){
        super(props)

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeElmType =  this.changeElmType.bind(this);
        this.makeMatchElmTypeDropDown = this.makeMatchElmTypeDropDown.bind(this);
        this.changeElmNum = this.changeElmNum.bind(this);
       

        this.makeMatchDropDown = this.makeMatchDropDown(this);
        this.changeTeam = this.changeTeam.bind(this);
        this.makeTeamDropDown = this.makeTeamDropDown.bind(this);     
        
        this.dropDownChange = this.dropDownChange.bind(this);
        this.makeDropDown = this.makeDropDown.bind(this);

        this.state = {
            comments: '',
            matchType: '',
            matchNum: '',
            elmNum: '',
            matchData: 'not found',
            teamNumber: ' ',
            teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
            chargeStation: [' ', ' ',' ', ' ', ' '],
            whoWon: '',
            checkedWhoWon: [' ' , ' '],
            rankingPts: 0,
            bonusVal: [' ', ' '],
            totalPts: 0,
            pentalyVal: [' ',' ',' ',' ',' '],
            dropDownVal:[' ', ' ', ' ', ' ', ' '] ,



        }
    }

//------------------------------------------------------------------------------------------------------------------------//
    changeMatchType(event){
        let matchType = event ? matchType === 'q': this.setState({elmNum:''});
        this.setState({matchType:event});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber: ' '});
    }

    changeElmType(event){
        this.setState({elmNum:event});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber: ' '});
    }

    changeElmNum(event){
        this.setState({elmNum: event.target.value});
        this.setState({teams:['team1', 'teams2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber:''});
    }

    makeMatchElmTypeDropDown(){
       
    }

    makeMatchDropDown(){
        return(
            <div>
                <MatchDropDown
                    setMatchType={this.changeMatchType}
                    setElmType={this.changeElmType}
                    makeMatchElmTypeDropDown={this.makeMatchElmTypeDropDown}
                    setsetElmType={this.changeElmNum}

                />
            </div>
        )
    }

    changeTeam(event){
        this.setState({teamNumber:this.target.value});
        let data = this.state.matchData;
        let teamColor = 'red';
        let selectedTeam = event.target.value;
        data.alliances.blue.team_keys.map((team) => {
            if(team === selectedTeam){
                teamColor = 'blue';
            }
        })

        let whoWon = '';
        let wonState = this.state.whoWon;
        if(wonState === ''){
            if(data.alliances.blue.score > data.alliances.red.score){
                wonState = 'blue';
            } else if(data.alliances.blue.score < data.alliances.red.score){
                wonState = 'red';
            } else{
                wonState = 'tied';
            }
        } else if(wonState === 'blue'){
            whoWon = 'blue';
        } else if(wonState === 'red'){
            whoWon = 'red';
        } else{
            whoWon = 'tied';
        }

        if(teamColor === whoWon){
            this.setState({rankingPts: 2});
        } else if (whoWon === 'tied'){
            this.setState({rankingPts: 1});
        } else{
            this.setState({rankingPts: 0});
        }

        this.setState({whoWon:''});
        this.setState({checkedWhoWon:[' ', ' ']});
        this.setState({bonusVal: [' ', ' ']});
    }

    makeTeamDropDown(){
        
    }
    //---------------------------------------------------------------------------------------------------------------//

    dropDownChange(event,i){
        let dropDownSates =  this.state.dropDownVal;
        dropDownSates[i] = event.target.value;
    }

    makeDropDown(choices,i){
        return(
            <dive>
                <DropDown>
                    option={choices}
                    place={i}
                    setState={this.dropDownChange}
                </DropDown>
            </dive>
        )
    }

    //--------------------------------------------------------------------------------------------------------------//

    render(){
        return(
            <div>
                <h1> FORM </h1>
                <form>

                </form>
                <h3>AUTONOMOUS</h3>
                <form>
                    {this.makeDropDown}
                </form>
                <h3>TELE-OP</h3>
                <form>
                </form>
            </div>
        )
    }
}

export default Form;