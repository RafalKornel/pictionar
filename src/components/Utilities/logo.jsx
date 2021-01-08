import styled from "styled-components";

// < STYLE >
const LogoHeader = styled.h1`
    position: absolute;
    font-size: 100px;
    line-height: 70px;
    margin: 2rem;
    cursor: default;
    user-select: none;

    @media screen and (max-width: 1100px) {
        margin: 0;
        margin-top: 1rem;
        font-size: 40px;
        left: 40%;
        transform: translateX(-50%);
        text-align: center;
    }

    @media screen and (min-width: 1600px) {
        margin: 4rem;
    }
`;
// </ STYLE >

export default function Logo(props) {
    return <LogoHeader>PICTIONAR</LogoHeader>;
  }