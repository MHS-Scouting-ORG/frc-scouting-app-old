import logo from './logo.svg';
import './App.css';
import { Amplify, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import { useEffect, useState } from 'react'

import { apiListTeams, apiAddTeam, apiGetTeams, getTeamInfo, getMatchesForRegional } from './api/index'

const redirectSignInUri = awsconfig.oauth.redirectSignIn.split(',')
awsconfig.oauth.redirectSignIn = redirectSignInUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]
const redirectSignOutUri = awsconfig.oauth.redirectSignOut.split(',')
awsconfig.oauth.redirectSignOut = redirectSignOutUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]

Amplify.configure(awsconfig)


function AuthenticatedUI ({user}) {
  //console.log(user)

  const [teamInfo, setTeamInfo] = useState({})
  const [teams, setTeams] = useState([])
  const [newTeam, setNewTeam] = useState(-1)
  useEffect(() => {
    getTeamInfo()
      .then(data => {
        setTeamInfo(data)
      })
      .catch(err => {
        console.log(err)
      })
    apiGetTeams(0)
      .then(data => {
        console.log(`found teams ${JSON.stringify(data)}`)
        setTeams(data)
      })
      .catch(err => {
        
        console.log(`get teams error ${err}`)
      })
  }, [])  

  const doApiPush = function() {
    apiAddTeam({id: newTeam, name: "Foo Name"})
      .then(_ => {
        console.log('Push successful')
        return apiListTeams()
      })
      .then(data => {
        setTeams(data.data.listTeams)
      })
      .catch(err => {
        console.log(`add teams error ${JSON.stringify(err)}`)
      })
  }

  const runTest = () => {
    getMatchesForRegional("fooRegional", 0)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(`get matches error ${JSON.stringify(err)}`)
      })
  }

  return (
          <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div>
          {user.username}
          <br/>
          {JSON.stringify(teamInfo)}
          </div>
          <form>
            <input type="text" onChange={evt => setNewTeam(evt.target.value)}></input>
            <button type="submit" onClick={evt => {
                evt.preventDefault()
                doApiPush()
              }
            }>Add Team</button>
          </form>
          <button onClick={evt => runTest()}>DoTest</button>
          </div>)

}

function LoginUI() {
  return (
    <div>
        <button onClick={() => Auth.federatedSignIn({

          provider: CognitoHostedUIIdentityProvider.Google
        })}>Login</button>

    </div>
  )
}

function App() {

  const [user, setUser] = useState()
 

  useEffect(() => {
    (async () => {
      console.log(`async run`)
      if(!user) {
       // if(process.env.NODE_ENV !== 'production') {
       //   Auth.Credentials.configure({
       //     accessKeyId: "ASIAVJKIAM-AuthRole",
       //     secretKey: "fake",
       //     region: "us-west-1"
       //   })
       //   setUser({})
       // }
       // else
          setUser(await Auth.currentAuthenticatedUser())
      }
    })()
    .then(console.log.bind(console))
    .catch(console.error.bind(console))
  }, [user])

      
  return (
    <div className="App">
      <header className="App-header">
        {(_ => {

            if(user) {
              //console.log(`${JSON.stringify(user)} logged in`)
              return ( <AuthenticatedUI user={user}/> )
            } 
            return ( <LoginUI/> )
          }
        )()
        }
        
      </header>
    </div>
  );
}

export default App;
