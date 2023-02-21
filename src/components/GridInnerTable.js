import React from 'react';
import { useTable, useSortBy } from 'react-table'

function GridInnerTable(props) {

    const data = props.information

    const columns = React.useMemo(
        () => [
            {
                Header: 'Upper Averages',
                columns: [
                    {
                        Header: 'Upper',
                        accessor: 'AvgUpper'
                    },
                    {
                        Header: 'Upper Acc',
                        accessor: 'AvgUpperAcc'
                    },
                    {
                        Header: 'Upper Cone',
                        accessor: 'AvgUpperCone'
                    },
                    {
                        Header: 'Upper Cone Acc',
                        accessor: 'AvgUpperConeAcc'
                    },
                    {
                        Header: 'Upper Cube',
                        accessor: 'AvgUpperCube'
                    },
                    {
                        Header: 'Upper Cube Acc',
                        accessor: 'AvgUpperCubeAcc'
                    },
                ]
            },
            {
                Header: 'Mid Averages',
                columns: [
                    {
                        Header: 'Mid',
                        accessor: 'AvgMid'
                    },
                    {
                        Header: 'Mid Acc',
                        accessor: 'AvgMidAcc'
                    },
                    {
                        Header: 'Mid Cone',
                        accessor: 'AvgMidCone'
                    },
                    {
                        Header: 'Mid Cone Acc',
                        accessor: 'AvgMidConeAcc'
                    },
                    {
                        Header: 'Avg Mid Cube',
                        accessor: 'AvgMidCube'
                    },
                    {
                        Header: 'Mid Cube Acc',
                        accessor: 'AvgMidCubeAcc'
                    },
                ]
            },
            {
                Header: 'Lower Averages',
                columns: [
                    {
                        Header: 'Lower',
                        accessor: 'AvgLower'
                    },
                    {
                        Header: 'Lower Acc',
                        accessor: 'AvgLowerAcc'
                    },
                    {
                        Header: 'Lower Cone',
                        accessor: 'AvgLowerCone'
                    },
                    {
                        Header: 'Lower Cone Acc',
                        accessor: 'AvgLowerConeAcc'
                    },
                    {
                        Header: 'Lower Cube',
                        accessor: 'AvgLowerCube'
                    },
                    {
                        Header: 'Lower Cube Acc',
                        accessor: 'AvgLowerCubeAcc'
                    },
                ]
            }
        ], []
    )


const tableInstance = useTable({columns, data}, useSortBy)

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
                    color: 'black',
                    fontWeight: 'bold',
                    padding: '5px',
                    border: 'solid 1px black',
                    textAlign: 'center',
                    background: 'aliceblue'
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
                        border: 'solid 1px grey',
                        textAlign: 'center',
                        background: 'black'
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

export default GridInnerTable;