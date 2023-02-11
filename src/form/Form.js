import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import StationDropDown from './StationDropDown';
import CounterBox from './CounterBox';
import {getRegionals, getTeamsInRegional,} from "../api/bluealliance";
import TextBox from './TextBox';


class Form extends React.Component{
    constructor(props){
        super(props)

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeElmType =  this.changeElmType.bind(this);
        this.makeMatchTypeDropDown = this.makeMatchTypeDropDown.bind(this);
        this.changeElmNum = this.changeElmNum.bind(this);
       

        this.makeMatchDropDown = this.makeMatchDropDown(this);
        this.changeTeam = this.changeTeam.bind(this);
        
        this.dropDownChanged = this.dropDownChanged.bind(this);
        this.makeDropDownBox = this.makeDropDownBox.bind(this);

        this.changeChargeStation = this.changeChargeStation.bind(this);
        this.makeChargeStationDropDown = this.makeChargeStationDropDown.bind(this);
        this.changeChargeStationStartBox = this.changeChargeStationStartBox.bind(this);
        this.changeChargeStationEndBox = this.changeChargeStationEndBox.bind(this);
        this.makeChargeStationStartEndTimeBoxes = this.makeChargeStationStartEndTimeBoxes.bind(this);

        this.penaltyBoxChecked = this.penaltyBoxChecked.bind(this);
        this.makePenaltyBox = this.makePenaltyBox.bind(this);

        this.state = {
            comments: '',
            summaryComments: '',
            matchType: '',
            matchNum: '',
            elmNum: '',
            matchData: 'not found',
            teamNumber: ' ',
            teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
            override: false,
            chargeStationVal: ['', '',''],
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
        let matchType = event;
         if(matchType === 'q'){
            this.setState({elmNum:''});
        }
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

    makeMatchTypeDropDown(matchType){
       if(matchType === "qf" || matchType === "sf" || matchType === "f"){
        return(
            <input onChange={this.changeElmType}/>
        )
       }
    }

    makeMatchDropDown(){
        return(
            <div>
                <MatchDropDown
                    setMatchType={this.changeMatchType}
                    setElmType={this.changeElmType}
                    generateMatchTypeNum={this.makeMatchTypeDropDown}
                    setsetElmType={this.changeElmNum}

                />
            </div>
        )
    }

    async getMatchTeams(){
        let matchKey = /*put this years event*//* "event_key"  *//* */ await getTeamsInRegional() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNum;
        const teams = async () => {
            await fetch('https://www.thebluealliance.com/api/v3/event/' + /* 'event_Key' */ /**/ await getTeamsInRegional() /**/ + '/matches',{
                mode: 'cors',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.map((matches) =>{
                    if(matches.key === matchKey){
                        this.setState({matchData: matches})
                        this.setState({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});
                        console.log({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});

                    }
                })
            })
            .catch(err => console.log(err))
        }
        console.log(matchKey);
        teams();
    }

    changeTeam(event){
        this.setState({teamNumber:event.target.value});
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

    makeTeamDropdown(){
        let alliances = this.state.teams;
        return parseInt(this.state.matchNum)!== 0 ?(
            <div>
                <select onChange={this.changeTeam}>
                    <option></option>
                    {alliances.map((alliances) => <option key={alliances}> {alliances} </option>)}
                </select>
            </div>
        ) : (
            <div>
                <lable> Team Number
                    <input type='number' onChange={e => {this.setState({teamNumber: 'frc' + e.target.value})}}></input>
                </lable>
                <TextBox title={'Summary Comment:'} commentState={event => {this.setState({summaryComments: event.target.value})}}/>
            </div>
        )
    }

    changeMatch


    //---------------------------------------------------------------------------------------------------------------//

    dropDownChanged(event,i){
        let dropDownStates = this.state.dropDownVal;
        dropDownStates[i] = event.target.value
    }



    makeDropDownBox(title,options,i){
        return (
            <div>
                <DropDown
                    title={title}
                    choices={options}
                    place={i}
                    setState={this.dropDownChanged}
                />
            </div>
        )
    }

    //--------------------------------------------------------------------------------------------------------------//

    changeChargeStation(event){
        let chargeStation = Array(this.state.chargeStationVal);
        chargeStation[0] = event.target.value;
        this.setState({chargeStationVal: chargeStation});
    }

    changeChargeStationStartBox(event){
        let chargeStation = this.state.chargeStationVal;
        chargeStation[1] = event.target.value;
    }

    changeChargeStationEndBox(event){
        let chargeStation = this.state.chargeStationVal;
        chargeStation[2] = event.target.value;
    }

    makeChargeStationStartEndTimeBoxes(){
        let chargeStationValues = this.state.chargeStationVal;
        let chargeStation = chargeStationValues[0];
        if( chargeStation !== "None" && chargeStation !== ''){
            if(chargeStation === "Attempted"){
                return (
                    <div>
                        <label> {"ChargeStation Start: "}
                            <input type="number" onChange={this.changeChargeStationStartBox}></input>
                        </label>
                    </div>
                )
            } else if(chargeStation === 'Parked') {
                return <div></div> 
            } else {
                return (
                    <div>
                        <div>
                            <label> {"ChargeStation Start: "}
                                <input type="number" onChange={this.changeChargeStationStartBox}></input>
                            </label>
                        </div>
                        <div>
                            <label> {"ChargeStation End: "}
                                <input type="number" onChange={this.changeChargeStationEndBox}></input>
                            </label>
                        </div>
                    </div>
                )
            } 
        } else {
            return <div></div>;
        }
    }

    makeChargeStationDropDown(){
        return(
            <div>
                <StationDropDown
                    changeChargeStationUsed={this.changeChargeStation}
                    makeChargeStationStartEndTimeBoxes={this.makeChargeStationStartEndTimeBoxes}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

    setComment(event){
        this.setState({comments: event.target.value});
    }

    //-------------------------------------------------------------------------------------------------------------//

    penaltyBoxChecked(i, label){
        let penaltyStates = this.state.pentalyVal;
        if(penaltyStates[i] === label){
            penaltyStates[i] = ' ';
        } else {
            penaltyStates[i] = label;
        }
    }

    makePenaltyBox(name ,i){
        return(
            <div>
                <CheckBox
                    label={name}
                    changeState={this.penaltyBoxChecked}
                    place={i}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//
    render(){
        return(
            <div>
                <h1> FORM </h1>
                {this.makeMatchDropDown}
                {this.makeTeamDropdown()}
                <br></br>
                <h3>AUTONOMOUS</h3>
                {this.makeChargeStationDropDown()}
                <br></br>
                <h3>TELE-OP</h3>
                {this.makeChargeStationDropDown()}
                {this.makeChargeStationStartEndTimeBoxes()}
                {this.makeDropDownBox("Drive: ", [1,2,3],0)}
                {this.makeDropDownBox("Test 2: ", ["Slow", "Fast", "Really Fast"], 1)}
                {this.makePenaltyBox("Yellow Card ",0)}
                <CounterBox></CounterBox>
                <br></br>
                <p>How well is there defense if any?</p>
                <TextBox title={'Comments: '} commentState={this.setComment}></TextBox>
            </div>
        )
    }
}

export default Form;