import React from 'react';
import { useTable, useSortBy } from 'react-table'

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
                        Header: 'Auto Placement',
                        accessor: 'AutoPlacement'
                    },
                    {
                        Header: 'Auto Grid Points',
                        accessor: 'AutoGridPts'
                    },
                    {
                        Header: 'Auto Grid Low Placement',
                        accessor: 'AutoLowPlacement'
                    },
                    {
                        Header: 'Auto Grid Mid Placement',
                        accessor: 'AutoMidPlacement'
                    },
                    {
                        Header: 'Auto Grid Top Placement',
                        accessor: 'AutoTopPlacement'
                    },
                    {
                        Header: 'Charge Station Points',
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
                        Header: 'Tele-Op Grid Low Placement',
                        accessor: 'TeleLowPlacement'
                    },
                    {
                        Header: 'Tele-Op Grid Mid Placement',
                        accessor: 'TeleMidPlacement'
                    },
                    {
                        Header: 'Tele-Op Grid Top Placement',
                        accessor: 'TeleTopPlacement'
                    },
                    {
                        Header: 'Tele-Op ChargeStation Points',
                        accessor: 'TeleChargeStationPts'
                    },]
            }
        ],[]
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

export default DumInnerTable;