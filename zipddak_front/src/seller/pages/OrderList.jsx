import "../css/frame.css";
import "../css/table.css";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function OrderList() {
    const pageTitle = usePageTitle("주문관리 > 주문 내역 리스트");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-basket3"></i>
                        <span>주문 내역</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="tableFrame">
                            {/* 필터영역 */}
                            <div className="filterArea">
                                <div className="filterColumn1">
                                    <div className="filterTitle">주문일자</div>
                                    <div>
                                        <FormGroup>
                                            <Input id="exampleDate" name="date" placeholder="date placeholder" type="date" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="filterColumn2">
                                    <div className="filterTitle">주문 상태</div>
                                    <div className="filterBody">
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
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                취소
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>

                            {/* 테이블 영역 */}
                            <div className="tableArea">
                                <div>
                                    <div className="tableHeader">
                                        <div className="totalSearchBox">
                                            <Input id="exampleSearch" name="search" placeholder="통합검색" type="search" className="searchInput" />
                                            <button type="button" className="small-button">
                                                검색
                                            </button>
                                        </div>
                                    </div>
                                    <div className="tableBody">
                                        <table className="listTable">
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
                                                <tr>
                                                    <td>251107-12345</td>
                                                    <td className="title_cell">시트지[예림 인테리어 필름] 우드HW 시트지...외 3건</td>
                                                    <td>lmh1231@naver.com</td>
                                                    <td className="price_cell">578,000</td>
                                                    <td>[상품준비중]</td>
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
