import React, { useEffect, useState } from "react"
import { useTable } from "react-table"
//import { apiListTeams, apiAddTeam, apiGetTeam, getMatchesForRegional, apiCreateTeamMatchEntry } from './api/index'


/*const dummy = [
  {TeamNumber: "Examples: "},
  {TeamNumber: 2443, Matches: "Q2", TeamAutoPoints: 2.5, TeamTeleOpPoints: 16, GoodTeamRating: [true, " yes "]}, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3", TeamAutoPoints: 2, TeamTeleOpPoints: 1, GoodTeamRating: false }
] */

function DummyTableDG() {

  const [tableData,setTableData] = useState([]);
  const [teamNumber,setTeamNumber] = useState([]) 

  //useEffect(() => console.log(data)) //debug purposes

  /*useEffect(() => { //trying to set team number of each row
    apiGetTeam()
      .then(data => {
        setTeamNumber(data); //"data" defined as the team numbers within the data         //"injecting" data 
      })
  },[]) 

  useEffect(() => {

  }) */

  const data = React.useMemo(
    () => tableData.map(team => {
      return {
        TeamNumber: team.TeamNumber,
        Priorities: team.Priorities,
        AvgPoints: team.AvgPoints,
        AvgCharge: team.AvgCharge,
        Comments: team.Commentss
      }
    }),[tableData]
  )

  /*const data = React.useMemo(
    () => {
      return dummy;
    }
  ) */

  const columns = React.useMemo(
    () => [
      {
        Header: " Team Number ",
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
      },], []
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
                  borderBottom: 'solid 3px red',
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
                      background: 'papayaWhip',
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



export default DummyTableDG;