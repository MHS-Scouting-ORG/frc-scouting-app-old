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
                        Header: 'Priorities/Strategies',
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
                        Header: 'Auto Grid Points',
                        accessor: 'AutoGridPts'
                    },
                    {
                        Header: 'Charge Staton Points',
                        accessor: 'AutoChargeStationPts'
                    },]
            },
            {
                Header: 'Tele-Op',
                columns: [
                    {
                        Header: 'Tele-Op Grid Points',
                        accessor: 'TeleGridPts'
                    },
                    {
                        Header: 'Tele-Op ChargeStation Points',
                        accessor: 'TeleChargeStationPts'
                    },]
            }
        ],[]
    )

    const tableInstance = useTable({columns, data})

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
                      {...column.getHeaderProps()}
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