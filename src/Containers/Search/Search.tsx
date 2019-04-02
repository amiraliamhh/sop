import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Input from '@material-ui/core/input'
import Button from '@material-ui/core/Button'

import SearchStyles from './Search.styled'
import { DocumentNode } from 'graphql';

interface ISearchState {
    query: DocumentNode
    repoSearchTerm: string
    skip: boolean
}

class Search extends React.Component<{}, ISearchState> {
    private initialQuery = gql`
    query {
        search(first: 10, query: "javascript", type: REPOSITORY) {
            repositoryCount
            nodes {
                __typename
                ... on Repository {
                    name 
                    description
                    url
                    stargazers {
                        totalCount
                    }
                }
            }
        }
    }`

    constructor(props: {}) {
        super(props)

        this.state = {
            query: this.initialQuery,
            repoSearchTerm: '',
            skip: true,
        }

        this.handleRepoSearchChange = this.handleRepoSearchChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    public render() {
        const { repoSearchTerm, query, skip, } = this.state

        return (
            <SearchStyles>
                <ul>
                    <li>Search Repos: <Input type="text" value={repoSearchTerm} onChange={this.handleRepoSearchChange} /></li>
                    <Button color="primary" variant="contained" onClick={this.handleSearch} >Search</Button>
                </ul>
                {
                    <Query query={query} skip={skip} fetchPolicy="network-only" >
                    {
                        ({ loading, data, }) => 
                        loading
                        ? <p>loading ...</p>
                        : data
                        ? (
                        <React.Fragment>
                        {
                            data.search.nodes.map((node, index) => (
                                <ul key={index} >
                                    <li>name: { node.name }</li>
                                    <li>description: { node.description }</li>
                                    <li>stars: { node.stargazers.totalCount }</li>
                                </ul>
                            ))
                        }
                        </React.Fragment>
                        )
                        : null
                    }
                    </Query>
                }
            </SearchStyles>
        )
    }

    private handleRepoSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            repoSearchTerm: e.target.value,
        })
    }

    private handleSearch() {
        const { repoSearchTerm } = this.state

        const query = gql`
        query {
            search(first: 10, query: ${repoSearchTerm}, type: REPOSITORY) {
                repositoryCount
                nodes {
                    __typename
                    ... on Repository {
                        name 
                        description
                        url
                        stargazers {
                            totalCount
                        }
                    }
                }
            }
        }
        `

        this.setState({ query, skip: false, })
    }
}

export default Search
