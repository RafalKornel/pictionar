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