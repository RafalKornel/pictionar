import React from "react";
import FormField from "../Utilities/formField"
import { Wrapper, ErrorMessage, SubmitButton } from "../Utilities/common";
import withFormLogic from "../Utilities/fetchLogic";

function LoginTemplate(props) {
    return (
        <form
            onSubmit={props.handleSubmit}
            id="loginForm"
            autoComplete="off">

            <FormField
                id="user_name"
                value={props.user_name}
                onChange={props.handleChange}
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

const LoginForm = withFormLogic(LoginTemplate, {
    user_name: "",
    user_pass: "",
}, "/api/login");

export default LoginForm;