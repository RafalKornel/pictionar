import React from "react";
import { ErrorMessage, GroupsSelect, SubmitButton, InnerFieldWrapper, Bar as ProtoBar } from "../Utilities/common"
import styled from "styled-components";
import withFormLogic from "../Utilities/formLogic";

//  < STYLE >
const Bar = styled(ProtoBar)`
    margin-bottom: 1em;
`;

const ButtonWrapper = styled.div`
    margin-left: auto;
    display: flex;
    width: 90%;

    select {
        margin-right: 1em;
        margin-left: auto;
        
        outline: none;
        border-radius: 3px;
        border: none;
        font-size: 1.1em;

        color: var(--input-color);
        background: var(--form-color);
    }

    ${SubmitButton} {
        margin-left: 0;
    }
`;

const Form = styled.form`
    background-color: var(--form-color);
    color: var(--text-color);

    display: flex;
    flex-direction: column;

    transition: all 400ms ease;

    border-radius: 10px;
    width: 25em;
    padding: 3em;
    margin: 0 auto;
    
    textarea {
        margin-left: 10%;
        margin-top: 1em;
        height: 12em;
        width: 90%;
        resize: none;
        border: none;
        outline: none;
        background-color: var(--form-color);
        color: var(--text-color);
        font-size: 1.1em;
    }

    @media screen and (max-width: 1100px) {
        width: 80%;
        padding: 2em;
    }
`;
//  </ STYLE >


class WordsFormTemplate extends React.Component {
    componentDidMount() {
        this.props.handleChange({
            target: {
                id: "group",
                value: this.props.groups[0].name,
            }
        })
    }

    render() {
        return (
            <Form
                onSubmit={this.props.handleSubmit}
                autoComplete="off" >

                <label htmlFor="words">Words: </label>
                <InnerFieldWrapper>
                    <textarea
                        onChange={this.props.handleChange}
                        id="words"
                        name="words"
                        placeholder="Type word(s) here" 
                        value={this.props.words} />
                    <Bar />
                </InnerFieldWrapper>

                <ButtonWrapper>
                    <ErrorMessage>{this.props.errorMessage}</ErrorMessage>
                    <GroupsSelect
                        handleChange={this.props.handleChange}
                        group={this.props.group}
                        groups={this.props.groups.map(e => e.name)}
                    />
                    <SubmitButton
                        type="submit"
                        onSubmit={this.props.handleSubmit}>
                        Submit
                </SubmitButton>
                </ButtonWrapper>
            </Form>
        );
    }
}

const WordsForm = withFormLogic(
    WordsFormTemplate,
    {
        words: "",
        group: "",
    },
    "/api/add",
)

export default WordsForm;