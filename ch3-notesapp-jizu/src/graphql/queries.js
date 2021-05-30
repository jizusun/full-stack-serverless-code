/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNotes = /* GraphQL */ `
  query GetNotes($id: ID!) {
    getNotes(id: $id) {
      id
      clientId
      name
      description
      completed
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query listNotes(
    $filter: ModelNotesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clientId
        name
        description
        completed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
