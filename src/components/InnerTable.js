import React from 'react';
import { useTable, useSortBy } from 'react-table';

const dummyData = [
    {Match: "Q2",  }, // using to test sortby
    {Match: "Q3",  }

]

const InnerTable = (props) => {

    const data = React.useMemo(
        () => {
        return dummyData;
        }
    )
  
    const columns = React.useMemo(
      () => [
        {
          Header: 'Match Summary',
          columns: [
            {
              Header: 'Match',
              accessor: 'Match',
            },
            {
              Header: 'Priorities',
              accessor: 'priorities',
            },
            {
              Header: 'Total Pts',
              accessor: 'TotalPoints',
            },
            {
              Header: 'Grid Points',
              accessor: 'gridPts',
            },
            {
              Header: 'Grid Acc',
              accessor: 'gridAccuracy',
            },
            {
              Header: 'Charge Station',
              accessor: 'chargeStation',
            },
            {
              Header: 'Mobility',
              accessor: 'mobility',
            },]
        },
        {
          Header: 'Autonomous',
          columns: [
            {
              Header: 'Place',
              accessor: 'AutoPlacement',
            },
            {
              Header: 'Grid',
              accessor: 'AutoGrid',
            },
            {
              Header: 'Mobility',
              accessor: 'AutoMobility',
            },
            {
              Header: 'Charge Station',
              accessor: 'AutoChargeStation',
            },]
        },
        {
          Header: 'Tele-Op',
          columns: [
            {
              Header: 'Grid',
              accessor: 'grid',
            },
            {
              Header: 'Endgame',
              accessor: 'endgame',
            },]
        },
        {
          Header: 'Game Info',
          columns: [
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
              accessor: 'NumberOfFoulAndTech',
            },
            {
              Header: 'Penalties',
              accessor: 'Penalties',
            },
            {
              Header: '# RP',
              accessor: 'NumberOfRankingPoints',
            },]
        },
        {
          Header: 'Scouter Info',
          columns: [
            {
                Header: 'Defense',
                accessor: 'defense',
            },
            {
              Header: 'Comments',
              accessor: 'Comments',
            },
            {
              Header: 'Scouter',
              accessor: 'email',
            },]
        }
      ], []
    )
  
    const tableInstance = useTable({ columns, data }, useSortBy);
  
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