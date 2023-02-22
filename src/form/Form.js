import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import EndGame from './EndGame';
import ChargeStation from './ChargeStation';
import CounterBox from './CounterBox';
import {getRegionals, getTeamsInRegional,} from "../api/bluealliance";
import TextBox from './TextBox';
import Headers from './Header';
import StationTimer from './StationTimer';
import {apiAddTeam, apiCreateTeamMatchEntry, apiUpdateTeamMatch} from '../api';
import { ConsoleLogger } from '@aws-amplify/core';


class Form extends React.Component{
    constructor(props){
        super(props)

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeMatchNumber =  this.changeMatchNumber.bind(this);
        this.makeMatchTypeDropDown = this.makeMatchTypeDropDown.bind(this);
        this.changeElmNum = this.changeElmNum.bind(this);
        this.getMatchTeams = this.getMatchTeams.bind(this);

        this.whoWonClicked = this.whoWonClicked.bind(this);
        this.makeWhoWonBox = this.makeWhoWonBox.bind(this);

        this.strategyBox = this.strategyBox.bind(this);
        this.makeStrategyBox = this.makeStrategyBox.bind(this);

        this.makeMatchDropDown = this.makeMatchDropDown(this);
        this.changeTeam = this.changeTeam.bind(this);
        
        this.dropDownChanged = this.dropDownChanged.bind(this);
        this.makeDropDownBox = this.makeDropDownBox.bind(this);

        this.changeEndGame = this.changeEndGame.bind(this);
        this.makeEndGameDropDown = this.makeEndGameDropDown.bind(this);
        this.changeEndGameStartBox = this.changeEndGameStartBox.bind(this);
        this.changeEndGameEndBox = this.changeEndGameEndBox.bind(this);
        this.makeEndGameStartEndBox = this.makeEndGameStartEndBox.bind(this);

        this.changeChargeStation = this.changeChargeStation.bind(this);
        this.makeChargeStationAuto = this.makeChargeStationAuto.bind(this);

        this.runTimer = this.runTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.timeChanged = this.timeChanged.bind(this);
        this.makeChargeStationTimer = this.makeChargeStationTimer.bind(this);
    
        this.buttonMinus = this.buttonMinus.bind(this);
        this.buttonPlus = this.buttonPlus.bind(this);
        this.counterBoxChanged = this.counterBoxChanged.bind(this);
        this.makeCounterBox = this.makeCounterBox.bind(this);

        this.penaltyBoxChecked = this.penaltyBoxChecked.bind(this); //aa
        this.makePenaltyBox = this.makePenaltyBox.bind(this);

        this.smartPlacementChecked = this.smartPlacementChecked.bind(this);
        this.makeSmartPlacementBox = this.makeSmartPlacementBox.bind(this);

        this.bonusBoxChecked = this.bonusBoxChecked.bind(this);
        this.makeBonusBox =  this.makeBonusBox.bind(this);

        this.mobilityBoxClick = this.mobilityBoxClick.bind(this);
        this.makeMobilityBox = this.makeMobilityBox.bind(this);

        this.overrideChange = this.overrideChange.bind(this);
        this.makeOverrideBox = this.makeOverrideBox.bind(this);

        this.logState = this.logState.bind(this);
        this.setComment = this.setComment.bind(this);

        this.submitState = this.submitState.bind(this);

        this.state = {
            comments: '',
            summaryComments: '',
            stationComments: '',
            matchType:'',
            elmNum:'',
            matchNumber:'',
            matchData: 'not found',
            teamNumber: ' ',
            teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
            matchOverride: false,
            override: false,
            endGameVal: ['', '',''],
            chargeStationValAuto: '',
            endGameTimer: 0.0,
            whoWon: '',
            checkedWhoWon: [' ', ' '],
            rankingPts: 0,
            bonusVal: [' ', ' '],
            pentalyVal: [' ',' ',' ',' ',' '],
            dropDownVal:['', '', '','',''],
            counterBoxVals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            smartPlacementVal: '',
            strategyVal: [' ',' ',' ',' ',' ',' ',' ',' ',' '],
            mobilityVal: '',
            totalPoints: 0,
            cubesAccuracy: 0,
            conesAccuracy: 0,


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

    changeElmNum(event){
        this.setState({elmNum:(event.target.value)});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber: ' '});
    }

    changeMatchNumber(event){
        if(event.target.value !== 0){
            this.setState({matchOverride: false})
        }
        this.setState({matchNumber: event.target.value});
        this.setState({teams:['team1', 'team2', 'team3', 'team4', 'team5', 'team6']});
        this.setState({teamNumber:''});
    }

    makeMatchTypeDropDown(matchType){
       if(matchType === 'qf' || matchType === 'sf' || matchType === 'f'){
        return(
            <input onChange={this.changeElmNum}/>
        )
       }
    }

    makeMatchDropDown(){
        return(
            <div>
                <MatchDropDown
                    setMatchType={this.changeMatchType}
                    setElmNum={this.changeElmNum}
                    generateMatchTypeNum={this.makeMatchTypeDropDown}
                    setMatchNumber={this.changeMatchNumber}

                />
            </div>
        )
    }


    logState(){
        console.log(this.state)
    }

    async getMatchTeams(){
        //console.log(this.state.matchType)// + this.state.elmNum + "m" + this.state.matchNumber)
        let matchKey =  /*put this years event*//*/*/ "2022hiho"  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
        const teams = async () => {
            await fetch('https://www.thebluealliance.com/api/v3/event/'  +  '2022hiho' /* change event_key*/  + '/matches' ,{
                mode: 'cors',
                headers:{
                'X-TBA-Auth-Key': 'TKWj89sH9nu6hwIza0zK91UQBRUaW5ETVJrZ7KhHOolwmuKxKqD3UkQMAoqHahsn'
                }
            })
            .then(response => response.json())
            .then(data => {
                data.map((matches) =>{
                    console.log(matches.key)
                    if(matches.key === matchKey){
                        this.setState({matchData: matches})
                        this.setState({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});
                        console.log({teams:matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys)});

                    }
                })
            })
            .catch(err => console.log(err))
        }
        console.log(this.matchKey);
        console.log(this.matchData)
        teams();
    }

    changeTeam(event){
        this.setState({teamNumber:event.target.value});
        let data = this.state.matchData;
        let teamColor = 'blue';
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
        return parseInt(this.state.matchNumber) !== 0 ?(
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

    whoWonClicked(i,label){
        let data = this.state.matchData;
        if(data === 'not found'){
            window.alert("PICK A TEAM FIRST");
        }
        else{
            if(label === 'Team Won '){
                this.setState({rankingPts:2});
            }
            else if(label === 'Team Tied '){
                this.setState({rankingPts:1});
            }
            this.setState({bonusVal:[' ',' ']})

            let whoWon = this.state.checkedWhoWon
            whoWon[i - 1] = ' ';
            whoWon[i + 1] = ' ';
            if(whoWon[i] === label){
                whoWon[i] = ' ';
            }
            else if(whoWon[i] === ' '){
                whoWon[i] = label;
            }

            if(whoWon[0] === ' ' && whoWon[1] === ' '){
                this.setState({rankingPts:0});
            }
        }
    }

    makeWhoWonBox(name, i){
        let whoWon = this.state.checkedWhoWon;
        let checkVal;
        if(whoWon[i] === name){
            checkVal = true;
        } else {
            checkVal = false;
        }

        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.whoWonClicked}
                    place={i}
                    checked={checkVal}
                />
            </div>
        )
    }

    strategyBox(i, label){
        let strategyStates = this.state.strategyVal;
        if(strategyStates[i] === label){
            strategyStates[i] = ' ';
        } else {
            strategyStates[i] = label;
        } 
    }

    makeStrategyBox(name, i){
        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.strategyBox}
                    place={i}
                />
            </div>
        )
    }

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

    changeEndGame(event){
        let endGame = Array(this.state.endGameVal);
        endGame[0] = event.target.value;
        this.setState({endGameVal: endGame});
    }

    changeEndGameStartBox(event){
        let endGame = this.state.endGameVal;
        endGame[1] = event.target.value;
    }

    changeEndGameEndBox(event){
        let endGame = this.state.endGameVal;
        endGame[2] = event.target.value;
    }

    makeEndGameStartEndBox(){
        let endGameValues = this.state.endGameVal;
        let endGame = endGameValues[0];
        if( endGame !== "None" && endGame !== ''){
            if(endGame === "Attempted"){
                return (
                    <div>
                        <label> {"End Game Start: "}
                            <input type="number" onChange={this.changeEndGameStartBox}></input>
                        </label>
                        <TextBox title={'End Game Comment:'} subtitle={'EX: when they had to get on compared to rest of alliance, were they the one doing the balancing, did they mess up alliances balance, etc.'} commentState={event => {this.setState({stationComments: event.target.value})}}/>
                    </div>
                )
            } else if(endGame === 'Parked') {
                return <div></div> 
            } else {
                return (
                    <div>
                        <div>
                            <label> {"End Game Start: "}
                                <input type="number" onChange={this.changeEndGameStartBox}></input>
                            </label>
                        </div>
                        <div>
                            <label> {"End Game End: "}
                                <input type="number" onChange={this.changeEndGameEndBox}></input>
                            </label>
                            <TextBox title={'End Game Comment: '} subtitle={'EX: when they had to get on compared to rest of alliance, were they the one doing the balancing, did they mess up alliances balance, etc.'} commentState={event => {this.setState({stationComments: event.target.value})}}/>
                        </div>
                    </div>
                )
            } 
        } else {
            return <div></div>;
        }
    }

    makeEndGameDropDown(){
        return(
            <div>
                <EndGame
                    changeEndGameUsed={this.changeEndGame}
                    makeEndGameStartEndBox={this.makeEndGameStartEndBox}
                />
            </div>
        )
    }

    changeChargeStation(event){
        let chargeStation = this.state.chargeStationValAuto;
        chargeStation = event.target.value;
        this.setState({chargeStationValAuto: chargeStation});
    }

    makeChargeStationAuto(){
        return(
            <div>
                <ChargeStation
                    changeChargeStationUsed={this.changeChargeStation}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

    runTimer(event) {
        console.log("starting")
        let endGameTimerState = this.state.endGameTimer
        setInterval(() => {
            if (this.stopTimer === true) {
                return;
            }
            endGameTimerState = parseInt(Math.round(event.target.value + .1) * 10) / 10;
        }, 100)
    }

    stopTimer(event) {
        let endGameTimerState = this.state.endGameTimer
        console.log(endGameTimerState)
        endGameTimerState = parseInt(Math.round(event.target.value + .1) * 10) / 10;
        return true;
    }

    timeChanged(event) {
        let endGameTimerState = this.state.endGameTimer
        if (event.target.value === '') {
            endGameTimerState = 0;
        }
        else {
            endGameTimerState = event.target.value;
        }
    }

    makeChargeStationTimer(title) {
        let endGameTimerState = this.state.endGameTimer
        return (
            <div>
                <StationTimer
                label={title}
                setState={this.timeChanged}
                state={endGameTimerState}
                startButton={this.runTimer}
                stopButton={this.stopTimer}
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

    makePenaltyBox(name, i){
        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.penaltyBoxChecked}
                    place={i}
                />
            </div>
        )
    }

    smartPlacementChecked(label){
        let smartPlacementState = this.state.smartPlacementVal;
        if(smartPlacementState ===  label){
            smartPlacementState = ' ';
        } else {
            smartPlacementState = label;
        }
    }

    makeSmartPlacementBox(name, i){
        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.smartPlacementChecked}
                    place={i}
                />
            </div>
        )
    }

    bonusBoxChecked(i, label){
        let bonusState = this.state.bonusVal;
        if(bonusState[i] === label){
            this.setState({rankingPts: this.state.rankingPts - 1});
        } else { 
            this.setState({rankingPts: this.state.rankingPts + 1});
        }

        if(bonusState[i] === label){
            bonusState[i] = ' ';
        } else {
            bonusState[i] = label;
        }
    }

    makeBonusBox(name, i){
        let bonusState = this.state.bonusVal;
        let checkedVal;
        if(bonusState[i] === name){
            checkedVal = true;
        } else{
            checkedVal = false;
        }
        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.bonusBoxChecked}
                    place={i}
                    checked={checkedVal}
                />
            </div>
        )
    }

    mobilityBoxClick(i ,label){
        let mobilityState =  this.state.mobilityVal;
        if(mobilityState === label){
            mobilityState = ' ';
        } else {
            mobilityState = label;
        }
    }

    makeMobilityBox(name, i){
        return(
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.mobilityBoxClick}
                    place={i}
                />
            </div>
        )
    }

    overrideChange(fill, filler){
        this.setState({override: !this.state.override});
    }

    makeOverrideBox(){
        return(
            <div>
                <CheckBox
                    label={'Override '}
                    changeCheckBoxState={this.overrideChange}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

    counterBoxChanged(event, i) {
        let counterStates = this.state.counterBoxVals;
        if(event.target.value === '') {
            counterStates[i] = 0
        }
        else {
            counterStates[i] = event.target.value;
        }
    }

    buttonMinus(event, i) {
        let counterStates = this.state.counterBoxVals;
        if (counterStates[i] > 0) {
            counterStates[i] = parseInt(counterStates[i] - 1)
        }
        else if (counterStates[i] <= 0) {
            counterStates[i] = 0
        }
    }
    
    buttonPlus(event, i) {
        let counterStates = this.state.counterBoxVals;
        if (counterStates[i] >= 0) {
            counterStates[i] = parseInt(counterStates[i] + 1)
        }
        else if (counterStates[i] < 0) {
            counterStates[i] = 0
        }
    }

    makeCounterBox(title, i) {
        let counterStates = this.state.counterBoxVals;
        return (
            <div>
                <CounterBox
                    label={title}
                    setState={this.counterBoxChanged}
                    place={i}
                    state={counterStates[i]}
                    minusButton={this.buttonMinus}
                    plusButton={this.buttonPlus}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

    async submitState(){
        let windowAlertMsg = 'Form is incomplete, you still need to fill out: ';
        let matchKey = /*put this years event*//*/*/ "2022hiho"  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
        let teamNum = this.state.teamNumber;

        let dropVal = this.state.dropDownVal;
        let autoPlacement = dropVal[0];
        let driveStrength = dropVal[1];
        let driveSpeed = dropVal[2];
        let doubleStation = dropVal[3];

        let endGame = this.state.endGameVal;
        let endGameUsed = endGame[0];
        let endGameStart = endGame[1];
        let endGameEnd = endGame[3];

        let chargeStationAuto = this.state.chargeStationValAuto;

        let bonuses = this.state.bonusVal;
        let strats = this.state.strategyVal;
        let strategies = this.state.strategyVal;
        let penalties = this.state.pentalyVal;
        let smartPlacemnet = this.state.smartPlacementVal;

        let counterVal =  this.state.counterBoxVals;

        let highAutoCubes = parseInt(counterVal[0]);
        let midAutoCubes = parseInt(counterVal[1]);
        let lowAutoCubes = parseInt(counterVal[2]); 
        let highAutoCones = parseInt(counterVal[6]);
        let midAutoCones = parseInt(counterVal[7]);
        let lowAutoCones = parseInt(counterVal[8]);

        let highTeleCubes = parseInt(counterVal[12]);
        let midTeleCubes = parseInt(counterVal[13]);
        let lowTeleCubes = parseInt(counterVal[14]);
        let highTeleCones = parseInt(counterVal[18]);
        let midTeleCones = parseInt(counterVal[19]);
        let lowTeleCones = parseInt(counterVal[20]);

        let cubesAttempted = parseInt(counterVal[3]) + parseInt(counterVal[4]) + parseInt(counterVal[5]) + parseInt(counterVal[15]) + parseInt(counterVal[16]) + parseInt(counterVal[17]); 
        let conesAttempted = parseInt(counterVal[9]) + parseInt(counterVal[10]) + parseInt(counterVal[11]) + parseInt(counterVal[21]) + parseInt(counterVal[22]) + parseInt(counterVal[23]);

        let highCubesAttempted = parseInt(counterVal[3]) + parseInt(counterVal[15]);
        let highConesAttempted = parseInt(counterVal[9]) + parseInt(counterVal[21]);
        let midCubesAttempted = parseInt(counterVal[4]) + parseInt(counterVal[16]);
        let midConesAttempted = parseInt(counterVal[10]) + parseInt(counterVal[22]);
        let lowCubesAttempted = parseInt(counterVal[5]) + parseInt(counterVal[17]);
        let lowConesAttempted = parseInt(counterVal[11]) + parseInt(counterVal[23]);

        let mobility = this.state.mobilityVal;

        let endGamePts = 0;
        let chargeStationPts = 0;
        let mobilityPts = 0;

        let incompleteForm = false;
        let incompletePriorities = true;

        let override = this.state.override;

        if(endGameUsed === 'DockEngage'){
            endGamePts = 10;
        } else if(endGameUsed === "DockedNotEngaged"){
            endGamePts = 6;
        } else if(endGameUsed === 'Parked'){
            endGamePts = 2;
        } else {
            endGamePts = 0;
        }

        if(endGameUsed === '' ){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat charge station the robot did"
        }  else{ 
            if(endGameUsed !== 'None'){
                if(endGameUsed === 'Attempted'){
                    if(endGameStart === ''){
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot started charge station"
                    }
                } else {
                    if(endGameStart === ''){
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot started charge station"
                    } if(endGameEnd === ''){
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot ended charge station"
                    }
                }
            }
        }

        if(chargeStationAuto === 'DockEngage'){
            chargeStationPts = 12;
        } else if(chargeStationAuto === "DockedNotEngaged"){
            chargeStationPts = 8;
        } else {
            chargeStationPts = 0;
        }

        if(chargeStationAuto === '' ){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat charge station the robot did"
        }

        if(mobility === ' '){
            mobilityPts = 0;
        } else{
            mobilityPts = 2;
        }

        let highGridPoints = 6 * (highAutoCones + highAutoCubes) + 5 * (highTeleCones + highTeleCubes);
        let midGridPoints = 4 * (midAutoCones + midAutoCubes) + 3 * (midTeleCones + midTeleCubes);
        let lowGridPoints = 3 * (lowAutoCones + lowAutoCubes) + 2 * (lowTeleCones + lowTeleCubes);
        let autoPoints = 6 * (highAutoCones + highAutoCubes) + 4 * (midAutoCones + midAutoCubes) + 3 * (lowAutoCones + lowAutoCubes);
        let telePoints = 5 * (highTeleCones + highTeleCubes) + 3 * (midTeleCones + midTeleCubes) + 2 * (lowTeleCones + lowTeleCubes);
        let points = (chargeStationPts + endGamePts + mobilityPts) + autoPoints + telePoints;
        let cubePts = (highAutoCubes * 6) + (highTeleCubes * 5) + (midAutoCubes * 4) + (midTeleCubes * 3) + (lowAutoCubes * 3) +  (lowTeleCubes * 2);
        let conePts = (highAutoCones * 6) + (highTeleCones * 5) + (midAutoCones * 4) + (midTeleCones * 3) + (lowAutoCones * 3) +  (lowTeleCones * 2);

        let cubesHighTeleAutoAccuracy = 100 * ((highAutoCubes + highTeleCubes) / (highCubesAttempted));
        let conesHighTeleAutoAccuracy = 100 * ((highAutoCones +  highTeleCones) / (highConesAttempted));
        let highAccuracy = 100 * ((conesHighTeleAutoAccuracy + cubesHighTeleAutoAccuracy) / (highCubesAttempted + highConesAttempted));

        let cubesMidTeleAutoAccuracy = 100 * ((midAutoCubes + midTeleCubes) / (midCubesAttempted));
        let conesMidTeleAutoAccuracy = 100 * ((midAutoCones + midTeleCones) / (midConesAttempted));
        let midAccuracy = 100 * ((cubesMidTeleAutoAccuracy + conesMidTeleAutoAccuracy) / (midCubesAttempted + midConesAttempted));

        let cubesLowTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes) / (lowCubesAttempted));
        let conesLowTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones) / (lowConesAttempted));
        let lowAccuracy = 100 * ((cubesLowTeleAutoAccuracy + conesLowTeleAutoAccuracy) / (lowCubesAttempted + lowConesAttempted));

        let totalGridPts = highGridPoints + midGridPoints + lowGridPoints;

        let cubesTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes + midAutoCubes + midTeleCubes + highAutoCubes + highTeleCubes) / (lowCubesAttempted + midCubesAttempted + highCubesAttempted));
        let conesTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones + midAutoCones + midTeleCones + highAutoCones + highTeleCones) / (lowConesAttempted + midConesAttempted + highConesAttempted));
        

        this.setState({
            totalPoints: points,
            cubesAccuracy: cubesTeleAutoAccuracy,
            conesAccuracy: conesTeleAutoAccuracy,
            
        })
        
        if(autoPlacement === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nPosition of robot during Auto"
        }

        if(driveStrength === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat strength is the robot drive"
        }

        if(driveSpeed === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nHow fast is the robot drive"
        }

        if(this.state.matchType === 'qf' || this.state.matchType === 'sf' || this.state.matchType === 'f'){
            if(this.state.elmNum === ''){
                incompleteForm = true;
                windowAlertMsg = windowAlertMsg + "\nFinals Number";
            }
        } else if(this.state.matchType === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nMatch Type (Qualifications, Quarterfinals, Semifinals, Finals)"
        } 
        
        if(this.state.matchNumber === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nMatch Number";
        }

        if(this.state.teamNumber === ''){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nTeam Number"
        }

        strats.filter(strat => {
            if(strat !== ' '){
                incompletePriorities = false;
            }
        })

        if(incompletePriorities === true){
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nRobot priorities/strategies";
        }

        if(incompleteForm === true && override === false){
            window.alert(windowAlertMsg);
        } else if (incompleteForm === false || override === true){
            console.log(penalties);
            apiCreateTeamMatchEntry("2022hiho", teamNum, matchKey)
            /*.then(data => {
                console.log(data)
            }) 
            apiAddTeam('2023hiho', teamNum, matchKey)
            .then(data => { 
                console.log(data)
            })*/
            .then({
                body:{
                    TeamId: this.state.teamNumber.substring(3, this.state.teamNumber.length),
                    RegionalId: "2022hiho",
                    MatchId: /*put this years event*//*/*/ "2022hiho"  /* */ /*await getRegionals()*/    + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber,

                    TotalPoints: Number(points),
                    TotalGridPoints: Number(totalGridPts),
                    CubeTotalPoints: Number(cubePts),
                    ConeTotalPoints: Number(conePts),
                    HighGridPoints: Number(highGridPoints),
                    MidGridPoints: Number(midGridPoints),
                    LowGridPoints: Number(lowGridPoints),
                    CubesAccuracy: Number(cubesTeleAutoAccuracy),
                    ConesAccuracy: Number(conesTeleAutoAccuracy),
                    LowAccuracy: Number(lowAccuracy),
                    MidAccuracy: Number(midAccuracy),
                    HighAccuracy: Number(highAccuracy),

                    HighCubeAccuracy: Number(cubesHighTeleAutoAccuracy),
                    HighConeAccuracy: Number(conesHighTeleAutoAccuracy),
                    MidCubeAccuracy: Number(cubesMidTeleAutoAccuracy),
                    MidConeAccuracy: Number(conesMidTeleAutoAccuracy),
                    LowCubeAccuracy: Number(cubesLowTeleAutoAccuracy),
                    LowConeAccuracy: Number(conesLowTeleAutoAccuracy),

                    AutoPlacement: Number(autoPlacement),

                    AutoHighCubesScored: Number(counterVal[0]),
                    AutoMidCubesScored: Number(counterVal[1]),
                    AutoLowCubesScored: Number(counterVal[2]),

                    AutoHighConesScored: Number(counterVal[6]),
                    AutoMidConesScored: Number(counterVal[7]),
                    AutoLowConesScored: Number(counterVal[8]),

                    AutoHighCubesAttempted: Number(counterVal[3]),
                    AutoMidCubesAttempted: Number(counterVal[4]),
                    AutoLowCubesAttempted: Number(counterVal[5]),

                    AutoHighConesAttempted: Number(counterVal[9]),
                    AutoMidConesAttempted: Number(counterVal[10]),
                    AutoLowConesAttempted: Number(counterVal[11]),

                    LeftCommunity: Boolean(mobility),
                    ChargeStation: String(chargeStationAuto),
                            
                    TeleHighCubesScored: Number(counterVal[12]),
                    TeleMidCubesScored: Number(counterVal[13]),
                    TeleLowCubesScored: Number(counterVal[14]),

                    TeleHighCubesAttempted: Number(counterVal[15]),
                    TeleMidCubesAttempted: Number(counterVal[16]),
                    TeleLowCubesAttempted: Number(counterVal[17]),

                    TeleHighConesScored: Number(counterVal[18]),
                    TeleMidConesScored: Number(counterVal[19]),
                    TeleLowConesScored: Number(counterVal[20]),

                    TeleHighConesAttempted: Number(counterVal[21]),
                    TeleMidConesAttempted: Number(counterVal[22]),
                    TeleLowConesAttempted: Number(counterVal[23]),
                   
                    EndGame: String(endGameUsed),
                    EndGameStart: Number(endGameStart),
                    EndGameEnd: Number(endGameEnd),
                    EndGameComment:  String(this.state.stationComments),

                    StartPlacement: Boolean(smartPlacemnet),
                    BonusRankingPoints: bonuses,
                    RankingPts: Number(this.state.rankingPts),
    
                    DriveStrength: String(driveStrength),
                    DriveSpeed: String(driveSpeed),

                    Fouls: Number(counterVal[24]),
                    TechFouls: Number(counterVal[25]),
                    Penalties: penalties,
                    Strategy: strategies,
                    DoubleSubstation: String(doubleStation[3]),
                    Comment: String(this.state.comments),
                    SummaryComments: String(this.state.summaryComments),

                }
            }) 
            .then(window.alert("States have successfully been submited to table"))
            .catch(err => {
                console.log(err)
            })
        }
        console.log(this.state);

    }


    //-------------------------------------------------------------------------------------------------------------//

    render(){
        return(
            <div>
                <h1> FORM  <img src={'./images/BLUETHUNDERLOGO_WHITE.png'} width= "35px" height= "35px"></img></h1>
                <button onClick={this.logState}> Check State </button>
                {this.makeMatchDropDown}
                <button onClick={this.getMatchTeams}>GET MATCH TEAM</button>
                <br></br>
                {this.makeTeamDropdown()}
                <br></br>
                <h3>AUTONOMOUS</h3>
                <img src={'./images/auto placement.jpg'}></img>
                {this.makeDropDownBox("Auto Placement On Community: ",[1,2,3,4,5,6],0)}
                <br></br>
                <p>Cubes Scored</p>
                {this.makeCounterBox("High Cubes Made: ", 0)}
                {this.makeCounterBox("Mid Cubes Made: ", 1)}
                {this.makeCounterBox("Low Cubes Made: ", 2)}
                <p>Cubes Attempted</p>
                {this.makeCounterBox("High Cubes Attempted: ", 3)}
                {this.makeCounterBox("Mid Cubes Attempted: ", 4)}
                {this.makeCounterBox("Low Cubes Attempted: ", 5)}
                <p>Cones Scored</p>
                {this.makeCounterBox("High Cones Made: ", 6)}
                {this.makeCounterBox("Mid Cones Made: ", 7)}
                {this.makeCounterBox("Low Cones Made: ", 8)}
                <p>Cones Attempted</p>
                {this.makeCounterBox("High Cones Attempted: ", 9)}
                {this.makeCounterBox("Mid Cones Attempted: ", 10)}
                {this.makeCounterBox("Low Cones Attempted: ", 11)}
                <br></br>
                {this.makeMobilityBox("Mobility ")}
                <br></br>
                {this.makeChargeStationAuto()}
                <br></br>
                <h3>TELE-OP</h3>
                <p>Cubes Scored</p>
                {this.makeCounterBox("High Cubes Made: ", 12)}
                {this.makeCounterBox("Mid Cubes Made: ", 13)}
                {this.makeCounterBox("Low Cubes Made: ", 14)}
                <p>Cubes Attempted</p>
                {this.makeCounterBox("High Cubes Attempted: ", 15)}
                {this.makeCounterBox("Mid Cubes Attempted: ", 16)}
                {this.makeCounterBox("Low Cubes Attempted: ", 17)}
                <p>Cones Scored</p>
                {this.makeCounterBox("High Cones Made: ", 18)}
                {this.makeCounterBox("Mid Cones Made: ", 19)}
                {this.makeCounterBox("Low Cones Made: ", 20)}
                <p>Cones Attempted</p>
                {this.makeCounterBox("High Cones Attempted: ", 21)}
                {this.makeCounterBox("Mid Cones Attempted: ", 22)}
                {this.makeCounterBox("Low Cones Attempted: ", 23)}
                <br></br>
                {this.makeEndGameDropDown()}
                {this.makeEndGameStartEndBox()}
                <br></br>
                {this.makeSmartPlacementBox("Smart Placement ")}
                <br></br>
                {this.makeDropDownBox("Drive Strength: ", ["Weak","Normal","Strong"],1)}
                {this.makeDropDownBox("Drive Speed: ", ["Slow", "Fast", "Really Fast"], 2)}
                <br></br>
                <h2>Penalties</h2>
                {this.makeCounterBox("Fouls: ", 24)}
                {this.makeCounterBox("Tech Fouls: ", 25)}
                {this.makePenaltyBox("Yellow Card ",0)}
                {this.makePenaltyBox("Red Card ", 1)}
                {this.makePenaltyBox("Disable ", 2)}
                {this.makePenaltyBox("Disqualifed ", 3)}
                {this.makePenaltyBox("Bot Broke ", 4)}
                {this.makePenaltyBox("No Show ", 5)}
                <br></br>
                <h2>Ranking Points</h2>
                {this.makeWhoWonBox("Team Won ", 0)}
                {this.makeWhoWonBox("Team Tied ", 1)}
                {this.makeBonusBox("Activation ",0)}
                {this.makeBonusBox("Sustainability ", 1)}
                <Headers display={this.state.rankingPts} bonus={this.state.bonusVal}/>
                <br></br>
                <h2>Strategy & Priorities</h2>
                {this.makeStrategyBox("Low Node ", 0)}
                {this.makeStrategyBox("Mid Node ", 1)}
                {this.makeStrategyBox("High Node ", 2)}
                {this.makeStrategyBox("Cubes ", 3)}
                {this.makeStrategyBox("Cones ", 4)}
                {this.makeStrategyBox("Charge Station ", 5)}
                {this.makeStrategyBox("Single Substation ", 6)}
                {this.makeDropDownBox("Double Substation: ",["Shute","Sliding Shelve"], 3)}
                <br></br>
                <p>How well is there defense if any?</p>
                <TextBox title={"Comments: "} commentState={this.setComment}></TextBox>
                <div>
                    <button onClick={this.submitState}>Submit</button>
                </div>
                <p> ONLY CLICK IF NOTHING ELSE CAN BE FILLED </p>
                {this.makeOverrideBox()}
            </div>
        )
    }
}

export default Form;