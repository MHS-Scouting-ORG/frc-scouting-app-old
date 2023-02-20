import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable, useSortBy, useGlobalFilter } from "react-table"
import { apiGetTeam, apiListTeams, getMatchesForRegional} from "../api";
import { getTeamsInRegional, getTeamInfo, getOprs } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";
import GridInnerTable from './GridInnerTable';
import GlobalFilter from "./GlobalFilter";
import { ConsoleLogger } from "@aws-amplify/core";

function DummyTableDG(props) {

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
        console.log(data)
      })
      .catch(console.log.bind(console))
   },[]) 

   useEffect(() => {
    getMatchesForRegional('2022hiho')
    .then(data => {
      setApiData(data)
      console.log(apiData)
      console.log(data)
      console.log(data.data)
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

      console.log(data) // whole list of ccwm, dpr, and opr
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
   return await (getTeamsInRegional('2023hiho'))
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


// ======================================= !TABLE HERE! ===========================================
const data = React.useMemo(
  () => tableData.map(team => {
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
      Penalties: team.Penalties

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

export default DummyTableDG; 
