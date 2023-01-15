import logo from './logo.svg';
import './App.css';
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import { getTeam, listTeams } from './graphql/queries'


Amplify.configure(awsconfig)

function App() {
  API.graphql(graphqlOperation(listTeams, {

  }))
    .then(data => {
      console.log(data)
    })
    .catch(err => {
      console.error(err)
    })
  
  const setUser = user => {
    console.log(user)
  }

   Auth.currentAuthenticatedUser()
      .then(currentUser => setUser(currentUser))
      .catch(() => console.log("Not signed in"));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => Auth.federatedSignIn({

          provider: CognitoHostedUIIdentityProvider.Google
        })}>Login</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
