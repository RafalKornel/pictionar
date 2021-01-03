import styled from "styled-components";

const Wrapper = styled.article`
    margin: auto 3rem;
    margin-right: 10%;
    flex: 1;
    font-size: 1.2em;

    ul {
        padding-left: 0;
        list-style: none;
    }

    li {
        margin: 20px 0;
    }

    @media screen and (max-width: 1100px) {
        margin: 0 1em;
        flex: unset;
    }

`;

function Info() {
    return (
        <Wrapper>
                <ul>
                    <li>
                        <h2>
                            This app allows you to create and
                            store words dictionary. First, you have to
                            log in, or register, if you don't have an account.
                        </h2>
                    </li>
                    <li>
                        <h2>
                            After login you can see already existing 
                            words in slider, or add your
                            own ones!
                        </h2>
                    </li>
                    <li>
                        <h2>
                            You can also retrieve dictionary from the database.
                            Words are returned in form of text, separated by comma (so they are 
                            ready to put in pictionary game)
                        </h2>
                    </li>
                </ul>

        </Wrapper>
    )
}

export default Info;