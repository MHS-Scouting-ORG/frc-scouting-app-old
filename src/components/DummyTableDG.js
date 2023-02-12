import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable } from "react-table"
import { apiGetTeam, apiListTeams } from "../api";
import { getTeamsInRegional, getTeamInfo } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";

const dumApiData = [
  {

  },
]

function DummyTableDG() {

  const [tableData,setTableData] = useState([]); //data on table
  const [teamsData,setTeamsData] = useState([]); //data of teams
  const [averages,setAverages] = useState([]);
  const [apiData, setApiData] = useState([]);

  //useEffect(() => {console.log(getTeamsInRegional('2023hiho'))},[]) //debug purposes

   useEffect(() => {
    getTeams()
      .then(data => {
        setTeamsData(data) 
        console.log(data)
      })
      .catch(console.log.bind(console))
   },[]) 

   useEffect(() => { // api data 
    
   })

   useEffect(() => setAverages(teamsData.map(team => {
    console.log(team)

    const avgPoints = {}

    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
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
  })), [teamsData])

  useEffect(() => setTableData(averages.map(team => {
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
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
  })),[teamsData, averages]) 

  /*const data = React.useMemo(
    () => tableData.map(team => {
      return {
        TeamNumber: team.team_number
      }
    }), [teamsData, averages]
)*///work on this one^

const getTeams = async () => {
  return await (getTeamsInRegional('2023hiho'))
    .catch(err => console.log(err))
    .then(data => {
      return data.map(obj => {
        return {

          TeamNumber: obj.team_number,
          Matches: '',
          Priorities: '',
          OPR: 0,
          CCWM: 0, 
          AvgPoints: 0,
          AvgLow: 0,
          AvgMid: 0,
          AvgTop: 0,
          AvgAcc: 0,
          DPR: 0,
          Defense: '',
          Penalties: 0
          
        }
      })
    })
    .catch(err => console.log(err)) 
}

const getApiData = async () => {
  
}

const renderRowSubComponent = ({ row }) => { //not working(not showing table within team number)
    
  const dumTest = [
    {
      Match: 0,
      Strategy: 'stratTEST',
      TotalPts: 1,
      RankingPts: 2,


      AutoPlacement: 3,
      AutoGridPts: 4,
      AutoChargeStationPts: 5,

      TeleGridPts: 6,
      TeleChargeStationPts: 7
    }
  ]

  const dum = dumTest.map(x =>  {
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

const calcAvgPoints = (arr) => { //"arr" is the data parameter which is given when it is called
  const indivPoints = () => {arr.map(value => value.TotalPts)}
  let totalPts = 0;
  for (let i = 0; i < individualPoints.length; i++){
  }
}

const data = React.useMemo(
  () => tableData.map(team => {
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
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
) //^works

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
        Header: "Matches",
        accessor: "Matches"
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
        accessor: "OPR"
      },
      {
        Header: "CCWM",
        accessor: "CCWM"
      },
      {
        Header: "Avg Points",
        accessor: "AvgPoints"
      },
      {
        Header: "Avg Low Placement",
        accessor: "AvgLow"
      },
      {
        Header: "Avg Mid Placement",
        accessor: "AvgMid"
      },
      {
        Header: "Avg Top Placement",
        accessor: "AvgTop"
      },
      {
        Header: "Avg Accuracy",
        accessor: "AvgAcc"
      },
      {
        Header: "DPR",
        accessor: "DPR"
      },
      {
        Header: "Defense",
        accessor: "Defense"
      },
      {
        Header: "Penalties",
        accessor: "Penalties"
      },
    ], []
  )

  const tableInstance = useTable({ columns, data}, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = tableInstance
  
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
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

            {row.IsExpanded ? (
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
  )
}

export default DummyTableDG; 
