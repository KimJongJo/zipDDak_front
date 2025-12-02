import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";

export default function AdminRentalRecords() {
    // 전문 서비스
    const [defaultMajor, setDefaultMajor] = useState(1);

    // 활동 상태
    const [defaultState, setDefaultState] = useState(1);
    // 속성명
    const [defaultColumn, setDefaultColumn] = useState(1);
    // 검색 키워드
    const [keyword, setKeyword] = useState("");

    const userState = [
        {
            stateCode: 1,
            label: "대여중",
        },
        {
            stateCode: 2,
            label: "반납완료",
        },
        {
            stateCode: 3,
            label: "대여취소",
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
            rentalNo: 1,
            productName: "공구 이름",
            provider: "홍길동", // 빌려준 사람
            renter: "홍길동", // 빌린 사람
            rentalDate: "2025-11-30",
            returnDate: "2025-11-30",
            rentalStateCode: 1,
        },
        {
            rentalNo: 1,
            productName: "공구 이름",
            provider: "홍길동", // 빌려준 사람
            renter: "홍길동", // 빌린 사람
            rentalDate: "2025-11-30",
            returnDate: "2025-11-30",
            rentalStateCode: 2,
        },
        {
            rentalNo: 1,
            productName: "공구 이름",
            provider: "홍길동", // 빌려준 사람
            renter: "홍길동", // 빌린 사람
            rentalDate: "2025-11-30",
            returnDate: "2025-11-30",
            rentalStateCode: 3,
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
                        <div className="admin-rental-count-card">
                            <span className="font-13 medium">오늘 대여 수 / 이번달 대여 수</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-13 medium">
                                <span>15</span>건 / <span>30</span>건
                            </span>
                        </div>
                    </div>
                </div>

                {/* 중 헤더 */}
                <div className="admin-middle-header">
                    <span className="font-15 medium">대여내역</span>
                </div>

                {/* 검색 필터 라인 */}
                <div className="admin-filter-line-div-rental">
                    <div className="admin-filter-line-div-top">
                        <Input className="admin-filter-input-date font-13" type="date" />
                        <span className="font-22 medium">~</span>
                        <Input className="admin-filter-input-date font-13" type="date" />
                    </div>
                    <div className="admin-filter-line-div-under">
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
                            {/* 필터 select */}
                            <select className="admin-userList-filter-select font-13" name="" id="">
                                <option value="">전체</option>
                                <option value="">공구명</option>
                                <option value="">빌려준 사람</option>
                                <option value="">빌린 사람</option>
                            </select>

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
                                            <span className="font-14 medium">대여번호</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">공구명</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">빌려준 사람</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">빌린 사람</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">대여날짜</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">반납날짜</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">대여상태</span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testUser.map((rental) => (
                                        <tr key={rental.rentalNo}>
                                            <td>
                                                <span className="font-14">{rental.rentalNo}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{rental.productName}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{rental.provider}</span>
                                            </td>

                                            <td>
                                                <span className="font-14">{rental.renter}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{rental.rentalDate}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{rental.returnDate}</span>
                                            </td>
                                            <td>
                                                <div className="user-state-badge">
                                                    {rental.rentalStateCode === 1 ? (
                                                        <div className="rental-state-code-1">
                                                            <span className="font-12 medium">반납완료</span>
                                                        </div>
                                                    ) : rental.rentalStateCode === 2 ? (
                                                        <div className="rental-state-code-2">
                                                            <span className="font-12 medium">대여취소</span>
                                                        </div>
                                                    ) : (
                                                        <div className="rental-state-code-3">
                                                            <span className="font-12 medium">대여중</span>
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
