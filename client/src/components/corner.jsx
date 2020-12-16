import "./corner.css"
import React from "react"

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
    }

    render() {
        const moved = this.props.switched ? {
            transform: "translate(200px, 200px)"
        } : {};

        return (
            <div>
                <SVGPath />
                <div className="animationContainer">
                    <div className="corner outer" style={moved}></div>
                    <div className="corner inner"></div>
                </div>
            </div>
        )
    }
}


export default Corner;