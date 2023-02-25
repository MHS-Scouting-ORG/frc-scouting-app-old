import React from 'react';
import { useTable, useSortBy, useExpanded, useGlobalFilter } from 'react-table';

const dummyData = [
    {match: "Q2",  }, // using to test sortby
    {match: "Q3",  }

]

const InnerTable = (props) => {

    /*const data = React.useMemo( //random data for now
        () => {
        return dummyData;
        }
    ) */
    const /*actual*/data = props.information; //information in summary table used to pass the data for each match
    //const deleteRow = props.delete;
    //const columnValues = Object.keys(actualData[0]);

    const columns = React.useMemo(
      () => [
        {
          Header: 'Match Summary',
          columns: [
            {
              Header: 'Match',
              accessor: 'match',
            },
            {
              Header: 'Priorities',
              accessor: 'priorities',
            },
            {
              Header: 'Total Pts',
              accessor: 'totalPoints',
            },
            {
              Header: 'Grid Points',
              accessor: 'gridPts',
            },
            {
              Header: 'Low Grid Acc',
              accessor: 'lowGridAccuracy',
            },
            {
              Header: 'Mid Grid Acc',
              accessor: 'midGridAccuracy',
            },
            {
              Header: 'Upper Grid Acc',
              accessor: 'upperGridAccuracy',
            },
            {
              Header: 'Charge Station',
              accessor: 'chargeStation',
            },],
          //accessor: 'matchSums',
        },
        {
          Header: 'Autonomous',
          columns: [
            {
              Header: 'Place',
              accessor: 'autoPlacement',
            },
            {
              Header: 'Low Grid',
              accessor: 'autoLowGrid',
            },
            {
              Header: 'Mid Grid',
              accessor: 'autoMidGrid',
            },
            {
              Header: 'Upper Grid',
              accessor: 'autoUpperGrid',
            },
            {
              Header: 'Mobility',
              accessor: 'mobility',
            },
            {
              Header: 'Charge Station',
              accessor: 'autoChargeStation',
            },],
          //accessor: 'autonomous',
        },
        {
          Header: 'Tele-Op',
          columns: [
            {
              Header: ' Low Grid',
              accessor: 'teleLowGrid',
            },
            {
              Header: 'Mid Grid',
              accessor: 'teleMidGrid',
            },
            {
              Header: 'Upper Grid',
              accessor: 'teleUpperGrid',
            },
            {
              Header: 'Endgame',
              accessor: 'endgame',
            },
            {
              Header: 'Smart Placement',
              accessor: 'smartPlacement',
            },
            {
              Header: 'Intake From',
              accessor: 'intakeFrom',
            },
            {
              Header: 'Foul | Tech',
              accessor: 'numberOfFoulAndTech',
            },
            {
              Header: 'Penalties',
              accessor: 'penalties',
            },
            {
              Header: '# RP',
              accessor: 'numberOfRankingPoints',
            },],
          //accessor: 'teleop',
        },
        {
          Header: 'Other',
          columns: [
            {
              Header: 'Defense',
              accessor: 'defense',
            },
            {
              Header: 'Comments',
              accessor: 'comments',
            },
            {
              Header: 'Scouter',
              accessor: 'email',
            },
            {
              Header: 'Delete',
              /*Cell: ({ row }) => (
                <span {...row.getToggleRowExpandedProps(
                )}>
                  <button onClick={deleteRow}> DELETE </button>
                </span>)*/
            },],
          //accessor: 'other',
        }
      ], []
    )
  
    const tableInstance = useTable({ columns, data }, useSortBy, useExpanded); //change data once actualData gets stuff

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
  
  export default InnerTable;