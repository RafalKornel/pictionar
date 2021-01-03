import React from "react"
import Info from "./info";
import LoginManager from "../LoginManager";
import { Page } from "../Utilities/common"
import styled from "styled-components";

const Wrapper = styled(Page)`
  @media screen and (max-width: 1100px) {
    article h2 {
      margin: 0;
      font-size: 20px;
    }
    article li {
      margin: 10px 0;
    }
  }
`;

export default function LoginPage(props) {
    return (
      <Wrapper>
        <Info />
        <LoginManager onLogin={props.onLogin} />
      </Wrapper>
    )
  }
  
