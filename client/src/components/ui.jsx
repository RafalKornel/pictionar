import React from "react"
import './global.css';
import Footer from "./utilities/footer";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";

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
    let screen = this.state.loggedIn
      ? <MainPage switched={this.state.opened} onLogout={this.onLogout} />
      : <LoginPage onLogin={this.onLogin} />

    return (
      <div className="app">
        <Logo />
        { screen}
        <Footer />
      </div>
    )
  }
}

function Logo() {
  return <h1 className="logo">PICTIONAR</h1>;
}

export default UI;