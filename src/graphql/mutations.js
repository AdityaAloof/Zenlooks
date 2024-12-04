/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSontact = /* GraphQL */ `
  mutation CreateSontact(
    $input: CreateSontactInput!
    $condition: ModelSontactConditionInput
  ) {
    createSontact(input: $input, condition: $condition) {
      id
      name
      email
      cell
      profilePath
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateSontact = /* GraphQL */ `
  mutation UpdateSontact(
    $input: UpdateSontactInput!
    $condition: ModelSontactConditionInput
  ) {
    updateSontact(input: $input, condition: $condition) {
      id
      name
      email
      cell
      profilePath
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteSontact = /* GraphQL */ `
  mutation DeleteSontact(
    $input: DeleteSontactInput!
    $condition: ModelSontactConditionInput
  ) {
    deleteSontact(input: $input, condition: $condition) {
      id
      name
      email
      cell
      profilePath
      createdAt
      updatedAt
      __typename
    }
  }
`;
