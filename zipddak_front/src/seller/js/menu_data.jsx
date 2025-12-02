//메뉴 리스트
export const NAV_MENUS = [
    {
        key: "product",
        label: "상품관리",
        items: [
            { label: "상품 등록", icon: "bi bi-plus-square", href: "/productRegist" },
            { label: "상품 조회", icon: "bi bi-box2", href: "/productList" },
        ],
    },
    {
        key: "order",
        label: "주문관리",
        items: [
            { label: "주문 내역", icon: "bi bi-basket3", href: "/orderList" },
            { label: "배송 관리", icon: "bi bi-truck", href: "/shippingList" },
            { label: "반품 관리", icon: "bi bi-reply", href: "/returnList" },
            { label: "교환 관리", icon: "bi bi-repeat", href: "/exchangeList" },
        ],
    },
    {
        key: "settle",
        label: "정산관리",
        items: [
            { label: "매출 통계", icon: "bi bi-graph-up-arrow", href: "/salesStatistics" },
            { label: "정산 내역", icon: "bi bi-piggy-bank", href: "/settleList" },
        ],
    },
    {
        key: "consumer",
        label: "고객관리",
        items: [
            { label: "상품 문의", icon: "bi bi-chat-square-dots", href: "/pdInquireList" },
            { label: "일반 문의", icon: "bi bi-envelope-open", href: "/gnrInquireList" },
        ],
    },
    {
        key: "setting",
        label: "설정",
        items: [
            { label: "프로필 관리", icon: "bi bi-person-circle", href: "/myProfile" },
            { label: "내 정보 관리", icon: "bi bi-gear", href: "/myInfo" },
        ],
    },

    // 임시메뉴링크
    {
        key: "temp",
        label: "임시메뉴",
        items: [
            { label: "주문내역상세", icon: "bi bi-newspaper", href: "/orderDetail" },
            { label: "배송내역상세", icon: "bi bi-newspaper", href: "/shippingDetail" },
            { label: "반품내역상세", icon: "bi bi-newspaper", href: "/returnDetail" },
            { label: "교환내역상세", icon: "bi bi-newspaper", href: "/exchangeDetail" },
            { label: "정산내역상세", icon: "bi bi-newspaper", href: "/settleDetail" },
            { label: "1", icon: "bi bi-newspaper", href: "/inquires" },
            { label: "2", icon: "bi bi-newspaper", href: "/inquiryForm" },
        ],
    },
];

//
export function menu_data(menu, openMenu, toggleMenu, setOpenMenu) {
    const isOpen = openMenu === menu.key;
    // const isHover = hoverMenu === menu.key;

    return (
        <li
            className={`dropdown ${openMenu === menu.key ? "open" : ""}`}
            onClick={(e) => {
                e.stopPropagation();
                toggleMenu(menu.key);
            }}
            onMouseEnter={() => {
                if (openMenu !== menu.key && openMenu !== null) {
                    setOpenMenu(null); // 다른 메뉴 hover하면 기존 open 닫힘
                }
            }}
        >
            <span className="menu_label">
                {menu.label}
                <i className={`bi bi-chevron-down dropdown_icon ${isOpen ? "rotate" : ""}`}></i>
            </span>

            <ul className="dropdown_menu" onClick={(e) => e.stopPropagation()}>
                {menu.items.map((item, idx) => (
                    <li
                        className="dropdown_menu1"
                        key={idx}
                        onClick={() => setOpenMenu(null)} // 소메뉴 클릭하면 닫힘
                    >
                        <a href={item.href}>
                            <i className={item.icon}></i> {item.label}
                        </a>
                    </li>
                ))}
            </ul>
        </li>
    );
}
