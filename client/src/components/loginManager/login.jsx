import React from "react";
import FormField from "./formField"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
            errorMessage: "",
        };
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        this.props.onLogin();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} id="loginForm" autoComplete="off">
                    <FormField id="name" value={this.state.name} onChange={this.handleChange} class="loginField" name="user_name" type="text" >Login: </FormField>
                    <FormField id="password" value={this.state.password} onChange={this.handleChange} class="passwordField" name="user_pass" type="password" >Password: </FormField>

                    <p className="errorMessage">{this.state.errorMessage}</p>
                    
                    <button type="submit" className="submitButton">Submit</button>


                </form>
            </div>
        );
    }
}


export default LoginForm;