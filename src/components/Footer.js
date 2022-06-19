import React, { useState } from "react";

const Footer = () => {
    const [faq, setFaq] = useState(false);

    // faq on & off 토글 파트
    const toggleFaq = () => {
        setFaq((prev) => !prev);
        if (!faq) onScrollBottom();
    };

    // faq 클릭시 새로고침
    const onRefresh = () => {
        window.location.reload();
    };

    // 맨 위로 스크롤 버튼
    const onScrollTop = () => {
        window.scrollTo(window.scrollX, 0);
    };

    // faq 토글 버튼
    const onScrollBottom = () => {
        window.scrollTo(window.scrollX, window.scrollY + 500);
    };

    return (
        <footer>
            <div className="footer__scrolltop" onClick={onScrollTop}>
                &uarr;
            </div>
            <div>
                <span>&copy; {new Date().getFullYear()} MusicTree </span>
                <a target="_blank" href="https://www.last.fm/">
                    powered by AudioScrobbler.
                </a>
            </div>
            <div className="footer__faq footer__faqBtn" onClick={toggleFaq}>
                FAQ | 느리거나 잘 작동하지 않아요.
            </div>
            {faq && (
                <div className="footer__faqContent">
                    <div className="footer__faqBtn" onClick={onRefresh}>
                        서버에 문제가 있거나, 트래픽 혹은 대역폭에 문제가 생겨
                        사진 로딩을 실패하거나, 느려질 수 있습니다. 여기를
                        누르시거나 페이지를 새로고침 후 다시 시도해주세요.
                    </div>
                    <div className="footer__faqBtn" onClick={toggleFaq}>
                        - 닫기 -
                    </div>
                </div>
            )}
            <a href={`mailto:${process.env.REACT_APP_CONTACT}`}>
                Contact | {process.env.REACT_APP_CONTACT}
            </a>
        </footer>
    );
};

export default Footer;
