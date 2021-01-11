import FormField from "../Utilities/formField";
import withFormLogic from "../Utilities/formLogic";
import { SubmitButton, SuccessMessage, ErrorMessage, } from "../Utilities/common";
import { GroupComponentWrapper, Header } from "./common";


function JoinFormTemplate(props) {
    return (
        <GroupComponentWrapper>
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
        </GroupComponentWrapper>

    );
}

const JoinForm = withFormLogic(
    JoinFormTemplate,
    { group_key_join: "" },
    "/api/join_group",
    (data) => `Joined ${data.name} group.`
);

export default JoinForm;