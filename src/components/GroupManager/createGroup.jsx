import withFormLogic from "../Utilities/formLogic";
import { SubmitButton, SuccessMessage, ErrorMessage, } from "../Utilities/common";
import FormField from "../Utilities/formField";
import { GroupComponentWrapper, Header } from "./common";


function CreateFormTemplate(props) {
    return (
        <GroupComponentWrapper>
            <Header
                for="create"
                handleClick={props.handleClick}
                opened={props.opened} >
                Create new group
            </Header>
            <form
                onSubmit={props.handleSubmit}
                id="createForm"
                className={props.opened ? "" : "hidden"} >
                <div>
                    <ErrorMessage>{props.errorMessage}</ErrorMessage>
                    <SuccessMessage>{props.successMessage}</SuccessMessage>
                    <FormField
                        value={props.group_name_create}
                        id="group_name_create"
                        type="text"
                        onChange={props.handleChange}
                        name="group_name_create"
                        placeholder="Name" />
                    <FormField
                        value={props.group_key_create}
                        id="group_key_create"
                        type="text"
                        onChange={props.handleChange}
                        name="group_key_create"
                        placeholder="Key" />
                </div>
                <SubmitButton type="submit">Create</SubmitButton>
            </form>
        </GroupComponentWrapper>
    );
}


const CreateForm = withFormLogic(
    CreateFormTemplate,
    {
        group_name_create: "",
        group_key_create: "",
    },
    "/api/create_group",
    (data) => `Created group ${data.name} with key ${data.key}`
);

export default CreateForm;