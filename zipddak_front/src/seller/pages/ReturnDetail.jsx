//css
import table from "../css/table.module.css";
import detail from "../css/detail.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import AccordionBox from "../component/AccordionBox.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function OrderList() {
    const pageTitle = usePageTitle("주문관리 > 반품 내역 상세조회");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i class="bi bi-newspaper"></i>
                        <span>반품 내역 상세조회</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={detail.base_info}>
                            {/* 주문 정보 */}
                            <div className="position-relative mb-4">
                                <div className={detail.info_cell}>
                                    <div className={detail.info_cell}>
                                        <span className="input_title">주문 번호 </span>
                                        <Input readOnly />
                                    </div>
                                    <button type="button" className="sub-button " style={{ padding: "6px 8px", marginLeft: "8px" }}>
                                        주문 상세보기 <i className="bi bi-arrow-right-short"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="processFlow">
                            {/* 클레임상세 */}
                            <div className="claim_column">
                                <div className="claim_section">
                                    <Label for="examplePassword" className="input_title">
                                        클레임 상세
                                    </Label>

                                    {/* <AccordionBox /> */}
                                    <div className="accordionFrame">
                                        <div className="acco_header">
                                            <p>
                                                요청 일자 : <span>2025-11-10 12:25:30</span>{" "}
                                            </p>
                                        </div>
                                        <div className="acco_body">
                                            <div className="pd_list_table">
                                                <Label for="examplePassword" className="sub_title">
                                                    반품 요청 상품
                                                </Label>
                                                <div className="product_list">
                                                    <div className={table.tableBody}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "5%" }}>
                                                                        <Input type="checkbox" />
                                                                    </th>
                                                                    <th style={{ width: "5%" }}>#</th>
                                                                    <th style={{ width: "5%" }}>Img</th>
                                                                    <th style={{ width: "15%" }}>상품번호</th>
                                                                    <th style={{ width: "20%" }}>상품명</th>
                                                                    <th style={{ width: "25%" }}>옵션</th>
                                                                    <th style={{ width: "10%" }}>수량</th>
                                                                    <th style={{ width: "10%" }}>금액</th>
                                                                    <th style={{ width: "5%" }}>처리</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        <Input type="checkbox" />
                                                                    </td>
                                                                    <td>10</td>
                                                                    <td style={{ padding: "0" }}>
                                                                        <img src="/no_img.svg" style={{ width: "40px" }} />
                                                                    </td>
                                                                    <td>P123456</td>
                                                                    <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                                    <td>색상 : 브라운</td>
                                                                    <td>1 / 1</td>
                                                                    <td>12,300</td>
                                                                    <td>
                                                                        <i class="bi bi-three-dots-vertical pointer"></i>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info_list_section">
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label for="" className="sub_title">
                                                            요청사항
                                                        </Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="" readOnly />
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label for="" className="sub_title">
                                                            첨부파일
                                                        </Label>
                                                        <div className="imgParts" style={{ width: "100%" }}>
                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">수거 주소지 </Label>
                                                        <div style={{ width: "50%" }}>
                                                            <div className="addr_column mb-2">
                                                                <Input className="" style={{ width: "30%" }} placeholder="우편번호" readOnly />
                                                                <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                                                            </div>
                                                            <div className="addr_column">
                                                                <Input type="text" placeholder="상세주소" readOnly />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">고객명</Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="" readOnly />
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">반품 사유 </Label>
                                                        <div className="blockParts" style={{ width: "50%" }}>
                                                            <Input className="mb-2" placeholder="반품사유" readOnly />
                                                            <Input placeholder="구매자가 적은 내용" type="textarea" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">반품 배송비</Label>
                                                        <div className="flexParts" style={{ width: "50%" }}>
                                                            <Input className="" style={{ width: "70%" }} placeholder="" readOnly />
                                                            <span>[구매자 부담]</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_part">
                                    <div className="btn_group">
                                        <button type="button" className="sub-button">
                                            <i class="bi bi-x"></i> 반품 거절
                                        </button>
                                        <button type="button" className="primary-button">
                                            반품 접수 <i className="bi bi-arrow-right-short"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 반품 수거 정보 */}
                            <div className="pickupInfo_column">
                                <div className="claim_section">
                                    <Label for="examplePassword" className="input_title">
                                        반품 수거 정보
                                    </Label>

                                    {/* <AccordionBox /> */}
                                    <div className="accordionFrame">
                                        <div className="acco_header">
                                            <p>
                                                요청 일자 : <span>2025-11-10 12:25:30</span>
                                            </p>
                                        </div>

                                        <div className="acco_body">
                                            <div className="pd_list_table">
                                                <Label className="sub_title">수거 상품</Label>
                                                <div className="product_list">
                                                    <div className={[table.tableBody, table.detailPdTable].join(" ")}>
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "5%" }}>
                                                                        <Input type="checkbox" />
                                                                    </th>
                                                                    <th style={{ width: "5%" }}>#</th>
                                                                    <th style={{ width: "5%" }}>Img</th>
                                                                    <th style={{ width: "15%" }}>상품번호</th>
                                                                    <th style={{ width: "20%" }}>상품명</th>
                                                                    <th style={{ width: "25%" }}>옵션</th>
                                                                    <th style={{ width: "10%" }}>수량</th>
                                                                    <th style={{ width: "10%" }}>수거 송장번호</th>
                                                                    <th style={{ width: "5%" }}>처리</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr className="shipping_bundle_deli">
                                                                    <td>
                                                                        <Input type="checkbox" />
                                                                    </td>
                                                                    <td>10</td>
                                                                    <td style={{ padding: "0" }}>
                                                                        <img src="/no_img.svg" style={{ width: "40px" }} />
                                                                    </td>
                                                                    <td>P123456</td>
                                                                    <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                                    <td>색상 : 브라운</td>
                                                                    <td>1</td>
                                                                    <td>123456789</td>
                                                                    <td>
                                                                        <i class="bi bi-three-dots-vertical pointer"></i>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className="btn_part">
                                                        <button type="button" className="primary-button">
                                                            운송장번호 등록
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="info_list_section">
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">수거 송장번호 </Label>
                                                        <div className="flexParts" style={{ width: "50%" }}>
                                                            <Input className="" style={{ width: "30%" }} placeholder="택배사" readOnly />
                                                            <Input style={{ width: "50%" }} placeholder="송장번호" readOnly />
                                                            <button type="button" className="sub-button" style={{ width: "20%", padding: "8px" }}>
                                                                {/* 조회  */}
                                                                <i class="bi bi-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">회수 요청일</Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="" readOnly />
                                                    </div>
                                                </div>

                                                <div className="info_column">
                                                    <div className="info_line ">
                                                        <Label className="sub_title">수거 완료일</Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="" readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 반품 처리 결과 */}
                            <div className="result_column">
                                <div className="claim_section">
                                    <Label for="examplePassword" className="input_title">
                                        반품 처리 결과
                                    </Label>

                                    {/* <AccordionBox /> */}
                                    <div className="accordionFrame">
                                        <div className="acco_header">
                                            <p>
                                                처리 일자 : <span>2025-11-10 12:25:30</span>
                                            </p>
                                        </div>

                                        <div className="acco_body">
                                            <div className="content_section">
                                                <div className="pd_list_table">
                                                    <Label className="sub_title">반품 완료 상품</Label>
                                                    <div className="product_list">
                                                        <div className={[table.tableBody, table.detailPdTable].join(" ")}>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: "5%" }}>#</th>
                                                                        <th style={{ width: "5%" }}>Img</th>
                                                                        <th style={{ width: "10%" }}>상품번호</th>
                                                                        <th style={{ width: "20%" }}>상품명</th>
                                                                        <th style={{ width: "25%" }}>옵션</th>
                                                                        <th style={{ width: "10%" }}>수량</th>
                                                                        <th style={{ width: "10%" }}>처리상태</th>
                                                                        <th style={{ width: "10%" }}>사유</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>10</td>
                                                                        <td style={{ padding: "0" }}>
                                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                                        </td>
                                                                        <td>P123456</td>
                                                                        <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                                        <td>색상 : 브라운</td>
                                                                        <td>1 / 1</td>
                                                                        <td>[반품완료]</td>
                                                                        <td>수거, 검수완료</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="info_list_section">
                                                    <div className="info_column ">
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">환불 수단 </Label>
                                                            <Input className="" readOnly />
                                                        </div>
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">수거 상품 금액 </Label>
                                                            <Input className="" readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="info_column ">
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">배송비 차감 </Label>
                                                            <Input className="" readOnly />
                                                        </div>
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">최종 환불 금액 </Label>
                                                            <Input className="" readOnly />
                                                        </div>
                                                    </div>

                                                    <div className="info_column">
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">처리 완료일</Label>
                                                            <Input className="" placeholder="" readOnly />
                                                        </div>
                                                        <div className="info_cell ">
                                                            <Label className="blankSpace">~</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="content_section">
                                                <div className="pd_list_table">
                                                    <Label className="sub_title">반품 처리 제외</Label>
                                                    <div className="product_list">
                                                        <div className={[table.tableBody, table.detailPdTable].join(" ")}>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th style={{ width: "5%" }}>#</th>
                                                                        <th style={{ width: "5%" }}>Img</th>
                                                                        <th style={{ width: "10%" }}>상품번호</th>
                                                                        <th style={{ width: "20%" }}>상품명</th>
                                                                        <th style={{ width: "25%" }}>옵션</th>
                                                                        <th style={{ width: "10%" }}>수량</th>
                                                                        <th style={{ width: "10%" }}>처리상태</th>
                                                                        <th style={{ width: "10%" }}>사유</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>10</td>
                                                                        <td style={{ padding: "0" }}>
                                                                            <img src="/no_img.svg" style={{ width: "40px" }} />
                                                                        </td>
                                                                        <td>P123456</td>
                                                                        <td className="title_cell">시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                                        <td>색상 : 브라운</td>
                                                                        <td>1 / 1</td>
                                                                        <td>[반품거절]</td>
                                                                        <td>상품 훼손</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="info_list_section">
                                                    <div className="info_column">
                                                        <div className="info_line ">
                                                            <Label className="sub_title">메모</Label>
                                                            <Input placeholder="처리 내용" type="textarea" />
                                                        </div>
                                                    </div>

                                                    <div className="info_column">
                                                        <div className="info_cell ">
                                                            <Label className="sub_title">처리 완료일</Label>
                                                            <Input className="" type="" readOnly />
                                                        </div>
                                                        <div className="info_cell ">
                                                            <Label className="blankSpace">~</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
