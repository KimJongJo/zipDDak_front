//css
import table from "../css/table.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useNavigate } from "react-router-dom"; //페이지 이동
import { useState, useEffect, useRef } from "react";
import { myAxios } from "../../config/config.jsx";

export default function OrderList() {
    const pageTitle = usePageTitle("주문관리 > 주문 내역 리스트");
    const navigate = useNavigate();

    const [myOrderList, setMyOrderList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    // 필터 상태값
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [searchDate, setSearchDate] = useState("");

    // 주문 상태 체크박스 value 고정
    const ORDER_STATUS = ["상품준비중", "배송중", "배송완료", "교환", "환불", "취소"];

    // 주문 상태 체크박스 변경
    const onChangeStatus = (e) => {
        const value = e.target.value;
        const checked = e.target.checked;

        if (value === "all") {
            setSelectedStatus([]);
            return;
        }

        if (checked) {
            setSelectedStatus((prev) => [...prev, value]);
        } else {
            setSelectedStatus((prev) => prev.filter((v) => v !== value));
        }
    };

    // 검색/페이징 공통 함수
    const submit = (page = 1) => {
        const orderListUrl =
            `/seller/order/myOrderList` +
            `?sellerId=test` +
            `&page=${page - 1}` + // 스프링 PageRequest는 0부터 시작
            `&size=10` +
            `&keyword=${keyword}` +
            `&searchDate=${searchDate}` +
            `&stateList=${selectedStatus.join(",")}`;

        myAxios()
            .get(orderListUrl)
            .then((res) => {
                const data = res.data;

                setMyOrderList(data.myOrderList);

                const pageData = {
                    curPage: data.curPage,
                    allPage: data.allPage,
                    startPage: data.startPage,
                    endPage: data.endPage,
                };
                setPageInfo(pageData);

                const btns = [];
                for (let i = pageData.startPage; i <= pageData.endPage; i++) {
                    btns.push(i);
                }
                setPageBtn(btns);
            })
            .catch((err) => console.log(err));
    };

    // 최초 1회 로딩
    useEffect(() => {
        submit(1);
    }, []);

    // 필터 변경 시 자동 submit
    useEffect(() => {
        submit(1);
    }, [selectedStatus]);

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-basket3"></i>
                        <span>주문 내역</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={table.tableFrame}>
                            {/* 필터영역 */}
                            <div className={table.filterArea}>
                                {/* 날짜 */}
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>주문일자</div>
                                    <FormGroup>
                                        <Input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
                                    </FormGroup>
                                </div>

                                {/* 주문 상태 */}
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>주문 상태</div>
                                    <div className={table.filterBody}>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" value="all" onChange={onChangeStatus} />
                                                전체
                                            </Label>
                                        </FormGroup>

                                        {ORDER_STATUS.map((status) => (
                                            <FormGroup check inline key={status}>
                                                <Label check>
                                                    <Input type="checkbox" value={status} checked={selectedStatus.includes(status)} onChange={onChangeStatus} />
                                                    {status}
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 테이블 영역 */}
                            <div className={table.tableArea}>
                                <div>
                                    <div className={table.tableHeader}>
                                        <div className={table.totalSearchBox}>
                                            <Input id="exampleSearch" name="search" placeholder="통합검색" type="search" className={table.searchInput} onChange={(e) => setKeyword(e.target.value)} />
                                            <button type="button" className="small-button" onClick={() => submit(1)}>
                                                검색
                                            </button>
                                        </div>
                                    </div>
                                    <div className={table.tableBody}>
                                        <table className={table.list_table}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "15%" }}>주문번호</th>
                                                    <th style={{ width: "30%" }}>상품명</th>
                                                    <th style={{ width: "20%" }}>구매자</th>
                                                    <th style={{ width: "10%" }}>결제금액</th>
                                                    <th style={{ width: "10%" }}>주문상태</th>
                                                    <th style={{ width: "15%" }}>주문일자</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {/* <tr>
                                                    <td>251107-12345</td>
                                                    <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지...외 3건</td>
                                                    <td>lmh1231@naver.com</td>
                                                    <td className={table.price_cell}>578,000</td>
                                                    <td>[상품준비중]</td>
                                                    <td>2025-11-07 11:25:30</td>
                                                </tr> */}

                                                {myOrderList.length === 0 ? (
                                                    <tr>
                                                        <td colSpan="6" className={table.noData} style={{ textAlign: "center" }}>
                                                            현재 주문건이 없습니다.
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    myOrderList.map((myOrder) => (
                                                        <tr key={myOrder.orderIdx} onClick={() => navigate(`/orderDetail/${myOrder.orderIdx}`)}>
                                                            <td>{myOrder.orderNumber}</td>
                                                            <td className={table.title_cell}>{myOrder.productName}</td>
                                                            <td>{myOrder.buyerEmail}</td>
                                                            <td className={table.price_cell}>{myOrder.paymentAmount}</td>
                                                            <td>{myOrder.status}</td>
                                                            <td>{myOrder.createdAt}</td>
                                                        </tr>
                                                    ))
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="pagination_part">
                                    <Pagination className={table.pagination}>
                                        <PaginationItem>
                                            <PaginationLink previous onClick={() => submit(pageInfo.curPage - 1)} />
                                        </PaginationItem>

                                        {pageBtn.map((p) => (
                                            <PaginationItem key={p} active={pageInfo.curPage === p}>
                                                <PaginationLink onClick={() => submit(p)}>{p}</PaginationLink>
                                            </PaginationItem>
                                        ))}

                                        <PaginationItem>
                                            <PaginationLink next onClick={() => submit(pageInfo.curPage + 1)} />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
