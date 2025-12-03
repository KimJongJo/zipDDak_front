//css
import table from "../css/table.module.css";
import detail from "../css/detail.module.css";
import acco from "../css/accordion.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label } from "reactstrap";
import Tippy from "@tippyjs/react";

import { useState, useEffect, useRef } from "react";

export default function OrderList() {
    const pageTitle = usePageTitle("주문관리 > 주문 내역 상세조회");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i class="bi bi-newspaper"></i>
                        <span>주문 내역 상세조회</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={detail.base_info}>
                            {/* 주문 정보 */}
                            <div className="position-relative mb-4">
                                <Label for="examplePassword" className="input_title">
                                    주문 정보
                                </Label>

                                <div className={detail.detailFrame}>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문 번호 </span>
                                            <Input className="" readOnly />
                                        </div>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문 일자 </span>
                                            <Input className="" readOnly />
                                        </div>
                                    </div>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문 상태 </span>
                                        </div>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">결제 수단 </span>
                                            <Input className="" readOnly />
                                        </div>
                                    </div>
                                    {/* <div className={detail.info_column}>
                                    <div className="info_cell ">
                                        <span className="sub_title">총 금액 </span>
                                        <Input className="" readOnly />
                                    </div>
                                </div> */}
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">최종 결제 금액 </span>
                                            <Input className="" readOnly style={{ color: "red" }} />
                                        </div>
                                        <div className={detail.info_cell}></div>
                                    </div>
                                </div>
                            </div>

                            {/* 고객 정보 */}
                            <div className="position-relative mb-4">
                                <Label for="examplePassword" className="input_title">
                                    고객 정보
                                </Label>
                                <div className={detail.detailFrame}>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문자 아이디 </span>
                                            <Input className="" readOnly />
                                        </div>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문자명 </span>
                                            <Input className="" readOnly />
                                        </div>
                                    </div>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">연락처 </span>
                                            <Input className="" readOnly />
                                        </div>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">주문 횟수</span>
                                            <Input className="" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 배송지 정보 */}
                            <div className="position-relative mb-4">
                                <Label for="examplePassword" className="input_title">
                                    배송지 정보
                                </Label>
                                <div className={detail.detailFrame}>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">수령인 </span>
                                            <Input className="" readOnly />
                                        </div>
                                        <div className={detail.info_cell}>
                                            <span className="sub_title">연락처 </span>
                                            <Input className="" readOnly />
                                        </div>
                                    </div>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_line}>
                                            <span className="sub_title">배송지 </span>
                                            <div style={{ width: "100%" }}>
                                                <div className="addr_column mb-2">
                                                    <Input className="" style={{ width: "30%" }} placeholder="우편번호" readOnly />
                                                    <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                                                </div>
                                                <div className="addr_column2 ">
                                                    <Input type="text" placeholder="상세주소" readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={detail.info_column}>
                                        <div className={detail.info_line}>
                                            <span className="sub_title">배송 메모</span>
                                            <Input readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={detail.pd_list_table}>
                            <Label for="examplePassword" className="input_title">
                                주문 상품 리스트
                            </Label>
                            <div className={detail.product_list}>
                                <div className={table.tableBody}>
                                    <table className={table.detail_view_Table}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "5%" }}>
                                                    <Input type="checkbox" />
                                                </th>
                                                <th style={{ width: "5%" }}>#</th>
                                                <th style={{ width: "5%" }}>Img</th>
                                                <th style={{ width: "15%" }}>상품명</th>
                                                <th style={{ width: "20%" }}>옵션</th>
                                                <th style={{ width: "5%" }}>수량</th>
                                                <th style={{ width: "10%" }}>금액</th>
                                                <th style={{ width: "10%" }}>주문상태</th>
                                                <th style={{ width: "10%" }}>배송비</th>
                                                <th style={{ width: "10%" }}>운송장번호</th>
                                                <th style={{ width: "5%" }}>처리</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {bundleList.map((item, idx) => (
                                            <tr className={`bundle_deli ${idx === bundleList.length - 1 ? "bundle_last" : ""}`}></tr>
                                        ))} */}
                                            <tr className={table.bundle_deli}>
                                                <td>
                                                    <Input type="checkbox" />
                                                </td>
                                                <td>10</td>
                                                <td style={{ padding: "0" }}>
                                                    <img src="/no_img.svg" style={{ width: "60px" }} />
                                                </td>
                                                <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                <td>색상 : 브라운</td>
                                                <td>1</td>
                                                <td>12,300</td>
                                                <td>[상품준비중]</td>
                                                <td className={table.shipCharge_cell} rowSpan={2}>
                                                    <span>3,000원</span>
                                                    <br />
                                                    <span style={{ fontSize: "10px" }}>15만원 이상 무료</span>
                                                </td>
                                                <td>-</td>
                                                <td>
                                                    <i class="bi bi-three-dots-vertical pointer"></i>
                                                </td>
                                            </tr>

                                            <tr className={table.bundle_deli}>
                                                <td>
                                                    <Input type="checkbox" />
                                                </td>
                                                <td>10</td>
                                                <td style={{ padding: "0" }}>
                                                    <img src="/no_img.svg" style={{ width: "60px" }} />
                                                </td>
                                                <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                <td>색상 : 브라운</td>
                                                <td>1</td>
                                                <td>12,300</td>
                                                <td>[상품준비중]</td>
                                                {/* <td>
                                                <span>3,000원</span>
                                                <br />
                                                <span style={{ fontSize: "10px" }}>15만원 이상 무료</span>
                                            </td> */}
                                                <td>-</td>
                                                <td>
                                                    <i class="bi bi-three-dots-vertical pointer"></i>
                                                </td>
                                            </tr>
                                            <tr className={table.single_deli}>
                                                <td>
                                                    <Input type="checkbox" />
                                                </td>
                                                <td>10</td>
                                                <td style={{ padding: "0" }}>
                                                    <img src="/no_img.svg" style={{ width: "60px" }} />
                                                </td>
                                                <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                <td>색상 : 브라운</td>
                                                <td>1</td>
                                                <td>12,300</td>
                                                <td>[상품준비중]</td>
                                                <td>
                                                    <span>3,000원</span>
                                                    <br />
                                                    <span style={{ fontSize: "10px" }}>1개당 부과</span>
                                                </td>
                                                <td>-</td>
                                                <td>
                                                    <i class="bi bi-three-dots-vertical pointer"></i>
                                                </td>
                                            </tr>

                                            <tr className={table.single_deli}>
                                                <td>
                                                    <Input type="checkbox" />
                                                </td>
                                                <td>10</td>
                                                <td style={{ padding: "0" }}>
                                                    <img src="/no_img.svg" style={{ width: "60px" }} />
                                                </td>
                                                <td className={table.title_cell}>시트지[예림 인테리어 필름] 우드HW 시트지[예림 인테리어 필름] 우드HW</td>
                                                <td>색상 : 브라운</td>
                                                <td>1</td>
                                                <td>12,300</td>
                                                <td>[상품준비중]</td>
                                                <td>
                                                    <span>3,000원</span>
                                                    <br />
                                                    <span style={{ fontSize: "10px" }}>1개당 부과</span>
                                                </td>
                                                <td>-</td>
                                                <td>
                                                    <i class="bi bi-three-dots-vertical pointer"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <td colSpan={5}>합계</td>
                                            <td>4</td>
                                            <td>49,200</td>
                                            <td></td>
                                            <td>9,000</td>
                                            <td colSpan={2} style={{ color: "red", textAlign: "right" }}>
                                                58,200
                                            </td>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className="btn_part">
                                    <div className="btn_group">
                                        <button type="button" className="sub-button">
                                            환불처리
                                        </button>
                                        <button type="button" className="primary-button">
                                            운송장번호 등록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="position-relative mt-4">
                            <Label className="input_title">클레임 내역</Label>
                            <div className={detail.claimHistory}>
                                <div className={acco.accordionToggleBox}>
                                    <div className={[acco.accordion_header, "pointer"].join(" ")}>
                                        <p>
                                            요청 일자 : <span>2025-11-10 12:25:30</span>
                                            <span>[교환]</span>
                                        </p>
                                        <span className="accordion_toggle_icon">
                                            <i class="bi bi-chevron-down"></i>
                                        </span>
                                    </div>
                                </div>

                                <div className={acco.accordionToggleBox}>
                                    <div className={[acco.accordion_header, acco.accordion_opened, "pointer"].join(" ")}>
                                        <p>
                                            요청 일자 : <span>2025-11-10 12:25:30</span>
                                            <span>[반품]</span>
                                        </p>
                                        <span className="accordion_toggle_icon">
                                            <i class="bi bi-chevron-up"></i>
                                        </span>
                                    </div>

                                    <div className={acco.accordion_body}>
                                        <div className={detail.content_section}>
                                            <div className={detail.pd_list_table}>
                                                <Label className="sub_title">반품 상품</Label>
                                                <div className={detail.product_list}>
                                                    <div className={[table.tableBody, table.table_border].join(" ")}>
                                                        <table className={table.claim_table}>
                                                            <thead>
                                                                <tr>
                                                                    <th style={{ width: "5%" }}>#</th>
                                                                    <th style={{ width: "5%" }}>Img</th>
                                                                    <th style={{ width: "10%" }}>상품번호</th>
                                                                    <th style={{ width: "20%" }}>상품명</th>
                                                                    <th style={{ width: "25%" }}>옵션</th>
                                                                    <th style={{ width: "10%" }}>수량</th>
                                                                    <th style={{ width: "10%" }}>처리상태</th>
                                                                    <th style={{ width: "10%" }}>처리사유</th>
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

                                            <div className={detail.info_list_section}>
                                                <div className={detail.info_column}>
                                                    <div className={detail.info_line}>
                                                        <Label for="" className="sub_title">
                                                            요청사항
                                                        </Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="반품요청" readOnly />
                                                    </div>
                                                </div>

                                                <div className={detail.info_column}>
                                                    <div className={detail.info_line}>
                                                        <Label className="sub_title">수거 송장번호 </Label>
                                                        <div className={detail.flexParts} style={{ width: "50%" }}>
                                                            <Input className="" style={{ width: "30%" }} placeholder="택배사" readOnly />
                                                            <Input style={{ width: "50%" }} placeholder="송장번호" readOnly />
                                                            <button type="button" className="sub-button" style={{ width: "20%", padding: "8px" }}>
                                                                {/* 조회  */}
                                                                <i class="bi bi-search"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={detail.info_column}>
                                                    <div className={detail.info_line}>
                                                        <Label className="sub_title">클레임 종료일</Label>
                                                        <Input className="" style={{ width: "50%" }} placeholder="2025-11-12" readOnly />
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
