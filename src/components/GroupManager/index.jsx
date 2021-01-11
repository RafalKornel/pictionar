import React from "react";
import styled from "styled-components";
import CreateForm from "./createGroup";
import JoinForm from "./joinGroup";

// < STYLE >
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
// </ STYLE >


export default class GroupManager extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            join: false,
            create: true,
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
                { this.props.loggedIn && 
                    <JoinForm 
                        afterSuccessfulFetch={this.props.fetchUserData} 
                        handleClick={this.handleClick}
                        opened={this.state.join} /> 
                }
                
                <CreateForm 
                    handleClick={this.handleClick}
                    opened={this.state.create}
                    />
            </Wrapper>
        );
    }
}