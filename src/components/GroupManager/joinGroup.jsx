import FormField from "../Utilities/formField";
import withFormLogic from "../Utilities/formLogic";
import { SubmitButton, ErrorMessage } from "../Utilities/common";
import { SuccessMessage, ComponentWrapper, Header } from "./common";


function JoinFormTemplate(props) {
    return (
        <ComponentWrapper>
            <Header 
                for="join"
                handleClick={props.handleClick}
                opened={props.opened} >
                Join existing group
            </Header>
            <form 
                onSubmit={props.handleSubmit}
                className={props.opened ? "" : "hidden"} >
                <div>
                    <ErrorMessage>{props.errorMessage}</ErrorMessage>
                    <SuccessMessage>{props.successMessage}</SuccessMessage>
                    <FormField
                        value={props.group_key_join}
                        id="group_key_join"
                        type="text"
                        onChange={props.handleChange}
                        name="group_key_join"
                        placeholder="Key" />
                </div>
                <SubmitButton type="submit">Join</SubmitButton>
            </form>
        </ComponentWrapper>

    );
}

const JoinForm = withFormLogic(
    JoinFormTemplate,
    { group_key_join: "" },
    "/api/join_group",
    (data) => `Joined ${data.name} group.`
);

export default JoinForm;