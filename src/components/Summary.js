import React, { useState } from 'react';
import { useTable, useSortBy, useExpanded, } from 'react-table';

import InnerTable from './InnerTable'; //add to summary table when clicked 



const dummyData = [
    {TeamNumber: '2443', Matches: "Q2",  }, // using to test sortby
    {TeamNumber: '32', Matches: "Q3",  }

]

function Summary(){

    const data = React.useMemo(
        () => {
        return dummyData;
        }
    )
  
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
            Header: " Priorities ",
            accessor: "Priorities"
          },
          {
            Header: " Avg Points ",
            accessor: "AvgPoints"
          },
          {
            Header: "Avg Grid Points",
            accessor: "AvgGridPoints"
          },
          {
            Header: "Avg Accuracy",
            accessor: "AvgAccuracy"
          },
          {
            Header: "Avg Charge Station Points",
            accessor: "AvgChargeStation"
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