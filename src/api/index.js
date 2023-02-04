import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'
import { Auth, Amplify } from 'aws-amplify'
import config from '../config.json'
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

export { getTeamInfo }