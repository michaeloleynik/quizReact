import React from 'react';
import classes from './Input.module.css';

const Input = props => {
    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const inputCls = [classes.Input__input];

    function isInvalid ({valid, touched, shouldValidate}) {
        return !valid && touched && shouldValidate;
    }

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <>
            <label className={cls.join(' ')}>
                <span>{props.label}</span>
                
                <input 
                    className={inputCls.join(' ')} 
                    type={inputType} 
                    value={props.value}
                    onChange={props.onChange}
                    required
                />
            </label>
        </>
    )
}

export default Input;