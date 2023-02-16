import { StopReplicationToReplicaRequestFilterSensitiveLog } from "@aws-sdk/client-secrets-manager";
import React, { useEffect, useState } from "react"
import { useExpanded, useTable } from "react-table"
import { apiGetTeam, apiListTeams, getMatchesForRegional} from "../api";
import { getTeamsInRegional, getTeamInfo, getOprs } from "../api/bluealliance";
import DumInnerTable from "./DumInnerTable";

function DummyTableDG() {

  const [tableData,setTableData] = useState([]); //data on table
  const [teamsData,setTeamsData] = useState([]); //data of teams
  const [teamNum, setTeamNum] = useState([]) // team numbers frc{teamNumber}
  const [averages,setAverages] = useState([]);
  const [oprData,setOprData] = useState([]); //data of team ccwm opr and dpr
  const [oprList,setOprList] = useState([]);

   useEffect(() => {
  },[]) //debug purposes ^ 

  /*useEffect(() => {
    getOprs('2023hiho')
    .then(data => {
      data.map(data => {
        return {
          frc2443opr: data.frc2443
        }
      })
    })
  },[]) */
  
   useEffect(() => { // sets team numbers of objects
    getTeams()
      .then(data => {
        setTeamsData(data) 
        console.log(data)
      })
      .catch(console.log.bind(console))
   },[]) 

   useEffect(() => {     //set opr data //convert to list and filter data structure to find opr dpr and ccwm 
    getOprs('2022hiho')
    .then(data => { 
      const oprDataArr = Object.values(data)
      const cData = oprDataArr[0] //ccwm 
      const dData = oprDataArr[1] //dpr
      const oData = oprDataArr[2] //opr
      const cDataKeys = Object.keys(cData) //ccwm team
      const dDataKeys = Object.keys(dData) //dpr team
      const oDataKeys = Object.keys(oData) // opr team
      const dataOpr = Object.values(oData)
      //const frc2443opr = oDataKeys.find(frc2443)

      console.log(dataOpr)
      setOprList(oData) // state opr is now a list that holds the oprs of teams that it is available for
      console.log(Object.values(data)[1])
      console.log(oData) 
      console.log(dataOpr)
      console.log(data) // whole
      console.log(cDataKeys)
      console.log(cDataKeys[1])
      console.log(getTeamsInRegional('2023hiho'))
      console.log(teamNum)
      console.log(oprDataArr[0]['frc2090']) // now know that multiple squares bracket can be used
    })
    .catch(console.log.bind(console))
   },[teamsData])

   useEffect(() => setTeamNum(teamsData.map(team => {
    console.log(teamNum.TeamNum)
    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
<<<<<<< HEAD
      OPR: team.OPR,
=======
      //OPR: opr.filter(opr.keys === opr.keys.substring(indexOf('')) === team.TeamNumber !== 0),
>>>>>>> 1e691e37985473a395c15861457172fe6903773d
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: `frc${team.TeamNumber}`
    }
    
   })),[teamsData]) 

   useEffect(() => setOprData(teamNum.map(team => {

    return {
      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,    // FIND WAY TO EVAL KEY OR TO MAP VALUES UNIQUE TO EACH TEAM ROW
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      TeamNum: `frc${team.TeamNumber}`
    }
   })), [teamsData, teamNum])

   useEffect(() => setAverages(teamsData.map(team => {
    console.log(team)
    //setTeamNum(teamNum.map('frc' + team.TeamNumber)) //figure out how to map all teams with frc
    // experiment does not work ^
    /*const test = [1, 2, 3, 4, 5, 6]

    const test2 = [{one: 1, two: 2, three: 3}, {four: 4, five: 5, six: 6}, {seven: 7, eight: 8, nine: 9}]

    const one = test2[1]
    const disOp = test2.find(element => element.length > 0) 

    const testF = () => { return 1} */
    // experiments ^


    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      //TeamNum: teamNum

    }
  })), [teamsData])

  useEffect(() => setTableData(averages.map(team => {
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties,

      //TeamNum: team.teamNum
    }
  })),[teamsData, averages]) 

const getOprData = async () => {
  return await (getOprs('2023hiho'))
  .catch(err => console.log(err))
  .then(data => {
    const OPR = () => {
      getOprs('2023hiho')
      .then(data => {
        return Object.values(data)[1]
      })
    }
    return OPR.map(obj => {
      return {
        TeamNumber: obj.TeamNumber,
        Matches: obj.Matches,
        Priorities: obj.Priorities,
        OPR: obj.frc2090,
        CCWM: obj.CCWM, 
        AvgPoints: obj.AvgPoints,
        AvgLow: obj.AvgLow,
        AvgMid: obj.AvgMid,
        AvgTop: obj.AvgTop,
        AvgAcc: obj.AvgAcc,
        DPR: obj.DPR,
        Defense: obj.Defense,
        Penalties: obj.Penalties
      }
    })
  })
} 
//dont know if work ^

const getTeams = async () => {
   return await (getTeamsInRegional('2023hiho'))
    .catch(err => console.log(err))
    .then(data => {
      return data.map(obj => {
        const teamNumObj = {
          TeamNumber: obj.team_number,
          Matches: '',
          Priorities: '',
          OPR: 0,
          CCWM: 0, 
          AvgPoints: 0,
          AvgLow: 0,
          AvgMid: 0,
          AvgTop: 0,
          AvgAcc: 0,
          DPR: 0,
          Defense: '',
          Penalties: 0,

          //TeamNum: 0,
        }

        return teamNumObj
      })
    })
    .catch(err => console.log(err))
   /*await (getOprs('2023hiho'))
   .catch(err => console.log(err))
   .then(data => { 
    
   })*/
}

/* async function getApiData(event) {
  await getOprs(event)
  .then(data => setOprData(data))
  await getTeams(event)
  .then(data => setTeamNumber(data))
  return {
  
  }
} */
// experiment ^

const renderRowSubComponent = ({ row }) => { //not working(not showing table within team number)
    
  const dumTest = [
    {
      Match: 0,
      Strategy: 'stratTEST',
      TotalPts: 1,
      RankingPts: 2,


      AutoPlacement: 3,
      AutoGridPts: 4,
      AutoChargeStationPts: 5,

      TeleGridPts: 6,
      TeleChargeStationPts: 7
    }
  ]

  const dum = dumTest.map(x =>  {
    return {
      Match: x.Match,
      Strategy: x.Strategy,
      TotalPts: x.TotalPts,
      RankingPts: x.RankingPts,


      AutoPlacement: x.AutoPlacement,
      AutoGridPts: x.AutoGridPts,
      AutoChargeStationPts: x.AutoChargeStationPts,

      TeleGridPts: x.TeleGridPts,
      TeleChargeStationPts: x.TeleChargeStationPts
      
    }
  })

  return dum.length > 0 ?
  (<pre>
    <div>{<DumInnerTable information = {dum}/>} </div>
  </pre>)
  : (
    <div style={{
      padding: '5px',
  }}> No data collected for Team {row.values.TeamNumber}. </div>
  );
}

// ===================================================================================
const data = React.useMemo(
  () => tableData.map(team => {
    return {

      TeamNumber: team.TeamNumber,
      Matches: team.Matches,
      Priorities: team.Priorities,
      OPR: team.OPR,
      CCWM: team.CCWM, 
      AvgPoints: team.AvgPoints,
      AvgLow: team.AvgLow,
      AvgMid: team.AvgMid,
      AvgTop: team.AvgTop,
      AvgAcc: team.AvgAcc,
      DPR: team.DPR,
      Defense: team.Defense,
      Penalties: team.Penalties

    }
  }) , [tableData]
) //^works

  const columns = React.useMemo(
    () => [
      {
        Header: "Team #",
        accessor: "TeamNumber",
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()}>
              {row.values.TeamNumber}
          </span>)
      },
      {
        Header: "Matches",
        accessor: "Matches"
      },
      {
        Header: "Priorities/Strategies",
        accessor: "Priorities",
        Cell: ({ row }) => (
          <div
              style = {{
                  whiteSpace: 'normal',
              }}
          >
              {row.original.Priorities}
          </div>
        )
      },
      {
        Header: "OPR",
        accessor: "OPR"
      },
      {
        Header: "CCWM",
        accessor: "CCWM"
      },
      {
        Header: "Avg Points",
        accessor: "AvgPoints"
      },
      {
        Header: "Avg Low Placement",
        accessor: "AvgLow"
      },
      {
        Header: "Avg Mid Placement",
        accessor: "AvgMid"
      },
      {
        Header: "Avg Top Placement",
        accessor: "AvgTop"
      },
      {
        Header: "Avg Accuracy",
        accessor: "AvgAcc"
      },
      {
        Header: "DPR",
        accessor: "DPR"
      },
      {
        Header: "Defense",
        accessor: "Defense"
      },
      {
        Header: "Penalties",
        accessor: "Penalties"
      },
    ], []
  )

  const tableInstance = useTable({ columns, data}, useExpanded);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
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
          return ( <React.Fragment>
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

            {row.IsExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}
                  style = {{
                    maxWidth: "1200px"
                  }}
                  >
                    {renderRowSubComponent ({row})}
                  </td>
                </tr>
              ) : null}

                </React.Fragment>
          )
        })} 
      </tbody>
    </table>
  )
}

export default DummyTableDG; 
