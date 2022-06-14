import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul className="nav">
                <li>
                    <Link to="/" className="nav__homeBtn">
                        <span className="material-icons-outlined">home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/search" className="nav__searchBtn">
                        <span className="material-icons-outlined">search</span>
                    </Link>
                </li>
                <li>
                    <Link to="/chart" className="nav__chartBtn">
                        <span className="material-icons-outlined">
                            bar_chart
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
