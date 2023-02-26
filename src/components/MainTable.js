import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable, useSortBy, useGlobalFilter } from "react-table"
import { apiGetTeam, apiListTeams, getMatchesForRegional} from "../api";
import { getTeamsInRegional, getTeamInfo, getOprs } from "../api/bluealliance";
import TeamInnerTable from "./TeamInnerTable";
import GridInnerTable from './GridInnerTable';
import ConePtsTable from './ConePtsTable'
import ConeAccTable from './ConeAccTable'
import CubePtsTable from './CubePtsTable'
import CubeAccTable from './CubeAccTable'
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
  const [gridState,setGridState] = useState(false);
  const [teamState,setTeamState] = useState(false); 
  const [conePtsState,setConePtsState] = useState(false); 
  const [coneAccState,setConeAccState] = useState(false); 
  const [cubePtsState,setCubePtsState] = useState(false); 
  const [cubeAccState,setCubeAccState] = useState(false);  
  const [oprList,setOprList] = useState([]);
  const [dprList,setDprList] = useState([]);
  const [ccwmList,setCcwmList] = useState([]);
  const [sortBy,setSortBy] = useState([]);


   useEffect(() => {
    getMatchesForRegional('2023hiho', 'frc2443')
    .then(data => {
      //console.log(data.data.teamMatchesByRegional.items[2].Teleop.ConesAccuracy.Overall)
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
      setApiData(data.data.teamMatchesByRegional.items)
      console.log(apiData) // same as console logging data
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
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
      AvgCSPoints: team.AvgCSPoints,
      DPR: dprList[team.TeamNum],
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
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
      AvgCSPoints: team.AvgCSPoints,
      DPR: dprList[team.TeamNum] ? (dprList[team.TeamNum]).toFixed(2) : null ,
      Penalties: team.Penalties,
      TeamNum: team.TeamNum
    }
   })), [teamsData, teamNum, ccwmList, dprList, oprList])

   useEffect(() => setAverages(oprData.map(team => {
    const teamStats = apiData.filter(x => x.Team === team.TeamNum)//.filter(x => parseInt(x.id.substring(x.id.indexOf('_')+2)) !== 0)
    //const mainPenaltyDisp = apiData.filter(x.Team === team.teamNumber).find(x => x. )
    console.log(apiData)
    console.log(teamStats)
    
    const points = teamStats.map(x => x.TotalPoints) //for deviation
    const avgPoints = calcAvgPoints(teamStats)
    const avgGridPoints = calcAvgGrid(teamStats)
    const avgConePoints = calcAvgConePts(teamStats)
    const avgConeAcc = calcAvgConeAcc(teamStats)
    const avgCubePoints = calcAvgCubePts(teamStats)
    const avgCubeAcc = calcAvgCubeAcc(teamStats)
    //works ^
    const avgCSPoints = calcAvgCS(teamStats)
    //testing ^
    const totalConePts = calcTotalCones(teamStats)
    const totalConeAcc = calcTotalConesAcc(teamStats)
    const totalCubePts = calcTotalCubes(teamStats)
    const totalCubeAcc = calcTotalCubesAcc(teamStats)
    const priorities = getPriorities(teamStats)
    //const priorities = getPriorities(teamStats)
    //console.log(team)

    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: priorities.join(', '),
      CCWM: team.CCWM, 
      // works ^
      AvgPoints: avgPoints !== 0 ? avgPoints === NaN ? avgPoints : '' : '', 
      AvgGridPoints: avgGridPoints !== 0 ? avgGridPoints === NaN ? avgGridPoints : '' : '',
      AvgConePts: avgConePoints !== 0 ? avgConePoints === NaN ? avgConePoints : '' : '',
      AvgConeAcc: avgConeAcc !== 0 ? avgConeAcc === NaN ? avgConeAcc : '' : '',
      AvgCubePts: avgCubePoints !== 0 ? avgCubePoints === NaN ? avgCubePoints : '' : '',
      AvgCubeAcc: avgCubeAcc !== 0 ? avgCubeAcc === NaN ? avgCubeAcc : '' : '',
      AvgCSPoints: avgCSPoints !== 0 ? avgCSPoints === NaN ? avgCSPoints : '' : '',
      //testing ^
      DPR: team.DPR,
      Penalties: teamStats.find(x => x.Penalties.Penalties.length > 2) ? teamStats.find(x => x.Penalties.Penalties.length > 2) : '',//teamStats[0].Penalties.Penalties.length !== 0 ? teamStats[0].Penalties.Penalties : '',
      //testing ^
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
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
      AvgCSPoints: team.AvgCSPoints,
      DPR: team.DPR,
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
          AvgPoints: 0,
          AvgGridPoints: 0,
          AvgConePts: 0,
          AvgConeAcc: 0,
          AvgCubePts: 0,
          AvgCubeAcc: 0,
          AvgCSPoints: 0,
          DPR: "",
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
  const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)
  console.log(t)
  //console.log(t.map(x => x.RankingPts))
  const disp = t.map(x => {
        return {
            Match: x.id.substring(x.id.indexOf('_')+1),
            Strategy: x.Priorities.filter(val => val.trim() !== '').length !== 0 ? x.Priorities.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            TotalPts: `${x.Teleop.ScoringTotal.Total}`,
            GridPts: `${x.Teleop.ScoringTotal.GridPoints}`,
            ConeAcc: x.Teleop.ConesAccuracy.Overall !== 0 ? `${x.Teleop.ConesAccuracy.Overall.toFixed(2)}` : '',
            CubeAcc: x.Teleop.CubesAccuracy.Overall !== 0 ? `${x.Teleop.CubesAccuracy.Overall.toFixed(2)}` : '',
            AutoPlacement: x.Autonomous.AutonomousPlacement !== 0 ? `${x.Autonomous.AutonomousPlacement}`: '',
            Mobility: x.Autonomous.LeftCommunity === true ? `Yes`: `No`,
            //works ^
            AutoUpperConePts: x.Autonomous.Scored.Cones.Upper / (x.Autonomous.Scored.Cones.Upper + x.Autonomous.Attempted.Cones.Upper) /*!== NaN ? x.Autonomous.Scored.Cones.Upper / (x.Autonomous.Scored.Cones.Upper + x.Autonomous.Attempted.Cones.Upper) : '' */,
            AutoUpperCubePts: x.Autonomous.Scored.Cubes.Upper / (x.Autonomous.Scored.Cubes.Upper + x.Autonomous.Attempted.Cubes.Upper) !== NaN ? x.Autonomous.Scored.Cubes.Upper / (x.Autonomous.Scored.Cubes.Upper + x.Autonomous.Attempted.Cubes.Upper) : '',
            AutoMidConePts: x.Autonomous.Scored.Cones.Mid / (x.Autonomous.Scored.Cones.Mid + x.Autonomous.Attempted.Cones.Mid) !== NaN ? x.Autonomous.Scored.Cones.Mid / (x.Autonomous.Scored.Cones.Mid + x.Autonomous.Attempted.Cones.Mid) : '' ,
            AutoMidCubePts: x.Autonomous.Scored.Cubes.Mid / (x.Autonomous.Scored.Cubes.Mid + x.Autonomous.Attempted.Cubes.Mid) !== NaN ? x.Autonomous.Scored.Cubes.Mid / (x.Autonomous.Scored.Cubes.Mid + x.Autonomous.Attempted.Cubes.Mid) : '',
            AutoLowConePts: x.Autonomous.Scored.Cones.Lower / (x.Autonomous.Scored.Cones.Lower + x.Autonomous.Attempted.Cones.Lower) !== NaN ? x.Autonomous.Scored.Cones.Lower / (x.Autonomous.Scored.Cones.Lower + x.Autonomous.Attempted.Cones.Lower) : '',
            AutoLowCubePts: x.Autonomous.Scored.Cubes.Lower / (x.Autonomous.Scored.Cubes.Lower + x.Autonomous.Attempted.Cubes.Lower) !== NaN ? x.Autonomous.Scored.Cubes.Lower / (x.Autonomous.Scored.Cubes.Lower + x.Autonomous.Attempted.Cubes.Lower) : '',
            //still testing ^
            AutoChargeStationPts: x.Autonomous.ChargeStation,
            //works ^
            TeleUpperConePts: `${x.Teleop.Scored.Cones.Upper}/${x.Teleop.Scored.Cones.Upper + x.Teleop.Attempted.Cones.Upper}`,
            TeleUpperCubePts: `${x.Teleop.Scored.Cubes.Upper}/${x.Teleop.Scored.Cubes.Upper + x.Teleop.Attempted.Cubes.Upper}`,
            TeleMidConePts: `${x.Teleop.Scored.Cones.Mid}/${x.Teleop.Scored.Cones.Mid + x.Teleop.Attempted.Cones.Mid}`,
            TeleMidCubePts: `${x.Teleop.Scored.Cubes.Mid}/${x.Teleop.Scored.Cubes.Mid + x.Teleop.Scored.Cubes.Mid}`,
            TeleLowConePts: `${x.Teleop.Scored.Cones.Lower}/${x.Teleop.Scored.Cones.Lower + x.Teleop.Attempted.Cones.Lower}`,
            TeleLowCubePts: `${x.Teleop.Scored.Cubes.Lower}/${x.Teleop.Scored.Cubes.Lower + x.Teleop.Attempted.Cubes.Lower}`,
            TeleEndgame: x.Teleop.EndGame !== undefined ? x.Teleop.EndGame : '',
            //still testing ^
            CSStart: x.Teleop.EndGameTally.Start !== undefined ? x.Teleop.EndGameTally.Start : '',
            CSEnd: x.Teleop.EndGameTally.End !== undefined ? x.Teleop.EndGameTally.End : '',
            //works ^
            DriveStrength: x.Teleop.DriveStrength !== undefined ? x.Teleop.DriveStrength : '',
            DriveSpeed: x.Teleop.DriveSpeed !== "0" ? x.Teleop.DriveSpeed : '', 
            //tbd ^
            SmartPlacement: x.Teleop.SmartPlacement === true ? `Yes` : `No`,
            //works
            NumberOfFoulAndTech: x.Penalties.Fouls !== 0 && x.Penalties.Tech !== 0 ? `${x.Penalties.Fouls} | ${x.Penalties.Tech}` : ``,
            Penalties: x.Penalties.Penalties.filter(pen => pen !== undefined).length !== 0 ? `${x.Penalties.Penalties.filter(pen => pen !== undefined)}`:``, //!== undefined && x.Penalties.filter(val => val.trim() !== '').length !== 0 ? x.Penalties.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            //testing ^
            //NumberOfRankingPoints: x.RankingPts !== undefined ? x.RankingPts : '',
            //needs reworking
            Comments: x.Comments !== undefined || "" ? x.Comments.trim() : '',
            //Email: x.email.substring(0, x.email.length-17), */
            //needs to be implemented later
        };
    })

  return disp.length > 0 ?
  (<pre>
    <div>{<TeamInnerTable information = {disp}/>} </div>
  </pre>)
  : (
    <div style={{
      padding: '5px',
  }}> No data collected for Team {row.values.TeamNumber}. </div>
  );
}

const renderRowSubComponentGrid = ({row}) => {
  const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)
  //console.log(t)

  const upperGridPts = calcUpperGrid(t)
  const upperGridAcc = calcUpperGridAcc(t)
  const midGridPts = calcMidGrid(t)
  const midGridAcc = calcMidGridAcc(t)
  const lowerGridPts = calcLowGrid(t)
  const lowerGridAcc = calcLowAcc(t)
  
  const disp = {
    //return {
      AvgUpper: upperGridPts !== undefined ? `μ=${upperGridPts}` : '',
      AvgUpperAcc: upperGridAcc !== undefined ? `μ=${upperGridAcc}` : '',
      AvgMid: midGridPts !== undefined ? `μ=${midGridPts}` : '',
      AvgMidAcc: midGridAcc !== undefined ? `μ=${midGridAcc}` : '',
      AvgLower: lowerGridPts !== undefined ? `μ=${lowerGridPts}` : '',
      AvgLowerAcc: lowerGridAcc !== undefined ? `μ=${lowerGridAcc}` : '',
    }
  //})
  //testing ^
    /*return {
      AvgUpperCube: !isNan(upperCubePts) ? `μ=${upperCubePts}` : '', 
      AvgUpperCubeAcc: !isNan(upperCubeAcc) ? `μ=${upperCubeAcc}` : '',
      AvgMidCone: !isNan(midConePts) ? `μ=${midConePts}` : '',
      AvgMidCube: !isNan(midCubePts) ? `μ=${midCubePts}` : '',
      AvgMidCubeAcc: !isNan(midCubeAcc) ? `μ=${midCubeAcc}` : '',
      AvgLowerCone: !isNan(lowerConePts) ? `μ=${lowerConePts}` : '',
      AvgLowerConeAcc: !isNan(lowerConeAcc) ? `μ=${lowerConeAcc}` : '',
      AvgLowerCube: !isNan(lowerCubePts) ? `μ=${lowerCubePts}` : '',
      AvgLowerCubeAcc: !isNan(lowerCubeAcc) ? `μ=${lowerCubeAcc}` : '',

    };
      */
  return disp.length > 0 ?
  (<pre>
    <div>{<GridInnerTable information = {disp}/>} </div>
  </pre>)
  : (
    <div style={{
      padding: '5px',
  }}> No data collected. </div>
  );
}

const renderRowSubComponentConeAccTable = ({row}) => {
  const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)

  const upperConeAcc = calcUpperConeAcc(t)
  const midConeAcc = calcMidConeAcc(t)
  const lowerConeAcc = calcLowConeAcc(t)

  const disp = {
    //return {
        AvgUpperConeAcc: upperConeAcc !== 0 ? `μ=${upperConeAcc}` : '',
        AvgMidConeAcc: midConeAcc !== 0 ? `μ=${midConeAcc}` : '',
        AvgLowerConeAcc: lowerConeAcc !== 0? `μ=${lowerConeAcc}` : '',
      //}
    }

    return disp.length > 0 ?
    (<pre>
      <div>{<ConeAccTable information = {disp}/>} </div>
    </pre>)
    : (
      <div style={{
        padding: '5px',
    }}> No data collected. </div>
    );
  }

  const renderRowSubComponentConePtsTable = ({row}) => {
      const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)

      const upperConePts = calcUpperConeGrid(t)
      const midConePts = calcMidConeGrid(t)
      const lowerConePts = calcLowConeGrid(t)
      
      const disp = {
      //return {
        AvgUpperCone: upperConePts !== 0 ? `μ=${upperConePts}` : '',
        AvgMidCone: midConePts !== 0 ? `μ=${midConePts}` : '',
        AvgLowCone: lowerConePts !== 0 ? `μ=${lowerConePts}` : '',
      }

      return disp.length > 0 ?
      (<pre>
        <div>{<ConePtsTable information = {disp}/>} </div>
      </pre>)
      : (
        <div style={{
          padding: '5px',
      }}> No data collected. </div>
      );
    }

    const renderRowSubComponentCubeAccTable = ({row}) => {
      const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)

      const upperCubeAcc = calcUpperCubeAcc(t)
      const midCubeAcc = calcMidCubeAcc(t)
      const lowCubeAcc = calcLowCubeAcc(t)
      
      const disp = {
        UpperCubesAcc: upperCubeAcc !== 0 ? `μ=${upperCubeAcc}` : '',
        MidCubesAcc: midCubeAcc !== 0 ? `μ=${midCubeAcc}` : '',
        LowCubesAcc: lowCubeAcc !== 0 ? `μ=${lowCubeAcc}` : '',
      }
      
        return disp.length > 0 ?
        (<pre>
          <div>{<CubeAccTable information = {disp}/>} </div>
        </pre>)
        : (
          <div style={{
            padding: '5px',
        }}> No data collected. </div>
        );
      }

      const renderRowSubComponentCubePtsTable = ({row}) => {
        const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)
        const upperCubePts = calcUpperCubeGrid(t)
        const midCubePts = calcMidCubeGrid(t)
        const lowCubePts = calcLowCubeGrid(t)
        
        const disp = {
          AvgUpperCubes: upperCubePts !== 0 ? `μ=${upperCubePts}` : '',
          AvgMidCubes: midCubePts !== 0 ? `μ=${midCubePts}` : '',
          AvgLowCubes: lowCubePts !== 0 ? `μ=${lowCubePts}` : '',

        }
        
          return disp.length > 0 ?
          (<pre>
            <div>{<CubePtsTable information = {disp}/>} </div>
          </pre>)
          : (
            <div style={{
              padding: '5px',
          }}> No data collected. </div>
          );
        }

function gridStateHandler(bool, bool2, bool3, bool4, bool5, bool6){
  setGridState(bool)
  setConeAccState(bool2)
  setConePtsState(bool3)
  setCubePtsState(bool4)
  setCubeAccState(bool5)
  setTeamState(bool6)
}

function tableHandler(row){
    if(gridState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponentGrid ({row})}
        </td>
      </tr>
      )
    }
    else if(coneAccState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponentConeAccTable ({row})}
        </td>
      </tr>
      )
    }
    else if(conePtsState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponentConePtsTable ({row})}
        </td>
      </tr>
      )
    }
    else if(cubeAccState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponentCubeAccTable ({row})}
        </td>
      </tr>
      )
    }
    else if(cubePtsState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponentCubePtsTable ({row})}
        </td>
      </tr>
      )
    }
    else if(teamState === true){
      return (
      <tr>
        <td colSpan={visibleColumns.length}
        style = {{
          maxWidth: "1200px"
        }}
        >
          {renderRowSubComponent ({row})}
        </td>
      </tr>
      )
    }
    else{}
  } 

//methods for what needs to be shown on summary table, accessors are from form people
  
//gets max of array
  const getMax = (arr) => { 
    return arr.sort((a, b) => b - a).shift();
  }

  //displays priorities
  const getPriorities = (arr) => {
    let pri = arr.map(teamObj => teamObj.Priorities).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
    return uniqueArr(pri);
  }

  const uniqueArr = (arr) => {  
    const a = arr.map(x => x.trim());
      return a.filter((item, index) => {
          return a.indexOf(item, 0) === index;
      })
  }

  //avg total points
  const calcAvgPoints = (arr) => { //average points
    let individualPts = arr.map(val => val.Teleop.ScoringTotal.Total);
    let totalPts = 0;
    for(let i = 0; i < individualPts.length; i++){
      totalPts = totalPts + individualPts[i]; //total pts
    }
    let avgPts = totalPts / individualPts.length;
    return avgPts.toFixed(3); //avg it
  }

  //avg grid points
  const calcAvgGrid = (arr) => {
    let individualPts = arr.map(val => val.Teleop.ScoringTotal.GridPoints);
    let totalPts = 0;
    for(let i = 0; i < individualPts.length; i++){
      totalPts = totalPts + individualPts[i];
    }
    let avgGridPts = totalPts / individualPts.length;
    return avgGridPts.toFixed(3);
  }

  //avg total cone and cube points and acc
  const calcTotalCones = (arr) => {
    let totalCones = arr.map(val => val.Teleop.ScoringTotal.Cones);
    let sumTotalCones = 0;
    for(let i = 0; i < totalCones.length; i++){
      sumTotalCones = sumTotalCones + totalCones[i];
    }
    let avgTotalCones = sumTotalCones / totalCones.length;
    return avgTotalCones.toFixed(3);
  }

  const calcTotalConesAcc = (arr) => {
    let totalConesAcc = arr.map(val => val.Teleop.ConesAccuracy.Overall);
    let sumTotalConesAcc = 0;
    for(let i = 0; i < totalConesAcc.length; i++){
      sumTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
    }
    let avgTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
    return avgTotalConesAcc.toFixed(3);
  }

  const calcTotalCubes = (arr) => {
    let totalCubes = arr.map(val => val.Teleop.ScoringTotal.Cubes);
    let sumTotalCubes = 0;
    for(let i = 0; i < totalCubes.length; i++){
      sumTotalCubes = sumTotalCubes + totalCubes[i];
    }
    let avgTotalCubes = sumTotalCubes / totalCubes.length;
    return avgTotalCubes.toFixed(3);
  }

  const calcTotalCubesAcc = (arr) => {
    let totalCubesAcc = arr.map(val => val.Teleop.CubesAccuracy.Overall);
    let sumTotalCubesAcc = 0;
    for(let i = 0; i < totalCubesAcc.length; i++){
      sumTotalCubesAcc = sumTotalCubesAcc + totalCubesAcc[i];
    }
    let avgTotalCubesAcc = sumTotalCubesAcc / totalCubesAcc.length;
    return avgTotalCubesAcc.toFixed(3);
  }

  const calcAvgConePts = (arr) => {
    let indivConePts = arr.map(val => val.Teleop.ScoringTotal.Cones)
    let totalConePts = 0
    for(let i = 0; i < indivConePts.length; i++){
      totalConePts = totalConePts + indivConePts[i];
    }
    let avgConePts = totalConePts / indivConePts
    return avgConePts.toFixed(3)
  }

  const calcAvgConeAcc = (arr) => {
    let indivConeAcc = arr.map(val => val.Teleop.ConesAccuracy.Overall)
    let totalConeAcc = 0
    for(let i = 0; i < indivConeAcc.length; i++){
      totalConeAcc = totalConeAcc + indivConeAcc[i]
    }
    let avgConeAcc = totalConeAcc / indivConeAcc
    return avgConeAcc.toFixed(3)
  }

  const calcAvgCubePts = (arr) => {
    let indivCubePts = arr.map(val => val.Teleop.ScoringTotal.Cubes)
    let totalCubePts = 0
    for(let i = 0; i < indivCubePts.length; i++){
      totalCubePts = totalCubePts + indivCubePts[i]
    }
    let avgCubePts = totalCubePts / indivCubePts
    return avgCubePts.toFixed(3)
  }

  const calcAvgCubeAcc = (arr) => {
    let indivCubeAcc = arr.map(val => val.Teleop.CubesAccuracy.Overall)
    let totalCubeAcc = 0
    for(let i = 0; i < indivCubeAcc.length; i++){
      totalCubeAcc = totalCubeAcc + indivCubeAcc[i]
    }
    let avgCubeAcc = totalCubeAcc / indivCubeAcc
    return avgCubeAcc.toFixed(3)
  }

  const calcAvgCS = (arr) => {
    const indivTeleCSDocked = arr.filter(val => val.Teleop.ChargeStation === "Docked")
    const indivTeleCSDockedPts = indivTeleCSDocked.length * 6
    const indivTeleCSDockedEng = arr.filter(val => val.Teleop.ChargeStation === "DockedAndEngaged")
    const indivTeleCSDockedEngPts = indivTeleCSDockedEng.length * 10
    const indivAutoCSDocked = arr.filter(val => val.Autonomous.ChargeStation === "Docked")
    const indivAutoCSDockedPts = indivAutoCSDocked.length * 8
    const indivAutoCSDockedEng = arr.filter(val => val.Autonomous.ChargeStation === "DockedAndEngaged")
    const indivAutoCSDockedEngPts = indivAutoCSDockedEng.length * 12

    const totalCSPts = indivTeleCSDockedPts + indivTeleCSDockedEngPts + indivAutoCSDockedPts + indivAutoCSDockedEngPts 
    const avgCSPts = totalCSPts / (indivTeleCSDockedPts.length + indivTeleCSDockedEngPts.length + indivAutoCSDockedPts.length + indivAutoCSDockedEngPts.length)
    return avgCSPts
  }
  //test and improve

  //avg UPPER grid stuff
  const calcUpperGrid = (arr) => {
    let upper = arr.map(val => val.Teleop.ScoringTotal.GridScoringByPlacement.High);
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];
    }
    let avgUpper = sumUpper / upper.length;
    return avgUpper.toFixed(3);
  }

  const calcUpperGridAcc = (arr) => {
    let upperAcc = arr.map(val => (val.Teleop.ConesAccuracy.High + val.Teleop.CubesAccuracy.High));
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];
    }
    let avgUpperAcc = sumUpperAcc / upperAcc.length;
    return avgUpperAcc.toFixed(3);
  }

  const calcUpperConeGrid = (arr) => {  
    let upper = arr.map(val => (val.Autonomous.Scored.Cones.Upper + val.Teleop.Scored.Cones.Upper));
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];      //sum of upper grid
    }
    let avgUpperCone = sumUpper / upper.length;
    return avgUpperCone.toFixed(3);       //avg of upper grid (rounds to .000)
  }

  const calcUpperConeAcc = (arr) => { 
    let upperAcc = arr.map(val => val.Teleop.ConesAccuracy.High);
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];  
    }
    let avgUpperConeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
    return avgUpperConeAcc.toFixed(3); 
  }

  const calcUpperCubeGrid = (arr) => { 
    let upper = arr.map(val => (val.Autonomous.Scored.Cubes.Upper + val.Teleop.Scored.Cubes.Upper));
    let sumUpper = 0;
    for(let i = 0; i < upper.length; i++){
      sumUpper = sumUpper + upper[i];      //sum of upper grid
    }
    let avgUpperCube = sumUpper / upper.length;
    return avgUpperCube.toFixed(3);       //avg of upper grid (rounds to .000)
  }

  const calcUpperCubeAcc = (arr) => { 
    let upperAcc = arr.map(val => val.Teleop.CubesAccuracy.High);
    let sumUpperAcc = 0;
    for(let i = 0; i < upperAcc.length; i++){
      sumUpperAcc = sumUpperAcc + upperAcc[i];  
    }
    let avgUpperCubeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
    return avgUpperCubeAcc.toFixed(3); 
  }

  //avg MID grid stuff
  const calcMidGrid = (arr) => {
    let mid = arr.map(val => val.Teleop.ScoringTotal.GridScoringByPlacement.Mid);
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid[i];
    }
    let avgMid = sumMid / mid.length;
    return avgMid.toFixed(3);
  }

  const calcMidGridAcc = (arr) => {
    let midAcc = arr.map(val => (val.Teleop.ConesAccuracy.Mid + val.Teleop.CubesAccuracy.Mid));
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];
    }
    let avgMidAcc = sumMidAcc / midAcc.length;
    return avgMidAcc.toFixed(3);
  }

  const calcMidConeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
    let mid = arr.map(val => (val.Autonomous.Scored.Cones.Mid + val.Teleop.Scored.Cones.Mid));
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid[i];      //sum of mid grid
    }
    let avgMidCone = sumMid / mid.length;
    return avgMidCone.toFixed(3);       //avg of mid grid (rounds to .000)
  }

  const calcMidConeAcc = (arr) => { 
    let midAcc = arr.map(val => val.Teleop.ConesAccuracy.Mid);
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];  
    }
    let avgMidConeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
    return avgMidConeAcc.toFixed(3); 
  }

  const calcMidCubeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
    let mid = arr.map(val => (val.Autonomous.Scored.Cubes.Mid + val.Teleop.Scored.Cubes.Mid));
    let sumMid = 0;
    for(let i = 0; i < mid.length; i++){
      sumMid = sumMid + mid[i];      //sum of mid grid
    }
    let avgMidCube = sumMid / mid.length;
    return avgMidCube.toFixed(3);       //avg of mid grid (rounds to .000)
  }

  const calcMidCubeAcc = (arr) => { 
    let midAcc = arr.map(val => val.Teleop.CubesAccuracy.Mid);
    let sumMidAcc = 0;
    for(let i = 0; i < midAcc.length; i++){
      sumMidAcc = sumMidAcc + midAcc[i];  
    }
    let avgMidCubeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
    return avgMidCubeAcc.toFixed(3); 
  }

  //avg LOW grid stuff
  const calcLowGrid = (arr) => {
    let low = arr.map(val => val.Teleop.ScoringTotal.GridScoringByPlacement.Low);
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];
    }
    let avgLow = sumLow / low.length;
    return avgLow.toFixed(3);
  }

  const calcLowAcc = (arr) => {
    let lowAcc = arr.map(val => (val.Teleop.ConesAccuracy.Low + val.Teleop.CubesAccuracy.Low));
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];
    }
    let avgLowAcc = sumLowAcc / lowAcc.length;
    return avgLowAcc.toFixed(3);
  }

  const calcLowConeGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
    let low = arr.map(val => (val.Autonomous.Scored.Cones.Lower + val.Teleop.Scored.Cones.Lower));
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];      //sum of low grid
    }
    let avgLowCone = sumLow / low.length;
    return avgLowCone.toFixed(3);       //avg of low grid (rounds to .000)
  }

  const calcLowConeAcc = (arr) => { 
    let lowAcc = arr.map(val => val.Teleop.ConesAccuracy.Low);
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];  
    }
    let avgLowConeAcc = sumLowAcc / lowAcc.length;  //avg acc of low
    return avgLowConeAcc.toFixed(3); 
  }

  const calcLowCubeGrid = (arr) => { 
    let low = arr.map(val => (val.Autonomous.Scored.Cubes.Lower + val.Teleop.Scored.Cubes.Lower));
    let sumLow = 0;
    for(let i = 0; i < low.length; i++){
      sumLow = sumLow + low[i];      //sum of low grid
    }
    let avgLowCube = sumLow / low.length;
    return avgLowCube.toFixed(3);       //avg of low grid (rounds to .000)
  }

  const calcLowCubeAcc = (arr) => { 
    let lowAcc = arr.map(val => val.Teleop.CubesAccuracy.Low);
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
      if(val.Teleop.ChargeStation === 'None' || val.Teleop.ChargeStation === 'Attempted'){
        return 0;
      }
      else if(val.Teleop.ChargeStation === 'DockedNotEngaged'){
        return 10;
      }
      else if(val.Teleop.ChargeStation === 'DockedEngaged'){
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
      if(val.Teleop.EndGame === 'None' || val.Teleop.EndGame === 'Attempted'){
        return 0;
      }
      else if(val.Teleop.EndGame === 'Parked'){
        return 2;
      }
      else if(val.Teleop.EndGame === 'Docked'){
        return 6;
      }
      else if(val.Teleop.EndGame === 'DockedEngaged'){
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
    const grade = calcColumnSort(sortBy,team.NGridPoints,team.NConePoints,team.NConeAccuracy,team.NCubePoints,team.NCubeAccuracy,team.NChargeStation)
    
    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
      AvgCSPoints: team.AvgCSPoints,
      DPR: team.DPR,
      Penalties: team.Penalties,
      SumPriorities: grade !== 0.000 ? grade : "",

      NGridPoints: team.NGridPoints,
      NConePoints: team.NConePoints, 
      NConeAccuracy: team.NConeAccuracy, 
      NCubePoints: team.NCubePoints, 
      NCubeAccuracy: team.NCubeAccuracy, 
      NChargeStation: team.NChargeStation,

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
        accessor: "AvgConePts",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.AvgConePts}
          </span>)
      },
      {
        Header: "Avg Cone Acc",
        accessor: "AvgConeAcc",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.AvgConeAcc}
          </span>)
      },
      {
        Header: "Avg Cube Points",
        accessor: "AvgCubePts",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.AvgCubePts}
          </span>)
      },
      {
        Header: "Avg Cube Acc",
        accessor: "AvgCubeAcc",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.AvgCubeAcc}
          </span>)
      },
      {
        Header: "Avg CS Points",
        accessor: "AvgCSPoints"
      },
      {
        Header: "DPR",
        accessor: "DPR",
      },
      {
        Header: "Penalties",
        accessor: "Penalties",
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
                      
                      onClick={() => {
                        if(cell.column.Header === "Avg Grid Points"){
                          gridStateHandler(true, false, false, false, false, false)
                          }
                        else if(cell.column.Header === "Team #"){
                          gridStateHandler(false, false, false, false, false, true)
                          }
                        else if(cell.column.Header === "Avg Cone Points"){
                          gridStateHandler(false, false, true, false, false, false )
                          }
                        else if(cell.column.Header === "Avg Cone Acc"){
                            gridStateHandler(false, true, true, false, false, false )
                            }
                        else if(cell.column.Header === "Avg Cube Points"){
                            gridStateHandler(false, true, false, true, false, false )
                            }
                        else if(cell.column.Header === "Avg Cube Acc"){
                            gridStateHandler(false, false, false, false, true, false )
                            }
                        else {
                          console.log('wrong cell or fail')
                            }
                        }
                      }//cell.column.Header === "Avg Grid Points" ? gridStateHandler(true, false, false, false, false) : gridStateHandler(false) }}

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

              {row.isExpanded ? tableHandler(row): null && console.log('fail')}
                  </React.Fragment>
            )
          })} 
        </tbody>
      </table>
    </div>
  )
}

export default MainTable; 
