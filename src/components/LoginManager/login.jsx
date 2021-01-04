import React from "react";
import FormField from "./formField"
import { Wrapper, ErrorMessage, SubmitButton } from "../Utilities/common";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
            errorMessage: "",
            csrf: "",
        };
    }

    componentDidMount() {
        fetch("/api/login", {
            method: "GET",
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                this.setState({ csrf: data.csrf_token })
            })
            .catch(err => console.error(err));
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = {
            user_name: this.state.name,
            user_pass: this.state.password,
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.state.csrf,
            },
            body: JSON.stringify(data),
        }

        fetch("/api/login", options)
            .then(res => {
                if (!res.ok) {
                    this.setState({ errorMessage: "Something went wrong!" });
                    return;
                }
                this.props.onLogin();
            })
            .catch(err => console.error(err));

    }

    render() {
        return (
            <form 
                onSubmit={this.handleSubmit} 
                id="loginForm" 
                autoComplete="off">
       
                <FormField 
                    id="name" 
                    value={this.state.name} 
                    onChange={this.handleChange} 
                    name="user_name" 
                    type="text" >
                        Login: 
                </FormField>
       
                <FormField 
                    id="password" 
                    value={this.state.password} 
                    onChange={this.handleChange} 
                    name="user_pass" 
                    type="password" >
                        Password: 
                </FormField>

                <Wrapper>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Wrapper>

            </form>
        );
    }
}


export default LoginForm;