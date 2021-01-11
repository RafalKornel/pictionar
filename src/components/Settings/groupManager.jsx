import React from "react";
import styled from "styled-components";
import { SubmitButton, ErrorMessage } from "../Utilities/common";
import FormField from "../Utilities/formField";
import withFormLogic from "../Utilities/formLogic";


// < STYLE >
const SuccessMessage = styled(ErrorMessage)`
    color: green;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 1em;

    button {
        margin: auto 0 calc(0.9em - 6px) 1em;
    }

    form {
        display: flex;
        margin-bottom: 1em;

        input {
        }
    }
`;

const ComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    &, & * {
        transition: all 400ms ease;
    }

    h3 {
        margin: 0;
        cursor: default;
        user-select: none;
    }

    ${ErrorMessage}, ${SuccessMessage} {
        margin-left: 10%;
        margin-top: 0.5em;
    }

    .hidden {
        opacity: 0;
        height: 0;
    }

    span {
        display: inline-block;
    }

    .opened {
        transform: rotate(-90deg);
    }
`;
// </ STYLE >

function JoinFormTemplate(props) {
    return (
        <ComponentWrapper>
            <h3 onClick={() => props.handleClick("join")}>
                <span className={props.opened ? "" : "opened"}>▼</span>Join existing group
            </h3>
            <form 
                onSubmit={props.handleSubmit}
                className={props.opened ? "" : "hidden"} >
                <div>
                    <ErrorMessage>{props.errorMessage}</ErrorMessage>
                    <SuccessMessage>{props.successMessage}</SuccessMessage>
                    <FormField
                        value={props.group_key_join}
                        id="group_key_join"
                        type="text"
                        onChange={props.handleChange}
                        name="group_key_join"
                        placeholder="Key" />
                </div>
                <SubmitButton type="submit">Join</SubmitButton>
            </form>
        </ComponentWrapper>

    );
}

function CreateFormTemplate(props) {
    return (
        <ComponentWrapper>
        <h3 onClick={() => props.handleClick("create")}>
            <span className={props.opened ? "" : "opened"}>▼</span>Create new group
        </h3>
        <form 
            onSubmit={props.handleSubmit} 
            id="createForm"
            className={props.opened ? "" : "hidden"} >
            <div>
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
            </div>
            <SubmitButton type="submit">Create</SubmitButton>
        </form>
        </ComponentWrapper>
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

export default class GroupManager extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            join: true,
            create: false,
        }
    }

    handleClick(sectionName) {
        this.setState(state => ({
            [sectionName]: !state[sectionName]
        }));
    }

    render() {
        return (
            <Wrapper>
                { this.props.loggedIn
                    ? <JoinForm 
                        afterSuccessfulFetch={this.props.fetchUserData} 
                        handleClick={this.handleClick}
                        opened={this.state.join}
                        />
                    : ""}
                <CreateForm 
                    handleClick={this.handleClick}
                    opened={this.state.create}
                    />
            </Wrapper>
        );
    }
}