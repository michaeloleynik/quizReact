import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/backdrop/Backdrop';

class Drawer extends Component {
    clickHandler = () => {
        return this.props.onClose;
    }

    linkDrawer(links) {
        return links.map((link, idx) => {
            return (
                <li 
                    key={idx}
                    className={classes.Drawer__listLi}
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact} 
                        className={classes.Drawer__listLiLink}
                        activeClassName={classes.active}
                        onClick={this.clickHandler()}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        });
    }
    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close);
        }

        const links = [
            {to: '/', label: 'List', exact: true}
        ];

        if (this.props.isAuth) {
            links.push({to: '/quiz-creator', label: 'Create a test', exact: false});
            links.push({to: '/logout', label: 'Logout', exact: false});
        } else {
            links.push({to: '/auth', label: 'Auth', exact: false});
        }

        return (
            <>
                <nav className={cls.join(' ')}>
                    <ul className={classes.Drawer__list}>{this.linkDrawer(links)}</ul>
                </nav>

                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </>
        )
    }
}

export default Drawer;