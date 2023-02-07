/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTeam = /* GraphQL */ `
  subscription OnCreateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onCreateTeam(filter: $filter) {
      id
      name
      description
      Comment
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTeam = /* GraphQL */ `
  subscription OnUpdateTeam($filter: ModelSubscriptionTeamFilterInput) {
    onUpdateTeam(filter: $filter) {
      id
      name
      description
      Comment
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTeam = /* GraphQL */ `
  subscription OnDeleteTeam($filter: ModelSubscriptionTeamFilterInput) {
    onDeleteTeam(filter: $filter) {
      id
      name
      description
      Comment
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTeamMatch = /* GraphQL */ `
  subscription OnCreateTeamMatch(
    $filter: ModelSubscriptionTeamMatchFilterInput
  ) {
    onCreateTeamMatch(filter: $filter) {
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
export const onUpdateTeamMatch = /* GraphQL */ `
  subscription OnUpdateTeamMatch(
    $filter: ModelSubscriptionTeamMatchFilterInput
  ) {
    onUpdateTeamMatch(filter: $filter) {
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
export const onDeleteTeamMatch = /* GraphQL */ `
  subscription OnDeleteTeamMatch(
    $filter: ModelSubscriptionTeamMatchFilterInput
  ) {
    onDeleteTeamMatch(filter: $filter) {
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
