import React from "react"
import Tutorial from "./tutorial";
import Corner from "../CornerAnimation";
import WordsForm from "./wordsForm";
import WordsInfo from "./wordsInfo";
import Settings from "../Settings";
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
// < STYLE >


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.addedNewWords = this.addedNewWords.bind(this);
        this.setSuccessMessage = this.setSuccessMessage.bind(this);
        this.switchCorner = this.switchCorner.bind(this);

        this.cache = [];

        this.state = {
            count: 0,
            messages: [],
            copySuccess: "",
            newWords: [],
            groups: [],
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

    switchCorner() {
        this.props.switchCorner();
        if (this.state.messages.length > 0) {
            this.cache = this.state.messages;
            setTimeout(() => this.setState({ messages: [] }), 300);
        }
        else {
            this.setState({ messages: this.cache });
        }
    }

    componentDidMount() {
        this.fetchWordsForSlider();
        this.fetchWordsCount();
    }

    render() {
        return (
            <Wrapper>
                <Settings 
                    name="Rafal" 
                    onLogout={this.props.onLogout} 
                    switchCorner={this.switchCorner}
                    />
                <section>
                    <Tutorial />
                    <WordsForm 
                        addedNewWords={this.addedNewWords} 
                        groups={this.props.groups} 
                    />
                </section>
                <section>
                    <WordsInfo
                        newWords={this.state.newWords}
                        wordsCount={this.state.count}
                        copySuccess={this.state.copySuccess}
                        setSuccessMessage={this.setSuccessMessage}
                        groups={this.props.groups}
                    />
                </section>

                <Corner switched={this.props.switched} messages={this.state.messages} />
            </Wrapper>
        );
    }
}