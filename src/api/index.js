import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
import { Auth, graphqlOperation, API } from 'aws-amplify'
import config from '../config.json'
import { teamMatchesByRegional, getTeam, listTeams} from '../graphql/queries'
import { createTeam } from '../graphql/mutations'
const { bluealliance_api_endpoint } = config


// get bluealliance api key
async function getApiKey() {
    const user = await Auth.currentAuthenticatedUser()
    const credentials = await Auth.currentCredentials(user)
    const client = new SecretsManagerClient({
        region: 'us-west-1',
        credentials,
    })

    return await client.send(new GetSecretValueCommand({
        SecretId: `bluealliance-apikey-dev`
    }))
}

const getTeamInfo = async function() {
    const api_key = await getApiKey()
    return fetch(`${bluealliance_api_endpoint}/team/frc2443`, { headers : { 'x-tba-auth-key' : api_key.SecretString }, mode: "cors"})
        .then(res => res.json())
}

const apiGetTeams = async function(id) {
    return await API.graphql(graphqlOperation(getTeam, {id}))
}

const apiAddTeam = async function(team) {
    await API.graphql(graphqlOperation(createTeam, { input: team }))
}

const apiListTeams = async function() {
    return API.graphql(graphqlOperation(listTeams))
}

const getMatchesForRegional = async function(regionalId, teamId) {
    if(!teamId) { 
        return API.graphql(graphqlOperation(teamMatchesByRegional, {
            Regional: regionalId,
        }))  
    }
    return API.graphql(graphqlOperation(teamMatchesByRegional, {
        Regional: regionalId,
        filter: {
            Team: {
                eq: teamId
            }
        }
    })) 
}

export { getTeamInfo, apiGetTeams, apiAddTeam, apiListTeams, getMatchesForRegional }
