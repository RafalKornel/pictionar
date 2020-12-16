import React from "react"
import './index.css';
import Info from "./components/info"
import LoginForm from "./components/login"
import Corner from "./components/corner"

class UI extends React.Component {
  constructor(props) {
    super(props);

    this.changeStatus = this.changeStatus.bind(this);
    this.switch = this.switch.bind(this);

    this.state = { 
      loggedIn: false, 
      switched: false,
    };
  }

  changeStatus() {
    this.setState(state => ({ loggedIn: !state.loggedIn }));
  }

  switch() {
    this.setState(state => ({ switched: !state.switched }));
  }

  render() {
    return this.state.loggedIn ? 
    <LoggedScreen switched={this.state.switched} logout={this.changeStatus} switch={this.switch} /> 
      : 
    <DefaultScreen login={this.changeStatus} />
  }
}

function LoggedScreen(props) {
  return (
    <div className="bcg">
      <h1>Logged in</h1>
      <button type="button" onClick={props.logout}>Logout</button>
      <button type="button" onClick={props.switch}>switch</button>
      <Corner switched={props.switched} />
    </div>
  );
}

function DefaultScreen(props) {
  return (
    <div className="defaultScreen bcg">
      <Info />
      <LoginForm onLogin={props.login} />
    </div>
  )
}


export default UI;