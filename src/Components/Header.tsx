import * as React from 'react'
import styled from 'styled-components'

const HeaderStyles = styled.div`
    width: 100vw;
    box-shadow: 0px 6px 10px #ddd;
    min-height: 3em;
    display: flex;
    align-items: center;

    h3 {
        margin: 0;
        margin-left: 2em;
    }
`

export default () => {

    return (
        <HeaderStyles>
            <h3>Sop</h3>
        </HeaderStyles>
    )
}