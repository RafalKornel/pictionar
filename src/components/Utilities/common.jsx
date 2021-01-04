import styled from "styled-components";

// < STYLE >
export const Wrapper = styled.div`
    display: flex;
    margin: 0.5em 0;
`;

export const ErrorMessage = styled.p`
    color: red;
    margin: auto;
    line-height: 100%;
`;

export const SubmitButton = styled.button`
    background-color: var(--input-color);
    color: var(--form-color);
    font-size: 1.15em;
    width: 100px;
    height: 30px;
    margin-left: auto;  
    margin-bottom: auto;
`;

export const Bar = styled.div`
    width: 90%;
    height: 6px;
    transition: 150ms all ease;
    background-color: var(--input-color);
    border-radius: 9px;
    margin-left: auto;
`;

export const InnerFieldWrapper = styled.div.attrs(props => ({
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

export const Page = styled.div`
    display: flex;
    height: 100%;

    @media screen and (max-width: 1100px) {
        flex-direction: column;
        margin-top: 6.5em;
    }
`;