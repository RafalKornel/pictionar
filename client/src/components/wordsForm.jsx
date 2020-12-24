import React from "react";
import "./wordsForm.css"

class WordsForm extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = { 
            words: "",
            csrf: "",
        };
    }

    handleChange(e) {
        this.setState({ words:e.target.value });
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
            body: JSON.stringify({ words: words }),
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
            <form onSubmit={this.handleSubmit} autoComplete="off" className="wordsForm">
                <label htmlFor="words">Words: </label>
                <div className="wrapper" tabIndex="-1">
                    <textarea onChange={this.handleChange} id="words" name="words" placeholder="Type word(s) here">{this.state.words}</textarea>
                    <div className="bar"></div>
                </div>
                <button type="submit" className="submitButton" onSubmit={this.handleSubmit}>Submit</button>
            </form>
        );
    }
}

export default WordsForm;