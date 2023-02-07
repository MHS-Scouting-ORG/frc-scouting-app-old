import React, { useEffect } from 'react';
import { useTable } from 'react-table';


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
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable({ columns, data })
  
    return (
      <table {...getTableProps()} style={{ border: 'white' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px black',
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
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
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
            )
          })}
        </tbody>
      </table>
    )
  }
export default CommentsOnly;