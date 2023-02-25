import logo from './logo.svg';
import './App.css';
import { Amplify, Auth } from 'aws-amplify'
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import awsconfig from './aws-exports'
import { useEffect, useState } from 'react'
import ExampleUI from './example'
import { getRegionals, getTeamInfo } from './api/bluealliance'
import Form from './form/Form';


const redirectSignInUri = awsconfig.oauth.redirectSignIn.split(',')
awsconfig.oauth.redirectSignIn = redirectSignInUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]
const redirectSignOutUri = awsconfig.oauth.redirectSignOut.split(',')
awsconfig.oauth.redirectSignOut = redirectSignOutUri[parseInt(process.env.REACT_APP_REDIRECT_INDEX)]

Amplify.configure(awsconfig)


function AuthenticatedUI({ user }) {
  //console.log(user)
  const [regional, setRegional] = useState()
  useEffect(() => {
    getRegionals()
    .then(data => {
      setRegional(data[0].key)
    })
  })

  /*const [teamInfo, setTeamInfo] = useState({})
  useEffect(() => {
    getTeamInfo()
      .then(data => {
        setTeamInfo(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])*/


  return (
    <div>
      <div>
        {/*user.username*/}
        <br />
        {/*JSON.stringify(teamInfo)*/}
      </div>
        <ExampleUI />
          <Form regional="2023hiho" />
      {/*(() => {
        if(regional){
          return <Form regional={regional}/>
        } else {
          return <div/>
        }
      })*/}
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
