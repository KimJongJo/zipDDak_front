import "../css/frame.css";
import "../css/table.css";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function AskToManager() {
    const pageTitle = usePageTitle("일대일 문의 리스트");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-chat-square-dots"></i>
                        <span>일대일 문의</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="tableFrame">
                            {/* 필터영역 */}
                            <div className="filterArea">
                                <div className="filterColumn1">
                                    <div className="filterTitle">문의 등록일</div>
                                    <div>
                                        <FormGroup>
                                            <Input id="exampleDate" name="date" placeholder="date placeholder" type="date" />
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="filterColumn2">
                                    <div className="filterTitle">답변 상태</div>
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
                            <div className="tableArea">
                                <div style={{ padding: "10px" }}>
                                    <span style={{ fontSize: "18px", fontWeight: "500", lineHeight: "28px", marginBottom: "10px" }}>관리자 문의 리스트</span>
                                    <p style={{ fontWeight: "400", lineHeight: "20px", color: "#667085" }}>사이트 관리자에게 문의한 내역이 표시됩니다</p>
                                </div>
                                <div>
                                    <div className="tableHeader">
                                        <div className="totalSearchBox">
                                            <Input id="exampleSearch" name="search" placeholder="통합검색" type="search" className="searchInput" />
                                            <button type="button" className="small-button">
                                                검색
                                            </button>
                                        </div>
                                        <div className="btn_part">
                                            <button type="button" className="primary-button ">
                                                <i class="bi bi-plus-lg"></i> 문의하기
                                            </button>
                                        </div>
                                    </div>
                                    <div className="tableBody"></div>
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
