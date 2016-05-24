import { createStore, combineReducers, applyMiddleware } from 'redux'
import ApolloClient from 'apollo-client'
import gql from 'apollo-client/gql'

const client = new ApolloClient({
  dataIdFromObject: (object) => {
    if (object.id) return object.id
    return null
  }
})

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  applyMiddleware(client.middleware())
)

function getUsers() {
  return client.query({
    query: gql`
      {
        users {
          firstName
        }
      }
    `
  }).then(result => {
    console.log('getUsers', result.data.users)
    console.log('getUsers', store.getState())
  })
}

function subscribe() {
  const queryObservable = client.watchQuery({
    query: gql`
      {
        users {
          firstName
          posts {
            id
            title
            likeCount
          }
        }
      }
    `,
  })

  const s = queryObservable.subscribe({
    next: (result) => {
      console.log('subscribe', result.data.users[1].posts[0].title)
    },
    error: (err) => {
      console.log('subscribe', err)
    },
  })

  s.startPolling()
}

function updatePostTitle() {
  client.mutate({
    mutation: gql`
      mutation updatePostTitle($id: ID!, $title: String!) {
        updatePostTitle(id: $id, title: $title) {
          id
          title
        }
      }
    `,
    variables: {
      id: '5auWj52pdShzLALG',
      title: String(Math.random()),
    },
  }).then(result => {
    console.log('updatePostTitle', result.data.updatePostTitle.title)
    console.log('updatePostTitle', store.getState())
  })
}

Promise.resolve()
  .then(getUsers)
  .then(getUsers)
  .then(subscribe)
  .then(updatePostTitle)
