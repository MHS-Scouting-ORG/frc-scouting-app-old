import React, { useEffect, useState } from "react"
import { useTable } from "react-table"
import { getTeamInfo, getRegionals, getTeamsInRegional } from '../api/bluealliance'
import InnerTable from 'Inn'

//import { apiListTeams, apiAddTeam, apiGetTeam, getMatchesForRegional, apiCreateTeamMatchEntry } from './api/index'


/*const dummy = [
  {TeamNumber: "Examples: "},
  {TeamNumber: 2443, Matches: "Q2", TeamAutoPoints: 2.5, TeamTeleOpPoints: 16, GoodTeamRating: [true, " yes "]}, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3", TeamAutoPoints: 2, TeamTeleOpPoints: 1, GoodTeamRating: false }
] */
const dummy = [
  {TeamNumber: 2443, Matches: "Q2",  }, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3",  }
]

function DummyTable() {

  const [tableData,setTableData] = useState([]);
  const [teamData,setTeamData] = useState([]) 

  //useEffect(() => console.log(data)) //debug purposes

  /*useEffect(() => { //trying to set team number of each row
    apiGetTeam()
      .then(data => {
        setTeamNumber(data); //"data" defined as the team numbers within the data         //"injecting" data 
      })
  },[]) 

  useEffect(() => {
    console.log(renderRowSubComponent())
  }) */

  
  useEffect(() => {
      getTeamsInRegional("2023hiho")
      .then(data => {
        setTeamData(data)
        console.log(data)
      })
      .catch(console.log.bind(console))
  })

  useEffect(() => {
    setTableData(teamData.map(team => {
      return {
        TeamNumber: team.team_number
        
      }
    }))
  })

  const data = React.useMemo(
    () => tableData.map(team => { 
      return {
        TeamNumber: team.TeamNumber,

        /*Priorities: team.Priorities,
        AvgPoints: team.AvgPoints,
        AvgCharge: team.AvgCharge,
        Comments: team.Commentss*/
      }
    }),[teamData]
  )

  /*const data = React.useMemo(
    () => {
      return dummy;
    }
  ) */

  const columns = React.useMemo(
    () => [
      /*{
        Header: " Team Number ",
        Header: " Team # ",
        accessor: "TeamNumber"
      },
      {
        Header: " Priorities/Strategies ",
        accessor: "Priorities"
      },
      {
        Header: " Average Points ",
        accessor: "AvgPoints"
      },
      {
        Header: " Avg Charge ",
        accessor: "AvgChargeStation"
      },
      {
        Header: " Comments ",
        accessor: "Comments"
      },], [] */
      {
        Header: "Team #",
        accessor: "TeamNumber"
      },
      {
        Header: " Matches ",
        accessor: "Matches"
      },
      {
        Header: " priorities ",
        accessor: "priorities"
      },
      {
        Header: " avg points ",
        accessor: "AvgPoints"
      },
      {
        Header: "avg grid points",
        accessor: "avgGridPoints"
      },
      {
        Header: "avg accuracy",
        accessor: "avgAccuracy"
      },
      {
        Header: "avg charge station points",
        accessor: "avgChargeStation"
      },
      {
        Header: "defense",
        accessor: "defense"
      },
      {
        Header: "penalties",
        accessor: "penalties"
      },
    ], []
  )

  const tableInstance = useTable({ columns, data});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
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
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'darkblue',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}



export default DummyTable; 
