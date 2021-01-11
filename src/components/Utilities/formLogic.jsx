import React from "react";

export default function withFormLogic(
        WrappedComponent, 
        dataShape, 
        endpoint, 
        createSuccessMessage=undefined,
        messageTimeout=5000) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.fetchInterval = undefined;
            this.state = {
                ...dataShape,
                csrf: "",
                errorMessage: "",
                successMessage: "",
            };
        }

        componentDidMount() {
            this.fetchCSRFToken();

            this.fetchInterval = setInterval(this.fetchCSRFToken, 1000 * 60 * 5);
        }

        componentWillUnmount() {
            clearInterval(this.fetchInterval);
        }

        fetchCSRFToken() {
            fetch(endpoint, {
                method: "GET",
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    }
                    else {
                        window.location.reload();
                        throw new Error("Refreshing page");
                    }
                })
                .then(data => {
                    this.setState({ csrf: data.csrf_token })
                })
                .catch(err => console.error(err));
        }

        setMessage(type, message) {
            let messageType = type === "success" ? "successMessage" : "errorMessage";
            this.setState({ [messageType]: message });
            setTimeout(() => this.setState({ [messageType]: "" }), messageTimeout);
        }

        handleChange(e) {
            this.setState({ [e.target.id]: e.target.value });
        }

        async handleSubmit(e) {
            e.preventDefault();

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.state.csrf,
                },
                body: JSON.stringify(this.state),
            }

            let res = await fetch(endpoint, options).catch(err => console.error(err));

            if (!res.ok) {
                let text = await res.text();
                console.error(text);
                this.setMessage("error", text);
                return;
            }

            let data = await res.json().catch(err => console.log(err));

            if (this.props.afterSuccessfulFetch) this.props.afterSuccessfulFetch(data);
            let message = createSuccessMessage ? createSuccessMessage(data) : "Success!"; 
            this.setMessage("success", message);
            

            /*
            fetch(endpoint, options)
                .then(res => {
                    if (!res.ok) {
                        let message = "Something went wrong";
                        this.setMessage("error", message);
                        throw res.text().then(text => new Error(text));
                        
                    }
                    return res.json();
                })
                .then(data => {
                    if (this.props.afterSuccessfulFetch) this.props.afterSuccessfulFetch(data);
                    let message = createSuccessMessage ? createSuccessMessage(data) : "Success!"; 
                    this.setMessage("success", message);

                })
                .catch(err => console.error(err)); */
        }


        render() {
            const { afterSuccessfulFetch, ...passThroughProps} = this.props;
            return <WrappedComponent 
                {...passThroughProps} 
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />;
        }
    }
}