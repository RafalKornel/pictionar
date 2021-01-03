import React from "react"
import Tutorial from "./tutorial";
import Corner from "../cornerAnimation";
import WordsForm from "./wordsForm";
import WordsInfo from "./wordsInfo";
import "./index.css";

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
            <div className="page mainPage bcg">
                <LogoutButton onLogout={this.props.onLogout} />

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
            </div>
        );
    }
}

class LogoutButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<button onClick={this.props.onLogout} type="button" className="logoutButton">Logout</button>);
    }
}