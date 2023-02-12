import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded, } from 'react-table';
import { apiAddTeam, getTeamsInRegional, getRegionals } from '../api/bluealliance';
import {apiListTeams,} from '../api/index'
import InnerTable from './InnerTable'; //add to summary table when clicked 




const dummyData = [
    {teamNumber: '2443', matches: "Q2",  }, // using to test sortby
    {teamNumber: '32', matches: "Q3",  }

]

function Summary(){

    const [teamNums, setTeamNums] = useState([]);
    const [averages, setAverages] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [apiData, setApiData] = useState([]);

    
    useEffect(() => { //displays all teams and info for the az east regional in console
      getTeamsInRegional('2023azva')
        .then(data => console.log(data))
        //.then(data => data.map((obj) => setTeams(obj.team_number)))
        .catch(console.log.bind(console))
    }, [])

    const data = React.useMemo(
        () => {
        //teamNums
        return dummyData;
        
        /*getTeamsInRegional('2022hiho').map((team) =>
        [
          team.teamNumber // doesn't stop 
        ])*/
      }
    )
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Team #',
            accessor: "teamNumber",
          },
          {
            Header: 'Matches',
            accessor: 'matches',
          },
          {
            Header: 'OPR',
            accessor: 'opr',
          },
          {
            Header: 'Priorities',
            accessor: 'priorities',
          },
          {
            Header: 'CCWM',
            accessor: 'ccwm',
          },
          {
            Header: 'Avg Points',
            accessor: 'avgPoints',
          },
          {
            Header: 'Avg Low Grid Points',
            accessor: 'avgLowGridPoints',
          },
          {
            Header: 'Avg Mid Grid Points',
            accessor: 'avgMidGridPoints',
          },
          {
            Header: 'Avg Upper Grid Points',
            accessor: 'avgUpperGridPoints',
          },
          {
            Header: 'Avg Accuracy',
            accessor: 'avgAccuracy',
          },
          {
            Header: 'Avg Charge Station Points',
            accessor: 'avgChargeStation',
          },
          {
            Header: 'DPR',
            accessor: 'dpr',
          },
          {
            Header: 'Defense',
            accessor: 'defense',
          },
          {
            Header: 'Penalties',
            accessor: 'penalties',
          },
        ], []
      )
  
    const tableInstance = useTable({ columns, data }, useSortBy, useExpanded);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance
  
    return (
      <div>
        <h2>summary stats</h2>
        <table {...getTableProps()}>
  
          <thead>
            {
              headerGroups.map(headerGroup =>
              (
                <tr {...headerGroup.getHeaderGroupProps()} >
                  {
                    headerGroup.headers.map(column =>
                    (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          padding: '5px',
                          border: 'solid 1px black',
                          textAlign: 'center',
                          background: 'steelblue'
                        }}
                      >
                        {column.render('Header')}
                      </th>
                    )
                    )
                  }
                </tr>
              )
              )
            }
          </thead>
  
          <tbody {...getTableBodyProps()}>
            {
              rows.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {
                      row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '5px',
                              border: 'solid 1px black',
                              textAlign: 'center',
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        )
                      }
                      )
                    }
                  </tr>
                )
              }
              )
            }
          </tbody>
  
        </table>
      </div>
    )
  
  }
  
  //export {getRegionals, getTeamsInRegional }
  export default Summary;
