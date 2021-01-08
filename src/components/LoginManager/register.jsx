import React from "react";
import FormField from "../Utilities/formField"
import { Wrapper, ErrorMessage, SubmitButton } from "../Utilities/common";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            name: "",
            password: "",
            password2: "",
            secretKey: "",
            errorMessage: "",
            csrf: "",
        };
    }

    componentDidMount() {
        fetch("/api/register", {
            method: "GET",
        })
            .then(res => {
                if (res.ok) return res.json()
            })
            .then(data => {
                console.log(data);
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
            user_pass_repeat: this.state.password2,
            secret_key: this.state.secretKey,
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.state.csrf,
            },
            body: JSON.stringify(data),
        }

        fetch("/api/register", options)
            .then(res => {
                if (!res.ok) {
                    this.setState({ errorMessage: "Something went wrong" });
                    return
                }
                console.log("sucess");
            })
            .catch(err => console.error(err));

        console.log(this.state);
    }


    render() {
        return (
            <form 
                onSubmit={this.handleSubmit} 
                id="registerForm" 
                autocomplete="off" 
                style={this.state.style}>

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

                <FormField 
                    id="password2" 
                    value={this.state.password2} 
                    onChange={this.handleChange} 
                    name="user_pass2" 
                    type="password" >
                        Retype password: 
                </FormField>

                <FormField 
                    id="secretKey" 
                    value={this.state.secretKey} 
                    onChange={this.handleChange} 
                    name="secret_key" 
                    type="text" >
                        Group key: 
                </FormField>


                <Wrapper>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    <SubmitButton type="submit">Submit</SubmitButton>
                </Wrapper>

            </form>
        );
    }
}


export default RegisterForm;