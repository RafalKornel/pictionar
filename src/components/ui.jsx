import React from "react"
import './global.css';
import Footer from "./Utilities/footer";
import Logo from "./Utilities/logo";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";

class UI extends React.Component {
  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.switchCorner = this.switchCorner.bind(this);

    this.state = {
      loggedIn: false,
      opened: false,
      groups: [],
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
        if (data.logged) {
          this.setState({
            loggedIn: true,
            groups: data.groups
          });
          this.openCorner();
        }
        else if (data.logged == "False") {
          this.setState({ loggedIn: false });
        }
      })
      .catch(err => console.error(err));
  }

  onLogin(groups) {
    this.setState({
      loggedIn: true,
      groups: groups,
    });
    this.openCorner();
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

  openCorner() {
    setTimeout(
      () => { this.setState(state => ({ opened: state.loggedIn })) }
      , 0)
  }

  switchCorner() {
    setTimeout(
      () => { this.setState(state => ({ opened: !state.opened })) }
      , 0)
    console.log(this.state)
  }


  render() {
    let page = this.state.loggedIn
      ? <MainPage switched={this.state.opened} switchCorner={this.switchCorner} onLogout={this.onLogout} groups={this.state.groups} />
      : <LoginPage onLogin={this.onLogin} />

    return (
      <div className="app">
        <Logo />
        { page}
        <Footer />
      </div>
    )
  }
}

export default UI;