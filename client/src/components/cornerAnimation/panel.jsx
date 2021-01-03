import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: relative;
    min-width: 200px;
    width: max-content;
    height: 70px;
    z-index: 2;
    border-radius: 9px;
    display: flex;
    flex-direction: column;
    margin: 10px;

    background-color: var(--input-color);
    color: var(--form-color);

    p {
        margin: 5px 10px;
    }
`;

const Word = styled.p`
    font-size: 1.6em;
    text-align: left;
`;

const Author = styled.p`
    font-size: 1.3em;
    text-align: right;
`;

class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.updateAnimationIndex = this.updateAnimationIndex.bind(this);

        this.speed = this.props.speed || 1;
        this.ref = React.createRef();
        this.w = undefined;

        this.state = { 
            animationIndex: 0,
        };
    }

    startAnimation() {
        if (!this.RAF) {
            this.RAF = window.requestAnimationFrame( this.updateAnimationIndex );
        }
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.RAF);
    }

    updateAnimationIndex() {
        let newAnimationIndex = this.state.animationIndex + this.speed;
        if (this.ref.current.offsetLeft - this.ref.current.offsetWidth >= this.w) {
            newAnimationIndex -= this.w;
        }
        this.setState({ animationIndex: newAnimationIndex });

        this.RAF = window.requestAnimationFrame( this.updateAnimationIndex );
    }

    componentDidMount() {
        this.w = this.ref.current.offsetParent.offsetWidth;
        this.startAnimation();
    }

    componentWillUnmount() {
        this.stopAnimation();
    }

    render() {
        return (
            <Wrapper ref={this.ref} style={{ left: this.state.animationIndex }}>
                <Word>{this.props.word}</Word>
                <Author>{this.props.author}</Author>
            </Wrapper>
        )
    }
}

export default Panel;