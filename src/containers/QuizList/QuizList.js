import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './QuizList.module.css';
import Loader from '../../components/UI/loader/Loader';
import {connect} from 'react-redux';
import {fetchQuizes} from '../../store/actions/quiz';

class QuizList extends Component {
    renderQuizes () {
        if (this.props.isAuth) {
            return this.props.quizes.map(item => {
                return (
                    <li 
                        key={item.id}
                        className={classes.QuizList__listLi}
                    >
                        <NavLink 
                            to={'/quiz/' + item.id}
                            className={classes.QuizList__listLink}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                );
            });
        } else {
            return (
                <li className={classes.QuizList__listLi}>
                    <NavLink 
                        to='/auth'
                        className={classes.QuizList__listLink}
                    >
                        You should to login!
                    </NavLink>
                </li>
            )
        }   
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render () {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1 style={{'textAlign': 'center'}}>QuizList</h1>

                    {this.props.loading && this.props.quizes.length !== 0
                      ? <Loader />
                      : <ul className={classes.QuizList__list}>
                            {this.renderQuizes()}
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading,
        isAuth: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);