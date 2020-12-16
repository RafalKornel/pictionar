function FormField(props) {
    return (
        <div className={props.class + " formField"}>
            <label for={props.id}>{props.children}</label>
            <div className="wrapper" tabIndex="-1">
                <input value={props.value} onChange={props.onChange} id={props.id} type={props.type} name={props.name} required />
                <div className="bar"></div>
            </div>
        </div>
    );
}

export default FormField;