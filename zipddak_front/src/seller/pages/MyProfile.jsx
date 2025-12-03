//css
import "../css/settings.module.css";
//js
import imageUploadFunc from "../js/imgUpload_func.jsx";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Tippy from "@tippyjs/react";

export default function MyProfile() {
    const pageTitle = usePageTitle("설정 > 프로필 관리");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame regiFrame">
                    <div className="headerFrame">
                        <i className="bi bi-person-circle" />
                        <span>프로필 관리</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="descript">
                            <span className="required">*</span> : 필수 입력
                        </div>

                        {/* 로고 이미지 첨부 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title" style={{ minWidth: "fit-content" }}>
                                로고<span className="required">*</span>
                            </Label>
                            <Tippy content="로고 이미지 첨부하기" theme="custom">
                                <img src="/Paperclip.svg" className="fileAttachIcon pointer" />
                            </Tippy>
                            <Input type="file" accept="image/*" hidden />
                            {/* {thumbPreview && (
                                <div id="thumbPreview" className="img_previewBox thumb_preview">
                                    <div className="preview-wrap">
                                        <img src={thumbPreview} className="preview-img" />
                                        <button className="delete-btn" onClick={deleteThumb}>
                                            <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                </div>
                            )} */}
                        </FormGroup>

                        {/* 상호명 입력 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                상호명<span className="required">*</span>
                            </Label>
                            <Input placeholder="상호명을 입력하세요" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 대표자 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                대표자명<span className="required">*</span>
                            </Label>
                            <Input placeholder="상호명을 입력하세요" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 사업자 번호 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">
                                사업자 등록증<span className="required">*</span>
                            </Label>
                            {/* <img src="/Paperclip.svg" className="fileAttachIcon pointer" /> */}
                        </FormGroup>

                        {/* 통신판매업 신고번호 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">
                                통신판매업 신고증<span className="required">*</span>
                            </Label>
                            {/* <img src="/Paperclip.svg" className="fileAttachIcon pointer" /> */}
                        </FormGroup>

                        {/* 취급품목 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                취급 품목<span className="required">*</span>
                            </Label>
                            <Input className=" " placeholder="" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 출고지 주소 */}
                        <FormGroup className=" position-relative mb-4">
                            <Label for="examplePassword" className="input_title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                출고지 주소
                                <button type="button" className="small-button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </Label>
                            <div className="addr_column mb-2">
                                <Input style={{ width: "30%" }} placeholder="우편번호" readOnly />
                                <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                            </div>
                            <div className="addr_column ">
                                <Input type="text" placeholder="상세주소를 입력하세요" />
                            </div>
                        </FormGroup>

                        {/* 교환/반품 주소 */}
                        <FormGroup className=" position-relative mb-4">
                            <Label for="examplePassword" className="input_title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                교환/반품 주소
                                <button type="button" className="small-button">
                                    <i className="bi bi-search"></i>
                                </button>
                            </Label>
                            <div className="addr_column mb-2">
                                <Input style={{ width: "30%" }} placeholder="우편번호" readOnly />
                                <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                            </div>
                            <div className="addr_column ">
                                <Input type="text" placeholder="상세주소를 입력하세요" />
                            </div>
                        </FormGroup>

                        {/* 배송비 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                기본 배송비
                            </Label>
                            <div className="unit_set">
                                <Input className=" unit" placeholder="가격을 입력하세요" /> {/* invalid */}
                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                <span style={{ width: "100%" }}>원</span>
                            </div>
                        </FormGroup>

                        {/* 무료배송 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                무료배송 기준 금액
                            </Label>
                            <div className="unit_set">
                                <Input className=" unit" placeholder="가격을 입력하세요" /> {/* invalid */}
                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                <span style={{ width: "100%" }}>원 이상 구매시 (묶음배송 상품만 해당)</span>
                            </div>
                        </FormGroup>

                        {/* 소개글 */}
                        <FormGroup className="position-relative">
                            <Label for="exampleText" className="input_title">
                                소개글
                            </Label>
                            <Input id="exampleText" type="textarea" />
                        </FormGroup>
                        <div className="btn_part">
                            <button type="button" className="primary-button ">
                                저장 <i className="bi bi-arrow-right-short"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
