import React from 'react';
import classes from './Select.module.css';

const Select = props => {
    return (
        <div className={classes.Select}>
            <label>
                <select
                    value={props.value}
                    onChange={props.onChange}
                    className={classes.Select} 
                >
                    {props.options.map((option, idx) => {
                        return (
                            <option
                                value={option.value}
                                key={idx}
                            >
                                {option.text}
                            </option>
                        )
                    })}
                </select>
            </label>
        </div>
    )
}

export default Select;