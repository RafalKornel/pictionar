import React from "react";
import styled from "styled-components";
import Themes from "./themes";

const labels = [
    "light gradient",
    "dark gradient",
    "text",
    "main",
    "accent"
];

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em 0;

    overflow-y: scroll;

    & > h3, p {
        margin: 0;
    }
    
`;

const Box = styled.div`
    height: 1.5em;
    width: 1.5em;

    box-sizing: border-box;
    border: 2px solid black;
    ${props => "background: " + props.rgb + ";"}
`;

const Button = styled.div`
    padding: 0 0.5em;
    display: flex;
    align-items: center;
    
    transition: 400ms all ease;

    p {
        margin-right: auto;
        cursor: default;
    }

    ${Box} {
        margin: 0.5em 0;
        margin-left: 5px;
    }

    &:hover {
        backdrop-filter: contrast(120%);
    }
`;

export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.setTheme = this.setTheme.bind(this);

        this.themes = Themes;
        this.names = Object.keys(this.themes);
    }

    setTheme(themeName) {
        let theme = this.themes[themeName];

        for (let prop in theme) {
            document.documentElement.style.setProperty(prop, theme[prop]);
        }
    }

    render() {
        return (
            <Wrapper>
                <h3>Select theme</h3>

                {this.names.map((name, i) => (
                    <Button onClick={() => this.setTheme(name)} key={i}>
                        <p>{name}</p>
                        {Object.values(this.themes[name]).map( (rgb, i) => <Box rgb={rgb} key={i} title={labels[i]} />)}
                    </Button>)
                )
                }
            </Wrapper>
        );
    }
}