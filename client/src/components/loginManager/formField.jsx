import styled from "styled-components";

// < STYLE >
const Bar = styled.div``;

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

    ${Bar} {
        width: 90%;
        height: 6px;
        transition: 150ms all ease;
        background-color: var(--input-color);
        border-radius: 9px;
        margin-left: auto
    }
`;

const InnerWrapper = styled.div.attrs(props => ({
    tabIndex: "-1",
}))
`
    &:focus-within {
        outline: none;
    }

    &:focus-within > ${Bar} {
        width: 100%;
    }
`;
// </ STYLE >


function FormField(props) {
    return (
        <Wrapper>
            <label htmlFor={props.id}>{props.children}</label>
            <InnerWrapper>
                <input value={props.value} onChange={props.onChange} id={props.id} type={props.type} name={props.name} required />
                <Bar />
            </InnerWrapper>
        </Wrapper>
    );
}

export default FormField;