//css
import table from "../css/table.module.css";
import sales from "../css/salesStatistics.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function SalesStatistics() {
    const pageTitle = usePageTitle("정산관리 > 매출 통계 조회");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-graph-up-arrow"></i>
                        <span>매출 통계</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="btn_part">
                            <button type="button" className="sub-button ">
                                <i class="bi bi-coin"></i> 정산금액 모의계산
                            </button>
                        </div>

                        <div className={sales.body_column}>
                            <div className="salesCard">
                                <div className="cardImage">
                                    {/* <img src="/no_img.svg" /> */}
                                    <i class="bi bi-cash-coin"></i>
                                </div>
                                <div className="cardBody">
                                    <div className="cardAmount">
                                        351,000 <span>원</span>
                                    </div>
                                    <div className="cardTitle">당일 매출액</div>
                                </div>
                            </div>
                            <div className="salesCard">
                                <div className="cardImage">
                                    {/* <img src="/no_img.svg" /> */}
                                    <i class="bi bi-cash-coin"></i>
                                </div>
                                <div className="cardBody">
                                    <div className="cardAmount">
                                        51,000,000 원 <span>원</span>
                                    </div>
                                    <div className="cardTitle">당일 예상 순매출액</div>
                                </div>
                            </div>
                            <div className="salesCard">
                                <div className="cardImage">
                                    {/* <img src="/no_img.svg" /> */}
                                    <i class="bi bi-cash-coin"></i>
                                </div>
                                <div className="cardBody">
                                    <div className="cardAmount">
                                        34,000 <span>원</span>
                                    </div>
                                    <div className="cardTitle">당일 평균주문금액(객단가)</div>
                                </div>
                            </div>
                            <div className="salesCard">
                                <div className="cardImage">
                                    {/* <img src="/no_img.svg" /> */}
                                    <i class="bi bi-cash-coin"></i>
                                </div>
                                <div className="cardBody">
                                    <div className="cardAmount">
                                        200 <span>%</span>
                                    </div>
                                    <div className="cardTitle">전일 대비 매출 증감률</div>
                                </div>
                            </div>
                        </div>

                        <div className={[sales.body_column, sales.change_period].join(" ")}>
                            <div className={sales.periodCriteria}>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        일자별
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        월간별
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        년도별
                                    </Label>
                                </FormGroup>
                            </div>
                            <div className="tableBody">
                                <table className={table.salesTable}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: "10%" }}>날짜</th>
                                            <th style={{ width: "auto" }}>카테고리1</th>
                                            <th style={{ width: "auto" }}>카테고리2</th>
                                            <th style={{ width: "auto" }}>카테고리3</th>
                                            <th style={{ width: "auto" }}>카테고리4</th>
                                            <th style={{ width: "auto" }}>카테고리5</th>
                                            <th style={{ width: "auto" }}>카테고리6</th>
                                            <th style={{ width: "auto" }}>카테고리7</th>
                                            <th style={{ width: "auto" }}>카테고리8</th>
                                            <th style={{ width: "auto" }}>카테고리9</th>
                                            <th style={{ width: "auto" }}>카테고리10</th>
                                            <th style={{ width: "auto" }}>카테고리11</th>
                                            <th style={{ width: "10%" }}>합계</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td style={{ fontWeight: "600" }}>2025-10-28</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500</td>
                                            <td>1,234,500,000,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="pagination"></div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
