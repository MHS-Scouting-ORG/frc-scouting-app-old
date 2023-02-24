import React from 'react';
import { useTable, useSortBy } from 'react-table'

const ConePtsTable = (props) => {

    const data = props.information

    const columns = React.useMemo(
        () => [
            {
                Header: 'Avg Upper',
                accessor: 'AvgUpperCones'
            },
            {
                Header: 'Avg Mid',
                accessor: 'AvgMidCones'
            },
            {
                Header: 'Avg Low',
                accessor: 'AvgLowCones'
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

export default ConePtsTable