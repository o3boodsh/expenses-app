import React from "react";

let FormInput = React.forwardRef((props, ref) => {
    return (<div className="mb-3 col-md-6">
        <label className="htmlForm-label">{props.title}</label>
        <input
            type={props.type}
            className={`form-control ${props.inputClass}`}
            aria-describedby=""
            ref={ref}
        />
    </div>
    );
});

// function FormInput(props) {
//     return (<div className="mb-3 col-md-6">
//         <label className="htmlForm-label">{props.title}</label>
//         <input
//             type={props.type}
//             className={`form-control ${props.inputClass}`}
//             aria-describedby=""
//             ref={props.inputRef}
//         />
//     </div>
//     );
// }

export default FormInput;