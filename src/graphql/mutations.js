/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTeam = /* GraphQL */ `
  mutation CreateTeam(
    $input: CreateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    createTeam(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTeam = /* GraphQL */ `
  mutation UpdateTeam(
    $input: UpdateTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    updateTeam(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeam = /* GraphQL */ `
  mutation DeleteTeam(
    $input: DeleteTeamInput!
    $condition: ModelTeamConditionInput
  ) {
    deleteTeam(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const createTeamMatch = /* GraphQL */ `
  mutation CreateTeamMatch(
    $input: CreateTeamMatchInput!
    $condition: ModelTeamMatchConditionInput
  ) {
    createTeamMatch(input: $input, condition: $condition) {
      id
      name
      description
      Team
      Regional
      createdAt
      updatedAt
    }
  }
`;
export const updateTeamMatch = /* GraphQL */ `
  mutation UpdateTeamMatch(
    $input: UpdateTeamMatchInput!
    $condition: ModelTeamMatchConditionInput
  ) {
    updateTeamMatch(input: $input, condition: $condition) {
      id
      name
      description
      Team
      Regional
      createdAt
      updatedAt
    }
  }
`;
export const deleteTeamMatch = /* GraphQL */ `
  mutation DeleteTeamMatch(
    $input: DeleteTeamMatchInput!
    $condition: ModelTeamMatchConditionInput
  ) {
    deleteTeamMatch(input: $input, condition: $condition) {
      id
      name
      description
      Team
      Regional
      createdAt
      updatedAt
    }
  }
`;
