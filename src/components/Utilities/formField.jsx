import styled from "styled-components";
import { InnerFieldWrapper, Bar } from "./common"

// < STYLE >
const Wrapper = styled.div`
    margin: 0.9em 0;

    input {
        width: 90%;
        margin-left: 10%;
        line-height: 1.8em;
        border: none;
        outline: none;
        background-color: var(--form-color);
        color: var(--text-color);
        font-size: 1.1em;
    }

`;
// </ STYLE >


export default function FormField(props) {
    return (
        <Wrapper>
            <label htmlFor={props.id}>{props.children}</label>
            <InnerFieldWrapper>
                <input 
                    value={props.value} 
                    onChange={props.onChange} 
                    id={props.id} 
                    type={props.type} 
                    name={props.name} 
                    placeholder={props.placeholder}
                    autoComplete={props.autoComplete || "off"}
                    required />
                <Bar />
            </InnerFieldWrapper>
        </Wrapper>
    );
}