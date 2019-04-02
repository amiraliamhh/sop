import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import { BrowserRouter, Route } from 'react-router-dom'

import {
    Header
} from '../Components'

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

export default () => (
    <ApolloProvider client={client} >
        <Header />
        <BrowserRouter>
            <React.Fragment>
                <Route component={Search} path="/search" />
            </React.Fragment>
        </BrowserRouter>
    </ApolloProvider>
)