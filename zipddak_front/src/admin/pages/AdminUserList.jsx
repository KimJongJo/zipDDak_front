import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";

export default function AdminUserList() {
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

    const clearFilter = () => {
        setDefaultState(1);
        setDefaultColumn(1);
        setKeyword("");
    };

    // const testUser = [];

    const testUser = [
        {
            userNo: 1,
            userName: "홍길동",
            userNickname: "홍동동",
            userId: "hong123@kosta.com",
            userTel: "010-1234-1234",
            createdAt: "2025-11-09",
            stateCode: 1,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
        },
        {
            userNo: 2,
            userName: "종길동",
            userNickname: "종종종",
            userId: "hong456@kosta.com",
            userTel: "010-5678-5678",
            createdAt: "2025-10-09",
            stateCode: 2,
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
                    <span className="font-15 medium">일반회원</span>
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
                        {/* 필터 select */}
                        <select className="admin-userList-filter-select font-13" name="" id="">
                            <option value="">전체</option>
                            <option value="">회원명</option>
                            <option value="">닉네임</option>
                            <option value="">아이디</option>
                            <option value="">휴대전화</option>
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
                                            <span className="font-14 medium">회원번호</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">회원명</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">닉네임</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">아이디</span>
                                        </td>
                                        <td>
                                            <span className="font-14 medium">휴대전화</span>
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
                                    {testUser.map((user) => (
                                        <tr key={user.userNo}>
                                            <td>
                                                <span className="font-14">{user.userNo}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.userName}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.userNickname}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.userId}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.userTel}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.createdAt}</span>
                                            </td>
                                            <td>
                                                <div className="user-state-badge">
                                                    {user.stateCode === 1 ? (
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
