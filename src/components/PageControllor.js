import React from "react";

const PageController = ({ page, setPage, lastPage }) => {
    // 페이지 하단 컨트롤러 네비게이터
    const onClickNext = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage((page) => page + 1);
    };

    const onClickBefore = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage((page) => page - 1);
    };

    const onClickFirst = () => {
        if (page === 1) {
            alert("첫 페이지입니다.");
            return;
        }
        setPage(1);
    };

    const onClickLast = () => {
        if (page === lastPage) {
            alert("마지막 페이지입니다.");
            return;
        }
        setPage(lastPage);
    };

    return (
        <nav className="pageControllor">
            <ul className="pageControllor__ul">
                <li onClick={onClickFirst} className="pageControllor__btn">
                    <span className="material-symbols-outlined">
                        keyboard_double_arrow_left
                    </span>
                </li>
                <li onClick={onClickBefore} className="pageControllor__btn">
                    <span className="material-symbols-outlined">
                        navigate_before
                    </span>
                </li>
                <li>
                    <span className="pageControllor__pages">
                        {page} of {lastPage}
                    </span>
                </li>
                <li onClick={onClickNext} className="pageControllor__btn">
                    <span className="material-symbols-outlined">
                        navigate_next
                    </span>
                </li>
                <li onClick={onClickLast} className="pageControllor__btn">
                    <span className="material-symbols-outlined">
                        keyboard_double_arrow_right
                    </span>
                </li>
            </ul>
        </nav>
    );
};

export default PageController;
