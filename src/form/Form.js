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
        
        this.dropDownChange = this.dropDownChange.bind(this);
        this.makeDropDown = this.makeDropDown.bind(this);

        this.btnMinus = this.btnMinus.bind(this);
        this.btnPlus = this.btnPlus.bind(this);
        this.inputBoxChanged = this.inputBoxChanged.bind(this);
        this.makeInputBox = this.makeInputBox.bind(this);

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
            dropDownVal:['', '', ''] ,
            inputBoxVal: [0, 0],


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

    //---------------------------------------------------------------------------------------------------------------//

    dropDownChange(event,i){
        let dropDownSates =  this.state.dropDownVal;
        dropDownSates[i] = event.target.value;
    }

    makeDropDown(option,i){
        return(
            <dive>
                <DropDown>
                    choice={option}
                    place={i}
                    setState={this.dropDownChange}
                </DropDown>
            </dive>
        )
    }

    //--------------------------------------------------------------------------------------------------------------//

    inputBoxChanged(event, i){
        let counterStates = this.state.inputBoxVal;
        if(event.target.value === " "){
            counterStates[i] = 0;
        } else {
            counterStates[i] = event.target.value;
        }
    }

    btnMinus(i){
        let counterStates = this.state.inputBoxVal;
        if(counterStates[i] > 0){
            counterStates[i] = parseInt(counterStates[i]) - 1;
        } else{
            counterStates[i] = 0;
        }
    }

    btnPlus(i){
        let counterStates = this.state.inputBoxVal;
        if(counterStates[i] >= 0){
            counterStates[i] = parseInt(counterStates[i]) + 1;
        } else {
            counterStates[i] = 0;
        }
    }

    makeInputBox(i){
        let counterStates = this.state.inputBoxVal;
        return(
            <div>
                <CounterBox>
                        setState={this.inputBoxChanged}
                        state={counterStates[i]}
                        place={i}
                        buttonMinus={this.btnMinus}
                        buttonPlus={this.btnPlus}
                </CounterBox>
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

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
                    {this.makeInputBox("Test: ", 0)}
                    {this.makeInputBox("Test2: ", 1)}
                </form>
            </div>
        )
    }
}

export default Form;