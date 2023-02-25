/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTeam = /* GraphQL */ `
  query GetTeam($id: ID!) {
    getTeam(id: $id) {
      id
      name
      description
      Comment
      createdAt
      updatedAt
    }
  }
`;
export const listTeams = /* GraphQL */ `
  query ListTeams(
    $id: ID
    $filter: ModelTeamFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeams(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        Comment
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTeamMatch = /* GraphQL */ `
  query GetTeamMatch($id: ID!, $Regional: String!, $Team: ID!) {
    getTeamMatch(id: $id, Regional: $Regional, Team: $Team) {
      id
      name
      description
      Team
      Regional
      Autonomous {
        AutonomousPlacement
        LeftCommunity
        ChargeStation
      }
      Teleop {
        Accuracy {
          High
          Mid
          Low
          Overall
        }
        ChargeStation
        EndGame
        EndGameTally {
          Start
          End
        }
        ScoringTotal {
          Total
          GridPoints
          Cones
          Cubes
        }
        DriveStrength
        DriveSpeed
        ConesAccuracy {
          High
          Mid
          Low
          Overall
        }
        CubesAccuracy {
          High
          Mid
          Low
          Overall
        }
        SmartPlacement
      }
      Comments
      Penalties {
        Fouls
        Tech
        Penalties
      }
      Priorities
      RankingPts
      createdAt
      updatedAt
    }
  }
`;
export const listTeamMatches = /* GraphQL */ `
  query ListTeamMatches(
    $id: ID
    $regionalTeam: ModelTeamMatchPrimaryCompositeKeyConditionInput
    $filter: ModelTeamMatchFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTeamMatches(
      id: $id
      regionalTeam: $regionalTeam
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        description
        Team
        Regional
        Autonomous {
          AutonomousPlacement
          LeftCommunity
          ChargeStation
        }
        Teleop {
          ChargeStation
          EndGame
          DriveStrength
          DriveSpeed
          SmartPlacement
        }
        Comments
        Penalties {
          Fouls
          Tech
          Penalties
        }
        Priorities
        RankingPts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamMatchesByTeam = /* GraphQL */ `
  query TeamMatchesByTeam(
    $Team: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamMatchesByTeam(
      Team: $Team
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        Team
        Regional
        Autonomous {
          AutonomousPlacement
          LeftCommunity
          ChargeStation
        }
        Teleop {
          ChargeStation
          EndGame
          DriveStrength
          DriveSpeed
          SmartPlacement
        }
        Comments
        Penalties {
          Fouls
          Tech
          Penalties
        }
        Priorities
        RankingPts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const teamMatchesByRegional = /* GraphQL */ `
  query TeamMatchesByRegional(
    $Regional: String!
    $sortDirection: ModelSortDirection
    $filter: ModelTeamMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    teamMatchesByRegional(
      Regional: $Regional
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        Team
        Regional
        Autonomous {
          AutonomousPlacement
          LeftCommunity
          ChargeStation
        }
        Teleop {
          ChargeStation
          EndGame
          DriveStrength
          DriveSpeed
          SmartPlacement
        }
        Comments
        Penalties {
          Fouls
          Tech
          Penalties
        }
        Priorities
        RankingPts
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
