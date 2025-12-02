import "../css/frame.css";
import "../css/table.css";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function ProductList() {
    const pageTitle = usePageTitle("상품 조회 리스트");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-box2"></i>
                        <span>상품 조회</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="tableFrame">
                            {/* 필터영역 */}
                            <div className="filterArea">
                                <div className="filterColumn1">
                                    <div className="filterTitle">판매 상태</div>
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
                                                판매중
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                비공개
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                품절
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className="filterColumn2">
                                    <div className="filterTitle">카테고리</div>
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
                                                주방
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                욕실
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                중문 / 도어
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                폴딩도어
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                벽지 / 장판 / 마루
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                타일
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                시트 / 필름
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                스위치 / 콘센트
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                커튼 블라인드
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                페인트
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                조명
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
                                        <div className="btn_part">
                                            <button type="button" className="primary-button ">
                                                <i class="bi bi-plus-square"></i> 상품 등록
                                            </button>
                                        </div>
                                    </div>
                                    <div className="tableBody">
                                        <table className="listTable">
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>Img</th>
                                                    <th style={{ width: "30%" }}>상품명</th>
                                                    <th style={{ width: "10%" }}>상품코드</th>
                                                    <th style={{ width: "10%" }}>카테고리</th>
                                                    <th style={{ width: "10%" }}>판매가</th>
                                                    <th style={{ width: "10%" }}>리뷰수</th>
                                                    <th style={{ width: "10%" }}>리뷰평점</th>
                                                    <th style={{ width: "10%" }}>판매상태</th>
                                                    <th style={{ width: "10%" }}>등록일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td style={{ padding: "0" }}>
                                                        <img src="/no_img.svg" style={{ width: "100%" }} />
                                                    </td>
                                                    <td className="title_cell">시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                    <td>P123456</td>
                                                    <td>주방 &gt; 소분류</td>
                                                    <td className="price_cell">12,300</td>
                                                    <td>100</td>
                                                    <td>4.5</td>
                                                    <td>[판매중]</td>
                                                    <td>2025-11-07</td>
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
