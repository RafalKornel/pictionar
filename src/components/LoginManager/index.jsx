import React from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import styled from "styled-components";

// < STYLE >
const LoginWindow = styled.div`
    width: 25em;
    border-radius: 10px;
    margin: auto;
    margin-right: 5em;
    padding: 2.6em;

    background-color: var(--form-color);
    color: var(--text-color);

    &, & form {
        display: flex;
        flex-direction: column;
    }
    
    @media screen and (max-width: 1100px) {
        width: 60%;
        margin: 0 auto;
        margin-bottom: 10%;
    }
`;

const Switch = styled.div`
    position: relative;
    width: 100%;
    margin-top: 1em;
    display: flex;

    button {
        background-color: var(--form-color);
        color: var(--text-color);
        font-size: 1.3em;
        flex: 1;
        transition: all 300ms ease;
    }

    button.active {
        font-size: 1.8em;
        color: var(--input-color);
        font-weight: bold;
    }

    button.active:hover {
        transform: none;
    }
`;

const Divisor = styled.div`
    width: 6px;
    height: 3em;
    border-radius: 5px;
    background-color: var(--input-color);
    margin: 0 auto;
`;

const DivisorWrapper = styled.div`
    flex: 1;
`;
// </ STYLE >


class LoginManager extends React.Component {
    constructor(props) {
        super(props);

        this.switchToLogin = this.switchToLogin.bind(this);
        this.switchToRegister = this.switchToRegister.bind(this);

        this.state = { 
            tab: "login",
        };
    }

    switchToLogin() {
        this.setState({ tab: "login" });
    }

    switchToRegister() {
        this.setState({ tab: "register" });
    }

    render() {
        const form =
            this.state.tab === "login"
                ? <LoginForm 
                    afterSuccessfulFetch={this.props.onLogin} />
                : <RegisterForm />

        return (
            <LoginWindow>

                { form }

                <Switch>
                    <button
                        type="button"
                        className={this.state.tab === "register" ? 'active' : ""}
                        onClick={this.switchToRegister} >
                        Register
                    </button>

                    <DivisorWrapper>
                        <Divisor />
                    </DivisorWrapper>

                    <button
                        type="button"
                        className={this.state.tab === "login" ? 'active' : ""}
                        onClick={this.switchToLogin}>
                        Login
                    </button>
                </Switch>
            </LoginWindow>
        );
    }
}

export default LoginManager;