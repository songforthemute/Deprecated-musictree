import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul className="nav">
                <li>
                    <Link to="/" className="nav__homeBtn">
                        <span className="material-symbols-outlined">home</span>
                        <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/search" className="nav__searchBtn">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span>Search</span>
                    </Link>
                </li>
                <li>
                    <Link to="/chart" className="nav__chartBtn">
                        <span className="material-symbols-outlined">
                            bar_chart
                        </span>
                        <span>Chart</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
