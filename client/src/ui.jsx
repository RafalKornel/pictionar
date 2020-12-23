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

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.switchCorner = this.switchCorner.bind(this);

    this.state = {
      loggedIn: false,
      opened: false,
    };
  }

  componentDidMount() {
    fetch("/api/check", {
      method: "GET",
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        console.log("this is data ");
        console.log(data);
        if (data.logged) {
          this.setState({ loggedIn: true });
          this.switchCorner();
        }
        else if (data.logged == "False") {
          this.setState({ loggedIn: false });
        }
      })
      .catch(err => console.error(err));
  }

  onLogin() {
    this.setState({ loggedIn: true });
    this.switchCorner();
  }

  onLogout() {
    fetch("/api/logout", {
      method: "GET"
    })
    .then(res => {
      if (res.ok) {
        this.setState({ loggedIn: false });
      }
    })
    .catch(err => console.error(err));
  }

  switchCorner() {
    setInterval(
      () => { this.setState(state => ({ opened: state.loggedIn })) }
    , 0)
  }


  render() {
    let content = this.state.loggedIn ?
      <LoggedScreen switched={this.state.opened} onLogout={this.onLogout} switch={this.switchCorner} />
      :
      <DefaultScreen onLogin={this.onLogin} />
    return (
      <div className="app">
        <Logo />
        { content }
        <Footer />
      </div>
    )
  }
}

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const style = {
      position: "absolute",
      top: "1.5rem",
      right: "1.5rem",
      width: "6em",
      height: "2em",
      fontSize: "1.1em",
      borderRadius: "10px",
      color: "var(--input-color)",
      backgroundColor: "var(--form-color)"
    }
    return(<button onClick={this.props.onLogout} type="button" className="submitButton" style={style}>Logout</button>);
  }
}

class LoggedScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mainScreen bcg">
          <LogoutButton onLogout={this.props.onLogout} />

        <section>
          <Tutorial />
          <WordsForm />
        </section>
        <section>
          <WordsInfo />
        </section>

        <Corner switched={this.props.switched} />
      </div>
    );
  }
}

function DefaultScreen(props) {
  return (
    <div className="defaultScreen bcg">
      <Info />
      <LoginManager onLogin={props.onLogin} />
    </div>
  )
}

function Logo() {
  return <h1 className="logo">KALAMBURY</h1>;
}

export default UI;