import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable, useSortBy, useGlobalFilter } from "react-table"
import { apiGetTeam, apiListTeams, getMatchesForRegional} from "../api";
import { getTeamsInRegional, getTeamInfo, getOprs } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";
import GlobalFilter from "./GlobalFilter";

function DummyTableDG() {

  const [tableData,setTableData] = useState([]); //data on table
  const [teamsData,setTeamsData] = useState([]); //data of teams
  const [teamNum,setTeamNum] = useState([]) // team numbers frc{teamNumber}
  const [averages,setAverages] = useState([]);
  const [oprData,setOprData] = useState([]); //data of team ccwm opr and dpr
  const [oprList,setOprList] = useState([]);
  const [dprList,setDprList] = useState([]);
  const [ccwmList,setCcwmList] = useState([]);

   useEffect(() => {
    
  },[]) //debug purposes or test ^ 
  
   useEffect(() => { // sets team numbers of objects
    getTeams()
      .then(data => {
        setTeamsData(data) 
        console.log(data)
      })
      .catch(console.log.bind(console))
   },[]) 

   useEffect(() => {     //set opr data //convert to list and filter data structure to find opr dpr and ccwm 
    getOprs('2022hiho')
    .then(data => { 
      const oprDataArr = Object.values(data)
      const cData = oprDataArr[0] //ccwm 
      const dData = oprDataArr[1] //dpr
      const oData = oprDataArr[2] //opr

      setOprList(oData) // state opr is now a list that holds the oprs of teams that it is available for
      setDprList(dData)
      setCcwmList(cData) 

      console.log(data) // whole list of ccwm, dpr, and opr
      console.log((oprList['frc2443']).toFixed(2))
    })
    .catch(console.log.bind(console))
   },[teamsData])

   useEffect(() => setTeamNum(teamsData.map(team => {
    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: `frc${team.TeamNumber}`
    }
    
   })),[teamsData]) 

   useEffect(() => setOprData(teamNum.map(team => {

    //const opr = ((oprList[team.TeamNum]).toFixed(2))

    return {
      TeamNumber: team.TeamNumber,
      Priorities: team.Priorities,
      OPR: oprList[team.TeamNum] ? (oprList[team.TeamNum]).toFixed(3) : null,     
      CCWM: ccwmList[team.TeamNum] ? (ccwmList[team.TeamNum]).toFixed(3) : null, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: dprList[team.TeamNum] ? (dprList[team.TeamNum]).toFixed(3) : null,
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
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
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
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: team.TeamNum
    }
  })),[teamsData,teamNum, oprData, averages]) 

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
          AvgLow: "",
          AvgMid: "",
          AvgTop: "",
          AvgAcc: "",
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

// ===================================================================================
const data = React.useMemo(
  () => tableData.map(team => {
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      OPR: team.OPR,
      Priorities: team.Priorities,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
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
          </span>)
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
                  <tr>
                    <td colSpan={visibleColumns.length}
                    style = {{
                      maxWidth: "1200px"
                    }}
                    >
                      {renderRowSubComponent ({row})}
                    </td>
                  </tr>
                ) : null}

                  </React.Fragment>
            )
          })} 
        </tbody>
      </table>
    </div>
  )
}

export default DummyTableDG; 
