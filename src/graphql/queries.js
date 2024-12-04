/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSontact = /* GraphQL */ `
  query GetSontact($id: ID!) {
    getSontact(id: $id) {
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
export const listSontacts = /* GraphQL */ `
  query ListSontacts(
    $filter: ModelSontactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSontacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        cell
        profilePath
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
