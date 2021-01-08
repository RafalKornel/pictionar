import React from "react";


export default function withFormLogic(WrappedComponent, dataShape, fetchEndpoint) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.state = {
                ...dataShape,
                csrf: "",
                errorMessage: "",
            };
        }

        componentDidMount() {
            fetch(fetchEndpoint, {
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

            fetch(fetchEndpoint, options)
                .then(res => {
                    if (!res.ok) {
                        this.setState({ errorMessage: "Something went wrong!" });
                        setTimeout(() => this.setState({ errorMessage: "" }), 5000);
                        throw new Error("Something went wrong.");
                    }
                    this.props.afterSuccessfulFetch();
                })
                .catch(err => console.error(err));
        }


        render() {
            return <WrappedComponent 
                {...this.props} 
                {...this.state}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />;
        }
    }
}