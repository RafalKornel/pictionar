import React from "react";
import "./wordsInfo.css"

class WordsInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            retrievedWords: [],
            count: 0,
        }
    }



    render() {
        return (
            <div className="wordsInfo">
                <article>
                    <h2>There are <span className="wordsInfo__count">{this.state.count}</span> words in database.</h2>
                    <h2>Hit the button below to get words from database</h2>
                </article>

                <button type="button" className="getWordsButton">Get words!</button>
            </div>
        );
    }
}

export default WordsInfo;