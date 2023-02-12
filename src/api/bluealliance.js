import config from '../config.json'
import { Auth } from 'aws-amplify'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'



const { bluealliance_api_endpoint, year } = config

async function getOprs(event_key) {
  return _fetch(`/event/${event_key}/oprs`)
}

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

const _fetch = async function(endpoint) {
  const api_key = await getApiKey()
  const res = await fetch(`${bluealliance_api_endpoint}${endpoint}`, { headers: { 'x-tba-auth-key': api_key.SecretString }, mode: "cors" })
  return res.json()
 
}

/* 
 * Get BlueThunder Information
 */
const getTeamInfo = async function () {
  return _fetch("/team/frc2443")

}

/*
 * Get all regionals for the year
 */
const getRegionals = async function() {
  return _fetch(`/events/${year}`) 
}

/*
 * Get all teams in a regional
 * parameter
 * - regional - regional id from bluealliance
 */
const getTeamsInRegional = async function(regional) {
  return _fetch(`/event/${regional}/teams`)
}

export { getTeamInfo, getRegionals, getTeamsInRegional } 