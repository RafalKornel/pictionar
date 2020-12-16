import React from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import "./index.css";

class LoginManager extends React.Component {
    constructor(props) {
        super(props);

        this.switchToLogin = this.switchToLogin.bind(this);
        this.switchToRegister = this.switchToRegister.bind(this);

        this.state = { tab: "login" };
    }

    switchToLogin() {
        this.setState({ tab: "login" });
    }

    switchToRegister() {
        this.setState({ tab: "register" });
    }

    render() {
        const form = this.state.tab === "login" ? <LoginForm onLogin={this.props.onClick} /> : <RegisterForm />
        const registerActive = this.state.tab === "register" ? "active" : "";
        const loginActive = this.state.tab === "login" ? "active" : "";
        return (
            <div className="loginWindow">
                
                { form }

                <div className="switch">
                    <button type="button" className={registerActive} onClick={this.switchToRegister} >Register</button>
                    <div className="divisorWrapper">
                        <div className="divisor"></div>
                    </div>
                    <button type="button" className={loginActive} onClick={this.switchToLogin} >Login</button>
                </div>

            </div>
        )
    }
}

export default LoginManager;