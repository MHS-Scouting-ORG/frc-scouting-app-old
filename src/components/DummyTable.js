import React, { useEffect, useState } from "react"
import { useTable } from "react-table"

const dummy = [
  {TeamNumber: 2443, Matches: "Q2",  }, // every different object is specific to a row
  {TeamNumber: 2044, Matches: "Q3",  }
]

function DummyTable() {

  const [dummyData,setDummyData] = useState(["", "", "", ""]);
  const [autoPoints,setAutoPoints] = useState([])

  useEffect(() => console.log(data)) //debug purposes

  const data = React.useMemo(
    () => {
      return dummy;
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
        Header: " priorities ",
        accessor: "priorities"
      },
      {
        Header: " avg points ",
        accessor: "AvgPoints"
      },
      {
        Header: "avg grid points",
        accessor: "avgGridPoints"
      },
      {
        Header: "avg accuracy",
        accessor: "avgAccuracy"
      },
      {
        Header: "avg charge station points",
        accessor: "avgChargeStation"
      },
      {
        Header: "defense",
        accessor: "defense"
      },
      {
        Header: "penalties",
        accessor: "penalties"
      },
    ], []
  )

  const tableInstance = useTable({ columns, data});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
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
                      background: 'papayaWhip',
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



export default DummyTable; 
