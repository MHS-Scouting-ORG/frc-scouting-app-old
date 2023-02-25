import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import EndGame from './EndGame';
import ChargeStation from './ChargeStation';
import CounterBox from './CounterBox';
import { getRegionals, getTeamsInRegional, } from "../api/bluealliance";
import TextBox from './TextBox';
import Headers from './Header';
import StationTimer from './StationTimer';
import { apiCreateTeamMatchEntry, apiUpdateTeamMatch } from '../api';
import { ConsoleLogger } from '@aws-amplify/core';
import { ChargeStationType, RankingPtsOpts } from '../api/builder';


class Form extends React.Component {
    constructor(props) {
        super(props)

        this.changeMatchType = this.changeMatchType.bind(this);
        this.changeMatchNumber = this.changeMatchNumber.bind(this);
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

        // TESTING this out
        this.changeBooleanCheckBox = this.changeBooleanCheckBox.bind(this);
        this.makeBooleanCheckBox = this.makeBooleanCheckBox.bind(this);

        this.bonusBoxChecked = this.bonusBoxChecked.bind(this);
        this.makeBonusBox = this.makeBonusBox.bind(this);

        this.mobilityBoxClick = this.mobilityBoxClick.bind(this);
        this.makeMobilityBox = this.makeMobilityBox.bind(this);

        this.overrideChange = this.overrideChange.bind(this);
        this.makeOverrideBox = this.makeOverrideBox.bind(this);

        this.logState = this.logState.bind(this);
        this.setComment = this.setComment.bind(this);

        this.submitState = this.submitState.bind(this);

        this.state = {
            ChargeStationType: '',
            RankingPtsOpts: [],
            comments: '',
            summaryComments: '',
            stationComments: '',
            matchType: '',
            elmNum: '',
            matchNumber: '',
            matchData: 'not found',
            teamNumber: ' ',
            teams: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6'],
            matchOverride: false,
            override: false,
            endGameVal: ['', '', ''],
            chargeStationValAuto: '',
            whoWon: '',
            //checkedWhoWon: [' ', ' '],
            rankingPts: 0,
            rankingState: [" "," "," "],
            bonusVal: [' ', ' '],
            bonusState: '',
            penatlyVal: [' ', ' ', ' ', ' ', ' '],
            dropDownVal: ['', '', '', '', ''],
            counterBoxVals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            //smartPlacementVal: false,
            strategyVal: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
            //mobilityVal: false,
            booleans: [false, false],
            totalPoints: 0,
            cubesAccuracy: 0,
            conesAccuracy: 0,
        }
    }

    //------------------------------------------------------------------------------------------------------------------------//

    changeMatchType(event) {
        let matchType = event;
        if (matchType === 'q') {
            this.setState({ elmNum: '' });
        }
        this.setState({ matchType: event });
        this.setState({ teams: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6'] });
        this.setState({ teamNumber: ' ' });
    }

    changeElmNum(event) {
        this.setState({ elmNum: (event.target.value) });
        this.setState({ teams: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6'] });
        this.setState({ teamNumber: ' ' });
    }

    changeMatchNumber(event) {
        if (event.target.value !== 0) {
            this.setState({ matchOverride: false })
        }
        this.setState({ matchNumber: event.target.value });
        this.setState({ teams: ['team1', 'team2', 'team3', 'team4', 'team5', 'team6'] });
        this.setState({ teamNumber: '' });
    }

    makeMatchTypeDropDown(matchType) {
        if (matchType === 'qf' || matchType === 'sf' || matchType === 'f') {
            return (
                <input onChange={this.changeElmNum} />
            )
        }
    }

    makeMatchDropDown() {
        return (
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


    logState() {
        console.log(this.state)
    }

    async getMatchTeams() {
        //console.log(this.state.matchType)// + this.state.elmNum + "m" + this.state.matchNumber)
        let matchKey =  /*put this years event*//*/*/ "2022hiho"  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
        const teams = async () => {
            await fetch('https://www.thebluealliance.com/api/v3/event/' + '2022hiho' /* change event_key*/ + '/matches', {
                mode: 'cors',
                headers: {
                    'X-TBA-Auth-Key': 'TKWj89sH9nu6hwIza0zK91UQBRUaW5ETVJrZ7KhHOolwmuKxKqD3UkQMAoqHahsn'
                }
            })
                .then(response => response.json())
                .then(data => {
                    data.map((matches) => {
                        console.log(matches.key)
                        if (matches.key === matchKey) {
                            this.setState({ matchData: matches })
                            this.setState({ teams: matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys) });
                            console.log({ teams: matches.alliances.blue.team_keys.concat(matches.alliances.red.team_keys) });

                        }
                    })
                })
                .catch(err => console.log(err))
        }
        console.log(this.matchKey);
        console.log(this.matchData)
        teams();
    }

    changeTeam(event) {
        this.setState({ teamNumber: event.target.value });
        let data = this.state.matchData;
        let teamColor = 'red';
        let selectedTeam = event.target.value;
        data.alliances.blue.team_keys.map((team) => {
            if (team === selectedTeam) {
                teamColor = 'blue';
            }
        })

        let whoWon = '';
        //let wonState = this.state.whoWon;
        /*if (wonState === '') {
            if (data.alliances.blue.score > data.alliances.red.score) {
                wonState = 'blue';
            } else if (data.alliances.blue.score < data.alliances.red.score) {
                wonState = 'red';
            } else {
                wonState = 'Tie';
            }
        } else if (wonState === 'blue') {
            whoWon = 'blue';
        } else if (wonState === 'red') {
            whoWon = 'red';
        } else {
            whoWon = 'Tie';
        }*/

        if(data.alliances.blue.score > data.alliances.red.score){
            whoWon = 'blue';
        }
        else if(data.alliances.blue.score < data.alliances.red.score){
            whoWon = 'red';
        }
        else{
            whoWon = 'tie'
        }

        let rankingStates = this.state.RankingPtsOpts
        if (teamColor === whoWon) {
            this.setState({ rankingPts: 2 });
            rankingStates[0] = 'Team Won';
        } else if (whoWon === 'Tie') {
            this.setState({ rankingPts: 1 });
            rankingStates[0] = "Team Tied";
        } else {
            this.setState({ rankingPts: 0 });
            rankingStates[0] = 'Team Lost';
        }

        this.setState({ whoWon: '' });
        this.setState({ checkedWhoWon: [' ', ' '] });
        this.setState({ bonusVal: [' ', ' '] });
    }

    makeTeamDropdown() {
        let alliances = this.state.teams;
        return parseInt(this.state.matchNumber) !== 0 ? (
            <div>
                <select onChange={this.changeTeam}>
                    <option></option>
                    {alliances.map((alliances) => <option key={alliances}> {alliances} </option>)}
                </select>
            </div>
        ) : (
            <div>
                <lable> Team Number
                    <input type='number' onChange={e => { this.setState({ teamNumber: 'frc' + e.target.value }) }}></input>
                </lable>
            </div>
        )
    }

    whoWonClicked(i, label) {
        /*let data = this.state.matchData;
        if (data === 'not found') {
            window.alert("PICK A TEAM FIRST");
        }
        else {
            if (label === 'Team Won ') {
                this.setState({ rankingPts: 2 });
                this.setState({rankingState: "Win"});
            }
            else if (label === 'Team Tied ') {
                this.setState({ rankingPts: 1 });
                this.setState({rankingState: "Tie"});
            } else if(label = 'Team Lose '){
                this.setState({ rankingPts: 0 });
                this.setState({rankingState: "Loss"});
            }

            this.setState({ bonusVal: [' ', ' '] })

            let whoWon = this.state.checkedWhoWon
            whoWon[i - 1] = ' ';
            whoWon[i + 1] = ' ';
            if (whoWon[i] === label) {
                whoWon[i] = ' ';
            }
            else if (whoWon[i] === ' ') {
                whoWon[i] = label;
            }

            if (whoWon[0] === ' ' && whoWon[1] === ' ') {
                this.setState({rankingPts: 0 });
                this.setState({rankingState: "Loss"})
            }
        }*/

        let data = this.state.matchData;
        let rankingStates = this.state.RankingPtsOpts;
        if(data === "not found"){
            window.alert("PICK A TEAM FIRST");
        }
        else{
            if(label === 'Team Won '){
                this.setState({rankingPts: 2});
            }
            else if(label === 'Team Tied '){
                this.setState({rankingPts: 1})
            }
            else if(label === 'Team Lost '){
                this.setState({rankingPts: 0})
            }

            rankingStates[0] = label;
            rankingStates[1] = '';
            rankingStates[2] = '';
        }
    }

    makeWhoWonBox(name, i) {
        /*let whoWon = this.state.checkedWhoWon;
        let checkVal;
        if (whoWon[i] === name) {
            checkVal = true;
        } else {
            checkVal = false;
        }*/

        let rankingStates = this.state.RankingPtsOpts;
        let checkVal;
        if(rankingStates[0] === name){
            checkVal = true;
        }
        else{
            checkVal = false;
        }

        return (
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

    strategyBox(i, label) {
        let strategyStates = this.state.strategyVal;
        if (strategyStates[i] === label) {
            strategyStates[i] = ' ';
        } else {
            strategyStates[i] = label;
        }
    }

    makeStrategyBox(name, i) {
        
        return (
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

    dropDownChanged(event, i) {
        let dropDownStates = this.state.dropDownVal;
        dropDownStates[i] = event.target.value
    }



    makeDropDownBox(title, options, i) {
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

    changeEndGame(event) {
        let endGame = Array(this.state.ChargeStationType);
        endGame[0] = event.target.value;
        this.setState({ ChargeStationType: endGame });
    }

    changeEndGameStartBox(event) {
        let endGame = this.state.ChargeStationType;
        endGame[1] = event.target.value;
    }

    changeEndGameEndBox(event) {
        let endGame = this.state.ChargeStationType;
        endGame[2] = event.target.value;
    }

    makeEndGameStartEndBox() {
        let endGameValues = this.state.ChargeStationType;
        let endGame = endGameValues[0];
        if (endGame !== "None" && endGame !== '') {
            if (endGame === "Attempted") {
                return (
                    <div>
                        <label> {"End Game Start: "}
                            <input type="number" onChange={this.changeEndGameStartBox}></input>
                        </label>
                        <TextBox title={'End Game Comment:'} subtitle={'EX: when they had to get on compared to rest of alliance, were they the one doing the balancing, did they mess up alliances balance, etc.'} commentState={event => { this.setState({ stationComments: event.target.value }) }} />
                    </div>
                )
            } else if (endGame === 'Parked') {
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
                            <TextBox title={'End Game Comment: '} subtitle={'EX: when they had to get on compared to rest of alliance, were they the one doing the balancing, did they mess up alliances balance, etc.'} commentState={event => { this.setState({ stationComments: event.target.value }) }} />
                        </div>
                    </div>
                )
            }
        } else {
            return <div></div>;
        }
    }

    makeEndGameDropDown() {
        return (
            <div>
                <EndGame
                    changeEndGameUsed={this.changeEndGame}
                    makeEndGameStartEndBox={this.makeEndGameStartEndBox}
                />
            </div>
        )
    }

    changeChargeStation(event) {
        let chargeStation = this.state.ChargeStationType;
        chargeStation = event.target.value;
        this.setState({ ChargeStationType: chargeStation });
    }

    makeChargeStationAuto() {
        return (
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
        endGameTimerState = parseInt(Math.round(event.target.value + .1) * 10) / 10;
        console.log(endGameTimerState)
        return true;
    }

    timeChanged(event) {
        console.log("yo")
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

    setComment(event) {
        this.setState({ comments: event.target.value });
    }

    //-------------------------------------------------------------------------------------------------------------//


    //PENALTIES
    penaltyBoxChecked(i, label) {
        let penaltyStates = this.state.penatlyVal;
        if (penaltyStates[i] === label) {
            penaltyStates[i] = ' ';
        } else {
            penaltyStates[i] = label;
        }
    }

    makePenaltyBox(name, i) {
        return (
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.penaltyBoxChecked}
                    place={i}
                />
            </div>
        )
    }

    smartPlacementChecked(label) {
        let smartPlacementState = this.state.smartPlacementVal;
        if (smartPlacementState === label) {
            smartPlacementState = false;
        } else {
            smartPlacementState = true;
        }
    }

    makeSmartPlacementBox(name, i) {
        return (
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.smartPlacementChecked}
                    place={i}
                />
            </div>
        )
    }

    bonusBoxChecked(i, label) {
        let bonusState = this.state.bonusVal;
        /*if (bonusState[i] === 'Activation ') {
            this.setState({ rankingPts: this.state.rankingPts - 1 });
            this.setState({rankingState: ' '})
        } else {
            this.setState({ rankingPts: this.state.rankingPts + 1 });
            this.setState({rankingState: 'ActivationBonus'})
        }

        if (bonusState[i] === 'Sustainability ') {
            this.setState({ rankingPts: this.state.rankingPts - 1 });
            this.setState({rankingState: ' '})
        } else {
            this.setState({ rankingPts: this.state.rankingPts + 1 });
            this.setState({rankingState: 'SustainabilityBonus'})
        }

        if (bonusState[i] === label) {
            bonusState[i] = ' ';
        } else {
            bonusState[i] = label;
        }*/

        let rankingStates = this.state.RankingPtsOpts;
        if (rankingStates[i] === label) {
            rankingStates[i] = ' ';
            this.setState({rankingPts: this.state.rankingPts - 1})
        } else {
            rankingStates[i] = label;
            this.setState({rankingPts: this.state.rankingPts + 1})
        }
    }

    makeBonusBox(name, i) {
        /*let bonusState = this.state.bonusVal;
        let checkedVal;
        if (bonusState[i] === name) {
            checkedVal = true;
        } else {
            checkedVal = false;
        }*/

        let rankingStates = this.state.RankingPtsOpts;
        let checkedVal;
        if(rankingStates[i] === name){
            checkedVal = true;
        }
        else {
            checkedVal = false;
        }
        return (
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

    mobilityBoxClick(i, label) {
        let mobilityState = this.state.mobilityVal;
        if (mobilityState === label) {
            mobilityState = false;
        } else {
            mobilityState = true;
        }
    }

    makeMobilityBox(name, i) {
        let mobilityState = this.state.mobilityVal;
        if (mobilityState === name) {
            mobilityState = true;
        } else{
            mobilityState = false;
        }
        return (
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.mobilityBoxClick}
                    place={i}
                    checked={mobilityState}
                />
            </div>
        )
    }

    overrideChange(fill, filler) {
        this.setState({ override: !this.state.override });
    }

    makeOverrideBox() {
        return (
            <div>
                <CheckBox
                    label={'Override '}
                    changeCheckBoxState={this.overrideChange}
                />
            </div>
        )
    }

    changeBooleanCheckBox(i){
        let booleanStates = this.state.booleans
        booleanStates[i] = !booleanStates[i]
    }

    makeBooleanCheckBox(name,i){
        let booleans = this.state.booleans;
        return (
            <div>
                <CheckBox
                    label={name}
                    changeCheckBoxState={this.changeBooleanCheckBox}
                    place={i}
                    //checked={booleans[i]}
                />
            </div>
        )
    }

    //-------------------------------------------------------------------------------------------------------------//

    counterBoxChanged(event, i) {
        let counterStates = this.state.counterBoxVals;
        if (event.target.value === '') {
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

    async submitState() {
        let windowAlertMsg = 'Form is incomplete, you still need to fill out: ';
        let matchKey = /*put this years event*//*/*/ "2022hiho"  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
        let teamNum = this.state.teamNumber;

        let comments = this.state.comments;
        let summaryComments = this.state.summaryComments;

        let dropVal = this.state.dropDownVal;
        let autoPlacement = dropVal[0];
        let driveStrength = dropVal[1];
        let driveSpeed = dropVal[2];
        let doubleStation = dropVal[3];

        let ranking = this.state.rankingPts;
        let rankingState = this.state.RankingPtsOpts;

        let endGame = this.state.ChargeStationType;
        let endGameUsed = endGame[0];
        let endGameStart = endGame[1];
        let endGameEnd = endGame[2];

        let chargeStationAuto = this.state.ChargeStationType;
        let booleans = this.state.booleans;

        let bonuses = this.state.bonusVal;
        let strats = this.state.strategyVal;
        let strategies = this.state.strategyVal;
        let penalties = this.state.penatlyVal;
        let smartPlacement = booleans[1];

        let counterVal = this.state.counterBoxVals;

        let fouls = parseInt(counterVal[24]);
        let techFouls = parseInt(counterVal[25]);

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

        let highCubesAutoAttempted = parseInt(counterVal[3]);
        let midCubesAutoAttempted = parseInt(counterVal[4]);
        let lowCubesAutoAttempted = parseInt(counterVal[5]);
        let highCubesTeleAttempted = parseInt(counterVal[15]);
        let midCubesTeleAttempted = parseInt(counterVal[16]);
        let lowCubesTeleAttempted = parseInt(counterVal[17]);

        let highConesAutoAttempted = parseInt(counterVal[9]);
        let midConesAutoAttempted = parseInt(counterVal[10]);
        let lowConesAutoAttempted = parseInt(counterVal[11]);
        let highConesTeleAttempted = parseInt(counterVal[21]);
        let midConesTeleAttempted = parseInt(counterVal[22]);
        let lowConesTeleAttempted = parseInt(counterVal[23]);

        let cubesAttempted = parseInt(counterVal[3]) + parseInt(counterVal[4]) + parseInt(counterVal[5]) + parseInt(counterVal[15]) + parseInt(counterVal[16]) + parseInt(counterVal[17]);
        let conesAttempted = parseInt(counterVal[9]) + parseInt(counterVal[10]) + parseInt(counterVal[11]) + parseInt(counterVal[21]) + parseInt(counterVal[22]) + parseInt(counterVal[23]);

        let highCubesAttempted = parseInt(counterVal[3]) + parseInt(counterVal[15]);
        let highConesAttempted = parseInt(counterVal[9]) + parseInt(counterVal[21]);
        let midCubesAttempted = parseInt(counterVal[4]) + parseInt(counterVal[16]);
        let midConesAttempted = parseInt(counterVal[10]) + parseInt(counterVal[22]);
        let lowCubesAttempted = parseInt(counterVal[5]) + parseInt(counterVal[17]);
        let lowConesAttempted = parseInt(counterVal[11]) + parseInt(counterVal[23]);

        let mobility = booleans[0];

        let endGamePts = 0;
        let chargeStationPts = 0;
        let mobilityPts = 0;

        let incompleteForm = false;
        let incompletePriorities = true;

        let override = this.state.override;

        if (endGameUsed === 'DockedEngaged') {
            endGamePts = 10;
        } else if (endGameUsed === "Docked") {
            endGamePts = 6;
        } else if (endGameUsed === 'Parked') {
            endGamePts = 2;
        } else {
            endGamePts = 0;
        }

        if (endGameUsed === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat charge station the robot did"
        } else {
            if (endGameUsed !== 'None') {
                if (endGameUsed === 'Attemped') {
                    if (endGameStart === '') {
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot started charge station"
                    }
                } else {
                    if (endGameStart === '') {
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot started charge station"
                    } if (endGameEnd === '') {
                        incompleteForm = true;
                        windowAlertMsg = windowAlertMsg + "\nWhat time the robot ended charge station"
                    }
                }
            }
        }

        if (chargeStationAuto === 'DockedEngaged') {
            chargeStationPts = 12;
        } else if (chargeStationAuto === "Docked") {
            chargeStationPts = 8;
        } else {
            chargeStationPts = 0;
        } 

        if (chargeStationAuto === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat charge station the robot did"
        } 

        if (mobility === false) {
            mobilityPts = 0;
        } else {
            mobilityPts = 2;
        }

        let highGridPoints = 6 * (highAutoCones + highAutoCubes) + 5 * (highTeleCones + highTeleCubes);
        let midGridPoints = 4 * (midAutoCones + midAutoCubes) + 3 * (midTeleCones + midTeleCubes);
        let lowGridPoints = 3 * (lowAutoCones + lowAutoCubes) + 2 * (lowTeleCones + lowTeleCubes);
        let autoPoints = 6 * (highAutoCones + highAutoCubes) + 4 * (midAutoCones + midAutoCubes) + 3 * (lowAutoCones + lowAutoCubes);
        let telePoints = 5 * (highTeleCones + highTeleCubes) + 3 * (midTeleCones + midTeleCubes) + 2 * (lowTeleCones + lowTeleCubes);
        let points = (chargeStationPts + endGamePts + mobilityPts) + autoPoints + telePoints;
        let cubePts = (highAutoCubes * 6) + (highTeleCubes * 5) + (midAutoCubes * 4) + (midTeleCubes * 3) + (lowAutoCubes * 3) + (lowTeleCubes * 2);
        let conePts = (highAutoCones * 6) + (highTeleCones * 5) + (midAutoCones * 4) + (midTeleCones * 3) + (lowAutoCones * 3) + (lowTeleCones * 2);

        let cubesHighTeleAutoAccuracy = 100 * ((highAutoCubes + highTeleCubes) / (highCubesAttempted));
        let conesHighTeleAutoAccuracy = 100 * ((highAutoCones + highTeleCones) / (highConesAttempted));
        let highAccuracy = 100 * ((conesHighTeleAutoAccuracy + cubesHighTeleAutoAccuracy) / (highCubesAttempted + highConesAttempted));

        let cubesMidTeleAutoAccuracy = 100 * ((midAutoCubes + midTeleCubes) / (midCubesAttempted));
        let conesMidTeleAutoAccuracy = 100 * ((midAutoCones + midTeleCones) / (midConesAttempted));
        let midAccuracy = 100 * ((cubesMidTeleAutoAccuracy + conesMidTeleAutoAccuracy) / (midCubesAttempted + midConesAttempted));

        let cubesLowTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes) / (lowCubesAttempted));
        let conesLowTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones) / (lowConesAttempted));
        let lowAccuracy = 100 * ((cubesLowTeleAutoAccuracy + conesLowTeleAutoAccuracy) / (lowCubesAttempted + lowConesAttempted));

        let totalGridPts = highGridPoints + midGridPoints + lowGridPoints;

        let cubeHighAccuracy = 100 * (highAutoCubes + highTeleCubes) / (highCubesAttempted + highConesAttempted);
        let cubeMidAccuracy = 100 * (midAutoCubes + midTeleCubes) / (midCubesAttempted + midConesAttempted);
        let cubeLowAccuracy = 100 * (lowAutoCubes + lowTeleCubes) / (lowCubesAttempted + lowConesAttempted);



        let cubesTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes + midAutoCubes + midTeleCubes + highAutoCubes + highTeleCubes) / (cubesAttempted));
        let conesTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones + midAutoCones + midTeleCones + highAutoCones + highTeleCones) / (conesAttempted));


        this.setState({
            totalPoints: points,
            cubesAccuracy: cubesTeleAutoAccuracy,
            conesAccuracy: conesTeleAutoAccuracy,

        })

        if (autoPlacement === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nPosition of robot during Auto"
        }

        if (driveStrength === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nWhat strength is the robot drive"
        }

        if (driveSpeed === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nHow fast is the robot drive"
        }

        if (this.state.matchType === 'qf' || this.state.matchType === 'sf' || this.state.matchType === 'f') {
            if (this.state.elmNum === '') {
                incompleteForm = true;
                windowAlertMsg = windowAlertMsg + "\nFinals Number";
            }
        } else if (this.state.matchType === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nMatch Type (Qualifications, Quarterfinals, Semifinals, Finals)"
        }

        if (this.state.matchNumber === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nMatch Number";
        }

        if (this.state.teamNumber === '') {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nTeam Number"
        }

        strats.filter(strat => {
            if (strat !== ' ') {
                incompletePriorities = false;
            }
        })

        if (incompletePriorities === true) {
            incompleteForm = true;
            windowAlertMsg = windowAlertMsg + "\nRobot priorities/strategies";
        }

        if (incompleteForm === true && override === false) {
            window.alert(windowAlertMsg);
        } else if (incompleteForm === false || override === true) {
            console.log(penalties);
            await apiCreateTeamMatchEntry("2023hiho", teamNum, matchKey)
            apiUpdateTeamMatch('2023hiho', teamNum, matchKey, {
                Autonomous: {
                    Scored: {
                        Cones: {
                            Upper: Number(highAutoCones),
                            Mid: Number(midAutoCones),
                            Lower: Number(lowAutoCones),
                        },
                        Cubes: {
                            Upper: Number(highAutoCubes),
                            Mid: Number(midAutoCubes),
                            Lower: Number(lowAutoCubes),
                        }
                    },

                    Attempted: {
                        Cones: {
                            Upper: Number(highConesAutoAttempted),
                            Mid: Number(midConesAutoAttempted),
                            Lower: Number(lowConesAutoAttempted),
                        },
                        Cubes: {
                            Upper: Number(highCubesAutoAttempted),
                            Mid: Number(midCubesAutoAttempted),
                            Lower: Number(lowCubesAutoAttempted),
                        }
                    },
                    LeftCommunity: Boolean(mobility),
                    ChargeStation: String(chargeStationAuto),
                }, 

                Teleop: {
                    Scored: {
                        Cones: {
                            Upper: Number(highTeleCubes),
                            Mid: Number(midTeleCones),
                            Lower: Number(lowTeleCones),
                        },

                        Cubes: {
                            Upper: Number(highTeleCubes),
                            Mid: Number(midTeleCubes),
                            Lower: Number(lowTeleCubes),
                        },
                    },

                    Attempted: {
                        Cones: {
                            Upper: Number(highConesTeleAttempted),
                            Mid: Number(midConesTeleAttempted),
                            Lower: Number(lowConesTeleAttempted),
                        },
                        Cubes: {
                            Upper: Number(highCubesTeleAttempted),
                            Mid: Number(midCubesTeleAttempted),
                            Lower: Number(lowCubesTeleAttempted),
                        }
                    },
                    EndGame: String(endGameUsed),
                    EndGameTally: {
                        Start: Number(endGameStart),
                        End: Number(endGameEnd)
                    },
                    RankingPts: String(rankingState),
                    //RealRankingPts: Number(ranking),
                    ScoringTotal: {
                        Total: Number(points),
                        GridPoints: Number(totalGridPts),
                        GridScoringByPlacement: {
                            High: Number(highGridPoints),
                            Mid: Number(midGridPoints),
                            Low: Number(lowGridPoints)
                        },
                        Cones: Number(conePts),
                        Cubes: Number(cubePts),
                    },
                    DriveStrength: String(driveStrength),
                    DriveSpeed: String(driveSpeed),
                    ConesAccuracy: {
                        High: 90,
                        Mid: 20,
                        Low: 15,
                        Overall: 60
                    },
                    CubesAccuracy: {
                        High: 75,
                        Mid: 25,
                        Low: 1,
                        Overall: 40

                    },
                    SmartPlacement: Boolean(smartPlacement),
                },
                Comments: String(comments),
                Penalties: {
                    Fouls: Number(fouls),
                    Tech: Number(techFouls),
                    Yellow: true,
                    Red: true,
                    Disabled: true,
                    DQ: true,
                    BrokenBot: true
                }

            }
            )
            .then(data => {
                console.log(data)
            })
        }
        console.log(this.state);
    }

    //-------------------------------------------------------------------------------------------------------------//

    render() {
        return (
            <div>
                <h1> FORM  <img src={'./images/BLUETHUNDERLOGO_WHITE.png'} width="35px" height="35px"></img></h1>
                <button onClick={this.logState}> Check State </button>
                {this.makeMatchDropDown}
                <button onClick={this.getMatchTeams}>GET MATCH TEAM</button>
                <br></br>
                {this.makeTeamDropdown()}
                <br></br>
                <h3>AUTONOMOUS</h3>
                <img src={'./images/auto placement.jpg'} width="250px" height="260px"></img>
                {this.makeDropDownBox("Auto Placement On Community: ", [1, 2, 3, 4, 5, 6], 0)}
                <br></br>
                <p>🟪Cubes Scored</p>
                {this.makeCounterBox("High Cubes Made: ", 0)}
                {this.makeCounterBox("Mid Cubes Made: ", 1)}
                {this.makeCounterBox("Low Cubes Made: ", 2)}
                <p>🟪Cubes Attempted</p>
                {this.makeCounterBox("High Cubes Attempted: ", 3)}
                {this.makeCounterBox("Mid Cubes Attempted: ", 4)}
                {this.makeCounterBox("Low Cubes Attempted: ", 5)}
                <p>🔺Cones Scored</p>
                {this.makeCounterBox("High Cones Made: ", 6)}
                {this.makeCounterBox("Mid Cones Made: ", 7)}
                {this.makeCounterBox("Low Cones Made: ", 8)}
                <p>🔺Cones Attempted</p>
                {this.makeCounterBox("High Cones Attempted: ", 9)}
                {this.makeCounterBox("Mid Cones Attempted: ", 10)}
                {this.makeCounterBox("Low Cones Attempted: ", 11)}
                <br></br>
                {this.makeBooleanCheckBox("Mobility ", 0)}{/*this.makeMobilityBox("Mobility ")*/}
                <br></br>
                {this.makeChargeStationAuto()}
                <br></br>
                <h3>TELE-OP</h3>
                <p>🟪Cubes Scored</p>
                {this.makeCounterBox("High Cubes Made: ", 12)}
                {this.makeCounterBox("Mid Cubes Made: ", 13)}
                {this.makeCounterBox("Low Cubes Made: ", 14)}
                <p>🟪Cubes Attempted</p>
                {this.makeCounterBox("High Cubes Attempted: ", 15)}
                {this.makeCounterBox("Mid Cubes Attempted: ", 16)}
                {this.makeCounterBox("Low Cubes Attempted: ", 17)}
                <p>🔺Cones Scored</p>
                {this.makeCounterBox("High Cones Made: ", 18)}
                {this.makeCounterBox("Mid Cones Made: ", 19)}
                {this.makeCounterBox("Low Cones Made: ", 20)}
                <p>🔺Cones Attempted</p>
                {this.makeCounterBox("High Cones Attempted: ", 21)}
                {this.makeCounterBox("Mid Cones Attempted: ", 22)}
                {this.makeCounterBox("Low Cones Attempted: ", 23)}
                <br></br>
                {/*this.makeChargeStationTimer("Charge Station Timer: ")*/}
                {this.makeEndGameDropDown()}
                {this.makeEndGameStartEndBox()}
                <br></br>
                {this.makeBooleanCheckBox("Smart Placement ", 1)}{/*this.makeSmartPlacementBox("Smart Placement ")*/}
                <br></br>
                {this.makeDropDownBox("Drive Strength: ", ["Weak", "Normal", "Strong"], 1)}
                {this.makeDropDownBox("Drive Speed: ", ["Slow", "Fast", "Really Fast"], 2)}
                <br></br>
                <h3>PENALTIES</h3>
                {this.makeCounterBox("Fouls: ", 24)}
                {this.makeCounterBox("Tech Fouls: ", 25)}
                {this.makePenaltyBox("Yellow Card ", 0)}
                {this.makePenaltyBox("Red Card ", 1)}
                {this.makePenaltyBox("Disable ", 2)}
                {this.makePenaltyBox("Disqualifed ", 3)}
                {this.makePenaltyBox("Bot Broke ", 4)}
                {this.makePenaltyBox("No Show ", 5)}
                <br></br>
                <h3>RANKING POINTS</h3>
                {this.makeWhoWonBox("Team Won ", 0)}
                {this.makeWhoWonBox("Team Tied ", 1)}
                {this.makeWhoWonBox("Team Lost ", 2)}
                {this.makeBonusBox("Activation ", 1)}
                {this.makeBonusBox("Sustainability ", 2)}
                <Headers display={this.state.rankingPts} />
                <br></br>
                <h3>STRATEGY & PRIORITIES</h3>
                {this.makeStrategyBox("Low Node ", 0)}
                {this.makeStrategyBox("Mid Node ", 1)}
                {this.makeStrategyBox("High Node ", 2)}
                {this.makeStrategyBox("Cubes ", 3)}
                {this.makeStrategyBox("Cones ", 4)}
                {this.makeStrategyBox("Charge Station ", 5)}
                {this.makeStrategyBox("Single Substation ", 6)}
                {this.makeStrategyBox("Double Substation Shute ", 7)}
                {this.makeStrategyBox("Double Substation Silding Shelves ", 8)}
                <br></br>
                <p>How well is there defense if any?</p>
                <TextBox title={"💬Comments: "} commentState={this.setComment}></TextBox>
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