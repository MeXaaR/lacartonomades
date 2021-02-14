import React from "react"
import styled from "styled-components"
import { FONTS } from "../../settings/theme"

const ErroStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    .title {
        font-family: ${FONTS.TITLES};
        text-align: center;
    }
`

const ErrorDisplayer = ({ message }) => (
    <ErroStyled>
        <img src="/logo-192.png" />
        <h2 className="title is-5">{message}</h2>
    </ErroStyled>
)

export default ErrorDisplayer