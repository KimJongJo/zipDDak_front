//css
import table from "../css/table.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function ShippingList() {
    const pageTitle = usePageTitle("주문관리 > 배송 관리");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-truck"></i>
                        <span>주문 내역 조회</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={table.tableFrame}>
                            {/* 필터영역 */}
                            <div className={table.filterArea}>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>주문일자</div>
                                    <div>
                                        <FormGroup>
                                            <Input id="exampleDate" name="date" placeholder="date placeholder" type="date" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>주문 상태</div>
                                    <div className={table.filterBody}>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                전체
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                상품준비중
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                배송중
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                배송완료
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                교환
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                환불
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>

                            {/* 테이블 영역 */}
                            <div className={table.tableArea}>
                                <div>
                                    <div className={table.tableHeader}>
                                        <div className={table.totalSearchBox}>
                                            <Input id="exampleSearch" name="search" placeholder="통합검색" type="search" className={table.searchInput} />
                                            <button type="button" className="small-button">
                                                검색
                                            </button>
                                        </div>
                                    </div>
                                    <div className={table.tableBody}>
                                        <table className={table.list_table}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "10%" }}>주문번호</th>
                                                    <th style={{ width: "25%" }}>상품명</th>
                                                    <th style={{ width: "15%" }}>최초 출고일자</th>
                                                    <th style={{ width: "15%" }}>최초 송장번호</th>
                                                    <th style={{ width: "10%" }}>택배사</th>
                                                    <th style={{ width: "10%" }}>주문상태</th>
                                                    <th style={{ width: "15%" }}>주문일자</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>251107-12345</td>
                                                    <td className="title_cell">시트지[예림 인테리어 필름] 우드HW...외 3건</td>
                                                    <td>2025-11-08 12:25:16</td>
                                                    <td>12345678901234</td>
                                                    <td>대한통운</td>
                                                    <td>[배송중]</td>
                                                    <td>2025-11-07 11:25:30</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="pagination"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
