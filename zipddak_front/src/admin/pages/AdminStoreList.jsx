import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";

export default function AdminStoreList() {
    // 전문 서비스
    const [defaultProductCode, setDefaultProductCode] = useState(1);

    // 활동 상태
    const [defaultState, setDefaultState] = useState(1);
    // 속성명
    const [defaultColumn, setDefaultColumn] = useState(1);
    // 검색 키워드
    const [keyword, setKeyword] = useState("");

    const userState = [
        {
            stateCode: 1,
            label: "전체",
        },
        {
            stateCode: 2,
            label: "정상",
        },
        {
            stateCode: 3,
            label: "활동정지",
        },
        {
            stateCode: 4,
            label: "탈퇴",
        },
    ];

    const userColumn = [
        {
            columnCode: 1,
            label: "all",
        },
        {
            columnCode: 2,
            label: "name",
        },
        {
            columnCode: 3,
            label: "nickname",
        },
        {
            columnCode: 4,
            label: "username",
        },
        {
            columnCode: 5,
            label: "tel",
        },
    ];

    const productCode = [
        {
            productCode: 1,
            label: "전체",
        },
        {
            productCode: 2,
            label: "주방",
        },
        {
            productCode: 3,
            label: "욕실",
        },
        {
            productCode: 4,
            label: "중문/도어",
        },
        {
            productCode: 5,
            label: "폴딩도어",
        },
        {
            productCode: 6,
            label: "벽지/장판/마루",
        },
        {
            productCode: 7,
            label: "타일",
        },
        {
            productCode: 8,
            label: "시트/필름",
        },
        {
            productCode: 9,
            label: "스위치/콘센트",
        },
        {
            productCode: 10,
            label: "커튼블라인드",
        },
        {
            productCode: 11,
            label: "페인트",
        },
        {
            productCode: 12,
            label: "조명",
        },
    ];

    const clearFilter = () => {
        setDefaultState(1);
        setDefaultColumn(1);
        setKeyword("");
    };

    // const testUser = [];

    const testUser = [
        {
            storeNo: 1,
            storeName: "홍길동",
            managerName: "hong123@kosta.com",
            reportCount: 0,
            storeTel: "010-1234-1234",
            createdAt: "2025-11-09",
            stateCode: 1,
        },
    ];

    return (
        <div className="admin-body-div">
            <AdminSidebar />
            {/* 회원 관리 */}
            <div className="admin-userList-div">
                <div className="admin-userList-top-div">
                    <span className="font-18 medium">회원관리</span>
                    <div className="admin-userList-top-div-right">
                        <div className="admin-user-count-card">
                            <span className="font-14 medium">일반회원</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-14 medium">
                                90
                                <span className="font-14 medium">
                                    (5<i className="bi bi-arrow-up"></i>)
                                </span>
                            </span>
                        </div>

                        <div className="admin-user-count-card">
                            <span className="font-14 medium">전문가</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-14 medium">
                                90
                                <span className="font-14 medium">
                                    (5<i className="bi bi-arrow-up"></i>)
                                </span>
                            </span>
                        </div>

                        <div className="admin-user-count-card">
                            <span className="font-14 medium">판매업체</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-14 medium">
                                90
                                <span className="font-14 medium">
                                    (5<i className="bi bi-arrow-up"></i>)
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* 중 헤더 */}
                <div className="admin-middle-header">
                    <span className="font-15 medium">자재판매업체</span>
                </div>

                <div className="admin-middle-header-store admin-middle-store-filter">
                    {productCode.map((product) => (
                        <button
                            onClick={() => setDefaultProductCode(product.productCode)}
                            className={defaultProductCode === product.productCode ? "admin-expert-select-major store-product-type" : "admin-expert-default-major store-product-type"}
                            key={product.productCode}
                        >
                            {product.label}
                        </button>
                    ))}
                </div>

                {/* 검색 필터 라인 */}
                <div className="admin-filter-line-div">
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

                    {/* 우측 검색 필터 */}
                    <div className="admin-userList-filter-right">
                        {/* 검색 input */}
                        <div className="admin-userList-search-div">
                            <i className="bi bi-search"></i>
                            <Input onChange={(e) => setKeyword(e.target.value)} className="font-12 admin-userList-search-input" placeholder="검색어를 입력해주세요" />
                        </div>

                        {/* 검색 버튼 */}
                        <button className="admin-userList-search-button font-13 medium">검색</button>

                        {/* 초기화 버튼 */}
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
                                        <td>
                                            <span className="font-14 medium">업체번호</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">업체명</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">대표자 이름</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">누적 신고 수</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">업체 전화번호</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">가입일</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">활동상태</span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testUser.map((store) => (
                                        <tr key={store.storeNo}>
                                            <td>
                                                <span className="font-14">{store.storeNo}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{store.storeName}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{store.managerName}</span>
                                            </td>

                                            <td>
                                                <span className="font-14">{store.reportCount}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{store.storeTel}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{store.createdAt}</span>
                                            </td>
                                            <td>
                                                <div className="user-state-badge">
                                                    {store.stateCode === 1 ? (
                                                        <div className="user-state-code-1">
                                                            <span className="font-12 medium">정상</span>
                                                        </div>
                                                    ) : user.stateCode === 2 ? (
                                                        <div className="user-state-code-2">
                                                            <span className="font-12 medium">활동정지</span>
                                                        </div>
                                                    ) : (
                                                        <div className="user-state-code-3">
                                                            <span className="font-12 medium">탈퇴</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
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
