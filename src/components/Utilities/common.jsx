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


export const RemoveButton = styled.div`
    width: 2em;
    height: 2em;
    display: flex;
    place-items: center;
    cursor: default;
    user-select: none;
    box-sizing: border-box;
    transition: all 400ms ease;
    

    &:hover {
        backdrop-filter: contrast(1.5);
        border: 1px solid red;
        border-radius: 20px;
    }

    &:hover p {
        transform: scale(1.5);
    }

    p {
        margin: auto;
        font-weight: bold;
        color: red;
    }
`;

export const SuccessMessage = styled(ErrorMessage)`
    color: green;
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

export const GroupsSelect = (props) => (
    <select 
        name="group" 
        id="group" 
        onChange={props.handleChange} 
        value={props.group}>
            {props.groups.map( (group, i) => (
                <option value={group} key={i}>{group}</option> ))}
    </select>
);