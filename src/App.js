import logo from './logo.svg';
import './App.css';
import { Amplify, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import DummyTableDG from './components/DummyTableDG';
import DummyTable from './components/DummyTable';
import Summary from './components/Summary';
import InnerTable from './components/InnerTable';
import CommentsOnly from './components/CommentsOnly';


import { useEffect, useState } from 'react'
import ExampleUI from './example'
import { getTeamInfo } from './api/bluealliance'


const redirectSignInUri = awsconfig.oauth.redirectSignIn.split(',')
awsconfig.oauth.redirectSignIn = redirectSignInUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]
const redirectSignOutUri = awsconfig.oauth.redirectSignOut.split(',')
awsconfig.oauth.redirectSignOut = redirectSignOutUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]

Amplify.configure(awsconfig)


function AuthenticatedUI({ user }) {
  //console.log(user)
  const [teamInfo, setTeamInfo] = useState({})
  useEffect(() => {
    getTeamInfo()
      .then(data => {
        setTeamInfo(data)
      })
      .catch(err => {
        console.log(err)
      })
  })


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
        <br />
      </div>
      
      <h3>charged up table</h3>
      <Summary />
      <InnerTable />

      <h3>table w/ only comments</h3>
      <CommentsOnly />

    </div>
    )
    

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
      if (!user) {
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

          if (user) {
            //console.log(`${JSON.stringify(user)} logged in`)
            return (<AuthenticatedUI user={user} />)
          }
          return (<LoginUI />)
        }
        )()
        }

      </header>
    </div>
  );
}

export default App;
