import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";

export default function AdminSalesHistory() {
    // 전문 서비스
    const [defaultRole, setDefaultRole] = useState(1);

    // 활동 상태
    const [defaultState, setDefaultState] = useState(1);
    // 속성명
    const [defaultColumn, setDefaultColumn] = useState(1);
    // 검색 키워드
    const [keyword, setKeyword] = useState("");

    const userState = [
        {
            stateCode: 1,
            label: "배송완료",
        },
        {
            stateCode: 2,
            label: "배송중",
        },
        {
            stateCode: 3,
            label: "상품준비중",
        },
        {
            stateCode: 4,
            label: "취소완료",
        },
        {
            stateCode: 5,
            label: "교환완료",
        },
        {
            stateCode: 6,
            label: "반품완료",
        },
    ];

    const testUser = [
        {
            orderNo: 1,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 1,
            productCount: 2,
        },
        {
            orderNo: 2,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 2,
            productCount: 2,
        },
        {
            orderNo: 3,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 3,
            productCount: 2,
        },
        {
            orderNo: 4,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 4,
            productCount: 2,
        },
        {
            orderNo: 5,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 5,
            productCount: 2,
        },
        {
            orderNo: 6,
            storeName: "업체이름",
            productName: "상품명",
            buyerName: "홍길동",
            totalAmount: 200000,
            orderDate: "2025-11-09",
            orderStatus: 6,
            productCount: 2,
        },
    ];

    // 컬럼 정의
    const columns = [
        { label: "주문번호", key: "orderNo" },
        { label: "업체명", key: "storeName" },
        { label: "상품명", key: "productName" },
        { label: "구매자", key: "buyerName" },
        { label: "금액", key: "totalAmount" },
        { label: "구매날짜", key: "orderDate" },
        { label: "주문상태", key: "orderStatus" },
    ];

    const filterOptions = [
        // 전문가
        { value: "", label: "전체" },
        { value: "storeName", label: "업체명" },
        { value: "productName", label: "상품명" },
        { value: "buyerName", label: "구매자" },
    ];

    const clearFilter = () => {
        setDefaultState(1);
        setDefaultColumn(1);
        setKeyword("");
    };

    // const testUser = [];

    return (
        <div className="admin-body-div">
            <AdminSidebar />
            {/* 회원 관리 */}
            <div className="admin-userList-div">
                <div className="admin-userList-top-div">
                    <span className="font-18 medium">이용 내역</span>
                    <div className="admin-userList-top-div-right">
                        <div className="admin-rental-count-card">
                            <span className="font-13 medium">오늘 판매 수 / 이번달 판매 수</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-13 medium">
                                <span>15</span>건 / <span>30</span>건
                            </span>
                        </div>
                    </div>
                </div>

                <div className="admin-middle-header admin-middle-filter">
                    <span className="font-15 medium">자재판매</span>
                </div>

                {/* 검색 필터 라인 */}
                <div className="admin-filter-sales-line-div">
                    <div className="admin-filter-sales-line-first-div">
                        {/* 활동 상태 */}
                        <div className="admin-userList-radio-div">
                            {userState.map((state) => (
                                <div key={state.stateCode} className="admin-radio-div">
                                    <input
                                        className="admin-radio"
                                        onChange={() => setDefaultState(state.stateCode)}
                                        checked={defaultState === state.stateCode}
                                        type="radio"
                                        name="userState"
                                        id={state.stateCode}
                                    />
                                    <label style={{ marginLeft: "5px", display: "flex", alignItems: "center" }} htmlFor={state.stateCode}>
                                        <span className="font-14">{state.label}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="admin-filter-line-div-top">
                            <Input className="admin-filter-input-date font-13" type="date" />
                            <span className="font-22 medium">~</span>
                            <Input className="admin-filter-input-date font-13" type="date" />
                        </div>
                    </div>

                    {/* 우측 검색 필터 */}
                    <div className="admin-sales-filter-right">
                        <select className="admin-userList-filter-select font-13" value={defaultColumn} onChange={(e) => setDefaultColumn(e.target.value)}>
                            {filterOptions.map((opt, idx) => (
                                <option key={idx} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        <div className="admin-userList-search-div">
                            <i className="bi bi-search"></i>
                            <Input onChange={(e) => setKeyword(e.target.value)} className="font-12 admin-userList-search-input" placeholder="검색어를 입력해주세요" />
                        </div>

                        <button className="admin-userList-search-button font-13 medium">검색</button>
                        <button onClick={clearFilter} className="admin-userList-clean-button font-13 medium">
                            초기화
                        </button>
                    </div>
                </div>

                <div>
                    {testUser.length === 0 ? (
                        <div
                            style={{
                                height: "45px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderBottom: "1px solid #eaecf0",
                            }}
                        >
                            <span className="font-12 medium">회원 정보를 검색해주세요.</span>
                        </div>
                    ) : (
                        <div className="admin-userList-table-div">
                            <Table hover className="admin-userList-table">
                                <thead>
                                    <tr>
                                        {columns.map((col) => (
                                            <td key={col.key}>
                                                <span className="font-14 medium">{col.label}</span>
                                            </td>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {testUser.map((sales) => (
                                        <tr key={sales.orderNo}>
                                            {columns.map((col) =>
                                                col.key === "orderStatus" ? (
                                                    <td key={col.key}>
                                                        <div className="user-state-badge">
                                                            {sales[col.key] === 1 ? (
                                                                <div className="sales-state-code-1">
                                                                    <span className="font-12 medium">배송완료</span>
                                                                </div>
                                                            ) : sales[col.key] === 2 ? (
                                                                <div className="sales-state-code-2">
                                                                    <span className="font-12 medium">배송중</span>
                                                                </div>
                                                            ) : sales[col.key] === 3 ? (
                                                                <div className="sales-state-code-3">
                                                                    <span className="font-12 medium">상품준비중</span>
                                                                </div>
                                                            ) : sales[col.key] === 4 ? (
                                                                <div className="sales-state-code-4">
                                                                    <span className="font-12 medium">취소완료</span>
                                                                </div>
                                                            ) : sales[col.key] === 5 ? (
                                                                <div className="sales-state-code-5">
                                                                    <span className="font-12 medium">교환완료</span>
                                                                </div>
                                                            ) : (
                                                                <div className="sales-state-code-6">
                                                                    <span className="font-12 medium">반품완료</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                ) : col.key === "totalAmount" ? (
                                                    <td key={col.key}>
                                                        <span className="font-14">{sales[col.key].toLocaleString()}원</span>
                                                    </td>
                                                ) : col.key === "productName" ? (
                                                    sales.productCount === 1 ? (
                                                        <td key={col.key}>
                                                            <span className="font-14">{sales[col.key]}</span>
                                                        </td>
                                                    ) : (
                                                        <td key={col.key}>
                                                            <span className="font-14">
                                                                {sales[col.key]} 외 {sales.productCount - 1}건
                                                            </span>
                                                        </td>
                                                    )
                                                ) : (
                                                    <td key={col.key}>
                                                        <span className="font-14">{sales[col.key]}</span>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            {/* 페이징 div */}
                            <div className="admin-userList-paging-bar">
                                {/* 이전 버튼 */}
                                <button className="admin-userList-nextbutton">
                                    <i className="bi bi-chevron-left"></i>
                                    <span>이전</span>
                                </button>

                                {/* 페이지 가져와서 map 돌리기 */}
                                <div className="admin-userList-paging-button-div">
                                    <button className="admin-userList-paging-curpage-button">1</button>
                                    <button className="admin-userList-paging-button">2</button>
                                    <button className="admin-userList-paging-button">3</button>
                                </div>

                                <button className="admin-userList-nextbutton">
                                    <span>다음</span>
                                    <i className="bi bi-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
