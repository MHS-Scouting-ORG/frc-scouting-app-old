import React from 'react';
import { useTable, useSortBy } from 'react-table'

function GridInnerTable(props) {

    const data = props.information

    const columns = React.useMemo(
        () => [
            {
                Header: 'Upper',
                columns: [
                    {
                        Header: 'Avg Upper',
                        accessor: 'AvgUpper'
                    },
                    {
                        Header: 'Avg Upper Acc',
                        accessor: 'AvgUpperAcc'
                    },
                    {
                        Header: 'Avg Upper Cone',
                        accessor: 'AvgUpperCone'
                    },
                    {
                        Header: 'Avg Upper Cone Acc',
                        accessor: 'AvgUpperConeAcc'
                    },
                    {
                        Header: 'Avg Upper Cube',
                        accessor: 'AvgUpperCube'
                    },
                    {
                        Header: 'Avg Upper Cube Acc',
                        accessor: 'AvgUpperCubeAcc'
                    },
                ]
            },
            {
                Header: 'Mid',
                columns: [
                    {
                        Header: 'Avg Mid',
                        accessor: 'AvgMid'
                    },
                    {
                        Header: 'Avg Mid Acc',
                        accessor: 'AvgMidAcc'
                    },
                    {
                        Header: 'Avg Mid Cone',
                        accessor: 'AvgMidCone'
                    },
                    {
                        Header: 'Avg Mid Cone Acc',
                        accessor: 'AvgMidConeAcc'
                    },
                    {
                        Header: 'Avg Mid Cube',
                        accessor: 'AvgMidCube'
                    },
                    {
                        Header: 'Avg Mid Cube Acc',
                        accessor: 'AvgMidCubeAcc'
                    },
                ]
            },
            {
                Header: 'Lower',
                columns: [
                    {
                        Header: 'Avg Lower',
                        accessor: 'AvgLower'
                    },
                    {
                        Header: 'Avg Lower Acc',
                        accessor: 'AvgLowerAcc'
                    },
                    {
                        Header: 'Avg Lower Cone',
                        accessor: 'AvgLowerCone'
                    },
                    {
                        Header: 'Avg Lower Cone Acc',
                        accessor: 'AvgLowerConeAcc'
                    },
                    {
                        Header: 'Avg Lower Cube',
                        accessor: 'AvgLowerCube'
                    },
                    {
                        Header: 'Avg Lower Cube Acc',
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