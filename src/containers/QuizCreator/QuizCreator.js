import React from 'react';
import classes from './QuizCreator.module.css';
import {createControl, validate, validateForm} from '../../form/FormFramework';
import Input from '../../components/UI/input/Input';
import Select from '../../components/UI/select/Select';
import {connect} from 'react-redux';
import {finishCreateQuiz, createQuizQuestion} from '../../store/actions/create';

function createOptionControl(number) {
    return createControl(
        {label: `Variant ${number}`, id: number},
        {required: true}
    );
}

function createFormControls() {
    return {
        question: createControl(
            {label: 'Input a question'},
            {required: true}
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends React.Component {
    state = {
        isFormValid: false,
        rightAnswer: 1,
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault();
    }

    addQuestionHandler = e => {
        e.preventDefault();

        const {question, option1, option2, option3, option4} = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswer: this.state.rightAnswer,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ] 
        }

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswer: 1,
            formControls: createFormControls()
        });
    }

    createQuizHandler = e => {
        e.preventDefault();
            
        this.setState({
            isFormValid: false,
            rightAnswer: 1,
            formControls: createFormControls()
        });

        this.props.finishCreateQuiz();

    }

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({ formControls, isFormValid: validateForm(formControls) });
    }

    onSelectChangeHandler = e => {
        this.setState({
            rightAnswer: +e.target.value
        });
    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, idx) => {
            const control = this.state.formControls[controlName];

            return (
                <Input
                    key={idx} 
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    onChange={e => this.onChangeHandler(e.target.value, controlName)}
                />
            )
        });
    }

    render () {
        const select = <Select
            label='Select the right answer!'
            value={this.state.rightAnswer}
            onChange={this.onSelectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}    
        />
        return (
            <div className={classes.QuizCreator}>
                <div className={classes.QuizCreator__formDiv}>
                    <h1 className={classes.QuizCreator__title}>QuizCreator</h1>

                    <form
                        className={classes.QuizCreator__form}
                        onSubmit={this.submitHandler}
                    >
                        {this.renderControls()}

                        {select}

                        <div className={classes.QuizCreator__btnBlock}>
                            <button 
                                className={classes.QuizCreator__btn}
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Add a question
                            </button>

                            <button 
                                className={classes.QuizCreator__btn}
                                onClick={this.createQuizHandler}
                                disabled={this.props.quiz.length === 0}
                            >
                                Create a quiz
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);