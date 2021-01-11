import React from "react";
import styled from "styled-components";
import ColorPicker from "./colorPicker";
import GroupManager from "../GroupManager";


// < STYLE >
const Icon = (props) => (
    <svg version="1.1" id="Layer_1" x="0px" y="0px" width="122.88px" height="122.878px" viewBox="0 0 122.88 122.878" enableBackground="new 0 0 122.88 122.878"><g>
        <path fillRule="evenodd" clipRule="evenodd" d="M101.589,14.7l8.818,8.819c2.321,2.321,2.321,6.118,0,8.439l-7.101,7.101 c1.959,3.658,3.454,7.601,4.405,11.752h9.199c3.283,0,5.969,2.686,5.969,5.968V69.25c0,3.283-2.686,5.969-5.969,5.969h-10.039 c-1.231,4.063-2.992,7.896-5.204,11.418l6.512,6.51c2.321,2.323,2.321,6.12,0,8.44l-8.818,8.819c-2.321,2.32-6.119,2.32-8.439,0 l-7.102-7.102c-3.657,1.96-7.601,3.456-11.753,4.406v9.199c0,3.282-2.685,5.968-5.968,5.968H53.629 c-3.283,0-5.969-2.686-5.969-5.968v-10.039c-4.063-1.232-7.896-2.993-11.417-5.205l-6.511,6.512c-2.323,2.321-6.12,2.321-8.441,0 l-8.818-8.818c-2.321-2.321-2.321-6.118,0-8.439l7.102-7.102c-1.96-3.657-3.456-7.6-4.405-11.751H5.968 C2.686,72.067,0,69.382,0,66.099V53.628c0-3.283,2.686-5.968,5.968-5.968h10.039c1.232-4.063,2.993-7.896,5.204-11.418l-6.511-6.51 c-2.321-2.322-2.321-6.12,0-8.44l8.819-8.819c2.321-2.321,6.118-2.321,8.439,0l7.101,7.101c3.658-1.96,7.601-3.456,11.753-4.406 V5.969C50.812,2.686,53.498,0,56.78,0h12.471c3.282,0,5.968,2.686,5.968,5.969v10.036c4.064,1.231,7.898,2.992,11.422,5.204 l6.507-6.509C95.471,12.379,99.268,12.379,101.589,14.7L101.589,14.7z M61.44,36.92c13.54,0,24.519,10.98,24.519,24.519 c0,13.538-10.979,24.519-24.519,24.519c-13.539,0-24.519-10.98-24.519-24.519C36.921,47.9,47.901,36.92,61.44,36.92L61.44,36.92z" />
    </g>
    </svg>
);

const Button = styled.button`
    width: 8em;
    height: 2em;
    font-size: 1.1em;
    line-height: 0.9em;
    color: var(--form-color);
    background-color: var(--input-color);

    @media screen and (max-width: 1100px) {
        font-size: 0.9em;
        top: unset;
        bottom: 0.5em;
        right: unset;
        left: 0.5em;
        width: 4.5em;
    }
`;

const Wrapper = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
    padding: 2rem;
    width: 20%;
    min-height: 30rem;
    max-height: 40rem;
    display: flex;
    flex-direction: column;
    z-index: 4;
    border-radius: 10px;
    background-color: var(--form-color);
    transition: 500ms all cubic-bezier(0.25, 0.46, 0.45, 0.94);

    clip-path: circle(8% at 88% 8%);

    & > * {
        transition: 500ms all ease-in-out;
        opacity: 0;
    }

    &:hover {
        clip-path: circle(100% at 50% 50%);
    }

    &:hover > * {
        opacity: 1;
    }

    > svg {
        transition: 200ms opacity ease;
        position: absolute;
        transform: translate(-50%, -50%) scale(0.35);
        left: 88%;
        top: 8%;
        opacity: 1;
        fill: var(--input-color);
    }

    &:hover > svg {
        opacity: 0;
    }

    h1 {
        margin: 0;
    }

    @media screen and (max-width: 1100px) {
        width: 60%;
        height: auto;

        top: 1rem;
        right: 1rem;

        clip-path: circle(5% at 92% 2em);

        > svg {
            left: 92%;
            top: 2em;
            transform: translate(-50%, -50%) scale(0.15);
        }

    }
`;

const Header = styled.h1`
    margin: auto 0;
    margin-right: auto;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    margin-top: auto;
`;
// </ STYLE >


const LogoutButton = (props) => (
    <Button
        onClick={props.onLogout}
        type="button">
        Logout
    </Button>
);

const CornerButton = (props) => (
    <Button
        onClick={props.switchCorner}>
        Switch corner
    </Button>
);

export default function Settings(props) {
    return (
        <Wrapper>
            <Icon />
            <Header>Hello {props.name}!</Header>
            <GroupManager 
                loggedIn={props.loggedIn} 
                fetchUserData={props.fetchUserData}
                groups={props.groups}
                />
            <ColorPicker />
            { props.loggedIn 
            ? <ButtonsWrapper>
                <LogoutButton onLogout={props.onLogout} />
                <CornerButton switchCorner={props.switchCorner} />
            </ButtonsWrapper>
            : "" }
        </Wrapper>
    );
}