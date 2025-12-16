import { useState, useEffect } from "react";
import "../css/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table } from "reactstrap";
import { tokenAtom, userAtom } from "../../atoms";
import { useAtom, useAtomValue } from "jotai";
import { baseUrl, myAxios } from "../../config";

export default function AdminUserList() {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    // 활동 상태
    const [defaultState, setDefaultState] = useState(1);
    // 속성명
    const [defaultColumn, setDefaultColumn] = useState(1);
    // 검색 키워드
    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [page, setPage] = useState(1);

    const [userList, setUserList] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // 검색창에 있는 text 가져오기

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
        setSearchKeyword("");
        setPage(1);
    };

    // 검색
    const keywordSearch = async () => {
        console.log("클릭");

        setSearchKeyword(keyword);
        // 검색버튼 클릭시 새 배열로 초기화
        setUserList([]);
        setPage(1);
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
    ];

    const handlePageClick = (pageNum) => {
        if (pageNum < 1 || pageNum > pageInfo.allPage) return;
        setPage(pageNum);
    };

    const search = () => {
        myAxios(token, setToken)
            .get(`${baseUrl}/ad/users?state=${defaultState}&column=${defaultColumn}&keyword=${searchKeyword}&page=${page}`)
            .then((res) => {
                console.log(res.data);
                setUserList(res.data.list);
                setPageInfo(res.data.pageInfo);
            });
    };

    useEffect(() => {
        if (!token) return;
        search();
    }, [token, page, defaultState, defaultColumn, searchKeyword]);

    return (
        <div className="admin-body-div">
            {/* <AdminSidebar /> */}
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
                        <select onChange={(e) => setDefaultColumn(e.target.value)} className="admin-userList-filter-select font-13" name="" id="">
                            <option value={1}>전체</option>
                            <option value={2}>회원명</option>
                            <option value={3}>닉네임</option>
                            <option value={4}>아이디</option>
                            <option value={5}>휴대전화</option>
                        </select>

                        {/* 검색 input */}
                        <div className="admin-userList-search-div">
                            <i className="bi bi-search"></i>
                            <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="font-12 admin-userList-search-input" placeholder="검색어를 입력해주세요" />
                        </div>

                        {/* 검색 버튼 */}
                        <button onClick={keywordSearch} className="admin-userList-search-button font-13 medium">
                            검색
                        </button>

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
                                    {userList.map((user) => (
                                        <tr key={user.username}>
                                            <td>
                                                <span className="font-14">{user.name}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.nickname}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.username}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.phone ? user.phone : "-"}</span>
                                            </td>
                                            <td>
                                                <span className="font-14">{user.createdAt}</span>
                                            </td>
                                            <td>
                                                <div className="user-state-badge">
                                                    {user.state === "ACTIVE" ? (
                                                        <div className="user-state-code-1">
                                                            <span className="font-12 medium">정상</span>
                                                        </div>
                                                    ) : user.stateCode === "SUSPENDED" ? (
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
                            {/* 페이지 버튼 */}
                            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0", gap: "5px" }}>
                                {/* 이전 버튼 */}
                                <button
                                    onClick={() => handlePageClick(pageInfo.curPage - 1)}
                                    disabled={pageInfo.curPage === 1}
                                    style={{
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        cursor: pageInfo.curPage === 1 ? "not-allowed" : "pointer",
                                        opacity: pageInfo.curPage === 1 ? 0.5 : 1,
                                        fontWeight: "bold",
                                        color: "#555",
                                    }}
                                >
                                    &lt;
                                </button>

                                {/* 페이지 번호 버튼 */}
                                {Array.from({ length: pageInfo.endPage - pageInfo.startPage + 1 }, (_, idx) => {
                                    const pageNum = pageInfo.startPage + idx;
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handlePageClick(pageNum)}
                                            style={{
                                                backgroundColor: pageInfo.curPage === pageNum ? "#FF5833" : "white",
                                                color: pageInfo.curPage === pageNum ? "white" : "#555",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                {/* 다음 버튼 */}
                                <button
                                    onClick={() => handlePageClick(pageInfo.curPage + 1)}
                                    disabled={pageInfo.curPage === pageInfo.allPage}
                                    style={{
                                        backgroundColor: "white",
                                        border: "none",
                                        padding: "8px 12px",
                                        borderRadius: "4px",
                                        cursor: pageInfo.curPage === pageInfo.allPage ? "not-allowed" : "pointer",
                                        opacity: pageInfo.curPage === pageInfo.allPage ? 0.5 : 1,
                                        fontWeight: "bold",
                                        color: "#555",
                                    }}
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
