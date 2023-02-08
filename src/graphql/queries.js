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
        LeftCommunity
        ChargeStation
      }
      Teleop {
        Accuracy
        RankingPts
        ChargeStation
        Penalties {
          Fouls
          Tech
          Yellow
          Red
          Disabled
          DQ
          BrokenBot
        }
      }
      SmartPlacement
      Comments
      IntakeFrom
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
          LeftCommunity
          ChargeStation
        }
        Teleop {
          Accuracy
          RankingPts
          ChargeStation
        }
        SmartPlacement
        Comments
        IntakeFrom
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
          LeftCommunity
          ChargeStation
        }
        Teleop {
          Accuracy
          RankingPts
          ChargeStation
        }
        SmartPlacement
        Comments
        IntakeFrom
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
          LeftCommunity
          ChargeStation
        }
        Teleop {
          Accuracy
          RankingPts
          ChargeStation
        }
        SmartPlacement
        Comments
        IntakeFrom
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
