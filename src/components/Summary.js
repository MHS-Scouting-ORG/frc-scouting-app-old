import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useExpanded, useGlobalFilter } from 'react-table';
import { apiAddTeam, getTeamsInRegional, getRegionals, getOprs } from '../api/bluealliance';
import {apiListTeams,} from '../api/index'
import InnerTable from './InnerTable'; //add to summary table when clicked 
import GlobalFilter from './GlobalFilter';
import List from './List'

function Summary(){

    const [teamData, setTeamData] = useState([]);
    const [oprData, setOprData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [averages, setAverages] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [sortBy, setSortBy] = useState([])

    //Experimental
    const [deletedData,setDeletedData] = useState([]);
    
    useEffect(() => { //displays all teams and info for the az east regional in console
      getTeamsInRegional('2022hiho')
        .then(data => {
          setTeamData(data);
          //console.log(data);
        })
        .catch(console.log.bind(console))
    }, [])

    useEffect(() => { //opr, ccwm, dpr doesn't work 
      const fetchData = async () => {
        try {
          const stuff = await getOprs("2022hiho");
          setOprData(stuff.map(team => ({
            return: {
              opr: team.oprs.opr,
              ccwm: team.oprs.ccwm,
              dpr: team.oprs.dpr,
            } 
          })));
        }
        catch(error){
          console.log(error);
        }
      }
      fetchData();
    }, []);

  

    useEffect(() => { //used for calculations
      setTableData(teamData.map(team => {
        return{
          teamNumber: team.team_number,
          ccwm: team.ccwm,
        }
      }))
    }, [teamData])


    const renderRowSubComponent = ({ row }) => {
      //const t = apiData.filter((x) => parseInt(x.TeamId) === row.values.TeamNumber && parseInt(x.MatchId.substring(x.MatchId.indexOf('_')+2)) !== 0);

      const t = [{
        MatchId: "2022hiho_q10",
        Priorities: ["Cube ","Charge Station "],
        TotalPoints: 45,

        intakeFrom: ["Double Substation "],
        email: "braedenjames.asuncion2025@mauihigh.org"
      }]

      const disp = t.map(x => {
          return {
              match: x.MatchId.substring(x.MatchId.indexOf('_')+1),
              //priorities: x.Priorities.filter(val => val.trim() !== '').length !== 0 ? x.Strategy.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
              totalPoints: x.Teleop.ScoringTotal.Total,
              /*gridPts: x.LowHubAccuracy !== null ? x.LowHubAccuracy.toFixed(2) : '',
              lowGridAcc: x.lowGridAcc !== null ? x.lowGridAcc.toFixed(2) : '',
              midGridAcc: x.midGridAcc !== null ? x.midGridAcc.toFixed(2) : '',
              upperGridAcc: x.upperGridAcc !== null ? x.upperGridAcc.toFixed(2) : '',

              autoPlacement: x.autoPlacement,
              autoLowGrid: `${x.AutoLowMade}/${x.AutoLowMade + x.AutoLowMissed}`,
              autoMidGrid: `${x.AutoMidMade}/${x.AutoMidMade + x.AutoMidMissed}`,
              autoUpperGrid: `${x.AutoUpperMade}/${x.AutoUpperMade + x.AutoUpperMissed}`,
              mobility: x.mobility,
              autoChargeStation: x.chargeStation,

              teleLowGrid: `${x.TeleLowMade}/${x.TeleLowMade + x.TeleLowMissed}`,
              teleMidGrid: `${x.TeleMidMade}/${x.TeleMidMade + x.TeleMidMissed}`,
              teleUpperGrid: `${x.TeleUpperMade}/${x.TeleUpperMade + x.TeleUpperMissed}`,
              endgame: x.endgame !== undefined ? x.endgame : '',
              CSStart: x.csStart !== undefined ? x.csStart : '',
              CSEnd: x.csEnd !== undefined ? x.csEnd : '',
              smartPlacement: x.smartPlacement,
              intakeFrom: x.intakeFrom.filter(val => val.trim() !== '').length !== 0 ? x.intakeFrom.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
              numberofFoulAndTech: x.numOfFouls !== undefined && x.numOfTech !== undefined ? `${x.NumberOfFouls} | ${x.NumberOfTech}` : '',
              Penalties: x.Penalties !== undefined && x.Penalties.filter(val => val.trim() !== '').length !== 0 ? x.Penalties.filter(val => val.trim() !== '').map(val => val.trim()).join(', ') : '',
              NumberOfRankingPoints: x.NumberOfRankingPoints !== undefined ? x.NumberOfRankingPoints : '',

              defense: x.defense,
              comments: x.Comments !== undefined ? x.Comments.trim() : '',
              email: x.email.substring(0, x.email.length-17),*/

          };
      })
      
      const handleDelete = (event) => {
        //setData(data.filter((i) => i !== event.target.value));
        //setDeletedData(data.filter((i) => i == index))
        console.log(event.target)
      }

      return disp.length > 0 ?               // if there is data on team, display a table when expanded
          (<pre>
              <div> {<InnerTable information={disp} deleteRow={handleDelete}/>} </div>
          </pre>)
          : (                             // else if no data, notify no data has been collected
              <div style={{
                  padding: '5px',
              }}> No data collected for Team {row.values.teamNumber}. </div>
          );
  }

    //methods for what needs to be shown on summary table, accessors are from form people
    
    const getMax = (arr) => {                       // Get max of array
      return arr.sort((a, b) => b - a).shift();
    }

    const getPriorities = (arr) => {
      let pri = arr.map(teamObj => teamObj.Priorities).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
      return uniqueArr(pri);
    }

    const getIntakeFrom = (arr) => {
      let intFrom = arr.map(teamObj => teamObj.intakeFrom).reduce((a,b) => a.concat(b), []).filter((item) => item.trim() !== '');
      return uniqueArr(intFrom);
    }

    const uniqueArr = (arr) => {  
      const a = arr.map(x => x.trim());
        return a.filter((item, index) => {
            return a.indexOf(item, 0) === index;
        })
    }

    //avg total points
    const calcAvgPoints = (arr) => { //average points
      let individualPts = arr.map(val => val.totalPoints);
      let totalPts = 0;
      for(let i = 0; i < individualPts.length; i++){
        totalPts = totalPts + individualPts[i];
      }
      let avgPts = totalPts / individualPts.length;
      return avgPts.toFixed(3);
    }

    //avg grid points
    const calcAvgGrid = (arr) => {
      let individualPts = arr.map(val => val.gridPoints);
      let totalPts = 0;
      for(let i = 0; i < individualPts.length; i++){
        totalPts = totalPts + individualPts[i];
      }
      let avgGridPts = totalPts / individualPts.length;
      return avgGridPts.toFixed(3);
    }

    //avg total cube and cone poinyts and acc

    const calcTotalCubes = (arr) => {
      let totalCubes = arr.map(val => val.cubePts);
      let sumTotalCubes = 0;
      for(let i = 0; i < totalCubes.length; i++){
        sumTotalCubes = sumTotalCubes + totalCubes[i];
      }
      let avgTotalCubes = sumTotalCubes / totalCubes.length;
      return avgTotalCubes.toFixed(3);
    }

    const calcTotalCubesAcc = (arr) => {
      let totalCubesAcc = arr.map(val => val.cubesTeleAutoAccurary);
      let sumTotalCubesAcc = 0;
      for(let i = 0; i < totalCubesAcc.length; i++){
        sumTotalCubesAcc = sumTotalCubesAcc + totalCubesAcc[i];
      }
      let avgTotalCubesAcc = sumTotalCubesAcc / totalCubesAcc.length;
      return avgTotalCubesAcc.toFixed(3);
    }

    const calcTotalCones = (arr) => {
      let totalCones = arr.map(val => val.conePts);
      let sumTotalCones = 0;
      for(let i = 0; i < totalCones.length; i++){
        sumTotalCones = sumTotalCones + totalCones[i];
      }
      let avgTotalCones = sumTotalCones / totalCones.length;
      return avgTotalCones.toFixed(3);
    }

    const calcTotalConesAcc = (arr) => {
      let totalConesAcc = arr.map(val => val.conesTeleAutoAccurary);
      let sumTotalConesAcc = 0;
      for(let i = 0; i < totalConesAcc.length; i++){
        sumTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
      }
      let avgTotalConesAcc = sumTotalConesAcc / totalConesAcc.length;
      return avgTotalConesAcc.toFixed(3);
    }

    //avg UPPER grid stuff
    const calcUpperGrid = (arr) => {
      let upper = arr.map(val => val.highGridPoints);
      let sumUpper = 0;
      for(let i = 0; i < upper.length; i++){
        sumUpper = sumUpper + upper[i];
      }
      let avgUpper = sumUpper / upper.length;
      return avgUpper.toFixed(3);
    }

    const calcUpperGridAcc = (arr) => {
      let upperAcc = arr.map(val => val.highGridAcc);
      let sumUpperAcc = 0;
      for(let i = 0; i < upperAcc.length; i++){
        sumUpperAcc = sumUpperAcc + upperAcc[i];
      }
      let avgUpperAcc = sumUpperAcc / upperAcc.length;
      return avgUpperAcc.toFixed(3);
    }

    const calcUpperConeGrid = (arr) => { //autouppermade & auto teleuppermade accessor from form (tbd since idk what they made it)
      let upper = arr.map(val => (val.AutoUpperConeMade + val.TeleUpperConeMade));
      let sumUpper = 0;
      for(let i = 0; i < upper.length; i++){
        sumUpper = sumUpper + upper[i];      //sum of upper grid
      }
      let avgUpperCone = sumUpper / upper.length;
      return avgUpperCone.toFixed(3);       //avg of upper grid (rounds to .000)
    }

    const calcUpperConeAcc = (arr) => {
      let upperAcc = arr.map(val => val.upperConeGridAcc);
      let sumUpperAcc = 0;
      for(let i = 0; i < upperAcc.length; i++){
        sumUpperAcc = sumUpperAcc + upperAcc[i];  
      }
      let avgUpperConeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
      return avgUpperConeAcc.toFixed(3); 
    }

    const calcUpperCubeAcc = (arr) => {
      let upperAcc = arr.map(val => val.upperCubeGridAcc);
      let sumUpperAcc = 0;
      for(let i = 0; i < upperAcc.length; i++){
        sumUpperAcc = sumUpperAcc + upperAcc[i];  
      }
      let avgUpperCubeAcc = sumUpperAcc / upperAcc.length;  //avg acc of mid
      return avgUpperCubeAcc.toFixed(3); 
    }

    const calcUpperCubeGrid = (arr) => { //autouppermade & auto teleuppermade accessor from form (tbd since idk what they made it)
      let upper = arr.map(val => (val.AutoUpperCubeMade + val.TeleUpperCubeMade));
      let sumUpper = 0;
      for(let i = 0; i < upper.length; i++){
        sumUpper = sumUpper + upper[i];      //sum of upper grid
      }
      let avgUpperCube = sumUpper / upper.length;
      return avgUpperCube.toFixed(3);       //avg of upper grid (rounds to .000)
    }

    //avg MID grid stuff
    const calcMidGrid = (arr) => {
      let mid = arr.map(val => val.midGridPoints);
      let sumMid = 0;
      for(let i = 0; i < mid.length; i++){
        sumMid = sumMid + mid.length[i];
      }
      let avgMid = sumMid / mid.length;
      return avgMid.toFixed(3);
    }

    const calcMidGridAcc = (arr) => {
      let midAcc = arr.map(val => val.midGridAcc);
      let sumMidAcc = 0;
      for(let i = 0; i < midAcc.length; i++){
        sumMidAcc = sumMidAcc + midAcc[i];
      }
      let avgMidAcc = sumMidAcc / midAcc.length;
      return avgMidAcc.toFixed(3);
    }

    const calcMidConeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
      let mid = arr.map(val => (val.AutoMidConeMade + val.TeleMidConeMade));
      let sumMid = 0;
      for(let i = 0; i < mid.length; i++){
        sumMid = sumMid + mid[i];      //sum of mid grid
      }
      let avgMidCone = sumMid / mid.length;
      return avgMidCone.toFixed(3);       //avg of mid grid (rounds to .000)
    }

    const calcMidConeAcc = (arr) => {
      let midAcc = arr.map(val => val.midConeGridAcc);
      let sumMidAcc = 0;
      for(let i = 0; i < midAcc.length; i++){
        sumMidAcc = sumMidAcc + midAcc[i];  
      }
      let avgMidConeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
      return avgMidConeAcc.toFixed(3); 
    }

    const calcMidCubeGrid = (arr) => { //automidmade & auto telemidmade accessor from form (tbd since idk what they made it)
      let mid = arr.map(val => (val.AutoMidCubeMade + val.TeleMidCubeMade));
      let sumMid = 0;
      for(let i = 0; i < mid.length; i++){
        sumMid = sumMid + mid[i];      //sum of mid grid
      }
      let avgMidCube = sumMid / mid.length;
      return avgMidCube.toFixed(3);       //avg of mid grid (rounds to .000)
    }

    const calcMidCubeAcc = (arr) => {
      let midAcc = arr.map(val => val.midCubeGridAcc);
      let sumMidAcc = 0;
      for(let i = 0; i < midAcc.length; i++){
        sumMidAcc = sumMidAcc + midAcc[i];  
      }
      let avgMidCubeAcc = sumMidAcc / midAcc.length;  //avg acc of mid
      return avgMidCubeAcc.toFixed(3); 
    }

    //avg LOW grid stuff
    const calcLowGrid = (arr) => {
      let low = arr.map(val => (val.lowGridPoints));
      let sumLow = 0;
      for(let i = 0; i < low.length; i++){
        sumLow = sumLow + low[i];
      }
      let avgLow = sumLow / low.length;
      return avgLow.toFixed(3);
    }

    const calcLowAcc = (arr) => {
      let lowAcc = arr.map(val => val.lowGridAcc);
      let sumLowAcc = 0;
      for(let i = 0; i < lowAcc.length; i++){
        sumLowAcc = sumLowAcc + lowAcc[i];
      }
      let avgLowAcc = sumLowAcc + lowAcc.length;
      return avgLowAcc.toFixed(3);
    }

    const calcLowConeGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
      let low = arr.map(val => (val.AutoLowConeMade + val.TeleLowConeMade));
      let sumLow = 0;
      for(let i = 0; i < low.length; i++){
        sumLow = sumLow + low[i];      //sum of low grid
      }
      let avgLowCone = sumLow / low.length;
      return avgLowCone.toFixed(3);       //avg of low grid (rounds to .000)
    }

    const calcLowConeAcc = (arr) => {
      let lowAcc = arr.map(val => val.LowConeGridAcc);
      let sumLowAcc = 0;
      for(let i = 0; i < lowAcc.length; i++){
        sumLowAcc = sumLowAcc + lowAcc[i];  
      }
      let avgLowConeAcc = sumLowAcc / lowAcc.length;  //avg acc of low
      return avgLowConeAcc.toFixed(3); 
    }

    const calcLowCubeGrid = (arr) => { //autolowmade & auto telelowmade accessor from form (tbd since idk what they made it)
      let low = arr.map(val => (val.AutoLowCubeMade + val.TeleLowCubeMade));
      let sumLow = 0;
      for(let i = 0; i < low.length; i++){
        sumLow = sumLow + low[i];      //sum of low grid
      }
      let avgLowCube = sumLow / low.length;
      return avgLowCube.toFixed(3);       //avg of low grid (rounds to .000)
    }

    const calcLowCubeAcc = (arr) => {
      let lowAcc = arr.map(val => val.LowCubeGridAcc);
      let sumLowAcc = 0;
      for(let i = 0; i < lowAcc.length; i++){
        sumLowAcc = sumLowAcc + lowAcc[i];  
      }
      let avgLowCubeAcc = sumLowAcc / lowAcc.length;  //avg acc of low
      return avgLowCubeAcc.toFixed(3); 
    }

    //charge station
    const calcChargeStation = (arr) => {  //for auto bc calculating endgame is a diff method
      let chargeStation = arr.map(val => {
        if(val.chargeStation === 'None' || val.chargeStation === 'Attempted'){
          return 0;
        }
        else if(val.chargeStation === 'Docked and Not Engaged'){
          return 10;
        }
        else if(val.chargeStation === 'Docked and Engaged'){
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
        else if(val.endgame === 'Docked and Not Engaged'){
          return 6;
        }
        else if(val.endgame === 'Docked and Engaged'){
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

    const calcColumnSort = (arr,gridPts,conePts,coneAcc,cubePts,cubeAcc,charge) => {
      let sum = 0;
      if(arr.includes("Grid Points")){
        sum = sum + gridPts;
      }
      if(arr.includes("Cone Points")){
        sum = sum + conePts;
      }
      if(arr.includes("Accurate Cone Placement")){
        sum = sum + coneAcc;
      }
      if(arr.includes("Cube Points")){
        sum = sum + cubePts;
      }
      if(arr.includes("Accurate Cube Placement")){
        sum = sum + cubeAcc;
      }
      if(arr.includes("Charge Station")){
        sum = sum + charge;
      }

      return sum.toFixed(3);
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
        const grade = calcColumnSort(sortBy,team.gridPoints,team.conePoints,team.coneAccuracy,team.cubePoints,team.cubeAccuracy,team.chargeStation);
        return{
          teamNumber: team.teamNumber,
          opr: team.opr,
          ccwm: team.ccwm,
          dpr: team.dpr,
          SumPriority: grade
        }
        
        
      }),[tableData]
    )
  
    const columns = React.useMemo(
        () => [
          {
            Header: 'Team #',
            accessor: "teamNumber",
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                  {row.values.teamNumber}
              </span>)
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
            Header: 'Avg Grid Points',
            accessor: 'avgGridPoints',
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
          {
            Header: 'Grade',
            accessor: "SumPriority",
          },
        ], []
      )
  
    const tableInstance = useTable({ columns, data, oprData }, useGlobalFilter, useSortBy, useExpanded);
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      visibleColumns,
      state,
      setGlobalFilter,
    } = tableInstance

    const {globalFilter} = state;
  
    return (
      <div>
          <table style={{ width:'1250px' }} >
              <tbody>
                  <tr>
                      <td
                          style={{
                              minWidth: '750px'
                          }}
                      >
                          
                          <br/>
                      <h3>summary stats</h3>
                          <p>
                              <strong>KEY</strong> 
                              <br/> "Avg" / μ = Average
                              <br/> σ = Standard Deviation
                              <br/> Acc = Accuracy
                          </p>
                      <p> Select checkboxes to choose which priorities to sort by. Then click on <strong>Column Sort</strong>. </p>
                        <List setList={setSortBy}/>
                      </td>
                      <td>
                          <img src={"./images/community.jpg"} width="300px" height="240px"
                              style={{
                                  display: 'inline-block',
                                  margin: '25px'
                              }}
                          ></img>
                      </td>
                  </tr>
              </tbody>
          </table>
          
          <br/><br/>

          <GlobalFilter filter={globalFilter} set={setGlobalFilter}/>
          <table {...getTableProps()} 
              style={{
                  width: '1250px'
              }}
          >
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
                                              textAlign: 'center',
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

                          return (<React.Fragment  >

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

                              {row.isExpanded ? (
                                  <tr>
                                      <td colSpan={visibleColumns.length}
                                          style = {{
                                              maxWidth: '1200px'
                                          }}
                                      >
                                          {renderRowSubComponent({ row })}
                                      </td>
                                  </tr>
                              ) : null}


                          </React.Fragment>
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
