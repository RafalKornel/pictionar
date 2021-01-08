import React from "react";
import FormField from "../Utilities/formField"
import { Wrapper, ErrorMessage, SubmitButton } from "../Utilities/common";
import withFormLogic from "../Utilities/formLogic";

function LoginFormTemplate(props) {
    return (
        <form
            onSubmit={props.handleSubmit}
            id="loginForm" >

            <FormField
                id="user_name"
                value={props.user_name}
                onChange={props.handleChange}
                autoComplete="on"
                name="user_name"
                type="text" >
                Login:
            </FormField>

            <FormField
                id="user_pass"
                value={props.user_pass}
                onChange={props.handleChange}
                name="user_pass"
                type="password" >
                Password:
            </FormField>

            <Wrapper>
                <ErrorMessage>{props.errorMessage}</ErrorMessage>
                <SubmitButton type="submit">Submit</SubmitButton>
            </Wrapper>

        </form>
    );
}

const LoginForm = withFormLogic(
    LoginFormTemplate, 
    {
        user_name: "",
        user_pass: "",
    }, 
    "/api/login");

export default LoginForm;