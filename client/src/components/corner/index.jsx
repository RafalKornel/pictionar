import "./corner.css";
import Panel from "./panel";
import React from "react";

function SVGPath() {
    return (
        <svg width="0" height="0">
            <defs>
                <clipPath id="smallClip">
                    <path d="M632 0V553H0L632 0Z" />
                </clipPath>
            </defs>
        </svg>
    );
}



class Corner extends React.Component {
    constructor(props) {
        super(props);

        this.fetchMessages = this.fetchMessages.bind(this);

        this.animationSpeed = 1;

        this.state = {
            firstRowData: [],
            secondRowData: [],
            thirdRowData: [],
        }
    }

    fetchMessages() {
        // test messages
        fetch("/api/words")
        .then(res => {
            if (res.ok) return res.json();
        })
        .then(data => {
            return data.map( ({user, word}, i) => (<Panel author={user} word={word} speed={this.animationSpeed} key={i} />) );
        })
        .then(panels => {
            let panelsSorted = [ [], [], [] ];
            panels.forEach(panel => {
                let i = panel.key % 3;
                panelsSorted[i].push(panel);
            });

            this.setState({
                firstRowData: panelsSorted[0],
                secondRowData: panelsSorted[1],
                thirdRowData: panelsSorted[2],
            });
        })
        .catch(err => console.error(err));
    }

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const moved = this.props.switched ? {
            transform: "translate(200px, 200px)"
        } : {};

        return (
            <div className="animationContainer">
                <SVGPath />

                <div className="corner corner__background" style={moved}> </div>
                <div className="corner corner__slider">


                    <div className="messagesWrapper">
                        <div className="row">
                            {this.state.firstRowData}
                        </div>

                        <div className="row" style={{ transform: "translate(300px, 0)"}}>
                            {this.state.secondRowData}
                        </div>

                        <div className="row">
                            {this.state.thirdRowData}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Corner;