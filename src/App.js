import logo from './logo.svg';
import './App.css';
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import awsconfig from './aws-exports'
import { getTeam, listTeams } from './graphql/queries'


Amplify.configure(awsconfig)

function App() {
  API.graphql(graphqlOperation(getTeam, {

  }))
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
