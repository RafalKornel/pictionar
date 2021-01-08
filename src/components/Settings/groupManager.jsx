import React from "react";
import styled from "styled-components";
import { SubmitButton, ErrorMessage } from "../Utilities/common";
import FormField from "../Utilities/formField";

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



class JoinForm extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <InputWrapper>
                    <h3>Join existing group</h3>
                    <ErrorMessage>{this.props.errorMessage}</ErrorMessage>
                    <SuccessMessage>{this.props.successMessage}</SuccessMessage>
                    <FormField
                        value={this.props.groupKey}
                        id="joinKey"
                        type="text"
                        onChange={this.props.onChange}
                        name="joinKey"
                        placeholder="Key" />
                </InputWrapper>
                <SubmitButton type="submit">Join</SubmitButton>
            </form>
        );
    }
}
class CreateForm extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit} id="createForm">
                <InputWrapper>
                    <h3>Create new group</h3>
                    <ErrorMessage>{this.props.errorMessage}</ErrorMessage>
                    <SuccessMessage>{this.props.successMessage}</SuccessMessage>
                    <FormField
                        value={this.props.name}
                        id="createName"
                        type="text"
                        onChange={this.props.onChange}
                        name="createName"
                        placeholder="Name" />
                    <FormField
                        value={this.props.groupKey}
                        id="createKey"
                        type="text"
                        onChange={this.props.onChange}
                        name="createKey"
                        placeholder="Key" />
                </InputWrapper>
                <SubmitButton type="submit">Create</SubmitButton>
            </form>
        );
    }
}
export default class GroupManager extends React.Component {
    constructor(props) {
        super(props);

        this.joinGroup = this.joinGroup.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getCreateCSRF = this.getCreateCSRF.bind(this);
        this.getJoinCSRF = this.getJoinCSRF.bind(this);

        this.state = {
            joinKey: "",
            createName: "",
            createKey: "",
            joinErrorMessage: "",
            createErrorMessage: "",
            create_csrf: "",
            join_csrf: "",
        }
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    getCreateCSRF() {
        fetch("/api/create_group")
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({ create_csrf: data.csrf_token });
            })
            .catch(err => console.error(err));
    }

    getJoinCSRF() {
        fetch("/api/join_group")
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({ join_csrf: data.csrf_token });
            })
            .catch(err => console.error(err));
    }


    joinGroup(e) {
        e.preventDefault();

        let data = {
            group_key: this.state.joinKey,
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.state.create_csrf,
            },
            body: JSON.stringify(data),
        }

        fetch("/api/join_group", options)
        .then(res => {
            if (!res.ok) {
                this.setState({ joinErrorMessage: "Something went wrong!" });
                setTimeout(() => this.setState({ joinErrorMessage: ""}), 5000);
                throw new Error("Something went wrong.");
            }
            return res.json();
        })
        .then(data => {
            this.setState({ joinSuccessMessage: "Joined group " + data.name });
            this.props.fetchUserData();
            setTimeout(() => this.setState({ joinSuccessMessage: "" }), 5000);
        })
        .catch(err => console.error(err));
    }

    createGroup(e) {
        e.preventDefault();

        let data = {
            group_key: this.state.createKey,
            group_name: this.state.createName
        }

        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.state.create_csrf,
            },
            body: JSON.stringify(data),
        }

        fetch("/api/create_group", options)
        .then(res => {
            if (!res.ok) {
                this.setState({ createErrorMessage: "Something went wrong!" });
                setTimeout(() => this.setState({ createErrorMessage: "" }), 5000);
                throw new Error("Something went wrong.");
            }
            return res.json();
        })
        .then(data => {
            this.setState({ createSuccessMessage: "Created group " + data.name + " with key " + data.key });
            setTimeout(() => this.setState({ createSuccessMessage: "" }), 5000);
        })
        .catch(err => console.error(err));
    }

    render() {
        const join = this.props.loggedIn
            ? (<JoinForm
                onSubmit={this.joinGroup}
                onChange={this.handleChange}
                groupKey={this.state.joinKey}
                errorMessage={this.state.joinErrorMessage}
                successMessage={this.state.joinSuccessMessage}
                onMount={this.getJoinCSRF}
            />)
            : "";
        return (
            <Wrapper>
                { join}
                <CreateForm
                    onSubmit={this.createGroup}
                    onChange={this.handleChange}
                    name={this.state.createName}
                    groupKey={this.state.createKey}
                    errorMessage={this.state.createErrorMessage}
                    successMessage={this.state.createSuccessMessage}
                    onMount={this.getCreateCSRF}
                />
            </Wrapper>
        );
    }
}