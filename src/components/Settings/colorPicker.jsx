import React from "react";
import styled from "styled-components";
import Themes from "./themes";
import ColorForm from "./colorForm";
import { Box, Button } from "./common";
import withFormLogic from "../Utilities/formLogic";
import { RemoveButton, ErrorMessage } from "../Utilities/common";

const labels = [
    "light gradient",
    "dark gradient",
    "text",
    "main",
    "accent"
];

// < STYLE >
const InnerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
    max-height: 150px;
    margin-right: -15px;

`;

const Wrapper = styled.div`
    margin: 0;
    min-height: 30%;
    
    & > h3, p {
        margin-top: 0;
        margin-bottom: 0;
    }
`;
// </ STYLE >


function sortThemeProperties(theme) { 
    // { prop:value } => [ value ]

    let reference = [
        "--gradient-light",
        "--gradient-dark",
        "--text-color",
        "--form-color",
        "--input-color" 
    ];
    let output = [];

    for (let ref of reference) {
        output.push(theme[ref]);
    }

    return output;
}

function ColorBoxes(props) {
    let values = sortThemeProperties(props.theme);
    return (
        <>
            { values.map((rgb, i) =>
                <Box rgb={rgb} key={i} title={labels[i]} />) }
        </>
    );
}

function ThemeSection(props) {
    let names = Object.keys(props.themes)
    return (
        (names).map((name, i) => (
            <Button
                onClick={() => props.setTheme(name)}
                key={i} >
                { props.removeTheme &&
                    <RemoveButton
                        onClick={() => props.removeTheme(name)}
                        title="Remove theme" >
                        <p>-</p>
                    </RemoveButton>}
                <p>{name}</p>
                <ColorBoxes theme={props.themes[name]} />
            </Button>
        ))
    );
}


class ColorPickerTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.setTheme = this.setTheme.bind(this);
        this.removeTheme = this.removeTheme.bind(this);

        this.defaultThemes = Themes;
        this.names = Object.keys(this.defaultThemes);
    }

    extractThemeFromProps() {
        const {
            "--gradient-light": gradient_light,
            "--gradient-dark": gradient_dark,
            "--text-color": text_color,
            "--form-color": form_color,
            "--input-color": input_color
        } = this.props;

        return {
            "--gradient-light": gradient_light,
            "--gradient-dark": gradient_dark,
            "--text-color": text_color,
            "--form-color": form_color,
            "--input-color": input_color
        }
    }

    setTheme(themeName) {
        let theme = { ...this.defaultThemes, ...this.props.themes }[themeName];

        this.props.customHStateHandle(theme);
    }

    removeTheme(themeName) {
        fetch(`/api/remove_theme/${themeName}`)
            .then(res => {
                this.props.afterSuccessfulFetch();
            })
            .catch(err => console.error(err));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps === this.props) {
            return;
        }

        let theme = this.extractThemeFromProps();

        for (let prop in theme) {
            document.documentElement.style.setProperty(prop, theme[prop]);
        }
    }

    render() {
        let theme = this.extractThemeFromProps();

        return (
            <Wrapper>
                <h3>Select theme</h3>

                <InnerWrapper>
                    <ThemeSection
                        themes={this.defaultThemes}
                        setTheme={this.setTheme} />

                    <ThemeSection
                        themes={this.props.themes}
                        setTheme={this.setTheme}
                        removeTheme={this.removeTheme} />
                </InnerWrapper>

                <ColorForm
                    colors={theme}
                    themeName={this.props.themeName}
                    handleChange={this.props.handleChange}
                    handleSubmit={this.props.handleSubmit} />

                <ErrorMessage>{this.props.errorMessage}</ErrorMessage>
            </Wrapper>
        );
    }
}

const ColorPicker = withFormLogic(
    ColorPickerTemplate,
    {
        themeName: "",
        ...(Themes.Default),
    },
    "/api/add_theme"
);

export default ColorPicker;