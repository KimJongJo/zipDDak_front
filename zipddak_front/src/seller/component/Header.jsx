import { menu_data, NAV_MENUS } from "../js/menu_data.jsx";
import { useState, useRef, useEffect } from "react";

const Header = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const [hoverMenu, setHoverMenu] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = (key) => {
        setOpenMenu((prev) => (prev === key ? null : key));
        setHoverMenu(null); // 클릭 시 hover 상태는 무시
    };

    // Hover 상태
    // const handleMouseEnter = (key) => {
    //     if (!openMenu) setHoverMenu(key); // 클릭으로 고정된 상태가 아니면 hover 작동
    // };
    // const handleMouseLeave = () => {
    //     if (!openMenu) setHoverMenu(null);
    // };

    // 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenu(null);
                setHoverMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="header">
                <div className="header_logo">
                    <img src="/logo.png" />
                </div>

                <nav className="nav_menu" ref={menuRef}>
                    <ul className="large_menu">
                        <li className="large_menu1">
                            <a href="/seller/mainhome">
                                <i className="bi bi-house-door"></i>Home
                            </a>
                        </li>
                        {NAV_MENUS.map((menu) => menu_data(menu, openMenu, toggleMenu, setOpenMenu))}
                    </ul>
                </nav>

                <div className="user_info">
                    <div className="alarm_icon">
                        <i className="bi bi-bell pointer"></i>
                    </div>
                    <div className="user_icon pointer">
                        <img src="/userIcon.svg" />
                        <i className="bi bi-chevron-down"></i>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
