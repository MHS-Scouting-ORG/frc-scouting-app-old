import React, { useEffect, useState } from "react"
import { useTable } from "react-table"
//import { apiListTeams, apiAddTeam, apiGetTeam, getMatchesForRegional, apiCreateTeamMatchEntry } from './api/index'


const dummy = [
  {TeamNumber: "Examples: "},
  {TeamNumber: 2443, Matches: "Q2", priorities: "", TeamTeleOpPoints: 16, GoodTeamRating: [true, " yes "]}, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3", TeamAutoPoints: 2, TeamTeleOpPoints: 1, GoodTeamRating: false }
] 

function DummyTableDG() {

  const [tableData,setTableData] = useState(["", "", ""]); //each set of quote corresponds to a new made row
  const [teamNumber,setTeamNumber] = useState([]) 

  //useEffect(() => console.log(data)) //debug purposes

  /*useEffect(() => { //trying to set team number of each row
    apiGetTeam()
      .then(data => {
        setTeamNumber(data); //"data" defined as the team numbers within the data         //"injecting" data 
      })
  },[]) */

  /*useEffect(() => { //trying to define team.TeamNumber to input test data
    setTableData (
      {
        TeamNumber: 
      }
    )
  }) */

  const data = React.useMemo(
    () => tableData.map((dummy) => {  
      return dummy;
    }
  )
)
  /*const data = React.useMemo(
    () => {
      return dummy;
    }
  ) */

  /*const renderRowSubcomponent =({ row }) => {   //function that holds and displays the sub row of team info when clicked
    const dummy = [
      {}
    ] */

  const columns = React.useMemo(
    () => [
      {
        Header: " Team # ",
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
    //visibleColumns,
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
          return ( //<React.Fragment>
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (   // apply cell props here
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
              
              // code on bottom
          )
        })} 
      </tbody>
    </table>
  )
}

{/*{row.IsExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}
                  style = {{
                    maxWidth: "1200px"
                  }}
                  >
                    {renderRowSubcomponent ({ row })}
                  </td>
                </tr>
              ) : null}

                </React.Fragment> */}

export default DummyTableDG; 
