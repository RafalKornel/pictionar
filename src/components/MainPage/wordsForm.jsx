import React from "react";
import { GroupsSelect, SubmitButton, InnerFieldWrapper, Bar as ProtoBar } from "../Utilities/common"
import styled from "styled-components";

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


class WordsForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { 
            words: "",
            csrf: "",
            group: this.props.groups[0],
        };
    }

    handleChange(e) {
        console.log(e.target);
        this.setState({ [e.target.id]:e.target.value });
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();

        let words_unfiltered = this.state.words.split(",");
        let words = words_unfiltered.filter( (s) => s.match("^[A-Za-z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ ]+$"))
    
        fetch("/api/add", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": this.state.csrf,

            },
            body: JSON.stringify({ 
                words: words,
                group: this.state.group,
            }),
        })
        .then(res => {
    
            if (res.ok)  return res.json()
            else                    throw Error(`Bad response, status ${res.status}`)
    
        })
        .then(data => {console.log(data); return data;})
        .then(data => this.props.addedNewWords( data.added_words ) )
        .catch(err => console.error(err));

    }

    componentDidMount() {
        console.log(this.props.groups);
        fetch("/api/add", {
            method: "GET",
        })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(data => this.setState({ csrf: data.csrf_token }))
        .then( () => console.log(this.state))
        .catch(err => console.error(err));
    }

    render() {
        return(
            <Form 
                onSubmit={this.handleSubmit} 
                autoComplete="off" 
                className="wordsForm">

                <label htmlFor="words">Words: </label>
                <InnerFieldWrapper>
                    <textarea 
                        onChange={this.handleChange} 
                        id="words" 
                        name="words" 
                        placeholder="Type word(s) here">
                            {this.state.words}
                    </textarea>
                    <Bar />
                </InnerFieldWrapper>

                <ButtonWrapper>

                    <GroupsSelect 
                        handleChange={this.handleChange}
                        group={this.state.group}
                        groups={this.props.groups}
                    />
                    <SubmitButton 
                        type="submit" 
                        onSubmit={this.handleSubmit}>
                            Submit
                    </SubmitButton>
                </ButtonWrapper>
            </Form>
        );
    }
}

export default WordsForm;