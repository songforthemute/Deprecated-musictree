import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav>
            <ul className="nav">
                <li className="nav__logo">
                    <img alt="logo" src="#" />
                </li>
                <Link to="/">
                    <li className="nav__Btn">
                        <span className="material-symbols-outlined">home</span>
                        <span>Home</span>
                    </li>
                </Link>
                <Link to="/search">
                    <li className="nav__Btn">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <span>Search</span>
                    </li>
                </Link>
                <Link to="/chart">
                    <li className="nav__Btn">
                        <span className="material-symbols-outlined">
                            bar_chart
                        </span>
                        <span>Chart</span>
                    </li>
                </Link>
            </ul>
        </nav>
    );
};

export default Nav;
