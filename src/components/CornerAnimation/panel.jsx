import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    min-width: 200px;
    width: max-content;
    height: 70px;
    z-index: 2;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    cursor: default;

    background-color: var(--input-color);
    color: var(--form-color);

    p {
        margin: 5px 10px;
    }
`;

const Word = styled.p`
    font-size: 1.6em;
    text-align: left;
`;

const Author = styled.p`
    font-size: 1.3em;
    text-align: right;
`;

export default function Panel(props) {
    return (
        <Wrapper>
            <Word>{props.word}</Word>
            <Author>{props.author}</Author>
        </Wrapper>
    );
}