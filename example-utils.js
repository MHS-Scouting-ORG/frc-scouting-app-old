const displayRegionals = regionals => {
  return (
    <div>
      <ul>
        {;(_ => regionals.map(regional => <li>
          {`${regional.key} - ${regional.city}`}
        </li>))()}
      </ul>
    </div>
  )
}

const displayTeamsInHawaiiRegional = teamsInHawaiiRegional => {
  return (
    <div>
      <ul>
        {(_ => teamsInHawaiiRegional.map(team => <li>
          {`${team.key} - ${team.team_number}`}
        </li>))()}
      </ul>
    </div>
  )
}

const formCreateNewTeam = () => {
  return (
    <form>
      <input type='text' onChange={evt => setNewTeam(evt.target.value)}></input>
      <button type='submit' onClick={evt => {
        evt.preventDefault()
        doApiPush()
      }}>
        Add Team
      </button>
    </form>

  )
}

export { displayTeamsInHawaiiRegional, displayRegionals, formCreateNewTeam }
