import React, { useEffect, useState } from "react"
import { useExpanded, useTable } from "react-table"
import { apiGetTeam, apiListTeams } from "../api";
import { getRegionals, getTeamsInRegional, getApiKey } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";



const dummy = [
  {TeamNumber: "Examples: "},
  {TeamNumber: 2443, Matches: "Q2", priorities: "", }, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3",  }
] 

function DummyTableDG() {

  const [tableData,setTableData] = useState([]); //each set of quote corresponds to a new made row
  const [teamsData,setTeamsData] = useState([]); 
  const [averages,setAverages] = useState([]);
  const [apiData, setApiData] = useState([]);

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


  /*useEffect(() => {

  },[])

  useEffect(() => setAverages(teamNumber.map(team => {
    console.log(team)
    return {
      TeamNumber: team.TeamNumber
    }
  })), [])

  useEffect(() => setTableData(averages.map(team => {
    return {
      TeamNumber: team.TeamNumber
    }
  })), [teamNumber, ]) */


 /* const getTeams = async () => {
    const key = await getRegionals()
    return await fetch(`https://www.thebluealliance.com/api/v3/event/${key}/teams`, { mode: "cors", headers: { 'x-tba-auth-key': await api.getApiKey() } })
  } */


  

  useEffect(() => {
    getTeamsInRegional('2023hiho')
       .then(data => {
         setTeamsData(data)
         console.log(data)
       })
       //.then()
       .catch(console.log.bind(console)) 
   }, []) 

  /*useEffect(() => setTableData(teamsData.map(team => {
    //const teamNumber = team.team_number;
    return {
      TeamNumber: team.team_number
    }
  })),[]) *///figure out how to use table data correctly so it can be used to set the data const

  /*const data = React.useMemo(
    () => tableData.map(team => {
      return {
        TeamNumber: team.team_number
      }
    }), [teamsData, averages]
)*///work on this one^



const data = React.useMemo(
  () => teamsData.map(team => {
    return {
      TeamNumber: team.team_number
    }
  }), [teamsData, averages]
) //^works



  /*const data = React.useMemo(
    () => {
      return dummy;
    }
  ) */

  const renderRowSubcomponent = ({ row }) => {   //function that holds and displays the sub row of team info when clicked

    const dummyI = (x) => [ //with parameter "x" trying to take in object which has point data type for point and so and so for others
      {
        Match: 'Q13',
        TotalPts: x.TotalPts
      },
      {
        Match: 'Q11',
        TotalPts: x.TotalPts
      }
    ]

    /*const dum = /*dummyI.map(x => { // () => {

      return [
        {
          
        },
        {

        }
      ]
    }

    return dum.length > 0 ?
    (<pre>
      <div>{<DumInnerTable information = {dum}/>} </div>
    </pre>)
    : (
      <div style={{
        padding: '5px',
    }}> No data collected for Team {row.values.TeamNumber}. </div>
    );*/
  }

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
                return (   // apply cell props here
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
                    {renderRowSubcomponent ({ row })}
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
