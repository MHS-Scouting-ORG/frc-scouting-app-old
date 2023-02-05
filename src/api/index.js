import { Auth, graphqlOperation, API } from 'aws-amplify'
import { teamMatchesByRegional, getTeam, listTeams} from '../graphql/queries'
import { updateTeamMatch, createTeamMatch, createTeam } from '../graphql/mutations'


/*
 * Get a Team by their TeamNumber  that are currently in our database
 */
const apiGetTeam = async function(teamNumber) {
    return await API.graphql(graphqlOperation(getTeam, {id:teamNumber}))
}

/*
 * Add a team to our database
 */
const apiAddTeam = async function(team) {
    await API.graphql(graphqlOperation(createTeam, { input: team }))
}

/*
 * Get All the teams in our database
 */
const apiListTeams = async function() {
    return API.graphql(graphqlOperation(listTeams))
}

/*
 * Get all entered matches for a regional;  optionally filter them down by team
 * parameters:
 * - regionalId - the regional id;  this is identified by the same id used in the bluealliance api
 * - teamNumber (optional) - the teamNumber
 */
const getMatchesForRegional = async function(regionalId, teamNumber) {
    if(!teamNumber) { 
        return API.graphql(graphqlOperation(teamMatchesByRegional, {
            Regional: regionalId,
        }))  
    }
    return API.graphql(graphqlOperation(teamMatchesByRegional, {
        Regional: regionalId,
        filter: {
            Team: {
                eq: teamNumber
            }
        }
    })) 
}

/*
 * create a new team match entry
 * parameters
 * - regionalId - the regional id
 * - teamId - the team id
 * - matchid - the match id
 */
const apiCreateTeamMatchEntry = async function(regionalId, teamId, matchId) {
    if(!regionalId) {
        throw "Regional not provided"
    }
    if(!teamId) {
        throw "Team Id not provided"
    }
    if(!matchId) {
        throw "MatchId not provided"
    }

    return API.graphql(graphqlOperation(createTeamMatch, {
        input: {
            id: matchId,
            name: "",
            Team: teamId,
            Regional: regionalId

        }
    }))
}


const apiUpdateTeamMatch = async function(regionalId, teamId, matchId) {
    if(!regionalId) {
        throw "Regional not provided"
    }
    if(!teamId) {
        throw "Team Id not provided"
    }
    if(!matchId) {
        throw "MatchId not provided"
    }

    return API.graphql(graphqlOperation(updateTeamMatch, {
        input: {
            id: matchId,
            name: "",
            Team: teamId,
            Regional: regionalId
        }
    }))

}

export { apiGetTeam, apiAddTeam, apiListTeams, getMatchesForRegional, apiCreateTeamMatchEntry, apiUpdateTeamMatch }
