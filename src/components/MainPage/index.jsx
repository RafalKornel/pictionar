import React from "react"
import Tutorial from "./tutorial";
import Corner from "../CornerAnimation";
import WordsForm from "./wordsForm";
import WordsInfo from "./wordsInfo";
import styled from "styled-components";
import { Page } from "../Utilities/common";

// < STYLE >
const Wrapper = styled(Page)`
    padding-right: 20%;

    .tutorial {
        padding-top: 5em;
    }

    section {
        flex: 1;
        margin: auto 2em;
        display: flex;
        flex-direction: column;
    }

    @media screen and (max-width: 1100px) {
        position: relative;
        padding: 0;
        height: auto;

        .tutorial {
            padding-top: 0;
        }
    }
`;

const Button = styled.button`
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 6em;
    height: 2em;
    font-size: 1.1em;
    border-radius: 10px;
    z-index: 2;
    color: var(--input-color);
    background-color: var(--form-color);

    @media screen and (max-width: 1100px) {
        font-size: 0.9em;
        top: unset;
        bottom: 0.5em;
        right: unset;
        left: 0.5em;
        width: 4.5em;
    }
`;
// < STYLE >


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.addedNewWords = this.addedNewWords.bind(this);
        this.setSuccessMessage = this.setSuccessMessage.bind(this);

        this.state = {
            count: 0,
            messages: [],
            copySuccess: "",
            newWords: [],
        }
    }

    addedNewWords(words) {
        this.setState({ newWords: words });
        setTimeout(() => this.setState({ newWords: "" }), 5000);
        this.fetchWordsCount();
        this.fetchWordsForSlider();
    }

    setSuccessMessage() {
        this.setState({ copySuccess: "Database words have been copied to clipboard." });
        setTimeout(() => this.setState({ copySuccess: "" }), 5000);
    }

    fetchWordsForSlider() {
        fetch("/api/words")
            .then(res => {
                console.log(res);
                if (res.ok) return res.json();
            })
            .then(data => {
                this.setState({ messages: data });
            })
            .catch(err => console.error(err));
    }

    fetchWordsCount() {
        fetch("/api/count")
            .then(res => {
                if (res.ok) return res.text()
            })
            .then(text => this.setState({ count: text }))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchWordsForSlider();
        this.fetchWordsCount();
    }

    render() {
        return (
            <Wrapper>
                <Button 
                    onClick={this.props.onLogout} 
                    type="button">
                        Logout
                </Button>

                <section>
                    <Tutorial />
                    <WordsForm addedNewWords={this.addedNewWords} />
                </section>
                <section>
                    <WordsInfo
                        newWords={this.state.newWords}
                        wordsCount={this.state.count}
                        copySuccess={this.state.copySuccess}
                        setSuccessMessage={this.setSuccessMessage}
                    />
                </section>

                <Corner switched={this.props.switched} messages={this.state.messages} />
            </Wrapper>
        );
    }
}