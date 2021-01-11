import React from "react";
import styled from "styled-components";
import { GroupsSelect } from "../Utilities/common";

// < STYLE >
const ButtonWrapper = styled.div`
    position: relative;
    width: max-content;
    margin: 0 auto;
    
    transition: 400ms all ease;

    &:hover {
        transform: scale(1.2);
    }

    & > button:hover {
        transform: none;
    }

    button {
        padding-bottom: 8%;
    }

    select {
        position: absolute;
        bottom: 25%;
        left: 50%;
        transform: translate(-50%, 50%);
        border: 2px solid var(--form-color);
        border-radius: 10px;
        background-color: var(--input-color);
        color: var(--form-color);
        font-size: 1.1em;
        text-align: right;
    }

    @media screen and (max-width: 1100px) {
        margin: 0 auto;
        
        select {
        right: 0.3em;
        }
    }
`;

const Button = styled.button`
    height: 3em;
    background-color: var(--input-color);
    color: var(--form-color);
    border: none;
    border-radius: 12px;
    font-size: 36px;
    margin: 0 30px;
    width: 9em;

    &:focus {
        outline: none;
    }


    @media screen and (max-width: 1100px) {
        font-size: 32px;
        height: 2.5em;
        width: 7em;
    }
`;

const NewWords = styled.h2`
    font-size: 1.1em;
    color: var(--form-color);
    font-weight: bold;
`;

const CopySucess = styled.h2`
    color: var(--form-color);
    font-weight: bold;
`;

const Wrapper = styled.div`
    text-align: center;
    margin: auto;

    transition: all 400ms ease;   

    span {
        color: var(--form-color);
        font-weight: bold;
    }

    @media screen and (max-width: 1100px) {
        padding-bottom: 10em;
        width: 100%;

        article {
            margin: 20px 0;
        }
        
        h2 {
            margin: 0.5em 0;
        }
    }

    @media screen and (max-width: 1250px) {
        padding-bottom: 15em;
    }
`;
// </ STYLE >

function copyToClipboard(text) {
    let textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
}

class GetWordsButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            group: "all",
            groups: [
                "all",
                ...(this.props.groups.map(e => e.name)),
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                groups: [
                    "all",
                    ...(this.props.groups.map(e => e.name)),
                ]
            });
        }
    }

    handleClick(e) {
        let groups = this.state.group === "all" ? this.state.groups.slice(1) : [this.state.group];
        let query = groups.reduce((p, c) => (p += (c + ",")), "").slice(0, -1);

        fetch(`/api/bank?groups=${query}`)
            .then(res => res.json())
            .then(data => {
                copyToClipboard(data);
                this.props.showSuccessMessage();
            })
            .catch(err => console.error(err))
    }

    handleChange(e) {
        this.setState({ group: e.target.value });
        this.props.setSelectedGroup(e.target.value);
    }

    render() {
        return (
            <ButtonWrapper>
                <Button
                    type="button"
                    onClick={this.handleClick}>
                    Get words!
                </Button>
                <GroupsSelect
                    handleChange={this.handleChange}
                    value={this.state.group}
                    groups={this.state.groups}
                />
            </ButtonWrapper>
        );
    }
}

function NewWordsInfo(props) {
    return (
        <div>
            <h2>Following words have been added to database:</h2>
            <NewWords>{props.newWords}</NewWords>
        </div>
    )
}

export default function WordsInfo(props) {
    const addedWordsMessage = props.newWords.length > 0
        ? <NewWordsInfo newWords={props.newWords} />
        : null;

    const count = props.selectedGroup === "all"
        ? props.groups.reduce((p, c) => p += c.count, 0)
        : props.groups.filter(e => e.name === props.selectedGroup)[0].count;

    return (
        <Wrapper>
            <article>
                {addedWordsMessage}
                <h2>There are <span>{count}</span> words in group <span>{props.selectedGroup}</span>.</h2>
                <h2>Hit the button below to get words from database</h2>
                <CopySucess>{props.copySuccess}</CopySucess>
            </article>

            <GetWordsButton
                showSuccessMessage={props.setSuccessMessage}
                groups={props.groups}
                setSelectedGroup={props.setSelectedGroup}
            />
        </Wrapper>
    );
}