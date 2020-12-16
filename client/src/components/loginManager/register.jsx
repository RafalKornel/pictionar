import React from "react";
import FormField from "./formField"

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
            password2: "",
            errorMessage: "",
            style: {},
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
            <div style={this.state.style}>
                <form onSubmit={this.handleSubmit} id="registerForm" autocomplete="off">
                    <FormField id="name" value={this.state.name} onChange={this.handleChange} class="loginField" name="user_name" type="text" >Login: </FormField>
                    <FormField id="password" value={this.state.password} onChange={this.handleChange} class="passwordField" name="user_pass" type="password" >Password: </FormField>
                    <FormField id="password2" value={this.state.password2} onChange={this.handleChange} class="passwordField" name="user_pass2" type="password" >Retype password: </FormField>

                    <p className="errorMessage">{this.state.errorMessage}</p>

                    <button type="submit" className="submitButton" onSubmit={this.handleSubmit}>Submit</button>
                    
                </form>
            </div>
        );
    }
}


export default RegisterForm;