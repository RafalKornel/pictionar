import React from "react";

export default function withFormLogic(
        WrappedComponent, 
        dataShape, 
        endpoint, 
        createSuccessMessage=undefined) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                ...dataShape,
                csrf: "",
                errorMessage: "",
                successMessage: "",
            };
        }

        setMessage(type, message, timeout=5000)
        {
            let messageType = type === "success" ? "successMessage" : "errorMessage";
            this.setState({ [messageType]: message });
            setTimeout(() => this.setState({ [messageType]: "" }), timeout);
        }


        componentDidMount() {
            fetch(endpoint, {
                method: "GET",
            })
                .then(res => {
                    if (res.ok) return res.json()
                })
                .then(data => {
                    this.setState({ csrf: data.csrf_token })
                })
                .catch(err => console.error(err));
        }

        handleChange(e) {
            this.setState({ [e.target.id]: e.target.value });
        }

        handleSubmit(e) {
            e.preventDefault();

            let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": this.state.csrf,
                },
                body: JSON.stringify(this.state),
            }

            fetch(endpoint, options)
                .then(res => {
                    if (!res.ok) {
                        let message = "Something went wrong";
                        this.setMessage("error", message);
                        throw new Error("Something went wrong.");
                    }
                    return res.json();
                })
                .then(data => {
                    if (this.props.afterSuccessfulFetch) this.props.afterSuccessfulFetch(data);
                    let message = createSuccessMessage ? createSuccessMessage(data) : "Success!"; 
                    this.setMessage("success", message);

                })
                .catch(err => console.error(err));
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