import "./corner.css";
import Panel from "./panel";
import React from "react";

function SVGPathSmall() {
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

function SVGPathBig() {
    return (
        <svg width="0" height="0">
            <defs>
                <clipPath id="mainClip">
                    <path d="M2828 0H0V2189H2226L2828 1664V0Z" />
                </clipPath>
            </defs>
        </svg>
    );
}



class Corner extends React.Component {
    constructor(props) {
        super(props);

        this.animationSpeed = 1;
    }


    render() {
        const moved = this.props.switched 
        ? "corner corner__background moved"
        : "corner corner__background";

        let panelsSorted = [ [], [], [] ];
        let panels = this.props.messages.map( ({user, word}, i) => (<Panel author={user} word={word} speed={this.animationSpeed} key={i} />) );
        
        panels.forEach(panel => {
            let i = panel.key % 3;
            panelsSorted[i].push(panel);
        });

        return (
            <div className="animationContainer">
                <SVGPathSmall />
                <SVGPathBig />

                <div className={moved}> </div>
                <div className="corner corner__slider">


                    <div className="messagesWrapper">
                        <div className="row">
                            {panelsSorted[0]}
                        </div>

                        <div className="row" style={{ transform: "translate(300px, 0)"}}>
                            {panelsSorted[1]}
                        </div>

                        <div className="row">
                            {panelsSorted[2]}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


export default Corner;