import React from "react";
import "./wordsInfo.css"

class WordsInfo extends React.Component {
    constructor(props) {
        super(props);

        this.setSuccessMessage = this.setSuccessMessage.bind(this);
        this.unsetSuccessMessage = this.unsetSuccessMessage.bind(this);

        this.state = {
            copySuccess: "",
            count: 0,
        }
    }

    componentDidMount() {
        fetch("/api/count")
        .then(res => {
            if (res.ok) return res.text()} )
        .then(text => this.setState({ count: text }))
        .catch(err => console.error(err));
    }

    setSuccessMessage() {
        this.setState({ copySuccess: "Database words have been copied to clipboard."})
        setTimeout( () => this.unsetSuccessMessage(), 5000 );
    }

    unsetSuccessMessage() {
        this.setState({ copySuccess: ""})
    }

    render() {
        return (
            <div className="wordsInfo">
                <article>
                    <h2>There are <span className="wordsInfo__count">{this.state.count}</span> words in database.</h2>
                    <h2>Hit the button below to get words from database</h2>
                    <h2 style={{ color: "var(--form-color)"}}>{this.state.copySuccess}</h2>
                </article>

                <GetWordsButton showSuccessMessage={this.setSuccessMessage} />
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
        .then( res => res.json() )
        .then( data => {
            navigator.clipboard.writeText(data);
            this.props.showSuccessMessage();
        })
        .catch( err => console.error(err) )
    }

    render() {
        return (<button type="button" className="getWordsButton" onClick={this.handleClick}>Get words!</button>);
        
    }
}

export default WordsInfo;