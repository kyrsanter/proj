import React, {FC} from "react";
import './header-nav.css';
import {NavLink} from "react-router-dom";

const HeaderNav: FC = () => {
    return (
        <nav className="header-nav">
            <ul className="nav-list d-flex">
                <li className="nav-list_item">
                    <NavLink activeClassName='active' to="/login/signin">Sign in</NavLink>
                </li>
                <li className="nav-list_item">
                    <NavLink activeClassName='active' to="/login/signup">Sign up</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderNav;