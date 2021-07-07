import React, {Component} from 'react';
import classes from './Layout.module.css';
import ToggleMenu from '../../components/navigation/toggleMenu/ToggleMenu';
import Drawer from '../../components/navigation/drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        menu: false
    }

    onToggleClickHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    onCloseClickHandler = () => {
        this.setState({
            menu: false
        })
    }

    render() {
        return (
            <div className={classes.Layout}>
                <Drawer 
                    isOpen={this.state.menu}
                    onClose={this.onCloseClickHandler}
                    isAuth={this.props.isAuth}
                />

                <ToggleMenu 
                    onToggle={this.onToggleClickHandler}
                    isOpen={this.state.menu}
                />

                <main className={classes.Layout__main}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);