import React from "react";
import styled from "styled-components";
import { SubmitButton, ErrorMessage } from "../Utilities/common";
import FormField from "../Utilities/formField";
import withFormLogic from "../Utilities/fetchLogic";

const SuccessMessage = styled(ErrorMessage)`
    color: green;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 1em;

    button {
        margin: 0;
        margin-top: auto;
        margin-left: 1em;
        margin-bottom: 0.2em;
    }

    form {
        display: flex;
        margin-bottom: 1em;

        input {
        }
    }
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    > div {
        margin: 0.2em 0;
    }

    h3 {
        margin: 0;
    }

    ${ErrorMessage}, ${SuccessMessage} {
        margin-left: 10%;
        margin-top: 0.5em;
    }
`;



function JoinFormTemplate(props) {
    return (
        <form onSubmit={props.handleSubmit}>
            <InputWrapper>
                <h3>Join existing group</h3>
                <ErrorMessage>{props.errorMessage}</ErrorMessage>
                <SuccessMessage>{props.successMessage}</SuccessMessage>
                <FormField
                    value={props.group_key_join}
                    id="group_key_join"
                    type="text"
                    onChange={props.handleChange}
                    name="group_key_join"
                    placeholder="Key" />
            </InputWrapper>
            <SubmitButton type="submit">Join</SubmitButton>
        </form>
    );
}

function CreateFormTemplate(props) {
    return (
        <form onSubmit={props.handleSubmit} id="createForm">
            <InputWrapper>
                <h3>Create new group</h3>
                <ErrorMessage>{props.errorMessage}</ErrorMessage>
                <SuccessMessage>{props.successMessage}</SuccessMessage>
                <FormField
                    value={props.group_name_create}
                    id="group_name_create"
                    type="text"
                    onChange={props.handleChange}
                    name="group_name_create"
                    placeholder="Name" />
                <FormField
                    value={props.group_key_create}
                    id="group_key_create"
                    type="text"
                    onChange={props.handleChange}
                    name="group_key_create"
                    placeholder="Key" />
            </InputWrapper>
            <SubmitButton type="submit">Create</SubmitButton>
        </form>
    );
}

const JoinForm = withFormLogic(
    JoinFormTemplate,
    { group_key_join: "" },
    "/api/join_group",
    (data) => `Joined ${data.name} group.`
);

const CreateForm = withFormLogic(
    CreateFormTemplate,
    { 
        group_name_create: "",
        group_key_create: "",
    },
    "/api/create_group",
    (data) => `Created group ${data.name} with key ${data.key}`
);

export default function GroupManager(props) {
        return (
            <Wrapper>
                { props.loggedIn 
                ? <JoinForm afterSuccessfulFetch={props.fetchUserData} /> 
                : "" }
                <CreateForm />
            </Wrapper>
        );
}