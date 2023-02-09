import React, { useState } from 'react';
import { useTable, useSortBy, useExpanded, } from 'react-table';
import { apiAddTeam, } from '../api';

import InnerTable from './InnerTable'; //add to summary table when clicked 



const dummyData = [
    {teamNumber: '2443', matches: "Q2",  }, // using to test sortby
    {teamNumber: '32', matches: "Q3",  }

]

function Summary(){

    const [teamNums, setTeamNums] = useState([]);

    
    const data = React.useMemo(
        () => {
        //return dummyData;
        getTeamsInRegional(getRegionals()).map((team) =>
        [
          team.teamNumber // get team number from teams object pulled from the getTeamsRegional api
        ])
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
            Header: 'Avg Grid Points',
            accessor: 'avgGridPoints',
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
  
  export default Summary;