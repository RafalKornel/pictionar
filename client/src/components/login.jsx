import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
        };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state);
    }

    handleSubmit(e) {
        console.log(this.state);
        this.props.onLogin();
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} id="loginForm" autocomplete="off">
                    <FormField id="name" value={this.state.name} onChange={this.handleChange} class="loginField" name="user_name" type="text" >Login: </FormField>
                    <FormField id="password" value={this.state.password} onChange={this.handleChange} class="passwordField" name="user_pass" type="password" >Password: </FormField>

                    <button onClick={this.props.onLogin}>change status</button>

                    <p class="hidden" id="error" style={{ margin: "auto 0", color: "#ff0000" }} >Wrong password or username!</p>
                    
                    <p style={{ width: "auto" }}>Don't have an account?</p>
                    <button type="button" style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <a href="/register">Register</a>
                    </button>
                </form>
            </div>
        );
    }
}

function FormField(props) {
    return (
        <div className={props.class}>
            <label for={props.id}>{props.children}</label>
            <div class="wrapper" tabindex="-1">
                <input value={props.value} onChange={props.onChange} id={props.id} type={props.type} name={props.name} required />
                <div class="bar"></div>
            </div>
        </div>
    );
}

export default LoginForm;