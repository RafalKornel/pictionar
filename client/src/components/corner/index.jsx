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
    }

    fetchMessages() {
        // test messages
        return Array(21).fill(0).map( (e, i) => (<Panel author="rafal" word="test" speed={this.animationSpeed} />) );
    }

    render() {
        const moved = this.props.switched ? {
            transform: "translate(200px, 200px)"
        } : {};

        const messages = this.fetchMessages();
        const firstRowData = messages.filter( (e, i) => i % 3 == 0 )
        const secondRowData = messages.filter( (e, i) => i % 3 == 1 )
        const thirdRowData = messages.filter( (e, i) => i % 3 == 2 )


        return (
            <div className="animationContainer">
                <SVGPath />

                <div className="corner corner__background" style={moved}> </div>
                <div className="corner corner__slider">


                    <div className="messagesWrapper">
                        <div className="row">
                            {firstRowData}
                        </div>

                        <div className="row" style={{ transform: "translate(300px, 0)"}}>
                            {secondRowData}
                        </div>

                        <div className="row">
                            {thirdRowData}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Corner;