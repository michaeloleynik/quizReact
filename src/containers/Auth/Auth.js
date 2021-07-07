import React from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/input/Input';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends React.Component {
    state = {
        isFormValid: false,

        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMsg: 'Error',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email:true
                }

            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMsg: 'Error',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    onLoginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value, 
            this.state.formControls.password.value, 
            true
        );
    }

    onRegisterHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );     
    }

    onFormHandler = e => {
        e.preventDefault();
    }

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if(validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid;
    }

    onChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;
        
        let isFormValid = true;
        
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid;
        });

        this.setState({ formControls, isFormValid });
    }

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = this.state.formControls[controlName];
            return (
                <Input 
                    key={controlName + idx}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMsg={control.errorMsg}
                    shouldValidate={true}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        });
    }

    render () {
        return (
            <div className={classes.Auth}> 
                <h1>Login</h1>

                <form onSubmit={this.onFormHandler} className={classes.Auth__form}>
                    <div className={classes.Auth__inputs}>
                        {this.renderInputs()}
                    </div>

                    <div className={classes.Auth__btns}>
                        <button
                            onClick={this.onLoginHandler}
                            className={classes.Auth__loginBtn} 
                            disabled={!this.state.isFormValid}
                        >
                            Login
                        </button>

                        <button 
                            onClick={this.onRegisterHandler} 
                            className={classes.Auth__regBtn} 
                            disabled={!this.state.isFormValid}
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
  
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
    }
}

export default connect(null, mapDispatchToProps)(Auth);