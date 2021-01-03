import React from "react"
import Info from "./info";
import LoginManager from "../loginManager";
import "./index.css";

export default function LoginPage(props) {
    return (
      <div className="page loginPage bcg">
        <Info />
        <LoginManager onLogin={props.onLogin} />
      </div>
    )
  }
  
