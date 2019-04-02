import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'
import { BrowserRouter, Route } from 'react-router-dom'

import {
    Search
} from './index'

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    request: async operation => {
        operation.setContext({
            headers: {
                "Authorization": `bearer ${process.env.GITHUB_PERSONAL_TOKEN}`,
            },
        });
    },
})

const q = gql`
    query {
        repository(owner: "amiraliamhh", name: "sop") {
            collaborators(first: 1) {
                nodes {
                    bio
                }
            }
        }
}
`

export default () => (
    <ApolloProvider client={client} >
        {/* <h1>Github!</h1>
        <Query query={q} >
        {
            ({ data, loading }) => {
                console.log(data)

                return (
                    <div>
                        {
                        loading
                        ? <p>loading ...</p>
                        : <p>loaded</p>
                        } 
                    </div>
                )
            }
        }
        </Query> */}
        <BrowserRouter>
            <React.Fragment>
                <Route component={Search} path="/search" />
            </React.Fragment>
        </BrowserRouter>
    </ApolloProvider>
)