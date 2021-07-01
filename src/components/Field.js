import React from 'react';

const Field = (props) => {
    let autofocus = false
    if(props.label==='Email'){
        autofocus = true;
    }
    return ( 
        <div className="form-group">
            <label htmlFor={props.name}>{props.label}</label><br />
            <input type={props.type} className="form-control" 
                    id={props.name} value={props.value} 
                    onChange={props.handleChange} name = {props.name} 
                    autoFocus={autofocus} required 
                    autoComplete={props.name} placeholder={props.label} />
            <div className="valid-feedback">
                Looks good!
            </div>
            <div className="invalid-feedback">
                Please provide a valid {props.label}
            </div>
        </div>
    );
}
 
export default Field;