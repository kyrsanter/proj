import React, {FC} from "react";
import './header.css';
import HeaderNav from "../header-nav/header-nav";
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <header className="main-header">
            <div className="container">
                <div className="row">
                    <div className="col-xl-2">
                        <div className="header_logo">
                            <Link to='/'>Logo</Link>
                        </div>
                    </div>
                    <div className="col-xl-10 text-right">
                        <div className="header_nav">
                            <HeaderNav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
};

export default Header;