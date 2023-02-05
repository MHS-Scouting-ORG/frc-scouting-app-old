import logo from './logo.svg';
import './App.css';
import { Amplify, API, graphqlOperation, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import { getTeam, listTeams } from './graphql/queries'
import DummyTable from './components/DummyTable';

Amplify.configure(awsconfig)

function App() {
  
  return (
    <div>
      <DummyTable />
    </div>
  );
}

export default App;
