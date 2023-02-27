import React from 'react';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import MatchDropDown from './MatchDropDown';
import EndGame from './EndGame';
import ChargeStation from './ChargeStation';
import CounterBox from './CounterBox';
//import { getRegionals, getTeamsInRegional, } from "../api/bluealliance";
import TextBox from './TextBox';
import Headers from './Header';
import StationTimer from './StationTimer';
import { apiCreateTeamMatchEntry, apiUpdateTeamMatch } from '../api';
//import { ConsoleLogger } from '@aws-amplify/core';
//import { ChargeStationType, RankingPtsOpts } from '../api/builder';
import buildMatchEntry, { ChargeStationType, IntakeType, PenaltyKinds, RankingPtsOpts, PriorityOpts } from '../api/builder'

class Form extends React.Component {
  constructor(props) {
    super(props)

    this.regional = props.regional;

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

    /*
    this.runTimer = this.runTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.timeChanged = this.timeChanged.bind(this);
    this.makeChargeStationTimer = this.makeChargeStationTimer.bind(this);
    */

    this.buttonMinus = this.buttonMinus.bind(this);
    this.buttonPlus = this.buttonPlus.bind(this);
    this.counterBoxChanged = this.counterBoxChanged.bind(this);
    this.makeCounterBox = this.makeCounterBox.bind(this);

    this.penaltyBoxChecked = this.penaltyBoxChecked.bind(this); 
    this.makePenaltyBox = this.makePenaltyBox.bind(this);

    /*
    this.smartPlacementChecked = this.smartPlacementChecked.bind(this);
    this.makeSmartPlacementBox = this.makeSmartPlacementBox.bind(this);
    */

    // TESTING this out
    this.changeBooleanCheckBox = this.changeBooleanCheckBox.bind(this);
    this.makeBooleanCheckBox = this.makeBooleanCheckBox.bind(this);

    this.bonusBoxChecked = this.bonusBoxChecked.bind(this);
    this.makeBonusBox = this.makeBonusBox.bind(this);

    /*
    this.mobilityBoxClick = this.mobilityBoxClick.bind(this);
    this.makeMobilityBox = this.makeMobilityBox.bind(this);
    */

    this.overrideChange = this.overrideChange.bind(this);
    this.makeOverrideBox = this.makeOverrideBox.bind(this);

    this.logState = this.logState.bind(this);
    this.setComment = this.setComment.bind(this);

    this.submitState = this.submitState.bind(this);

    this.state = { 
      comments: '',
      //summaryComments: '',
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
      checkedWhoWon: [' ', ' '],
      rankingPts: 0,
      rankingState: ["", "", ""],
      bonusVal: [' ', ' '],
      bonusState: '',
      penaltyVal: [' ', ' ', ' ', ' ', ' ',' '],
      dropDownVal: ['', '', '', '', ''],
      counterBoxVals: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //smartPlacementVal: false,
      strategyVal: [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
      //mobilityVal: false,
      booleans: [false, false],
      totalPoints: 0,
      totalGrid: 0,
      cubesAccuracy: 0,
      conesAccuracy: 0,
      cubesPts: 0,
      conesPts: 0,
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
    this.regional = '2022hiho'  /* change event_key */
    let matchKey =  /*put this years event*//*/*/ this.regional  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
    const teams = async () => {
      await fetch('https://www.thebluealliance.com/api/v3/event/' + this.regional  + '/matches', {
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

    if(data.alliances.blue.score > data.alliances.red.score) {
        whoWon = 'blue';
    } else if (data.alliances.blue.score < data.alliances.red.score) {
        whoWon = 'red';
    } else {
        whoWon = 'Tie';
    }

    let rankingStates = this.state.rankingState;

    if (teamColor === whoWon) {
      this.setState({ rankingPts: 2 });
      rankingStates[0] = "Team Won ";
    } else if (whoWon === 'Tie') {
      this.setState({ rankingPts: 1 });
      rankingStates[0] = "Team Tied ";
    } else {
      this.setState({ rankingPts: 0 });
      rankingStates[0] = "Team Lost ";
    }

    this.setState({ whoWon: whoWon});
    //this.setState({ checkedWhoWon: [' ', ' '] });
    //this.setState({ bonusVal: [' ', ' '] });
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
    //let data = this.state.matchData;
    /*if (data === 'not found') {
      window.alert("PICK A TEAM FIRST");
    }
    else {
      if (label === 'Team Won ') {
        this.setState({ rankingPts: 2 });
        this.setState({ rankingState: "Win" });
      } else if (label === 'Team Tied ') {
        this.setState({ rankingPts: 1 });
        this.setState({ rankingState: "Tie" });
      } else if (label === 'Team Lose '){
        this.setState({ rankingPts: 0})
        this.setState({ rankingState: 'Loss'})
      }

      this.setState({ bonusVal: [' ', ' '] })

      let whoWon = this.state.checkedWhoWon
      whoWon[i - 1] = ' ';
      whoWon[i + 1] = ' ';
      if (whoWon[i] === label) {
        whoWon[i] = ' ';
      } else if (whoWon[i] === ' ') {
        whoWon[i] = label;
      }

      if (whoWon[0] === ' ' && whoWon[1] === ' ') {
        this.setState({ rankingPts: 0 });
        this.setState({ rankingState: "Lose" })
      }
    }*/

    let data = this.state.matchData;
    let rankingStates = /*this.copyArray*/(this.state.rankingState);
    if(data === "not found"){
        window.alert("PICK A TEAM FIRST");
    }
    else{
        if(label === "Team Won "){
            this.setState({ rankingPts: 2})
        }
        else if(label === "Team Tied "){
            this.setState({ rankingPts: 1})
        }
        else if(label === "Team Lost "){
            this.setState({ rankingPts: 0})
        }
        
        if(rankingStates[0] ===  label){
          rankingStates[0] = '';
        }
        else if(rankingStates[0] === ''){
          rankingStates[0] = label;
        }

        rankingStates[1] = '';
        rankingStates[2] = '';

        this.setState({rankingState: rankingStates})
    }
  }

  makeWhoWonBox(name, i) {
    let rankingStates = this.state.rankingState;
    let checkVal;
    if (rankingStates[0] === name) {
      checkVal = true;
    } else {
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

  copyArray(Array){
    let arrayCopy = [];
    for(let i = 0; i < Array.length; i++){
        arrayCopy.push(Array[i]);
    }

    return arrayCopy

  }

  strategyBox(i, label) {
    let strategyStates = this.copyArray(this.state.strategyVal);
    if (strategyStates[i] === label) {
      strategyStates[i] = ' ';
    } else {
      strategyStates[i] = label;
    }

    this.setState({strategyVal: strategyStates})
  }

  makeStrategyBox(name, i) {
    let strategyState = this.state.strategyVal;
    let checkedVal;
    if(strategyState[i] === name){
        checkedVal = true;
    } else {
        checkedVal = false;
    }
    return (
      <div>
        <CheckBox
          label={name}
          changeCheckBoxState={this.strategyBox}
          place={i}
         checked={checkedVal}
        />
      </div>
    )
  }

  changeBooleanCheckBox(i) {
    let booleanStates = this.copyArray(this.state.booleans)
    booleanStates[i] = !booleanStates[i]
    this.setState({booleans: booleanStates})
  }

  makeBooleanCheckBox(name, i) {
    let booleanStates = this.state.booleans;
    let checkedVal;
    return (
      <div>
        <CheckBox
          label={name}
          changeCheckBoxState={this.changeBooleanCheckBox}
          place={i}
          checked={booleanStates[i]}
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
    let endGame = Array(this.state.endGameVal);
    endGame[0] = event.target.value;
    this.setState({ endGameVal: endGame });
  }

  changeEndGameStartBox(event) {
    let endGame = this.state.endGameVal;
    endGame[1] = event.target.value;
  }

  changeEndGameEndBox(event) {
    let endGame = this.state.endGameVal;
    endGame[2] = event.target.value;
  }

  makeEndGameStartEndBox() {
    let endGameValues = this.state.endGameVal;
    let endGame = endGameValues[0];
    if (endGame !== "None" && endGame !== '') {
      if (endGame === "Attempted") {
        return (
          <div>
            <label> {"End Game Start: "}
              <input type="number" onChange={this.changeEndGameStartBox}></input>
            </label>
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
    let chargeStation = this.state.chargeStationValAuto;
    chargeStation = event.target.value;
    this.setState({ chargeStationValAuto: chargeStation });
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

  /*
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
  } */ 

  //-------------------------------------------------------------------------------------------------------------//

  setComment(event) {
    this.setState({ comments: event.target.value });
  }

  //-------------------------------------------------------------------------------------------------------------//

  penaltyBoxChecked(i, label) {
    let penaltyStates = this.copyArray(this.state.penaltyVal);
    if (penaltyStates[i] === label) {
      penaltyStates[i] = ' ';
    } else {
      penaltyStates[i] = label;
    }
    this.setState({penaltyVal: penaltyStates})
  }

  makePenaltyBox(name, i) {
    let penaltyStates = this.state.penaltyVal;
    let checkedVal;
    if(penaltyStates[i] === name){
        checkedVal = true;
    } else {
        checkedVal = false
    }
    return (
      <div>
        <CheckBox
          label={name}
          changeCheckBoxState={this.penaltyBoxChecked}
          place={i}
          checked={checkedVal}
        />
      </div>
    )
  }

  /*
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
  } */

  bonusBoxChecked(i, label) {
    let ranking = this.copyArray(this.state.rankingState);
    if (ranking[i] === label) {
      this.setState({ rankingPts: this.state.rankingPts - 1 });
    } else {
      this.setState({ rankingPts: this.state.rankingPts + 1 });
    }

    
    if (ranking[i] === label) {
      ranking[i] = ' ';
    } else {
      ranking[i] = label;
    }
    
    this.setState({rankingState: ranking})
  }

  makeBonusBox(name, i) {
    let rankingState = this.state.rankingState;
    let checkedVal;
    if(rankingState[i] === name){
      checkedVal = true;
    }
    else{
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

  /*
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
    } else {
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
  } */

  overrideChange(fill, filler) {
    this.setState({ override: !this.state.override });
  }

  makeOverrideBox() {
    let overrideState = this.state.override;
    return (
      <div>
        <CheckBox
          label={"Overide "}
          changeCheckBoxState={this.overrideChange}
          checked={overrideState}
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
    let matchKey = /*put this years event*//*/*/ this.regional  /* */ /*await getRegionals() /* */ + "_" + this.state.matchType + this.state.elmNum + "m" + this.state.matchNumber;
    let teamNum = this.state.teamNumber;

    let comments = this.state.comments;

    let dropVal = this.state.dropDownVal;
    let autoPlacement = dropVal[0];
    let driveStrength = dropVal[1];
    let driveSpeed = dropVal[2];
    //let doubleStation = dropVal[3];

    //let ranking = this.state.rankingPts;
    let rankingState = this.state.rankingState;

    let endGame = this.state.endGameVal;
    let endGameUsed = endGame[0];
    let endGameStart = endGame[1];
    let endGameEnd = endGame[2];

    let chargeStationAuto = this.state.chargeStationValAuto;
    let booleans = this.state.booleans;

    let bonuses = this.state.bonusVal;
    let strats = this.state.strategyVal;
    let strategies = this.state.strategyVal;
    let penalties = this.state.penaltyVal;
    let smartPlacement = booleans[1]; //this.state.smartPlacementVal;

    let counterVal = this.state.counterBoxVals;

    let fouls = parseInt(counterVal[24]);
    let techFouls = parseInt(counterVal[25]);

    /*
    
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
        {this.makeBooleanCheckBox("Mobility ", 0)}{/*this.makeMobilityBox("Mobility ")*//*}
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
    */

    /*-------------------------------------------------------------SETTING SCORING VARIABLES--------------------------------------------------------------*/


    //AUTONOMOUS-----------------------------------------

    //Auto Cubes & Cones Scoring
    let highAutoCubes = parseInt(counterVal[0]);
    let midAutoCubes = parseInt(counterVal[1]);
    let lowAutoCubes = parseInt(counterVal[2]);
    let highAutoCones = parseInt(counterVal[6]);
    let midAutoCones = parseInt(counterVal[7]);
    let lowAutoCones = parseInt(counterVal[8]);
    //Auto Cubes & Cones Attempted
    let highCubesAutoAttempted = parseInt(counterVal[3]);
    let midCubesAutoAttempted = parseInt(counterVal[4]);
    let lowCubesAutoAttempted = parseInt(counterVal[5]);
    let highConesAutoAttempted = parseInt(counterVal[9]);
    let midConesAutoAttempted = parseInt(counterVal[10]);
    let lowConesAutoAttempted = parseInt(counterVal[11]);


    //TELEOP-----------------------------------------------

    //Tele Cubes & Cones Scoring
    let highTeleCubes = parseInt(counterVal[12]);
    let midTeleCubes = parseInt(counterVal[13]);
    let lowTeleCubes = parseInt(counterVal[14]);
    let highTeleCones = parseInt(counterVal[18]);
    let midTeleCones = parseInt(counterVal[19]);
    let lowTeleCones = parseInt(counterVal[20]);
    //Tele Cubes & Cones Attempted
    let highCubesTeleAttempted = parseInt(counterVal[15]);
    let midCubesTeleAttempted = parseInt(counterVal[16]);
    let lowCubesTeleAttempted = parseInt(counterVal[17]);
    let highConesTeleAttempted = parseInt(counterVal[21]);
    let midConesTeleAttempted = parseInt(counterVal[22]);
    let lowConesTeleAttempted = parseInt(counterVal[23]);


    //OVERALL ATTEMPTED----------------------------------------------------------------------------------
    let highCubesAttempted = highCubesAutoAttempted + highCubesTeleAttempted;
    let highConesAttempted = highConesAutoAttempted + highConesTeleAttempted;
    let midCubesAttempted = midCubesAutoAttempted + midConesTeleAttempted;
    let midConesAttempted = midConesAutoAttempted + midConesTeleAttempted;
    let lowCubesAttempted = lowCubesAutoAttempted + lowCubesTeleAttempted;
    let lowConesAttempted = lowConesAutoAttempted + lowConesTeleAttempted;

    let cubesAttempted = parseInt(counterVal[3]) + parseInt(counterVal[4]) + parseInt(counterVal[5]) + parseInt(counterVal[15]) + parseInt(counterVal[16]) + parseInt(counterVal[17]);
    let conesAttempted = parseInt(counterVal[9]) + parseInt(counterVal[10]) + parseInt(counterVal[11]) + parseInt(counterVal[21]) + parseInt(counterVal[22]) + parseInt(counterVal[23]);




    /*----------------------------------------------------POINT CALCULATIONS----------------------------------------------------------*/
    //TOTALS
    let highGridPoints = 6 * (highAutoCones + highAutoCubes) + 5 * (highTeleCones + highTeleCubes);
    let midGridPoints = 4 * (midAutoCones + midAutoCubes) + 3 * (midTeleCones + midTeleCubes);
    let lowGridPoints = 3 * (lowAutoCones + lowAutoCubes) + 2 * (lowTeleCones + lowTeleCubes);
    let autoPoints = 6 * (highAutoCones + highAutoCubes) + 4 * (midAutoCones + midAutoCubes) + 3 * (lowAutoCones + lowAutoCubes);
    let telePoints = 5 * (highTeleCones + highTeleCubes) + 3 * (midTeleCones + midTeleCubes) + 2 * (lowTeleCones + lowTeleCubes);
    let points = (chargeStationPts + endGamePts + mobilityPts) + autoPoints + telePoints;
    let cubePts = (highAutoCubes * 6) + (highTeleCubes * 5) + (midAutoCubes * 4) + (midTeleCubes * 3) + (lowAutoCubes * 3) + (lowTeleCubes * 2);
    let conePts = (highAutoCones * 6) + (highTeleCones * 5) + (midAutoCones * 4) + (midTeleCones * 3) + (lowAutoCones * 3) + (lowTeleCones * 2);
    //HIGH ACCURACIES
    let cubesHighTeleAutoAccuracy = 100 * ((highAutoCubes + highTeleCubes) / (highCubesAttempted));
    let conesHighTeleAutoAccuracy = 100 * ((highAutoCones + highTeleCones) / (highConesAttempted));
    let highAccuracy = 100 * ((conesHighTeleAutoAccuracy + cubesHighTeleAutoAccuracy) / (highCubesAttempted + highConesAttempted));
    //MID ACCURACIES
    let cubesMidTeleAutoAccuracy = 100 * ((midAutoCubes + midTeleCubes) / (midCubesAttempted));
    let conesMidTeleAutoAccuracy = 100 * ((midAutoCones + midTeleCones) / (midConesAttempted));
    let midAccuracy = 100 * ((cubesMidTeleAutoAccuracy + conesMidTeleAutoAccuracy) / (midCubesAttempted + midConesAttempted));
    //LOW ACCURACIES
    let cubesLowTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes) / (lowCubesAttempted));
    let conesLowTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones) / (lowConesAttempted));
    let lowAccuracy = 100 * ((cubesLowTeleAutoAccuracy + conesLowTeleAutoAccuracy) / (lowCubesAttempted + lowConesAttempted));

    let totalGridPts = highGridPoints + midGridPoints + lowGridPoints;

    let cubesTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes + midAutoCubes + midTeleCubes + highAutoCubes + highTeleCubes) / (cubesAttempted));
    let conesTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones + midAutoCones + midTeleCones + highAutoCones + highTeleCones) / (conesAttempted));


    let mobility = booleans[0]; //this.state.mobilityVal;

    let endGamePts = 0;
    let chargeStationPts = 0;
    let mobilityPts = 0;

    let incompleteForm = false;
    let incompletePriorities = true;

    let override = this.state.override;

    if (endGameUsed === 'DockedEngaged') {
      endGamePts = 8;
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
      chargeStationPts = 10;
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

    let penFinal = [];
    for(let i = 0; i < penalties.length; i++){
        let arr = penalties[i];
        if(arr === 'Yellow Card '){
            penFinal[i] = PenaltyKinds.YELLOW_CARD;
        } else if(arr === 'Red Card '){
            penFinal[i] = PenaltyKinds.RED_CARD;
        } else if (arr === 'Disable '){
            penFinal[i] = PenaltyKinds.DISABLED
        } else if (arr === 'Disqualifed '){
            penFinal[i] = PenaltyKinds.DQ
        } else if(arr === 'Bot Broke '){
            penFinal[i] = PenaltyKinds.BROKEN_BOT
        } else if (arr === 'No Show '){
            penFinal[i] = PenaltyKinds.NO_SHOW
        } else {
            penFinal[i] = PenaltyKinds.NONE;
        }
    }

    //*
    let stratFinal = [];
    for(let i = 0; i < penalties.length; i++){
      let strategy = strategies[i];
      if(strategy === "Low Node "){
        stratFinal[i] = PriorityOpts.LOW_NODE;
      }
      else if(strategy === "Mid Node "){
        stratFinal[i] = PriorityOpts.MID_NODE;
      }
      else if(strategy === "High Node "){
        stratFinal[i] = PriorityOpts.HIGH_NODE;
      }
      else if(strategy === "Cubes "){
        stratFinal[i] = PriorityOpts.CUBES;
      }
      else if(strategy === "Cones "){
        stratFinal[i] = PriorityOpts.CONES;
      }
      else if(strategy === "Charge Station "){
        stratFinal[i] = PriorityOpts.CHARGESTATION;
      }
      else if(strategy === "Single Substation "){
        stratFinal[i] = PriorityOpts.SINGLE_SUBSTATION;
      }
      else if(strategy === "Double Substation Shute "){
        stratFinal[i] = PriorityOpts.DOUBLE_STATION_SHUTE;
      }
      else if(strategy === "Double Substation Sliding Shelves "){
        stratFinal[i] = PriorityOpts.DOUBLE_STATION_SLIDNING_SHELVE;
      }
      else if(strategy === "Defense "){
        stratFinal[i] = PriorityOpts.DEFENSE;
      }
    }
    //*/
    /*
        {this.makeStrategyBox("Low Node ", 0)}
        {this.makeStrategyBox("Mid Node ", 1)}
        {this.makeStrategyBox("High Node ", 2)}
        {this.makeStrategyBox("Cubes ", 3)}
        {this.makeStrategyBox("Cones ", 4)}
        {this.makeStrategyBox("Charge Station ", 5)}
        {this.makeStrategyBox("Single Substation ", 6)}
        {this.makeStrategyBox("Double Substation Shute ", 7)}
        {this.makeStrategyBox("Double Substation Sliding Shelves ", 8)}
        {this.makeStrategyBox("Defense ", 9)}
    */

    let rankFinal = [];
    for(let i = 0; i < rankingState.length; i++){
      let rankOp = rankingState[i];
      if(rankOp === "Team Won "){
        rankFinal[i] = RankingPtsOpts.WIN;
      }
      else if(rankOp === "Team Tied "){
        rankFinal[i] = RankingPtsOpts.TIE;
      }
      else if(rankOp === "Team Lost "){
        rankFinal[i] = RankingPtsOpts.LOSS;
      }
      else if(rankOp === "Sustainability "){
        rankFinal[i] = RankingPtsOpts.SUSTAINABILITY_BONUS;
      }
      else if(rankOp === "Activation "){
        rankFinal[i] = RankingPtsOpts.ACTIVATION_BONUS;
      }
    }

    let intakeFinal = [];
    //for(let i = 0; i < rankingState)


    function setChargeStationType(chargeStation){
      if(chargeStation === 'None'){
        return ChargeStationType.NONE;
      }
      else if(chargeStation === 'DockedEngaged'){
        return ChargeStationType.DOCKED_ENGAGED;
      }
      else if(chargeStation === 'Docked'){
        return ChargeStationType.DOCKED;
      }
      else if(chargeStation === 'Parked'){
        return ChargeStationType.Parked;
      }
      else if(chargeStation === 'Attempted'){
        return ChargeStationType.ATTEMPTED;
      }
    }

    let chargeTeleFinal = setChargeStationType(endGameUsed);
    let chargeAutoFinal = setChargeStationType(chargeStationAuto);
    //endGameUsed
    //chargeStationAuto
    /*
    <option value='None'>None</option>
    <option value='DockedEngaged'>Docked & Engaged</option>
    <option value='Docked'>Docked & Not Enaged</option>
    <option value='Parked'>Parked</option>
    <option value='Attempted'>Attempted</option>
    */

    /*
    //POINT CALCULATIONS

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

    let cubesTeleAutoAccuracy = 100 * ((lowAutoCubes + lowTeleCubes + midAutoCubes + midTeleCubes + highAutoCubes + highTeleCubes) / (cubesAttempted));
    let conesTeleAutoAccuracy = 100 * ((lowAutoCones + lowTeleCones + midAutoCones + midTeleCones + highAutoCones + highTeleCones) / (conesAttempted));
*/

    this.setState({
      totalPoints: points,
      totalGrid: totalGridPts,
      cubesAccuracy: cubesTeleAutoAccuracy,
      conesAccuracy: conesTeleAutoAccuracy,
      cubesPts: cubePts,
      conesPts: conePts

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
      await apiCreateTeamMatchEntry(this.regional, teamNum, matchKey)
      const matchEntry = buildMatchEntry(this.regional,teamNum,matchKey)
        //matchEntry.name=''
        //matchEntry.description=''

        //AUTONOMOUS MATCH ENTREES
        matchEntry.Autonomous.AutonomousPlacement=autoPlacement
        
        matchEntry.Autonomous.Attempted.Cones.Upper=highConesAttempted
        matchEntry.Autonomous.Attempted.Cones.Mid=midConesAttempted
        matchEntry.Autonomous.Attempted.Cones.Lower=lowConesAttempted
        matchEntry.Autonomous.Attempted.Cubes.Upper=highCubesAttempted
        matchEntry.Autonomous.Attempted.Cubes.Mid=midCubesAttempted
        matchEntry.Autonomous.Attempted.Cubes.Lower=lowCubesAttempted

        matchEntry.Autonomous.Scored.Cones.Upper=highAutoCones
        matchEntry.Autonomous.Scored.Cones.Mid=midAutoCones
        matchEntry.Autonomous.Scored.Cones.Lower=lowAutoCones
        matchEntry.Autonomous.Scored.Cubes.Upper=highAutoCubes
        matchEntry.Autonomous.Scored.Cubes.Mid=midAutoCubes
        matchEntry.Autonomous.Scored.Cubes.Lower=lowAutoCubes

        matchEntry.Autonomous.LeftCommunity=mobility
        matchEntry.Autonomous.ChargeStation=chargeAutoFinal

        //TELEOP MATCH ENTREES
        matchEntry.Teleop.Scored.Cones.Upper=highTeleCones
        matchEntry.Teleop.Scored.Cones.Mid=midTeleCones
        matchEntry.Teleop.Scored.Cones.Lower=lowTeleCones
        matchEntry.Teleop.Scored.Cubes.Upper=highTeleCubes
        matchEntry.Teleop.Scored.Cubes.Mid=midTeleCubes
        matchEntry.Teleop.Scored.Cubes.Lower=lowTeleCubes

        matchEntry.Teleop.Attempted.Cones.Upper=highConesTeleAttempted
        matchEntry.Teleop.Attempted.Cones.Mid=midConesTeleAttempted
        matchEntry.Teleop.Attempted.Cones.Lower=lowConesTeleAttempted
        matchEntry.Teleop.Attempted.Cubes.Upper=highCubesTeleAttempted
        matchEntry.Teleop.Attempted.Cubes.Mid=midCubesTeleAttempted
        matchEntry.Teleop.Attempted.Cubes.Lower=lowCubesTeleAttempted

        //matchEntry.Teleop.ChargeStation=chargeTeleFinal
        matchEntry.Teleop.EndGame=chargeTeleFinal
        matchEntry.Teleop.EndGameTally.Start=endGameStart//
        matchEntry.Teleop.EndGameTally.End=endGameEnd//

        //SCORING TOTAL
        matchEntry.Teleop.ScoringTotal.Total=points
        matchEntry.Teleop.ScoringTotal.GridPoints=totalGridPts

        matchEntry.Teleop.ScoringTotal.GridScoringByPlacement.High=highGridPoints
        matchEntry.Teleop.ScoringTotal.GridScoringByPlacement.Mid=midGridPoints
        matchEntry.Teleop.ScoringTotal.GridScoringByPlacement.Low=lowGridPoints

        matchEntry.Teleop.ScoringTotal.Cones=conePts
        matchEntry.Teleop.ScoringTotal.Cubes=cubePts

        //DRIVE
        matchEntry.Teleop.DriveStrength=driveStrength
        matchEntry.Teleop.DriveSpeed=driveSpeed

        matchEntry.Teleop.SmartPlacement=smartPlacement

        //CONE ACCURACIES
        matchEntry.Teleop.ConesAccuracy.High=conesHighTeleAutoAccuracy
        matchEntry.Teleop.ConesAccuracy.Mid=conesMidTeleAutoAccuracy
        matchEntry.Teleop.ConesAccuracy.Low=conesLowTeleAutoAccuracy
        matchEntry.Teleop.ConesAccuracy.Overall=conesTeleAutoAccuracy

        //CUBE ACCURACIES
        matchEntry.Teleop.CubesAccuracy.High=cubesHighTeleAutoAccuracy
        matchEntry.Teleop.CubesAccuracy.Mid=cubesMidTeleAutoAccuracy
        matchEntry.Teleop.CubesAccuracy.Low=cubesLowTeleAutoAccuracy
        matchEntry.Teleop.CubesAccuracy.Overall=cubesTeleAutoAccuracy

        //MATCH DETAILS
        matchEntry.RankingPts=rankFinal;

        matchEntry.Comments=comments

        matchEntry.Penalties.Fouls=fouls
        matchEntry.Penalties.Tech=techFouls
        matchEntry.Penalties.Penalties=penFinal;

        matchEntry.Priorities=stratFinal;

      await apiUpdateTeamMatch(this.regional, teamNum, matchKey, matchEntry)
    console.log(this.state);
    }
  }

  //-------------------------------------------------------------------------------------------------------------//

  render() {
    return (
      <div>
        <h1> <img alt="" src={'./images/BLUETHUNDERLOGO_WHITE.png'} width="35px" height="35px"></img>  CHARGE UP FORM  <img alt="" src={'./images/BLUETHUNDERLOGO_WHITE.png'} width="35px" height="35px"></img></h1>
        <button onClick={this.logState}> Check State </button>
        {this.makeMatchDropDown}
        <button onClick={this.getMatchTeams}>GET MATCH TEAM</button>
        <br></br>
        {this.makeTeamDropdown()}
        <br></br>
        <h3>AUTONOMOUS</h3>
        <img alt="" src={'./images/auto placement.jpg'} width="250px" height="260px"></img>
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
        {this.makeStrategyBox("Double Substation Sliding Shelves ", 8)}
        {this.makeStrategyBox("Defense ", 9)}
        <br></br>
        <p>How well is there defense if any?</p>
        <TextBox title={"💬Comments: "} commentState={this.setComment} value={this.state.comments}></TextBox>
        <div>
          <button onClick={(evt) => { 
            evt.preventDefault()
            this.submitState()
              .then(console.log.bind(console))
                .catch(console.log.bind(console))
          }
          }>Submit</button>
        </div>
        <p> ONLY CLICK IF NOTHING ELSE CAN BE FILLED </p>
        {this.makeOverrideBox()}
      </div>
    )
  }
}

export default Form;