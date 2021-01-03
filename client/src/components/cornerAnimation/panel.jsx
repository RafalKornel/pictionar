import React from "react";

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
            <div className="panel" ref={this.ref} style={{ left: this.state.animationIndex }}>
                <p className="panel__word">{this.props.word}</p>
                <p className="panel__author">{this.props.author}</p>
            </div>
        )
    }
}

export default Panel;