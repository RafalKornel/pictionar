import styled from "styled-components";

export const Box = styled.div`
    height: 1.5em;
    width: 1.5em;

    @media screen and (max-width: 1100px) {
        height: 1em;
        width: 1em;
    }
    box-sizing: border-box;
    border: 2px solid black;
    ${props => "background: " + props.rgb + ";"}
`;

export const Button = styled.div`
    padding: 0 0.5em;
    display: flex;
    align-items: center;
    
    transition: 400ms all ease;

    p {
        margin-right: auto;
        cursor: default;
    }

    ${Box} {
        margin: 0.5em 0;
        margin-left: 5px;
    }

    &:hover {
        backdrop-filter: contrast(120%);
    }

`;