import React from "react"
import './global.css';
import Footer from "./Utilities/footer";
import Logo from "./Utilities/logo";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import Settings from "./Settings";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.switchCorner = this.switchCorner.bind(this);
        this.fetchUserData = this.fetchUserData.bind(this);

        this.state = {
            loggedIn: false,
            opened: false,
            username: "stranger",
            groups: [],
        };
    }

    fetchUserData() {
        fetch("/api/user", {
            method: "GET",
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    this.setState({ loggedIn: false });
                    throw new Error("Not logged.");
                }
            })
            .then(data => {
                this.setState({
                    loggedIn: true,
                    username: data.name,
                    groups: data.groups,
                });
                this.openCorner();
            })
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchUserData();
    }

    onLogin() {
        this.fetchUserData();
    }

    onLogout() {
        fetch("/api/logout", {
            method: "GET"
        })
            .then(res => {
                if (res.ok) {
                    this.setState({ 
                        loggedIn: false,
                        username: "stranger",
                    });
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
            ? <MainPage 
                switched={this.state.opened} 
                switchCorner={this.switchCorner} 
                groups={this.state.groups} 
                fetchUserData={this.fetchUserData} />
            : <LoginPage onLogin={this.onLogin} />

        return (
            <div className="app">
                <Logo />
                <Settings
                    name={this.state.username}
                    onLogout={this.onLogout}
                    switchCorner={this.switchCorner}
                    loggedIn={this.state.loggedIn}
                    fetchUserData={this.fetchUserData}
                    groups={this.state.groups} 
                />
                {page}
                <Footer />
            </div>
        )
    }
}