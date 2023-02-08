import React, { useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';


const dummyData = [
    {teamNum: "2443",  }, 
    {teamNum: "6",  }

]

function CommentsOnly() {
    
    const data = React.useMemo(
        () => {
        return dummyData;
        }
    )
  
    const columns = React.useMemo(
      () => [
        {
          Header: 'Team #',
          accessor: 'teamNum',
        },
        {
          Header: 'Comments',
          accessor: 'comments',
        },
      ],
      []
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
  
  export default CommentsOnly;