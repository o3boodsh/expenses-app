import { useRef } from "react";
import FormInput from "./FormInput";
import ExpenseModel from "../models/ExpenseModel";


function FormLayout(props) {
    let titleRef = useRef();
    let dateRef = useRef();
    let priceRef = useRef();
    let descrptionRef = useRef();

    let onSubmitHandler = (event) => {
        //its important to avoid refresh of page. [event.preventDefault()]
        event.preventDefault();
        let newExpense = new ExpenseModel(titleRef.current.value, dateRef.current.value, priceRef.current.value, descrptionRef.current.value);
        props.onNewExpense(newExpense);
        clear();
    }

    let clear = () => {
        titleRef.current.value = '';
        dateRef.current.value = '';
        priceRef.current.value = '';
        descrptionRef.current.value = '';

    }
    return (
        <form className="row" onSubmit={onSubmitHandler}>
            <FormInput title="Title" type="text" inputClass="addTitle" ref={titleRef} />
            <FormInput title="Date" type="date" inputClass="addDate" ref={dateRef} />
            <FormInput title="Value" type="number" inputClass="addValue" ref={priceRef} />
            <FormInput title="Descrption" type="text" inputClass="addDescrption" ref={descrptionRef} />

            <div className="mb-3 col-md-12 text-right">
                <button type="submit" className="btn btn-primary addBtn">
                    Add
                </button>
            </div>
        </form>);
}

export default FormLayout;