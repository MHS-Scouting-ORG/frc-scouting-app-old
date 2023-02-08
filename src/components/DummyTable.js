import React, {useState, useEffect } from "react";
import { useTable } from 'react-table';

function DummyTable(){
    const [dummyVals, dummySet] = useState([]);

    const dummyInput = {
        teamNumber: 2443,
        points: 1000,
        winner: true,
    }

    dummySet(dummyInput);

    const dummy = React.useMemo(
        () => /*[
            {
                col1: 'Object',
                col2: 'Type',
            },
            {
                col1: 'Table:',
                col2: 'Dummy',
            },
            {
                col1: 'Programmer',
                col2: 'BA',
                col3: 'Dominic',
            }
        ]*/
            dummyVals.map((dumms) => [
                {
                    col1: dumms
                },
            ]),
        []
    )


    const columns = React.useMemo(
        () => [
            {
                Header: 'Column 1',
                accessor: 'col1',
            },
            {
                Header: 'Column 2',
                accessor: 'col2',
            },
            {
                Header: 'Column 3',
                accessor: 'col3',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGRoups,
        rows,
        perpareRow,
    } = useTable({ columns, dummyVals })

    return (
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGRoups.map(headerGroup => (
                    <tr {...headerGroup.getGeaderGRoupPrps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
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
                    perpareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
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