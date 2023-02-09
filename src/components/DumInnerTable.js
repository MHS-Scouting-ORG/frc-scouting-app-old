import React from 'react';
import { useTable } from 'react-table'

const DumInnerTable = (props) => {

    const data = props.information;

    const columns = React.useMemo(
        () => [
            {
                Header: 'Match Summary',
                columns: [
                    {
                        Header: 'Match',
                        accessor: 'Match'
                    },
                    {
                        Header: 'Priorities',
                        accessor: 'Strategy'
                    },
                    {
                        Header: 'Total Pts',
                        accessor: 'TotalPts'
                    },
                    {
                        Header: 'Ranking Pts',
                        accessor: 'RankingPts'
                    },] 
            },
            {
                Header: 'Auto',
                columns: [
                    {
                        Header: 'AutoPlacement',
                        accessor: 'AutoPlacement'
                    },
                    {
                        Header: 'GridPts',
                        accessor: 'AutoGridPts'
                    },
                    {
                        Header: 'ChargeStationPts',
                        accessor: 'AutoChargeStationPts'
                    },]
            },
            {
                Header: 'Tele-Op',
                columns: [
                    {
                        Header: 'GridPts',
                        accessor: 'TeleGridPts'
                    },
                    {
                        Header: 'GridPts',
                        accessor: 'TeleGridPts'
                    },]
            }
        ],[]
    )

    const tableInstance = ({columns, data})

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

export default DumInnerTable;