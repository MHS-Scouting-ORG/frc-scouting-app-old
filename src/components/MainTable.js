import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable, useSortBy, useGlobalFilter } from "react-table"
import { apiGetTeam, apiListTeams, getMatchesForRegional} from "../api";
import { getTeamsInRegional, getTeamInfo, getOprs } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";
import GridInnerTable from './GridInnerTable';
import GlobalFilter from "./GlobalFilter";
import { ConsoleLogger } from "@aws-amplify/core";
import List from "./List";

function MainTable(props) {

  const [tableData,setTableData] = useState([]); //data on table
  const [teamsData,setTeamsData] = useState([]); //data of teams
  const [teamNum,setTeamNum] = useState([]) // team numbers frc{teamNumber}
  const [oprData,setOprData] = useState([]); //data of team ccwm opr and dpr
  const [averages,setAverages] = useState([]);
  const [apiData, setApiData] = useState([]) //data retrieved
  const [gridState,setGridState] = useState(false); //differentiate between team and grid table
  const [oprList,setOprList] = useState([]);
  const [dprList,setDprList] = useState([]);
  const [ccwmList,setCcwmList] = useState([]);
  const [sortBy,setSortBy] = useState([]);


   useEffect(() => {
    getMatchesForRegional(props.regional)
    .then(data => {
      console.log(data)
    })
    //console.log((getMatchesForRegional('2023week0')))
  },[]) //debug purposes or test ^ 
  
   useEffect(() => { // sets team numbers of objects
    getTeams()
      .then(data => {
        setTeamsData(data) 
        //console.log(data)
      })
      .catch(console.log.bind(console))
   },[]) 

   useEffect(() => {
    getMatchesForRegional('2023hiho')
    .then(data => {
      setApiData(data)
      console.log(apiData) // same as console logging data
      console.log(data)
      //console.log(data.data)
    })
    .catch(console.log.bind(console))
  }, [teamsData]) //get matches form regional for state variable and use state to be filtered and used

   useEffect(() => {     //set opr data and convert to list and filter data structure to find opr dpr and ccwm 
    getOprs('2022hiho')
    .then(data => { 
      const oprDataArr = Object.values(data)
      const cData = oprDataArr[0] //ccwm 
      const dData = oprDataArr[1] //dpr
      const oData = oprDataArr[2] //opr

      setOprList(oData)
      setDprList(dData)
      setCcwmList(cData) 

      //console.log(data) // whole list of ccwm, dpr, and opr
    })
    .catch(console.log.bind(console))
   },[teamsData])

   useEffect(() => setTeamNum(teamsData.map(team => {

    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: oprList[team.TeamNum],    
      CCWM: ccwmList[team.TeamNum], 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      DPR: dprList[team.TeamNum],
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: `frc${team.TeamNumber}`
    }
    
   })),[teamsData, ccwmList, dprList, oprList]) 

   useEffect(() => setOprData(teamNum.map(team => {
    return {
      TeamNumber: team.TeamNumber,
      Priorities: team.Priorities,
      OPR: oprList[team.TeamNum] ? (oprList[team.TeamNum]).toFixed(2) : null,    
      CCWM: ccwmList[team.TeamNum] ? (ccwmList[team.TeamNum]).toFixed(2) : null, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      DPR: dprList[team.TeamNum] ? (dprList[team.TeamNum]).toFixed(2) : null ,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: team.TeamNum
    }
   })), [teamsData, teamNum, ccwmList, dprList, oprList])

   useEffect(() => setAverages(oprData.map(team => {
    //console.log(team)

    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: team.TeamNum
    }
  })), [teamsData, teamNum, oprData])

  useEffect(() => setTableData(averages.map(team => {
    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: team.TeamNum
    }
  })),[teamsData, teamNum, oprData, averages]) 
// ================================================ !CALC HERE! ========================
const getTeams = async () => {
   return await (getTeamsInRegional('2022hiho'))
    .catch(err => console.log(err))
    .then(data => {
      return data.map(obj => {
        const teamNumObj = {
          TeamNumber: obj.team_number,
          Matches: '',
          OPR: "",
          Priorities: '',
          CCWM: "", 
          AvgPoints: "",
          AvgGridPoints: 0,
          DPR: "",
          Defense: '',
          Penalties: "",

          TeamNum: "",
        }

        return teamNumObj
      })
    })
    .catch(err => console.log(err))
}
// ================================= !CHANGE HERE TO USE DATA FROM API! ===========
const renderRowSubComponent = ({ row }) => {
    
  const dumTest = [
    {
      Match: 0,
      Strategy: 1,
      TotalPts: 2,
      RankingPts: 3,

      AutoPlacement: 4,
      AutoGridPts: 5,
      AutoChargeStationPts: 6,

      TeleGridPts: 7,
      TeleChargeStationPts: 8
    }, 
    {
      Match: 9,
      Strategy: 10,
      TotalPts: 11,
      RankingPts: 12,

      AutoPlacement: 13,
      AutoGridPts: 14,
      AutoChargeStationPts: 15,

      TeleGridPts: 16,
      TeleChargeStationPts: 17
    },/* {}, {} */]

    /*const disp = dumTest.map(x => {
        return {
            Match: x.MatchId.substring(x.MatchId.indexOf('_')+1),
            Strategy: x.Priorities.filter(val => val.trim() !== '').length !== 0 ? x.Strategy.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            TotalPts: x.TotalPoints,
            GridPts: x.TotalGridPoints,
            ConeAcc: x.ConeAccuracy !== null ? x.ConeAccuracy.toFixed(2) : '',
            CubeAcc: x.CubeAccurary !== null ? x.CubeAccuracy.toFixed(2) : '',

            AutoPlacement: x.AutoPlacement,
            Mobility: x.LeftCommunity,
            AutoUpperConePts: `${x.AutoHighConesScored}/${x.AutoHighConesScored + x.AutoHighConesAttempted}`,
            AutoUpperCubePts: `${x.AutoHighCubesScored}/${x.AutoHighCubesScored + x.AutoHighCubesAttempted}`,
            AutoMidConePts: `${x.AutoMidConesScored}/${x.AutoMidConesScored + x.AutoMidConesAttempted}`,
            AutoMidCubePts: `${x.AutoMidCubesScored}/${x.AutoMidCubesScored + x.AutoMidCubesAttempted}`,
            AutoLowConePts: `${x.AutoLowMade}/${x.AutoLowMade + x.AutoLowMissed}`,
            AutoLowCubePts: `${x.AutoLowMade}/${x.AutoLowMade + x.AutoLowMissed}`,
            AutoChargeStationPts: x.chargeStation,

            TeleGridPts: `${x.TeleGridMade}/${x.TeleGridMade + x.TeleGridMissed}`,
            TeleUpperConePts: `${x.TeleUpperMade}/${x.TeleUpperMade + x.TeleUpperMissed}`,
            TeleUpperCubePts: `${x.TeleUpperMade}/${x.TeleUpperMade + x.TeleUpperMissed}`,
            TeleMidConePts: `${x.TeleMidMade}/${x.TeleMidMade + x.TeleMidMissed}`,
            TeleMidCubePts: `${x.TeleMidMade}/${x.TeleMidMade + x.TeleMidMissed}`,
            TeleLowConePts: `${x.TeleLowMade}/${x.TeleLowMade + x.TeleLowMissed}`,
            TeleLowCubePts: `${x.TeleLowMade}/${x.TeleLowMade + x.TeleLowMissed}`,
            TeleEndgame: x.endgame !== undefined ? x.endgame : '',
            CSStart: x.csStart !== undefined ? x.csStart : '',
            CSEnd: x.csEnd !== undefined ? x.csEnd : '',
            EndComments: x.EndComments !== undefined ? x.EndComments.trim() : '',
            DriveStrength: x.DriveStrength !== undefined ? x.DriveStrength : '',
            DriveSpeed: x.DriveSpeed !== undefined ? x.DriveSpeed : '',
            SmartPlacement: x.smartPlacement,
            IntakeFrom: x.intakeFrom.filter(val => val.trim() !== '').length !== 0 ? x.intakeFrom.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            NumberofFoulAndTech: x.numOfFouls !== undefined && x.numOfTech !== undefined ? `${x.NumberOfFouls} | ${x.NumberOfTech}` : '',
            Penalties: x.Penalties !== undefined && x.Penalties.filter(val => val.trim() !== '').length !== 0 ? x.Penalties.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            NumberOfRankingPoints: x.NumberOfRankingPoints !== undefined ? x.NumberOfRankingPoints : '',

            Comments: x.Comments !== undefined ? x.Comments.trim() : '',
            Email: x.email.substring(0, x.email.length-17),

        };
    })*/

  const dum = dumTest.map(x => {
    return {
      Match: x.Match,
      Strategy: x.Strategy,
      TotalPts: x.TotalPts,
      RankingPts: x.RankingPts,


      AutoPlacement: x.AutoPlacement,
      AutoGridPts: x.AutoGridPts,
      AutoChargeStationPts: x.AutoChargeStationPts,

      TeleGridPts: x.TeleGridPts,
      TeleChargeStationPts: x.TeleChargeStationPts
      
    }
  })

  return dum.length > 0 ?
  (<pre>
    <div>{<DumInnerTable information = {dum}/>} </div>
  </pre>)
  : (
    <div style={{
      padding: '5px',
  }}> No data collected for Team {row.values.TeamNumber}. </div>
  );
}

const renderRowSubComponentGrid = () => {
    
  const dumTest = [
    {
      AvgLower: 0,
      AvgMid: 1,
      AvgUpper: 2,

      AvgLowerAcc: 4,
      AvgMidAcc: 5,
      AvgUpperAcc: 6,
    }, 
    {
      AvgLower: 7,
      AvgMid: 8,
      AvgUpper: 9,

      AvgLowerAcc: 10,
      AvgMidAcc: 11,
      AvgUpperAcc: 12,
    },/* {}, {} */]

  const dum = dumTest.map(x => {
    return {
      AvgLower: x.AvgLower,
      AvgMid: x.AvgMid,
      AvgUpper: x.AvgUpper,

      AvgLowerAcc: x.AvgLowerAcc,
      AvgMidAcc: x.AvgMidAcc,
      AvgUpperAcc: x.AvgUpperAcc,
    }
  })

  return dum.length > 0 ?
  (<pre>
    <div>{<GridInnerTable information = {dum}/>} </div>
  </pre>)
  : (
    <div style={{
      padding: '5px',
  }}> No data collected. </div>
  );
}

function gridStateHandler(bool){
  setGridState(bool)
}

//methods for what needs to be shown on summary table, accessors are from form people
    
const getMax = (arr) => {                       // Get max of array
    return arr.sort((a, b) => b - a).shift();
  }

  const getPriorities = (arr) => {
    let pri = arr.map(teamObj => teamObj.Priorities).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
    return uniqueArr(pri);
  }

  const getIntakeFrom = (arr) => {
    let intFrom = arr.map(teamObj => teamObj.intakeFrom).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
    return uniqueArr(intFrom);
  }

  const uniqueArr = (arr) => {  
    const a = arr.map(x => x.trim());
      return a.filter((item, index) => {
          return a.indexOf(item, 0) === index;
      })
  }

  //avg total points
  const calcAvgPoints = (arr) => { //average points
    let individualPts = arr.map(val => val.totalPoints);
    let totalPts = 0;
    for(let i = 0; i < individualPts.length; i++){
      totalPts = totalPts + individualPts[i];
    }
    let avgPts = totalPts / individualPts.length;
    return avgPts.toFixed(3);
  }

  //avg grid points
  const calcAvgGrid = (arr) => {
    let individualPts = arr.map(val => val.gridPoints);
    let totalPts = 0;
    for(let i = 0; i < individualPts.length; i++){
      totalPts = totalPts + individualPts[i];
    }
    let avgGridPts = totalPts / individualPts.length;
    return avgGridPts.toFixed(3);
  }

  //avg total cube and cone poinyts and acc

  const calcTotalCubes = (arr) => {
    let totalCubes = arr.map(val => val.cubePts);
    let sumTotalCubes = 0;
    for(let i = 0; i < totalCubes.length; i++){
      sumTotalCubes = sumTotalCubes + totalCubes[i];
    }
    let avgTotalCubes = sumTotalCubes / totalCubes.length;
    return avgTotalCubes.toFixed(3);
  }

  const calcTotalCubesAcc = (arr) => {
    let totalCubesAcc = arr.map(val => val.cubesTeleAutoAccurary);
    let sumTotalCubesAcc = 0;
    for(let i = 0; i < totalCubesAcc.length; i++){
      sumTotalCubesAcc = sumTotalCubesAcc + totalCubesAcc[i];
    }
    let avgTotalCubesAcc = sumTotalCubesAcc / totalCubesAcc.length;
    return avgTotalCubesAcc.toFixed(3);
  }

  const calcTotalCones = (arr) => {
    let totalCones = arr.map(val => val.conePts);
    let sumTotalCones = 0;
    for(let i = 0; i < totalCones.length; i++){
      sumTotalCones = sumTotalCones + totalCones[i];
    }
    let avgTotalCones = sumTotalCones / totalCones.length;
    return avgTotalCones.toFixed(3);
  }

  const calcTotalConesAcc = (arr) => {
    let totalConesAcc = arr.map(val => val.conesTeleAutoAccurary);
    let sumTotalConesAcc = 0;
    for(let i = 0; i < totalConesAcc.length; i++){
      sumTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
    }
    let avgTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
    return avgTotalConesAcc.toFixed(3);
  }

  //avg UPPER grid stuff
  const calcUpperGrid = (arr) => {
    let upper = arr.map(val => val.highGridPoints);
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];
    }
    let avgUpper = sumUpper / upper.length;
    return avgUpper.toFixed(3);
  }

  const calcUpperGridAcc = (arr) => {
    let upperAcc = arr.map(val => val.highGridAcc);
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];
    }
    let avgUpperAcc = sumUpperAcc / upperAcc.length;
    return avgUpperAcc.toFixed(3);
  }

  const calcUpperConeGrid = (arr) => { //autouppermade & auto teleuppermade accessor from form (tbd since idk what they made it)
    let upper = arr.map(val => (val.AutoUpperConeMade + val.TeleUpperConeMade));
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];      //sum of upper grid
    }
    let avgUpperCone = sumUpper / upper.length;
    return avgUpperCone.toFixed(3);       //avg of upper grid (rounds to .000)
  }

  const calcUpperConeAcc = (arr) => {
    let upperAcc = arr.map(val => val.upperConeGridAcc);
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];  
    }
    let avgUpperConeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
    return avgUpperConeAcc.toFixed(3); 
  }

  const calcUpperCubeAcc = (arr) => {
    let upperAcc = arr.map(val => val.upperCubeGridAcc);
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];  
    }
    let avgUpperCubeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
    return avgUpperCubeAcc.toFixed(3); 
  }

  const calcUpperCubeGrid = (arr) => { //autouppermade & auto teleuppermade accessor from form (tbd since idk what they made it)
    let upper = arr.map(val => (val.AutoUpperCubeMade + val.TeleUpperCubeMade));
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];      //sum of upper grid
    }
    let avgUpperCube = sumUpper / upper.length;
    return avgUpperCube.toFixed(3);       //avg of upper grid (rounds to .000)
  }

  //avg MID grid stuff
  const calcMidGrid = (arr) => {
    let mid = arr.map(val => val.midGridPoints);
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid.length[i];
    }
    let avgMid = sumMid / mid.length;
    return avgMid.toFixed(3);
  }

  const calcMidGridAcc = (arr) => {
    let midAcc = arr.map(val => val.midGridAcc);
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];
    }
    let avgMidAcc = sumMidAcc / midAcc.length;
    return avgMidAcc.toFixed(3);
  }

  const calcMidConeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
    let mid = arr.map(val => (val.AutoMidConeMade + val.TeleMidConeMade));
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid[i];      //sum of mid grid
    }
    let avgMidCone = sumMid / mid.length;
    return avgMidCone.toFixed(3);       //avg of mid grid (rounds to .000)
  }

  const calcMidConeAcc = (arr) => {
    let midAcc = arr.map(val => val.midConeGridAcc);
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];  
    }
    let avgMidConeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
    return avgMidConeAcc.toFixed(3); 
  }

  const calcMidCubeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
    let mid = arr.map(val => (val.AutoMidCubeMade + val.TeleMidCubeMade));
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid[i];      //sum of mid grid
    }
    let avgMidCube = sumMid / mid.length;
    return avgMidCube.toFixed(3);       //avg of mid grid (rounds to .000)
  }

  const calcMidCubeAcc = (arr) => {
    let midAcc = arr.map(val => val.midCubeGridAcc);
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];  
    }
    let avgMidCubeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
    return avgMidCubeAcc.toFixed(3); 
  }

  //avg LOW grid stuff
  const calcLowGrid = (arr) => {
    let low = arr.map(val => (val.lowGridPoints));
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];
    }
    let avgLow = sumLow / low.length;
    return avgLow.toFixed(3);
  }

  const calcLowAcc = (arr) => {
    let lowAcc = arr.map(val => val.lowGridAcc);
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];
    }
    let avgLowAcc = sumLowAcc + lowAcc.length;
    return avgLowAcc.toFixed(3);
  }

  const calcLowConeGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
    let low = arr.map(val => (val.AutoLowConeMade + val.TeleLowConeMade));
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];      //sum of low grid
    }
    let avgLowCone = sumLow / low.length;
    return avgLowCone.toFixed(3);       //avg of low grid (rounds to .000)
  }

  const calcLowConeAcc = (arr) => {
    let lowAcc = arr.map(val => val.LowConeGridAcc);
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];  
    }
    let avgLowConeAcc = sumLowAcc / lowAcc.length;  //avg acc of low
    return avgLowConeAcc.toFixed(3); 
  }

  const calcLowCubeGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
    let low = arr.map(val => (val.AutoLowCubeMade + val.TeleLowCubeMade));
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];      //sum of low grid
    }
    let avgLowCube = sumLow / low.length;
    return avgLowCube.toFixed(3);       //avg of low grid (rounds to .000)
  }

  const calcLowCubeAcc = (arr) => {
    let lowAcc = arr.map(val => val.LowCubeGridAcc);
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];  
    }
    let avgLowCubeAcc = sumLowAcc / lowAcc.length;  //avg acc of low
    return avgLowCubeAcc.toFixed(3); 
  }

  //charge station
  const calcChargeStation = (arr) => {  //for auto bc calculating endgame is a diff method
    let chargeStation = arr.map(val => {
      if(val.chargeStation === 'None' || val.chargeStation === 'Attempted'){
        return 0;
      }
      else if(val.chargeStation === 'Docked and Not Engaged'){
        return 10;
      }
      else if(val.chargeStation === 'Docked and Engaged'){
        return 12;
      }
      else{
        return 0;
      }
    });

    let sumChargeStation = 0;
    for(let i = 0; i < chargeStation.length; i++){
      sumChargeStation = sumChargeStation + chargeStation[i];
    }

    let avgChargeStation = sumChargeStation / chargeStation.length;
    return avgChargeStation.toFixed(3);
  }

  const calcEndgame = (arr) => { //only for teleop
    let endgame = arr.map(val => {
      if(val.endgame === 'None' || val.endgame === 'Attempted'){
        return 0;
      }
      else if(val.endgame === 'Parked'){
        return 2;
      }
      else if(val.endgame === 'Docked and Not Engaged'){
        return 6;
      }
      else if(val.endgame === 'Docked and Engaged'){
        return 8;
      }
      else{
        return 0;
      }
    });

    let sumEndgame = 0;
    for(let i = 0; i < endgame.length; i++){
      sumEndgame = sumEndgame + endgame[i];
    }

    let avgEndgame = sumEndgame / endgame.length;
    return avgEndgame.toFixed(3);
  }

  const calcColumnSort = (arr,gridPts,conePts,coneAcc,cubePts,cubeAcc,charge) => {
    let sum = 0;
    if(arr.includes("Grid Points")){
      sum = sum + gridPts;
    }
    if(arr.includes("Cone Points")){
      sum = sum + conePts;
    }
    if(arr.includes("Accurate Cone Placement")){
      sum = sum + coneAcc;
    }
    if(arr.includes("Cube Points")){
      sum = sum + cubePts;
    }
    if(arr.includes("Accurate Cube Placement")){
      sum = sum + cubeAcc;
    }
    if(arr.includes("Charge Station")){
      sum = sum + charge;
    }

    return sum.toFixed(3);
  }

  const calcDeviation = (arr, mean) => { //standard deviation
    const distance = arr.map(val => {
      return (val - mean) ** 2;
    })

    const sumDistance = () => {
      let sum = 0;
      for(let i = 0; i < distance.length; i++){
        sum = sum + distance[i];
      }
      return sum;
    }

    const devi = Math.sqrt(sumDistance() / (distance.length));
    return devi.toFixed(3); //rounds standard deviation to thousandths
  }


// ======================================= !TABLE HERE! ===========================================
const data = React.useMemo(
  () => tableData.map(team => {
    const grade = calcColumnSort(sortBy,team.gridPoints,team.conePoints,team.coneAccuracy,team.cubePoints,team.cubeAccuracy,team.chargeStation)
    
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      /*AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,*/
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,
      SumPriorities: grade
    }
  }) , [tableData]
) 

  const columns = React.useMemo(
    () => [
      {
        Header: "Team #",
        accessor: "TeamNumber",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.TeamNumber}
          </span>
          )
      },
      {
        Header: "Priorities/Strategies",
        accessor: "Priorities",
        Cell: ({ row }) => (
          <div
              style = {{
                  whiteSpace: 'normal',
              }}
          >
              {row.original.Priorities}
          </div>
        )
      },
      {
        Header: "OPR",
        accessor: "OPR",
      },
      {
        Header: "CCWM",
        accessor: "CCWM",
      },
      {
        Header: "Avg Points",
        accessor: "AvgPoints",
      },
      {
        Header: "Avg Grid Points",
        accessor: "AvgGridPoints",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.AvgGridPoints}
          </span>) 
      },
      {
        Header: "Avg Cone Points",
        accessor: "avgConePts",
      },
      {
        Header: "Avg Cone Acc",
        accessor: "Avg Cone Acc",
      },
      {
        Header: "Avg Cube Points",
        accessor: "AvgCubePoints"
      },
      {
        Header: "Avg Cube Acc",
        accessor: "Avg Cube Acc",
      },
      {
        Header: "DPR",
        accessor: "DPR",
      },
      {
        Header: "Defense",
        accessor: "Defense",
      },
      {
        Header: "Penalties",
        accessor: "Penalties",
      },
      {
        Header: "Comments",
        accessor: "Comments",
      },
      {
        Header: "Grade",
        accessor: "SumPriorities",
      }
    ], []
  )

  const tableInstance = useTable({ columns, data}, useGlobalFilter, useSortBy, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    setGlobalFilter,
    prepareRow,
    visibleColumns,
  } = tableInstance

  const {globalFilter} = state
  
  return (
    <div>

      <h2>summary statistics 
        <img src={"./images/charge.png"} width="350px" height= "500px"></img>
      </h2>

      <p>
          <strong>KEY</strong> 
          <br/> "Avg" / μ = Average
          <br/> σ = Standard Deviation
          <br/> Acc = Accuracy
      </p>
      <p> Select checkboxes to choose which priorities to sort by. Then click on <strong>Grade</strong>. </p>
      <br></br>
      <List setList={setSortBy}/>
      <br></br>
      <br></br>
      <img src={"./images/community.jpg"} width="400px" height="340px"
          style={{
              display: 'inline-block',
              margin: '25px'
          }}
      ></img>

      <br></br>

      <GlobalFilter filter={globalFilter} set={setGlobalFilter}/>
      <br></br>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        
          {rows.map(row => {
            prepareRow(row)
            return ( <React.Fragment>
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (   
                    <td
                      
                      onClick={() => {cell.column.Header === "Avg Grid Points" ? gridStateHandler(true) : gridStateHandler(false) }}

                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'black',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>

              {row.isExpanded ? (
                  gridState === true ? (
                  <tr>
                    <td colSpan={visibleColumns.length}
                    style = {{
                      maxWidth: "1200px"
                    }}
                    >
                      {renderRowSubComponentGrid ()}
                    </td>
                  </tr>
                  ) : (
                  <tr>
                    <td colSpan={visibleColumns.length}
                    style = {{
                      maxWidth: "1200px"
                    }}
                    >
                      {renderRowSubComponent ({row})}
                    </td>
                  </tr>
                  )) : null}

                {/*row.isExpanded && gridState === true ? (
                  <tr>
                    <td colSpan={visibleColumns.length}
                    style = {{
                      maxWidth: "1200px"
                    }}
                    >
                      {renderRowSubComponentGrid ({row})}
                    </td>
                  </tr>
                ) : null*/}

                  </React.Fragment>
            )
          })} 
        </tbody>
      </table>
    </div>
  )
}

export default MainTable; 
