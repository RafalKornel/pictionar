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
    let content = this.state.loggedIn 
      ? <LoggedScreen switched={this.state.opened} onLogout={this.onLogout} />
      : <DefaultScreen onLogin={this.onLogin} />
    return (
      <div className="app">
        <Logo />
        { content}
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
    return (<button onClick={this.props.onLogout} type="button" className="submitButton logoutButton">Logout</button>);
  }
}

class LoggedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.addedNewWords = this.addedNewWords.bind(this);
    this.setSuccessMessage = this.setSuccessMessage.bind(this);

    this.state = {
      count: 0,
      messages: [],
      copySuccess: "",
      newWords: [],
    }
  }

  addedNewWords(words) {
    this.setState({ newWords: words });
    setTimeout(() => this.setState({ newWords: "" }), 5000);
    this.fetchWordsCount();
    this.fetchWordsForSlider();
  }

  setSuccessMessage() {
    this.setState({ copySuccess: "Database words have been copied to clipboard."});
    setTimeout( () => this.setState({ copySuccess: "" }), 5000);
  }

  fetchWordsForSlider() {
    fetch("/api/words")
      .then(res => {
        console.log(res);
        if (res.ok) return res.json();
      })
      .then(data => {
        this.setState({ messages: data });
      })
      .catch(err => console.error(err));
  }

  fetchWordsCount() {
    fetch("/api/count")
      .then(res => {
        if (res.ok) return res.text()
      })
      .then(text => this.setState({ count: text }))
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.fetchWordsForSlider();
    this.fetchWordsCount();
  }

  render() {
    return (
      <div className="mainScreen bcg">
        <LogoutButton onLogout={this.props.onLogout} />

        <section>
          <Tutorial />
          <WordsForm addedNewWords={this.addedNewWords} />
        </section>
        <section>
          <WordsInfo
            newWords={this.state.newWords}
            wordsCount={this.state.count}
            copySuccess={this.state.copySuccess}
            setSuccessMessage={this.setSuccessMessage}
          />
        </section>

        <Corner switched={this.props.switched} messages={this.state.messages} />
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