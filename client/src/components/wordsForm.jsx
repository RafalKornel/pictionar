import React from "react";
import "./wordsForm.css"

class WordsForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { words: "" };
    }

    handleChange(e) {
        this.setState({ words:e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        alert("Trying to send words");
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} autoComplete="off" class="wordsForm">
                <label for="words">Words: </label>
                <div class="wrapper" tabIndex="-1">
                    <textarea onChange={this.handleChange} id="words" name="words" placeholder="Type word(s) here">{this.state.words}</textarea>
                    <div class="bar"></div>
                </div>
                <button type="submit" className="submitButton" onSubmit={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}

export default WordsForm;