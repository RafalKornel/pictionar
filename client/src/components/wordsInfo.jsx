import React from "react";
import "./wordsInfo.css"

class WordsInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const addedWordsMessage = this.props.newWords.length > 0
            ? (<NewWordsInfo newWords={this.props.newWords} />)
            :  null;
        return (
            <div className="wordsInfo">
                <article>
                    {addedWordsMessage}
                    <h2>There are <span className="wordsInfo__count">{this.props.wordsCount}</span> words in database.</h2>
                    <h2>Hit the button below to get words from database</h2>
                    <h2 style={{ color: "var(--form-color)", fontWeight: "bold" }}>{this.props.copySuccess}</h2>
                </article>

                <GetWordsButton showSuccessMessage={this.props.setSuccessMessage} />
            </div>
        );
    }
}

class GetWordsButton extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        fetch("/api/bank")
            .then(res => res.json())
            .then(data => {
                navigator.clipboard.writeText(data);
                this.props.showSuccessMessage();
            })
            .catch(err => console.error(err))
    }

    render() {
        return (<button type="button" className="getWordsButton" onClick={this.handleClick}>Get words!</button>);

    }
}

function NewWordsInfo(props) {
    return (
        <div>
            <h2>Following words have been added to database:</h2>
            <h2 style={{ fontSize: "1.1em", color: "var(--form-color)", fontWeight: "bold" }}>{props.newWords}</h2>
        </div>
    )
}

export default WordsInfo;