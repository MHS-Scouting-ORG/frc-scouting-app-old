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
    getMatchesForRegional('2023hiho', 'frc3881')
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
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
      DPR: dprList[team.TeamNum] ? (dprList[team.TeamNum]).toFixed(2) : null ,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: team.TeamNum
    }
   })), [teamsData, teamNum, ccwmList, dprList, oprList])

   useEffect(() => setAverages(oprData.map(team => {
    const teamStats = apiData.filter(x => x.Team === team.TeamNum)
    console.log(teamStats)
    /*
    const points = x.TotalPoints
    const avgPoints = calcAvgPoints(teamStats)
    const avgGridPoints = calcAvgGridPoints(teamStats)
    const totalConePts = calcTotalCones(teamStats)
    const totalConeAcc = calcTotalConesAcc(teamStats)
    const totalCubePts = calcTotalCubes(teamStats)
    const totalCubeAcc = calcTotalCubeAcc(teamStats)
    */
    //const priorities = getPriorities(teamStats)
    //console.log(team)

    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,//priorities.join(', '),
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgGridPoints: team.AvgGridPoints,
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
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
      AvgConePts: team.AvgConePts,
      AvgConeAcc: team.AvgConeAcc,
      AvgCubePts: team.AvgCubePts,
      AvgCubeAcc: team.AvgCubeAcc,
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
          AvgPoints: 0,
          AvgGridPoints: 0,
          AvgConePts: 0,
          AvgConeAcc: 0,
          AvgCubePts: 0,
          AvgCubeAcc: 0,
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
  const t = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)
  console.log(t)
  console.log(t.map(x => x.RankingPts))
    const disp = t.map(x => {
        return {
            Match: x.id.substring(x.id.indexOf('_')+1),
            /* ================= all code in block does not exist yet within the data object
            Strategy: x.Priorities.filter(val => val.trim() !== '').length !== 0 ? x.Strategy.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            TotalPts: x.Teleop.ScoringTotal.Total,
            GridPts: x.Teleop.ScoringTotal.GridPoints,
            ConeAcc: x.Teleop.ConesAccuracy.Overall !== null ? x.Teleop.ConesAccuracy.Overall.toFixed(2) : '',
            CubeAcc: x.Teleop.CubesAccuracy.Overall !== null ? x.Teleop.CubesAccuracy.Overall.toFixed(2) : '',
            //AutoPlacement: x.AutoPlacement,
            Mobility: x.Autonomous.LeftCommunity,
            AutoUpperConePts: `${x.Autonomous.Scored.Cones.Upper}/${x.Autonomous.Scored.Cones.Upper + x.Autonomous.Attempted.Cones.Upper}`,
            AutoUpperCubePts: `${x.Autonomous.Scored.Cubes.Upper}/${x.Autonomous.Scored.Cubes.Upper + x.Autonomous.Attempted.Cubes.Upper}`,
            AutoMidConePts: `${x.Autonomous.Scored.Cones.Mid}/${x.Autonomous.Scored.Cones.Mid + x.Autonomous.Attempted.Cones.Mid}`,
            AutoMidCubePts: `${x.Autonomous.Scored.Cubes.Mid}/${x.Autonomous.Scored.Cubes.Mid + x.Autonomous.Attempted.Cubes.Mid}`,
            AutoLowConePts: `${x.Autonomous.Scored.Cones.Lower}/${x.Autonomous.Scored.Cones.Lower + x.Autonomous.Attempted.Cones.Lower}`,
            AutoLowCubePts: `${x.Autonomous.Scored.Cubes.Lower}/${x.Autonomous.Scored.Cubes.Lower + x.Autonomous.Attempted.Cubes.Lower}`,
            AutoChargeStationPts: x.Autonomous.ChargeStation,
            TeleUpperConePts: `${x.Teleop.Scored.Cones.Upper}/${x.Teleop.Scored.Cones.Upper + x.Teleop.Attempted.Cones.Upper}`,
            TeleUpperCubePts: `${x.Teleop.Scored.Cubes.Upper}/${x.Teleop.Scored.Cubes.Upper + x.Teleop.Attempted.Cubes.Upper}`,
            TeleMidConePts: `${x.Teleop.Scored.Cones.Mid}/${x.Teleop.Scored.Cones.Mid + x.Teleop.Attempted.Cones.Mid}`,
            TeleMidCubePts: `${x.Teleop.Scored.Cubes.Mid}/${x.Teleop.Scored.Cubes.Mid + x.Teleop.Scored.Cubes.Mid}`,
            TeleLowConePts: `${x.Teleop.Scored.Cones.Lower}/${x.Teleop.Scored.Cones.Lower + x.Teleop.Attempted.Cones.Lower}`,
            TeleLowCubePts: `${x.Teleop.Scored.Cubes.Lower}/${x.Teleop.Scored.Cubes.Lower + x.Teleop.Attempted.Cubes.Lower}`,
            TeleEndgame: x.Teleop.EndGame !== undefined ? x.Teleop.EndGame : '',
            CSStart: x.Teleop.EndGameTally.Start !== undefined ? x.Teleop.EndGameTally.Start : '',
            CSEnd: x.Teleop.EndGameTally.End !== undefined ? x.Teleop.EndGameTally.End : '',
            DriveStrength: x.Teleop.DriveStrength !== undefined ? x.Teleop.DriveStrength : '',
            DriveSpeed: x.Teleop.DriveSpeed !== undefined ? x.Teleop.DriveSpeed : '',
            SmartPlacement: x.Teleop.SmartPlacement,
            NumberofFoulAndTech: x.Penalties.Fouls !== undefined && x.Penalties.TechFouls !== undefined ? `${x.Penalties.Fouls} | ${x.Penalties.TechFouls}` : '',
            Penalties: x.Penalties !== undefined && x.Penalties.filter(val => val.trim() !== '').length !== 0 ? x.Penalties.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
            NumberOfRankingPoints: x.Teleop.RankingPts !== undefined ? x.Teleop.RankingPts : '',

            Comments: x.Comments !== undefined ? x.Comments.trim() : '',
    //      //Email: x.email.substring(0, x.email.length-17), */

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
//const gridStats = apiData.filter(x => x.Team === team.TeamNum)
  /*

  const gridStats = apiData.filter(x => x.Team === `frc${row.values.TeamNumber}`)

  const upperGridPts = calcUpperGrid(gridStats)
  const upperGridAcc = calcUpperGridAcc(gridStats)

  const midGridPts = calcMidGrid(gridStats)
  const midGridAcc = calcMidGridAcc(gridStats)

  const lowGridPts = calcLowGrid(gridStats)
  const lowGridAcc = calcLowAcc(gridStats)

    return {
      AvgUpper: !isNan(upperGridPts) ? `μ=${upperGridPts}` : '',
      AvgUpperAcc: !isNan(upperGridAcc) ? `μ=${upperGridAcc}` : '',

      AvgUpperCone: !isNan(upperConePts) ? `μ=${upperConePts}` : '',
      AvgUpperConeAcc: !isNan(upperConeAcc) ? `μ=${upperConeAcc}` : '',
      AvgUpperCube: !isNan(upperCubePts) ? `μ=${upperCubePts}` : '', 
      AvgUpperCubeAcc: !isNan(upperCubeAcc) ? `μ=${upperCubeAcc}` : '',

      AvgMid: !isNan(midGridPts) ? `μ=${midGridPts}` : '',
      AvgMidAcc: !isNan(midGridAcc) ? `μ=${midGridAcc}` : '',

      AvgMidCone: !isNan(midConePts) ? `μ=${midConePts}` : '',
      AvgMidConeAcc: !isNan(midConeAcc) ? `μ=${midConeAcc}` : '',
      AvgMidCube: !isNan(midCubePts) ? `μ=${midCubePts}` : '',
      AvgMidCubeAcc: !isNan(midCubeAcc) ? `μ=${midCubeAcc}` : '',

      AvgLower: !isNan(lowerGridPts) ? `μ=${lowerGridPts}` : '',
      AvgLowerAcc: !isNan(lowerGridAcc) ? `μ=${lowerGridAcc}` : '',

      AvgLowerCone: !isNan(lowerConePts) ? `μ=${lowerConePts}` : '',
      AvgLowerConeAcc: !isNan(lowerConeAcc) ? `μ=${lowerConeAcc}` : '',
      AvgLowerCube: !isNan(lowerCubePts) ? `μ=${lowerCubePts}` : '',
      AvgLowerCubeAcc: !isNan(lowerCubeAcc) ? `μ=${lowerCubeAcc}` : '',

    };
  
    
  */
    
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

const renderRowSubComponentConeAccTable = ({row}) => {
  //const gridStats = apiData.filter(x => x.Team === team.TeamNum)
    /*
      const upperConeAcc = calcUpperConeAcc(gridStats)
      const midConeAcc = calcMidConeAcc(gridStats)
      const lowConeAcc = calcLowConeAcc(gridStats)
    */
      
    const dumTest = [
      {
        UpperConesAcc: 0,
        MidConesAcc: 1,
        LowConesAcc: 2,
      }, /* {}, {} */]
  
    const dum = dumTest.map(x => {
      return {
        UpperConeAcc: x.UpperConeAcc,
        MidConeAcc: x.MidConeAcc,
        LowConeAcc: x.LowConeAcc
      }
    })
  
    return dum.length > 0 ?
    (<pre>
      <div>{<ConeAccTable information = {dum}/>} </div>
    </pre>)
    : (
      <div style={{
        padding: '5px',
    }}> No data collected. </div>
    );
  }

  const renderRowSubComponentConePtsTable = ({row}) => {
    //const gridStats = apiData.filter(x => x.Team === team.TeamNum)
      /*
        const upperConePts = calcUpperConeGrid(gridStats)
        const midConePts = calcMidConeGrid(gridStats
        const lowConePts = calcLowConeGrid(gridStats)
      */
        
      const dumTest = [
        {
          AvgUpperCones: 0,
          AvgMidCones: 1,
          AvgLowCones: 2,
        }, /* {}, {} */]
    
      const dum = dumTest.map(x => {
        return {
          AvgUpperCones: x.AvgUpperCones,
          AvgMidCones: x.AvgMidCones,
          AvgLowCones: x.AvgLowCones
        }
      })
    
      return dum.length > 0 ?
      (<pre>
        <div>{<ConePtsTable information = {dum}/>} </div>
      </pre>)
      : (
        <div style={{
          padding: '5px',
      }}> No data collected. </div>
      );
    }

    const renderRowSubComponentCubeAccTable = ({row}) => {
      //const gridStats = apiData.filter(x => x.Team === team.TeamNum)
        /*
          const upperCubeAcc = calcUpperCubeAcc(gridStats)
          const midCubeAcc = calcMidCubeAcc(gridStats)
          const lowCubeAcc = calcLowCubeAcc(gridStats)
        */
          
        const dumTest = [
          {
            UpperCubesAcc: 0,
            MidCubesAcc: 1,
            LowCubesAcc: 2,
          }, /* {}, {} */]
      
        const dum = dumTest.map(x => {
          return {
            UpperCubesAcc: x.UpperConesAcc,
            MidCubesAcc: x.MidCubesAcc,
            LowCubesAcc: x.LowCubesAcc
          }
        })
      
        return dum.length > 0 ?
        (<pre>
          <div>{<CubeAccTable information = {dum}/>} </div>
        </pre>)
        : (
          <div style={{
            padding: '5px',
        }}> No data collected. </div>
        );
      }

      const renderRowSubComponentCubePtsTable = ({row}) => {
        //const gridStats = apiData.filter(x => x.Team === team.TeamNum)
          /*
            const upperConePts = calcUpperConeGrid(gridStats)
            const midConePts = calcMidConeGrid(gridStats
            const lowConePts = calcLowConeGrid(gridStats)
          */
            
          const dumTest = [
            {
              AvgUpperCubes: 0,
              AvgMidCubes: 1,
              AvgLowCubes: 2,
            }, /* {}, {} */]
        
          const dum = dumTest.map(x => {
            return {
              AvgUpperCubes: x.AvgUpperCubes,
              AvgMidCubes: x.AvgMidCubes,
              AvgLowCubes: x.AvgLowCubes
            }
          })
        
          return dum.length > 0 ?
          (<pre>
            <div>{<CubePtsTable information = {dum}/>} </div>
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
    let pri = arr.map(teamObj => teamObj.Strategy).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
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
    let upperAcc = arr.map(val => (val.Teleop.ConeAccuracy.High + val.Teleop.CubeAccuracy.High));
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
      sumMid = sumMid + mid.length[i];
    }
    let avgMid = sumMid / mid.length;
    return avgMid.toFixed(3);
  }

  const calcMidGridAcc = (arr) => {
    let midAcc = arr.map(val => (val.Teleop.ConeAccuracy.Mid + val.Teleop.CubeAccuracy.Mid));
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
    let lowAcc = arr.map(val => (val.Teleop.ConeAccuracy.Low + val.Teleop.CubeAccuracy.Low));
    let sumLowAcc = 0;
    for(let i = 0; i < lowAcc.length; i++){
      sumLowAcc = sumLowAcc + lowAcc[i];
    }
    let avgLowAcc = sumLowAcc + lowAcc.length;
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
      DPR: team.DPR,
      Defense: team.Defense,
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
                          console.log('fail')
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
