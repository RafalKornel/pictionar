import React from "react"
import './index.css';
import Info from "./components/info"
import Tutorial from "./components/tutorial"
import Corner from "./components/corner/"
import LoginManager from "./components/loginManager/"
import WordsForm from "./components/wordsForm"
import WordsInfo from "./components/wordsInfo"
import Footer from "./components/footer"

class UI extends React.Component {
  constructor(props) {
    super(props);

    this.changeStatus = this.changeStatus.bind(this);
    this.switchCorner = this.switchCorner.bind(this);

    this.state = {
      loggedIn: false,
      opened: false,
    };
  }

  changeStatus() {
    this.setState(state => ({ loggedIn: !state.loggedIn }));
    setTimeout(() => this.switchCorner(), 0);
  }

  switchCorner() {
    this.setState(state => ({ opened: !state.opened }));
  }

  render() {
    let content = this.state.loggedIn ?
      <LoggedScreen switched={this.state.opened} logout={this.changeStatus} switch={this.switchCorner} />
      :
      <DefaultScreen login={this.changeStatus} />
    return (
      <div className="app">
        <Logo />
        { content }
        <Footer />
      </div>
    )
  }
}

function LoggedScreen(props) {
  return (
    <div className="mainScreen bcg">
      <div style={{ position: "absolute", bottom: "10px", left: 0 }}>
        <h1>Logged in</h1>
        <button type="button" onClick={props.logout}>Logout</button>
        <button type="button" onClick={props.switch}>switch</button>
      </div>

      <section>
        <Tutorial />
        <WordsForm />
      </section>
      <section>
        <WordsInfo />
      </section>

      <Corner switched={props.switched} />
    </div>
  );
}

function DefaultScreen(props) {
  return (
      <div className="defaultScreen bcg">
        <Info />
        <LoginManager onClick={props.login} />
      </div>
  )
}

function Logo() {
  return <h1 className="logo">KALAMBURY</h1>;
}

export default UI;