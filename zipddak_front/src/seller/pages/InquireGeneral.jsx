//css
import table from "../css/table.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function InquireGeneral() {
    const pageTitle = usePageTitle("일반 문의 리스트");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-envelope-open"></i>
                        <span>일반 문의</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={table.tableFrame}>
                            {/* 필터영역 */}
                            <div className={table.filterArea}>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>문의등록일</div>
                                    <div>
                                        <FormGroup>
                                            <Input id="exampleDate" name="date" placeholder="date placeholder" type="date" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>답변 상태</div>
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
                                                미답변
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                답변완료
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
                                                <i className="bi bi-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={table.tableBody}>
                                        <table className={table.list - table}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "15%" }}>정산월</th>
                                                    <th style={{ width: "15%" }}>총매출</th>
                                                    <th style={{ width: "15%" }}>순이익</th>
                                                    <th style={{ width: "15%" }}>수수료</th>
                                                    <th style={{ width: "20%" }}>정산액</th>
                                                    <th style={{ width: "20%" }}>입금일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ fontWeight: "600" }}>2025-10</td>
                                                    <td>1,234,500</td>
                                                    <td>1,234,500</td>
                                                    <td>1,234,500</td>
                                                    <td>234,500,000</td>
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
