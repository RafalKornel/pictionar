import styled from "styled-components";

const Logo = styled.h1`
    position: absolute;
    font-size: 100px;
    line-height: 70px;
    margin: 2rem;
    cursor: default;
    user-select: none;

    @media screen and (max-width: 1100px) {
        margin: 0;
        margin-top: 1rem;
        font-size: 50px;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
    }
`;

export default (props) => {
    return <Logo>PICTIONAR</Logo>;
  }