import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded, } from 'react-table';
import { apiAddTeam, getTeamsInRegional, getRegionals, getOprs } from '../api/bluealliance';
import {apiListTeams,} from '../api/index'
import InnerTable from './InnerTable'; //add to summary table when clicked 




const dummyData = [
    {teamNumber: '2443', matches: "Q2",  }, // using to test sortby
    {teamNumber: '32', matches: "Q3",  }

]

function Summary(){

    const [teamData, setTeamData] = useState([]);
    const [oprData, setOprData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [averages, setAverages] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [apiData, setApiData] = useState([]);
    
    useEffect(() => { //displays all teams and info for the az east regional in console
      getTeamsInRegional('2022hiho')
        .then(data => {
          setTeamData(data);
          //console.log(data);
        })
        .catch(console.log.bind(console))
    }, [teamData])

    useEffect(() => { //opr, ccwm, dpr
      getOprs('2022hiho')
      .then(data => {
        setOprData(data);
        //console.log(data);
      })
      .catch(console.log.bind(console))
    }, [oprData])

    useEffect(() => { //used for calculations
      setTableData(teamData.map(team => {
        return{
          teamNumber: team.team_number,
          //ccwm: team.ccwm,
        }
      }))
    }, [teamData])

    const renderRowSubComponent = ({ row }) => {
      
    }

    //methods for grid avgs, accessors are from form people

    const calcLowGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
      let low = arr.map(val => (val.AutoLowMade + val.TeleLowMade));
      let sumLow = 0;
      for(let i = 0; i < low.length; i++){
        sumLow = sumLow + low[i];      //sum of low grid
      }
      let avgLow = sumLow / low.length;
      return avgLow.toFixed(3);       //avg of low grid (rounds to .000)
    }

    const calcLowAcc = (arr) => {
      let lowAcc = arr.map(val => val.lowGridAcc);
      let sumLowAcc = 0;
      for(let i = 0; i < lowAcc.length; i++){
        sumLowAcc = sumLowAcc + lowAcc[i];  
      }
      let avgLowAcc = sumLowAcc / lowAcc.length;  //avg acc of low
      return avgLowAcc.toFixed(3); 
    }

    const calcMidGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
      let mid = arr.map(val => (val.AutoMidMade + val.TeleMidMade));
      let sumMid = 0;
      for(let i = 0; i < mid.length; i++){
        sumMid = sumMid + mid[i];      //sum of mid grid
      }
      let avgMid = sumMid / mid.length;
      return avgMid.toFixed(3);       //avg of mid grid (rounds to .000)
    }

    const calcMidAcc = (arr) => {
      let midAcc = arr.map(val => val.midGridAcc);
      let sumMidAcc = 0;
      for(let i = 0; i < midAcc.length; i++){
        sumMidAcc = sumMidAcc + midAcc[i];  
      }
      let avgMidAcc = sumMidAcc / midAcc.length;  //avg acc of mid
      return avgMidAcc.toFixed(3); 
    }

    const calcUpperGrid = (arr) => { //autouppermade & auto teleuppermade accessor from form (tbd since idk what they made it)
      let upper = arr.map(val => (val.AutoUpperMade + val.TeleUpperMade));
      let sumUpper = 0;
      for(let i = 0; i < upper.length; i++){
        sumUpper = sumUpper + upper[i];      //sum of upper grid
      }
      let avgUpper = sumUpper / upper.length;
      return avgUpper.toFixed(3);       //avg of upper grid (rounds to .000)
    }

    const calcUpperAcc = (arr) => {
      let upperAcc = arr.map(val => val.upperGridAcc);
      let sumUpperAcc = 0;
      for(let i = 0; i < upperAcc.length; i++){
        sumUpperAcc = sumUpperAcc + upperAcc[i];  
      }
      let avgUpperAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
      return avgUpperAcc.toFixed(3); 
    }

    const calcChargeStation = (arr) => {
      let chargeStation = arr.map(val => {
        if(val.chargeStation === 'None' || val.chargeStation === 'Attempted'){
          return 0;
        }
        else if(val.chargeStation === 'Docked'){
          return 10;
        }
        else if(val.chargeStation === 'DockedEngaged'){
          return 12;
        }
        else{
          return 0;
        }
      });

      let sumChargeStation = 0;
      for(let i = 0; i < chargeStation.length; i++){
        sumChargeStation = sumChargeStation + chargeStation[i];
      }

      let avgChargeStation = sumChargeStation / chargeStation.length;
      return avgChargeStation.toFixed(3);
    }

    const calcEndgame = (arr) => { //only for teleop
      let endgame = arr.map(val => {
        if(val.endgame === 'None' || val.endgame === 'Attempted'){
          return 0;
        }
        else if(val.endgame === 'Parked'){
          return 2;
        }
        else if(val.endgame === 'Docked'){
          return 6;
        }
        else if(val.endgame === 'DockedEngaged'){
          return 8;
        }
        else{
          return 0;
        }
      });

      let sumEndgame = 0;
      for(let i = 0; i < endgame.length; i++){
        sumEndgame = sumEndgame + endgame[i];
      }

      let avgEndgame = sumEndgame / endgame.length;
      return avgEndgame.toFixed(3);
    }


    const calcDeviation = (arr, mean) => { //standard deviation
      const distance = arr.map(val => {
        return (val - mean) ** 2;
      })

      const sumDistance = () => {
        let sum = 0;
        for(let i = 0; i < distance.length; i++){
          sum = sum + distance[i];
        }
        return sum;
      }

      const devi = Math.sqrt(sumDistance() / (distance.length));
      return devi.toFixed(3); //rounds standard deviation to thousandths
    }

    
    //data being displayed
    const data = React.useMemo( 
        () => tableData.map(team => {
        return{
          teamNumber: team.teamNumber,
          //ccwm: team.ccwm,
        }
        
        
      }),[tableData]
    )
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Team #',
            accessor: "teamNumber",
          },
          {
            Header: 'Matches',
            accessor: 'matches',
          },
          {
            Header: 'OPR',
            accessor: 'opr',
          },
          {
            Header: 'Priorities',
            accessor: 'priorities',
          },
          {
            Header: 'CCWM',
            accessor: 'ccwm',
          },
          {
            Header: 'Avg Points',
            accessor: 'avgPoints',
          },
          {
            Header: 'Avg Low Grid Points',
            accessor: 'avgLowGridPoints',
          },
          {
            Header: 'Avg Low Grid Accurary',
            accessor: 'avgLowGridAcc',
          },
          {
            Header: 'Avg Mid Grid Points',
            accessor: 'avgMidGridPoints',
          },
          {
            Header: 'Avg Mid Grid Accurary',
            accessor: 'avgMidGridAcc',
          },
          {
            Header: 'Avg Upper Grid Points',
            accessor: 'avgUpperGridPoints',
          },
          {
            Header: 'Avg Upper Grid Accurary',
            accessor: 'avgUpperGridAcc',
          },
          {
            Header: 'Avg Charge Station Points',
            accessor: 'avgChargeStation',
          },
          {
            Header: 'DPR',
            accessor: 'dpr',
          },
          {
            Header: 'Defense',
            accessor: 'defense',
          },
          {
            Header: 'Penalties',
            accessor: 'penalties',
          },
          {
            Header: 'Comments',
            accessor: 'comments',
          },
        ], []
      )
  
    const tableInstance = useTable({ columns, data }, useSortBy, useExpanded);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = tableInstance
  
    return (
      <div>
        <h2>summary stats</h2>
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
  
  //export {getRegionals, getTeamsInRegional }
  export default Summary;
