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
                        Header: 'Cone Acc',
                        accessor: 'ConeAcc'
                    },
                    {
                        Header: 'Cube Acc',
                        accessor: 'CubeAcc'
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
                        Header: 'Grid Points',
                        accessor: 'AutoGridPts'
                    },
                    {
                      Header: 'Charge Points',
                      accessor: 'AutoChargeStationPts'
                    },
                    {
                        Header: 'Grid Low Placement',
                        accessor: 'AutoLowPlacement'
                    },
                    {
                        Header: 'Grid Mid Placement',
                        accessor: 'AutoMidPlacement'
                    },
                    {
                        Header: 'Grid Top Placement',
                        accessor: 'AutoTopPlacement'
                    },]
            },
            {
                Header: 'Tele-Op',
                columns: [
                    {
                        Header: 'Grid Points',
                        accessor: 'TeleGridPts'
                    },
                    {
                        Header: 'Grid Low Placement',
                        accessor: 'TeleLowPlacement'
                    },
                    {
                        Header: 'Grid Mid Placement',
                        accessor: 'TeleMidPlacement'
                    },
                    {
                        Header: 'Grid Top Placement',
                        accessor: 'TeleTopPlacement'
                    },
                    {
                        Header: 'ChargeStation Points',
                        accessor: 'TeleChargeStationPts'
                    },]
            },
            {
              Header: "Comments",
              accessor: "Comments"
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