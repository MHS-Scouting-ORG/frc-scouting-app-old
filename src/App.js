import logo from './logo.svg';
import './App.css';
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import { getTeam, listTeams } from './graphql/queries'
import { useEffect, useState } from 'react'


Amplify.configure(awsconfig)


function AuthenticatedUI ({user}) {
  console.log(user)
  useEffect(() => {

  }, [])  
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

          </div>
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
  const [teams, setTeams] = useState([])

  useEffect(() => {
    (async () => {
      console.log(`async run`)
      if(!user) {
        if(process.env.NODE_ENV !== 'production') {
          Auth.Credentials.configure({
            accessKeyId: "ASIAVJKIAM-AuthRole",
            secretKey: "fake",
            region: "us-west-1"
          })
          setUser({})
        }
        else
          setUser(await Auth.currentAuthenticatedUser())
      }
      else {
        return API.graphql(graphqlOperation(listTeams, {}))
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
