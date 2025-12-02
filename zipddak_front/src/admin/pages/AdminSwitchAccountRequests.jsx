import { useState } from "react";
import "../../css/admin/AdminUserList.css";
import AdminSidebar from "./AdminNav";
import { Input, Table, Modal, ModalBody } from "reactstrap";

export default function AdminSwitchAccountRequests() {
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
            label: "대기",
        },
        {
            stateCode: 2,
            label: "거부",
        },
        {
            stateCode: 3,
            label: "승인",
        },
    ];

    const roleCode = [
        {
            roleCode: 1,
            label: "전문가",
        },
        {
            roleCode: 2,
            label: "자재판매업체",
        },
    ];

    const modalTest = {
        userNo: 1,
        userName: "홍길동",
        peopleCount: 5,
        major: "수리",
        userTel: "010-1234-1234",
        requestedAt: "2025-11-09",
        switchStateCode: 1,
        businessNumber: "123-12-12345",
        address: "서울시 금천구",
        bank: "국민",
        accountNum: "000000-00-000000",
    };

    const storeTest = {
        userNo: 1,
        storeName: "홍길동",
        tel: "010-1234-1234",
        homeLink: "https://",
        businessNumber: "123-12-12345",
        bank: "국민",
        accountNum: "000000-00-000000",
    };

    const testUser = [
        {
            userNo: 1,
            userName: "홍길동",
            peopleCount: 5,
            major: "수리",
            userTel: "010-1234-1234",
            requestedAt: "2025-11-09",
            switchStateCode: 1,
            businessNumber: "123-12-12345",
        },
        {
            userNo: 2,
            userName: "홍길동",
            peopleCount: 5,
            major: "수리",
            userTel: "010-1234-1234",
            requestedAt: "2025-11-09",
            switchStateCode: 2,
            businessNumber: "123-12-12345",
        },
        {
            userNo: 3,
            userName: "홍길동",
            peopleCount: 5,
            major: "수리",
            userTel: "010-1234-1234",
            requestedAt: "2025-11-09",
            switchStateCode: 3,
            businessNumber: "123-12-12345",
        },
    ];

    const testUser2 = [
        {
            requestNo: 1,
            storeName: "업체명",
            userName: "홍길동",
            hompageLink: "https://",
            userTel: "010-1234-1234",
            requestedAt: "2025-11-09",
            switchStateCode: 1,
            businessNumber: "123-12-12345",
        },
    ];

    // 컬럼 정의
    const columns =
        defaultRole === 1
            ? [
                  { label: "회원번호", key: "userNo" },
                  { label: "신청자", key: "userName" },
                  { label: "전화번호", key: "userTel" },
                  { label: "사업자 번호", key: "businessNumber" },
                  { label: "전문분야", key: "major" },
                  { label: "직원수", key: "peopleCount" },
                  { label: "신청일", key: "requestedAt" },
                  { label: "처리상태", key: "switchStateCode" },
              ]
            : [
                  { label: "신청번호", key: "requestNo" },
                  { label: "업체명", key: "storeName" },
                  { label: "대표자", key: "userName" },
                  { label: "전화번호", key: "userTel" },
                  { label: "사업자 번호", key: "businessNumber" },
                  { label: "홈페이지", key: "hompageLink" },
                  { label: "신청일", key: "requestedAt" },
                  { label: "처리상태", key: "switchStateCode" },
              ];

    const filterOptions =
        defaultRole === 1
            ? [
                  // 전문가
                  { value: "", label: "전체" },
                  { value: "userName", label: "신청자" },
                  { value: "userTel", label: "전화번호" },
                  { value: "businessNumber", label: "사업자 번호" },
              ]
            : [
                  // 자재판매업체
                  { value: "", label: "전체" },
                  { value: "storeName", label: "업체명" },
                  { value: "userName", label: "대표자" },
                  { value: "userTel", label: "전화번호" },
                  { value: "businessNumber", label: "사업자 번호" },
                  { value: "homepageLink", label: "홈페이지" },
              ];

    // 데이터 선택
    const users = defaultRole === 1 ? testUser : testUser2;

    const clearFilter = () => {
        setDefaultState(1);
        setDefaultColumn(1);
        setKeyword("");
    };

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    // const testUser = [];

    return (
        <div className="admin-body-div">
            <AdminSidebar />
            {/* 회원 관리 */}
            <div className="admin-userList-div">
                <div className="admin-userList-top-div">
                    <span className="font-18 medium">전환신청 / 입점신청</span>
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

                <div className="admin-middle-header admin-middle-filter">
                    {roleCode.map((role) => (
                        <button
                            onClick={() => setDefaultRole(role.roleCode)}
                            className={defaultRole === role.roleCode ? "admin-expert-select-major" : "admin-expert-default-major"}
                            key={role.roleCode}
                        >
                            {role.label}
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
                                    {users.map((user) => (
                                        <tr onClick={toggle} key={user.userNo}>
                                            {columns.map((col) =>
                                                col.key === "switchStateCode" ? (
                                                    <td key={col.key}>
                                                        <div className="user-state-badge">
                                                            {user[col.key] === 1 ? (
                                                                <div className="request-state-code-1">
                                                                    <span className="font-12 medium">대기</span>
                                                                </div>
                                                            ) : user[col.key] === 2 ? (
                                                                <div className="request-state-code-2">
                                                                    <span className="font-12 medium">거부</span>
                                                                </div>
                                                            ) : (
                                                                <div className="request-state-code-3">
                                                                    <span className="font-12 medium">승인</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <td key={col.key}>
                                                        <span className="font-14">{user[col.key]}</span>
                                                    </td>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Modal className="admin-custom-modal" style={{ width: "960px" }} isOpen={modal} toggle={toggle}>
                                <ModalBody>
                                    {defaultRole === 1 ? (
                                        <div className="admin-userList-switchId-modal">
                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">프로필</span>
                                                </div>
                                                <table className="admin-userList-switchId-modal-table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd admin-modal-firstTd">
                                                                <span className="font-14">활동명</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.userName}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">전문분야</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.major}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">제공서비스</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.userName}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">사업자 번호</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.businessNumber}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">활동지역</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.address}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">직원수</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.peopleCount}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">은행</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.bank}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">계좌번호</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{modalTest.accountNum}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">자격증</span>
                                                </div>
                                                <div className="admin-userList-switchId-modal-imgs-div">
                                                    <img src="/images/이미지테스트.png" className="admin-userList-switchId-modal-imgs" />
                                                    <img src="/images/이미지테스트.png" className="admin-userList-switchId-modal-imgs" />
                                                    <img src="/images/이미지테스트.png" className="admin-userList-switchId-modal-imgs" />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">전환 처리</span>
                                                </div>
                                                <table className="admin-userList-switchId-switch-table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">처리</span>
                                                            </td>
                                                            <td>
                                                                <div className="admin-userList-modal-radio-div">
                                                                    <div className="admin-userList-modal-radio-div-in">
                                                                        <input className="admin-userList-modal-radio" type="radio" name="switch" id="switch-ok" />
                                                                        <label htmlFor="switch-ok" className="font-14">
                                                                            전환 승인
                                                                        </label>
                                                                    </div>
                                                                    <div className="admin-userList-modal-radio-div-in">
                                                                        <input className="admin-userList-modal-radio" type="radio" name="switch" id="switch-no" />
                                                                        <label htmlFor="switch-no" className="font-14">
                                                                            반려
                                                                        </label>

                                                                        <input className="admin-userList-modal-reason-input font-14" type="text" placeholder="반려 사유를 작성해주세요" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="admin-userList-switchId-buttons">
                                                <button className="admin-userList-switchId-backBtn font-12 semibold">취소</button>
                                                <button className="admin-userList-switchId-endBtn font-12 semibold">처리 완료</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="admin-userList-switchId-modal">
                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">프로필</span>
                                                </div>
                                                <table className="admin-userList-switchId-modal-table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd admin-modal-firstTd">
                                                                <span className="font-14">업체명</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.storeName}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">전화번호</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.tel}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">사업자 번호</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.businessNumber}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">취급 품목</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.businessNumber}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">홈페이지</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.homeLink}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">은행</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.bank}</span>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">계좌번호</span>
                                                            </td>
                                                            <td>
                                                                <span className="font-14">{storeTest.accountNum}</span>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">사업자 등록증</span>
                                                </div>
                                                <div className="admin-userList-switchId-modal-imgs-div">
                                                    <img src="/images/이미지테스트.png" className="admin-userList-switchId-modal-imgs" />
                                                </div>
                                                <button className="admin-userList-switchId-modal-business-down font-14 semibold">다운로드</button>
                                            </div>

                                            <div>
                                                <div className="admin-userList-switchId-firstTd">
                                                    <span className="font-18 semibold">전환 처리</span>
                                                </div>
                                                <table className="admin-userList-switchId-switch-table">
                                                    <tbody>
                                                        <tr>
                                                            <td className="admin-userList-switchId-modal-table-trtd">
                                                                <span className="font-14">처리</span>
                                                            </td>
                                                            <td>
                                                                <div className="admin-userList-modal-radio-div">
                                                                    <div className="admin-userList-modal-radio-div-in">
                                                                        <input className="admin-userList-modal-radio" type="radio" name="switch" id="switch-ok" />
                                                                        <label htmlFor="switch-ok" className="font-14">
                                                                            전환 승인
                                                                        </label>
                                                                    </div>
                                                                    <div className="admin-userList-modal-radio-div-in">
                                                                        <input className="admin-userList-modal-radio" type="radio" name="switch" id="switch-no" />
                                                                        <label htmlFor="switch-no" className="font-14">
                                                                            반려
                                                                        </label>

                                                                        <input className="admin-userList-modal-reason-input font-14" type="text" placeholder="반려 사유를 작성해주세요" />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className="admin-userList-switchId-buttons">
                                                <button onClick={() => setModal(false)} className="admin-userList-switchId-backBtn font-12 semibold">
                                                    취소
                                                </button>
                                                <button className="admin-userList-switchId-endBtn font-12 semibold">처리 완료</button>
                                            </div>
                                        </div>
                                    )}
                                </ModalBody>
                            </Modal>

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
