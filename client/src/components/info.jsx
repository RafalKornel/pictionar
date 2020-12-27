import "./info.css"

function Info() {
    return (
        <article className="info">
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

        </article>
    )
}

export default Info;