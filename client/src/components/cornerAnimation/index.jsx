import Panel from "./panel";
import React from "react";
import styled from "styled-components";

// < SVG's components >
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
// </ SVG's components >


// < STYLE >
const AnimationContainer = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const corner = styled.div`
    width: 632px;
    height: 553px;
    position: absolute;
    right: 0;
    bottom: 0;
    clip-path: url(#smallClip);
    background-attachment: fixed;
    transition: transform 500ms ease;

    @media screen and (max-width: 1100px) {
        transform: scale(0.4) translate(75%, 75%);
        bottom: 0%;
    }
`;

const SliderCorner = styled(corner)`
    background-image: var(--bcg);
    z-index: 2;

    ${props => props.moved ? "transform: translate(200px, 200px)" : ""};


    @media screen and (max-width: 1100px) {
        background-image: none;
        background-color: var(--gradient-light);

        ${props => props.moved ? "transform: scale(0.4) translate(109%, 109%)" : ""};
    }
`;

const BackCorner = styled(corner)`
    background-color: var(--form-color);
    display: flex;

    z-index: 0;
`;

const MessagesWrapper = styled.div`
    display: flex;
    transform-origin: top left;
    transform: rotate(-41deg) translate(-60%, 76%);
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: max-content;
`;
// </ STYLE >



class Corner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            panels: [],
        };

        this.animationSpeed = 1;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.messages === this.props.messages || this.props.messages === []) return;

        let panelsSorted = [[], [], []];
        let panels = this.props.messages.map(({ user, word }, i) => (<Panel author={user} word={word} speed={this.animationSpeed} key={i} />));

        panels.forEach(panel => {
            let i = panel.key % 3;
            panelsSorted[i].push(panel);
        });

        this.setState({panels: panelsSorted});
    }


    render() {
        return (
            <AnimationContainer>
                <SVGPathSmall />
                <SVGPathBig />

                <SliderCorner moved={this.props.switched} />
                <BackCorner >
                    <MessagesWrapper>
                        <Row>
                           {this.state.panels[0]}
                        </Row>
                        <Row style={{ transform: "translate(300px, 0)" }}>
                            {this.state.panels[1]}
                        </Row>
                        <Row>
                           {this.state.panels[2]}
                        </Row>
                    </MessagesWrapper>
                </BackCorner>
            </AnimationContainer>
        )
    }
}


export default Corner;