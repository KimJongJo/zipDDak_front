import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Pagination, PaginationItem, PaginationLink, Input } from "reactstrap";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";
import { useNavigate, useSearchParams } from "react-router";

export default function MyWorks() {
    const [works, setWorks] = useState([]);
    const [selectDate, setSelectDate] = useState({
        startDate: null,
        endDate: null,
    });

    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        allPage: 0,
        curPage: 1,
        endPage: 0,
        startPage: 1,
    });

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;

    const user = useAtomValue(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    // 작업 목록 조회
    const getWorks = (page, startDate, endDate) => {
        myAxios(token, setToken)
            .get("http://localhost:8080" + `/matching/userList?username=${user.username}&page=${page}&startDate=${startDate}&endDate=${endDate}`)
            .then((res) => {
                console.log(res.data.matchingList);
                setWorks(res.data.matchingList);
                return res.data.pageInfo;
            })
            .then((pageData) => {
                setPageInfo(pageData);
                let pageBtns = [];
                for (let i = pageData.startPage; i <= pageData.endPage; i++) {
                    pageBtns.push(i);
                }
                setPageBtn([...pageBtns]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // 작업상태 매핑
    const WORK_STATUS_LABEL = {
        PAYMENT_COMPLETED: "결제 완료",
        IN_PROGRESS: "작업 중",
        COMPLETED: "작업 완료",
        CANCELLED: "취소",
    };

    useEffect(() => {
        if (!user) return;

        getWorks(pageFromUrl, selectDate.startDate, selectDate.endDate);
    }, [pageFromUrl, user]);

    return (
        <div className="mypage-layout">
            <h1 className="mypage-title">시공 · 수리 내역</h1>
            <div>
                {/* 날짜 선택 */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        margin: "0 0 14px 0",
                    }}
                >
                    <Input
                        type="date"
                        bsSize="sm"
                        style={{ width: "140px", height: "32px" }}
                        onChange={(e) => {
                            setSelectDate({ ...selectDate, startDate: e.target.value });
                            setWorks([]);
                            getWorks(pageInfo.curPage, "", e.target.value, selectDate.endDate);
                        }}
                    ></Input>{" "}
                    -{" "}
                    <Input
                        type="date"
                        bsSize="sm"
                        style={{ width: "140px", height: "32px" }}
                        onChange={(e) => {
                            setSelectDate({ ...selectDate, endDate: e.target.value });
                            setWorks([]);
                            getWorks(pageInfo.curPage, "", selectDate.startDate, e.target.value);
                        }}
                    ></Input>
                </div>

                <table className="mypage-table">
                    <thead>
                        <tr>
                            <td>작업정보</td>
                            <td width="120px">전문가명</td>
                            <td width="140px">계약일자</td>
                            <td width="140px">작업일자</td>
                            <td width="140px">결제금액</td>
                            <td width="130px">작업상태</td>
                        </tr>
                    </thead>
                    <tbody>
                        {works.map((work) =>
                            work.status != "PAYMENT_CANCELLED" ? (
                                <tr
                                    key={work.matchingIdx}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        navigate(`/zipddak/mypage/expert/works/detail/${work.matchingIdx}?page=${pageInfo.curPage}`);
                                    }}
                                >
                                    <td style={{ textAlign: "left", fontSize: "13px" }}>
                                        <p style={{ fontWeight: "600", fontSize: "14px" }}>{work.categoryName}</p>
                                        <p style={{ margin: "6px 0" }}>{work.location}</p>
                                        <p>
                                            {work.budget?.toLocaleString()}원 · {work.preferredDate}
                                        </p>
                                    </td>
                                    <td>{work.activityName}</td>
                                    <td
                                        style={{
                                            fontWeight: "500",
                                        }}
                                    >
                                        {work.createdAt}
                                    </td>
                                    <td
                                        style={{
                                            fontWeight: "500",
                                        }}
                                    >
                                        <p>{work.workStartDate}</p>-<p>{work.workEndDate}</p>
                                    </td>
                                    <td
                                        style={{
                                            fontWeight: "500",
                                        }}
                                    >
                                        {Number(work.totalAmount).toLocaleString()}원
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                gap: "6px",
                                            }}
                                        >
                                            <span style={{ fontSize: "16px", fontWeight: "700" }}>{WORK_STATUS_LABEL[work.status]}</span>
                                            {work.status === "COMPLETED" && (
                                                <button
                                                    className="primary-button"
                                                    style={{
                                                        width: "68px",
                                                        height: "33px",
                                                    }}
                                                    onClick={() => {}}
                                                >
                                                    후기작성
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <></>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination className="my-pagination">
                {pageBtn.map((b) => (
                    <PaginationItem key={b} active={b === pageInfo.curPage}>
                        <PaginationLink
                            onClick={() => {
                                setWorks([]);
                                getWorks(b, selectDate.startDate, selectDate.endDate);
                            }}
                        >
                            {b}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </Pagination>
        </div>
    );
}
