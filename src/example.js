import React, { useState, useEffect } from 'react'
import { apiSubscribeToMatchUpdates, apiCreateTeamMatchEntry, apiListTeams, getMatchesForRegional, apiUpdateTeamMatch } from './api/index'
//import { getRegionals, getTeamsInRegional } from './api/bluealliance'
import { PriorityOpts, generateRandomEntry } from './api/builder'

function ExampleUI() {
  const [teams, setTeams] = useState([])
//  const [newTeam, setNewTeam] = useState(-1)
//  const [regionals, setRegionals] = useState([])
//  const [teamsInHawaiiRegional, setTeamsInHawaiiRegional] = useState([])
  const [regional, setRegional] = useState("")
  const [team, setTeam] = useState("")
  const [match, setMatch] = useState("")
  const [matchId, setMatchId] = useState(0)

  useEffect(() => {
    apiListTeams()
      .then(data => {
        console.log(`found teams ${JSON.stringify(data)}`)
        setTeams(data.data.listTeams.items)
      })
      .catch(err => {

        console.log(`get teams error ${JSON.stringify(err)}`)
      })
//    getRegionals()
//      .then(data => setRegionals(data))
//      .catch(console.log.bind(console))
//    getTeamsInRegional('2023hiho')
//      .then(data => setTeamsInHawaiiRegional(data))
//      .catch(console.log.bind(console))
    apiSubscribeToMatchUpdates(data => {
      //console.log(`update received ${JSON.stringify(data)}`)
      console.log(data)

    })
  }, [])


//  const doApiPush = function () {
//    apiAddTeam({ id: newTeam, name: "Foo Name" })
//      .then(_ => {
//        console.log('Push successful')
//        return apiListTeams()
//      })
//      .then(data => {
//        setTeams(data.data.listTeams.items)
//      })
//      .catch(err => {
//        console.log(`add teams error ${JSON.stringify(err)}`)
//      })
//
//
//  }

  const runTest = () => {
    const args = ["2023hiho", "frc2443", matchId]

    getMatchesForRegional("fooRegional", 0)
      .then(data => {
        //console.log(data)

      })
      .catch(err => {
        console.log(`get matches error ${JSON.stringify(err)}`)
      })
    apiCreateTeamMatchEntry(...args)
      .then(_ => {
        const matchEntry = generateRandomEntry(...args)
        matchEntry.Priorities.push(PriorityOpts.CONES)
        console.log(matchEntry)
        return apiUpdateTeamMatch(...args, matchEntry)

      })

      .then(_ => {
        //console.log(data)
        setMatchId(matchId + 1)
      })
      .catch(err => {
        console.log(err)
        setMatchId(matchId + 1)

      })

  }

  const formCreateNewTeamMatch = _ => {
    return (
      <form style={{ display: "block" }}>
        <input id="regional" type="text" onChange={evt => setRegional(evt.target.value)}></input>
        <label htmlFor="regional">regional</label>
        <input id="team" type="text" onChange={evt => setTeam(evt.target.value)}></input>
        <label htmlFor="team">team</label>

        <input id="match" type="text" onChange={evt => setMatch(evt.target.value)}></input>
        <label htmlFor="match">match</label>

        <button type="submit" onClick={evt => {
          evt.preventDefault()
          apiCreateTeamMatchEntry(regional, team, match)
            .then(data => {
              console.log(data)
            })
            .catch(console.log.bind(console))
        }
        }>Add Team</button>
      </form>

    )
  }


  return (
    <div>
      <div><ul>{
        (() => {
          return teams.map(team => <li>{JSON.stringify(team)}</li>)
        })()
      }</ul></div>
      {formCreateNewTeamMatch()}
      <button onClick={evt => runTest()}>DoTest</button>
    </div>)


}

export default ExampleUI