import React from "react";
import FormField from "../Utilities/formField"
import { Wrapper, ErrorMessage, SubmitButton } from "../Utilities/common";
import withFormLogic from "./fetchLogic";

function RegisterTemplate(props) {
    return (
        <form 
            onSubmit={props.handleSubmit} 
            id="registerForm" 
            autocomplete="off" 
            style={props.style}>

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

            <FormField 
                id="user_pass_repeat" 
                value={props.user_pass_repeat} 
                onChange={props.handleChange} 
                name="user_pass_repeat" 
                type="password" >
                    Retype password: 
            </FormField>

            <FormField 
                id="secret_key" 
                value={props.secret_key} 
                onChange={props.handleChange} 
                name="secret_key" 
                type="text" >
                    Group key: 
            </FormField>


            <Wrapper>
                <ErrorMessage>{props.errorMessage}</ErrorMessage>
                <SubmitButton type="submit">Submit</SubmitButton>
            </Wrapper>

        </form>
    );
}

const RegisterForm = withFormLogic(RegisterTemplate, {
    user_name: "",
    user_pass: "",
    user_pass_repeat: "",
    secret_key: "",
}, "/api/register");

export default RegisterForm;