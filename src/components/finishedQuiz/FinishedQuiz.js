import React from 'react';
import {Link} from 'react-router-dom';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') total++

        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul className={classes.FinishedQuiz__list}>

                {props.quiz.map((quizItem, idx) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]],
                        classes.FinishedQuiz__icons
                    ]

                    return (
                        <li key={idx}>
                            <strong>{idx + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                }) }
            </ul>

            <p className={classes.FinishedQuiz__rightAnswersCounter}>Right answers {successCount}/{props.quiz.length}</p>

            <div className={classes.FinishedQuiz__btnBlock}>
                <button 
                    className={classes.FinishedQuiz__btn}
                    onClick={props.onRetry}
                >
                    Try again!
                </button>
            
                <Link to={'/'}>
                    <button className={classes.FinishedQuiz__btn}>
                        To Test List!
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;