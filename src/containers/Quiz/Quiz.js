import React, {Component} from 'react';
import classes from './Quiz.module.css';

import ActiveQuiz from '../../components/activeQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/loader/Loader';

import {connect} from 'react-redux';
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz';

class Quiz extends Component {

    componentDidMount() {
       this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz();
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.Quiz__wrapper}>
                    <h1 className={classes.Quiz__title}>Answer the all questions</h1>

                    {
                        this.props.loading || !this.props.quiz
                        ? <Loader/>

                        : this.props.isFinished

                        ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            onRetry={this.props.retryQuiz}
                        /> 

                        : <ActiveQuiz
                            question={this.props.quiz[this.props.activeQuestion].question}
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            onAnswerClick={this.props.quizAnswerClick}
                            quizLength={this.props.quiz.length}
                            questionNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                         /> 
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading,
        // isAuth: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);