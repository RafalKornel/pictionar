import React from "react";
import styled from "styled-components";
import FormField from "../Utilities/formField";
import { Button, Box } from "./common";

// < STYLE >
const MiniButton = styled.span`
    padding: 0.5em;
    font-weight: bold;
    cursor: default;
    user-select: none;
    transition: 400ms all ease;
    
    
    &:hover {
        backdrop-filter: contrast(120%);
    }
`;

const Wrapper = styled(Button)`    

    &:hover {
        backdrop-filter: none;
    }

    .formField {
        width: 5em;
        margin: 1em auto 1em 0;
    }

    input[type="color"] {
        padding: 0;
        box-sizing: content-box;

        &::-webkit-color-swatch-wrapper {
            padding: 0;
        }

        &::-webkit-color-swatch {
            border: none;
        }
    }

    ${Box} {
        margin: 0.5em 0;
        margin-left: 5px;
    }

`;
// </ STYLE >


export default function ColorFormTemplate(props) {
    return (
        <Wrapper className="form" as="form">
            <MiniButton onClick={props.handleSubmit} title="add theme">+</MiniButton>
            <FormField 
                type="text" 
                name="themeName" 
                id="themeName" 
                placeholder="name" 
                hideBar={true} 
                value={props.themeName}
                onChange={props.handleChange}
                />
            {Object.keys(props.colors).map((color, i) => (
                <Box 
                    as="input" 
                    type="color" 
                    value={props.colors[color]} 
                    onChange={props.handleChange} 
                    key={i} 
                    id={color} 
                    name={color} />
            ))}
        </Wrapper>
    );
}
