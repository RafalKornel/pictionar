import styled from "styled-components";
import { SuccessMessage, ErrorMessage } from "../Utilities/common";

const H3 = styled.h3`
    margin: 0;
    cursor: default;
    user-select: none;
`;

export const GroupComponentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1em;

    form {
        transform-origin: center top;
        transition: all 200ms ease;
        margin-bottom: 0 !important;
    }

    form > div {
        width: 100%;
    }


    &, & * {
        transition: all 400ms ease;
    }

    ${ErrorMessage}, ${SuccessMessage} {
        margin-left: 10%;
        margin-top: 0.5em;
    }

    .hidden {
        opacity: 0;
        transform: scaleY(0);
        height: 0;
    }

    span {
        display: inline-block;
    }

    .opened {
        transform: rotate(-90deg);
    }
`;

export const Header = (props) => (
        <H3 onClick={() => props.handleClick(props.for)}>
            <span className={props.opened ? "" : "opened"}>▼</span>{props.children}
        </H3>
);