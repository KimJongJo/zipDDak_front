//css
import table from "../css/table.module.css";
import detail from "../css/detail.module.css";
import acco from "../css/accordion.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";
import useSelectCheckbox from "../js/useSelectCheckbox.jsx";
import { priceFormat } from "../js/priceFormat.jsx";
//component
import ActionDropdownPortal from "../component/ActionDropdownPortal.jsx";
import ModalReject from "../component/ModalReject.jsx";
import ModalAccept from "../component/ModalAccept.jsx";
import ModalRefund from "../component/ModalRefund.jsx";

import { Input, Label, Spinner } from "reactstrap";
import Tippy from "@tippyjs/react";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { myAxios, baseUrl } from "../../config.jsx";
import { tokenAtom } from "../../atoms.jsx";
import { useAtom } from "jotai/react";

export default function ReturnDetail() {
    const pageTitle = usePageTitle("주문관리 > 반품 내역 상세조회");
    const navigate = useNavigate();
    const { refundIdx } = useParams();

    const [reqOrder, setReqOrder] = useState(null); //반품 요청 주문정보
    const [reqItems, setReqItems] = useState(null); //반품 요청 주문아이템 정보
    const [reqRefundAmount, setReqRefundAmount] = useState(0); //환불금액
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false); //반품거절 등록 모달 상태
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false); //반품접수 등록 모달 상태
    const [isRefundModalOpen, setIsRefundModalOpen] = useState(false); //환불처리 모달 상태
    const [selectedItem, setSelectedItem] = useState(null);
    const [token, setToken] = useAtom(tokenAtom);

    //테이블 체크박스 상태 초기화
    const {
        allChecked,
        checkedItems,

        handleAllCheck,
        handleItemCheck,

        getSelected,
        requireSelected,

        resetChecked,
    } = useSelectCheckbox();

    //처리아이콘 클릭시 드롭다운 오픈
    const [openDropdown, setOpenDropdown] = useState(null);
    const [dropdownPos, setDropdownPos] = useState({ x: 0, y: 0 });
    // 토글 로직 (중복 클릭 -> 닫힘)
    const toggleDropdown = (itemIdx) => {
        setOpenDropdown((prev) => (prev === itemIdx ? null : itemIdx));
    };
    // 클릭 위치 기준으로 드롭다운 좌표 계산
    const handleDropdownClick = (e, itemIdx) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();

        // 아이콘 바로 아래에 붙도록
        setDropdownPos({
            x: rect.left,
            y: rect.bottom + 4,
        });
        toggleDropdown(itemIdx);
    };

    //returnDetail 데이터 불러오기
    const getRefundRequestDetail = () => {
        const params = new URLSearchParams();
        params.append("sellerId", "ss123");
        params.append("num", refundIdx);

        const refundDetailUrl = `/refund/refundReqDetail?${params.toString()}`;

        myAxios(token, setToken)
            .get(refundDetailUrl)
            .then((res) => {
                console.log("refundDetail :", res.data);

                setReqOrder(res.data.refundOrderData);
                setReqItems(res.data.refundOrderItemList);
                setReqRefundAmount(res.data.reqRefundAmount);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    //초기화면 로딩
    useEffect(() => {
        getRefundRequestDetail();
    }, []);

    // 데이터 로딩 전에는 렌더링 막기
    if (!reqOrder) {
        return (
            <div style={{ textAlign: "center", padding: "350px" }}>
                <Spinner style={{ color: "#ff5733" }}>Loading...</Spinner>
            </div>
        );
    }

    //테이블 행 넘버
    reqItems.forEach((item, idx) => (item.rowNumber = idx + 1));

    // 반품요청상품 총금액 합
    const refundReqPrice = reqItems.reduce((acc, cur) => acc + cur.unitPrice * cur.quantity, 0);

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-newspaper"></i>
                        <span>반품 내역 상세조회</span>
                    </div>

                    <div className="bodyFrame">
                        {/* 주문 정보 */}
                        <div className="position-relative ">
                            <div className={detail.info_cell}>
                                <div className={detail.info_cell}>
                                    <span className="input_title">주문 번호 </span>
                                    <Input value={reqOrder.orderCode} readOnly />
                                </div>
                                <button type="button" className="sub-button " style={{ padding: "6px 8px", marginLeft: "8px" }} onClick={() => navigate(`/seller/orderDetail/${reqOrder.orderIdx}`)}>
                                    주문 상세보기 <i className="bi bi-arrow-right-short"></i>
                                </button>
                            </div>
                        </div>

                        {/* 클레임상세 */}
                        <div className={detail.processFlow}>
                            <div className="position-relative mt-4">
                                <Label className="input_title">클레임 상세</Label>

                                {/* <AccordionBox /> */}
                                <div className={acco.accordionFrame}>
                                    <div className={acco.acco_header}>
                                        <p>
                                            요청 일자 : <span>{reqOrder.createdAt}</span>
                                        </p>
                                    </div>

                                    <div className={acco.claim_detail_body}>
                                        <div className={detail.pd_list_table}>
                                            <Label className="sub_title">반품 요청 상품</Label>
                                            <div className={detail.product_list}>
                                                <div className={[table.tableBody, table.table_border].join(" ")}>
                                                    <table className={table.claim_table}>
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "5%" }}>
                                                                    <Input
                                                                        type="checkbox"
                                                                        checked={allChecked}
                                                                        onChange={(e) => {
                                                                            const allIds = [reqItems.map((it) => it.orderItemIdx)];
                                                                            handleAllCheck(allIds, e.target.checked);
                                                                        }}
                                                                    />
                                                                </th>
                                                                <th style={{ width: "5%" }}>#</th>
                                                                <th style={{ width: "5%" }}>Img</th>
                                                                <th style={{ width: "25%" }}>상품명</th>
                                                                <th style={{ width: "25%" }}>옵션</th>
                                                                <th style={{ width: "10%" }}>단가</th>
                                                                <th style={{ width: "10%" }}>수량</th>
                                                                <th style={{ width: "10%" }}>총금액</th>
                                                                <th style={{ width: "10%" }}>처리</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {reqItems.length > 0 &&
                                                                reqItems.map((it) => (
                                                                    <tr key={it.orderItemIdx}>
                                                                        <td>
                                                                            <Input type="checkbox" checked={checkedItems.has(it.orderItemIdx)} onChange={(e) => handleItemCheck(it.orderItemIdx, e.target.checked, reqItems.length)} />
                                                                        </td>
                                                                        <td>{it.rowNumber}</td>
                                                                        <td style={{ padding: "0" }}>
                                                                            <img src={it.thumbnailFileRename ? `${baseUrl}/imageView?type=product&filename=${it.thumbnailFileRename}` : "/no_img.svg"} style={{ width: "60px" }} />
                                                                        </td>
                                                                        <td className={table.title_cell}>{it.productName}</td>
                                                                        <td>
                                                                            {it.productOptionIdx ? (
                                                                                <span>
                                                                                    {it.optionName} : {it.optionValue}
                                                                                </span>
                                                                            ) : (
                                                                                "옵션없음"
                                                                            )}
                                                                        </td>
                                                                        <td>{priceFormat(it.unitPrice)}</td>
                                                                        <td className="quantity_cell">
                                                                            {it.quantity} / {it.quantity}
                                                                        </td>
                                                                        <td>{priceFormat(it.unitPrice * it.quantity)}</td>
                                                                        <td className="dropdown-wrapper" style={{ position: "relative" }}>
                                                                            <i
                                                                                className={`bi bi-three-dots-vertical ${it.orderStatus === "반품완료" ? "disabled_icon" : "pointer"}`}
                                                                                onClick={(e) => {
                                                                                    handleDropdownClick(e, it.orderItemIdx);
                                                                                }}
                                                                            ></i>
                                                                        </td>

                                                                        {openDropdown === it.orderItemIdx && (
                                                                            <ActionDropdownPortal
                                                                                pos={{ x: dropdownPos.x, y: dropdownPos.y }}
                                                                                onClose={() => setOpenDropdown(null)}
                                                                                menuItems={[
                                                                                    {
                                                                                        label: "반품 접수",
                                                                                        onClick: () => {
                                                                                            setSelectedItem(it.orderItemIdx);
                                                                                            setIsAcceptModalOpen(true); //모달 오픈
                                                                                            setOpenDropdown(null); // 드롭다운 닫기
                                                                                            console.log("반품 접수", it.orderItemIdx);
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        label: "반품 거절",
                                                                                        onClick: () => {
                                                                                            setSelectedItem(it.orderItemIdx);
                                                                                            setIsRejectModalOpen(true); //모달 오픈
                                                                                            setOpenDropdown(null); // 드롭다운 닫기
                                                                                            console.log("반품 거절", it.orderItemIdx);
                                                                                        },
                                                                                    },
                                                                                ]}
                                                                            />
                                                                        )}
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={detail.info_list_section}>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">요청사항</Label>
                                                    <Input className="" style={{ width: "50%" }} value="반품요청" readOnly />
                                                </div>
                                            </div>
                                            {reqOrder.refundImage1 && (
                                                <div className={detail.info_column}>
                                                    <div className={detail.info_line}>
                                                        <Label className="sub_title">첨부파일</Label>
                                                        <div className={detail.imgParts}>
                                                            {reqOrder.image1Idx && <img src={`${baseUrl}/imageView?type=product&filename=${reqOrder.refundImage1}`} style={{ width: "40px" }} />}
                                                            {reqOrder.image2Idx && <img src={`${baseUrl}/imageView?type=product&filename=${reqOrder.refundImage2}`} style={{ width: "40px" }} />}
                                                            {reqOrder.image3Idx && <img src={`${baseUrl}/imageView?type=product&filename=${reqOrder.refundImage3}`} style={{ width: "40px" }} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">수거 주소지 </Label>
                                                    <div style={{ width: "50%" }}>
                                                        <div className="addr_column mb-2">
                                                            <Input className="" style={{ width: "30%" }} value={reqOrder.postZonecode} readOnly />
                                                            <Input style={{ width: "70%" }} value={reqOrder.postAddr1} readOnly />
                                                        </div>
                                                        <div className="addr_column">
                                                            <Input type="text" value={reqOrder.postAddr1} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">고객명</Label>
                                                    <Input className="" style={{ width: "50%" }} value={reqOrder.customerName} readOnly />
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">연락처</Label>
                                                    <Input className="" style={{ width: "50%" }} value={reqOrder.customerPhone} readOnly />
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">반품 사유 </Label>
                                                    <div className={detail.blockParts} style={{ width: "50%" }}>
                                                        <Input className="mb-2" value={reqOrder.reasonType} readOnly />
                                                        <Input value={reqOrder.reasonDetail} type="textarea" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">반품 왕복 배송비</Label>
                                                    <div className={detail.flexParts} style={{ width: "50%" }}>
                                                        <Input className="" style={{ width: "70%" }} value={priceFormat(reqOrder.returnShippingFee)} readOnly />
                                                        <span>{reqOrder.shippingChargeType == "BUYER" ? "[구매자 부담]" : "[판매자부담]"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">환불 요청 금액 </Label>
                                                    <div className={detail.flexParts} style={{ width: "50%" }}>
                                                        <Input className="" style={{ width: "70%" }} value={priceFormat(reqRefundAmount)} readOnly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_part">
                                    <div className="btn_group">
                                        <button
                                            type="button"
                                            className="sub-button"
                                            onClick={() => {
                                                const selected = requireSelected(); //선택항목 없을경우 알럿
                                                if (!selected) return;
                                                setIsRejectModalOpen(true);
                                            }}
                                        >
                                            <i className="bi bi-x"></i> 반품 거절
                                        </button>
                                        <button
                                            type="button"
                                            className="primary-button"
                                            onClick={() => {
                                                const selected = requireSelected(); //선택항목 없을경우 알럿
                                                if (!selected) return;
                                                setIsAcceptModalOpen(true);
                                            }}
                                        >
                                            반품 접수 <i className="bi bi-arrow-right-short"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ModalReject rejectModalOpen={isRejectModalOpen} setRejectModalOpen={setIsRejectModalOpen} selectedItems={getSelected()} targetItemIdx={selectedItem} idx={reqOrder.orderIdx} refresh={getRefundRequestDetail} resetChecked={resetChecked} rejectType="반품 거절" />
                            <ModalAccept acceptModalOpen={isAcceptModalOpen} setAcceptModalOpen={setIsAcceptModalOpen} selectedItems={getSelected()} targetItemIdx={selectedItem} idx={reqOrder.orderIdx} refresh={getRefundRequestDetail} resetChecked={resetChecked} acceptType="반품 접수" />

                            {/* 반품 수거 정보 */}
                            <div className="position-relative">
                                <Label className="input_title">반품 수거 정보</Label>

                                {/* <AccordionBox /> */}
                                <div className={acco.accordionFrame}>
                                    <div className={acco.acco_header}>
                                        <p>
                                            요청 일자 : <span>2025-11-10 12:25:30</span>{" "}
                                        </p>
                                    </div>

                                    <div className={acco.claim_detail_body}>
                                        <div className={detail.pd_list_table}>
                                            <Label className="sub_title">수거 상품</Label>
                                            <div className={detail.product_list}>
                                                <div className={[table.tableBody, table.table_border].join(" ")}>
                                                    <table className={table.claim_table}>
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
                                                            <tr className={table.shipping_bundle_deli}>
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
                                                                    <i className="bi bi-three-dots-vertical pointer"></i>
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

                                        <div className={detail.info_list_section}>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">수거 송장번호 </Label>
                                                    <div className={detail.flexParts} style={{ width: "50%" }}>
                                                        <Input className="" style={{ width: "30%" }} placeholder="택배사" readOnly />
                                                        <Input style={{ width: "50%" }} placeholder="송장번호" readOnly />
                                                        <button type="button" className="sub-button" style={{ width: "20%", padding: "8px" }}>
                                                            {/* 조회  */}
                                                            <i className="bi bi-search"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
                                                    <Label className="sub_title">회수 요청일</Label>
                                                    <Input className="" style={{ width: "50%" }} placeholder="" readOnly />
                                                </div>
                                            </div>

                                            <div className={detail.info_column}>
                                                <div className={detail.info_line}>
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
                        <div className="position-relative">
                            <Label className="input_title">반품 처리 결과</Label>

                            {/* <AccordionBox /> */}
                            <div className={acco.accordionFrame}>
                                <div className={acco.acco_header}>
                                    <p>
                                        처리 일자 : <span>2025-11-10 12:25:30</span>
                                    </p>
                                </div>

                                <div className={acco.claim_detail_body}>
                                    <div className={detail.pd_list_table}>
                                        <Label className="sub_title">반품 완료 상품</Label>
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

                                    <div className={detail.info_list_section}>
                                        <div className={detail.info_column}>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">환불 수단 </Label>
                                                <Input className="" readOnly />
                                            </div>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">수거 상품 금액 </Label>
                                                <Input className="" readOnly />
                                            </div>
                                        </div>
                                        <div className={detail.info_column}>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">배송비 차감 </Label>
                                                <Input className="" readOnly />
                                            </div>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">최종 환불 금액 </Label>
                                                <Input className="" readOnly />
                                            </div>
                                        </div>

                                        <div className={detail.info_column}>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">처리 완료일</Label>
                                                <Input className="" placeholder="" readOnly />
                                            </div>
                                            <div className={detail.info_cell}>
                                                <Label className="blankSpace">~</Label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="section_divider" />

                                <div className={acco.claim_detail_body}>
                                    <div className={detail.pd_list_table}>
                                        <Label className="sub_title">반품 처리 제외</Label>
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
                                                            <td>[반품거절]</td>
                                                            <td>상품 훼손</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={detail.info_list_section}>
                                        <div className={detail.info_column}>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">메모</Label>
                                                <Input placeholder="처리 내용" type="textarea" />
                                            </div>
                                        </div>

                                        <div className={detail.info_column}>
                                            <div className={detail.info_cell}>
                                                <Label className="sub_title">처리 완료일</Label>
                                                <Input className="" type="" readOnly />
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
