import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";

export default function Membership() {
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
            label: "활성",
        },
        {
            stateCode: 2,
            label: "만료",
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
            membershipNo: 1,
            expertName: "홍길동",
            firstJoinDate: "2025-11-09",
            membershipDuration: 6,
            expirationDate: "2025-11-09",
            stateCode: 1,
        },
        {
            membershipNo: 2,
            expertName: "홍길동",
            firstJoinDate: "2025-11-09",
            membershipDuration: 6,
            expirationDate: "",
            stateCode: 2,
        },
    ];

    return (
        <div className="admin-body-div">
            <AdminSidebar />
            {/* 회원 관리 */}
            <div className="admin-userList-div">
                <div className="admin-userList-top-div">
                    <span className="font-18 medium">결제내역</span>
                    <div className="admin-userList-top-div-right">
                        <div className="admin-rental-count-card">
                            <span className="font-13 medium">신규 가입 수 / 총 가입자 수</span>

                            {/* 총 회원수 + 이번달 가입자 수 */}
                            <span className="font-13 medium">
                                <span>10</span>명 / <span>100</span>명
                            </span>
                        </div>
                    </div>
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
                                            <span className="font-14 medium">번호</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">전문가명</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">최초 가입일</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">총 가입기간</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">만료일</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">멤버십 상태</span>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testUser.map((membership) => (
                                        <tr key={membership.membershipNo}>
                                            <td>
                                                <span className="font-14">{membership.membershipNo}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{membership.expertName}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{membership.firstJoinDate}</span>
                                            </td>

                                            <td>
                                                <span className="font-14">{membership.membershipDuration}개월</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{membership.expirationDate !== "" ? membership.expirationDate : "-"}</span>
                                            </td>
                                            <td>
                                                <div className="user-state-badge">
                                                    {membership.stateCode === 1 ? (
                                                        <div className="membership-state-code-1">
                                                            <span className="font-12 medium">활성</span>
                                                        </div>
                                                    ) : (
                                                        <div className="membership-state-code-2">
                                                            <span className="font-12 medium">만료</span>
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
