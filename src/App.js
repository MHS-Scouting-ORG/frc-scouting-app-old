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
    Auth.currentAuthenticatedUser()
        .then(currentUser => setUser(currentUser))
        .catch(() => console.log("Not signed in"));
    API.graphql(graphqlOperation(listTeams, {
    
    }))
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })

  }, [])

      
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
