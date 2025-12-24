//js
import usePageTitle from "../js/usePageTitle.jsx";
import useModifyImgUpload from "../js/useModifyImgUpload.jsx";
import { priceFormat } from "../js/priceFormat.jsx";

// library
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; //페이지 이동
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Tippy from "@tippyjs/react";
import { myAxios, baseUrl } from "../../config.jsx";
import { tokenAtom, userAtom } from "../../atoms";
import { useAtom } from "jotai";

export default function MyProfile() {
    const pageTitle = usePageTitle("설정 > 프로필 관리");
    const navigate = useNavigate();
    const { sellerIdx } = useParams();
    const [user] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); //경고 모달 상태

    // -----------------------------
    // 기본정보 state
    // -----------------------------
    //이미지
    const {
        thumbRef,
        addRef,
        detailRef,

        oldThumb,
        oldAddImages,
        oldDetailImages,

        newThumbFile,
        newAddFiles,
        newDetailFiles,

        deleteThumbIdx,
        deleteAddIdxList,
        deleteDetailIdxList,

        remainAddSlots,
        remainDetailSlots,

        setOldThumb,
        setOldAddImages,
        setOldDetailImages,

        changeThumb,
        deleteThumb,

        addAddImages,
        deleteOldAddImage,
        deleteNewAddImage,

        addDetailImages,
        deleteOldDetailImage,
        deleteNewDetailImage,

        validateBeforeSubmit,
    } = useModifyImgUpload();

    //취급품목 선택
    const [handleItemIdx, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]); //소분류 목록 로딩
    const [selectedCategory, setSelectedCategory] = useState(""); //선택한 대분류
    const [selectedSubCategory, setSelectedSubCategory] = useState(""); //선택한 소분류

    //기본 배송비
    const [basicPostCharge, setBasicPostCharge] = useState(0);
    //무료배송 기준금액
    const [freeChargeAmount, setFreeChargeAmount] = useState(0);
    //소개글
    const [introduction, setIntroduction] = useState("");
    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
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
                                <img src="/Paperclip.svg" className="pointer" />
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
                            <Label className="input_title">
                                상점 이름<span className="required">*</span>
                            </Label>
                            <Input placeholder="상호명을 입력하세요" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 홈페이지 */}
                        <FormGroup className="position-relative mb-4">
                            <Label for="examplePassword" className="input_title">
                                홈페이지<span className="required">*</span>
                            </Label>
                            <Input placeholder="" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 취급품목 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">
                                취급 카테고리<span className="required">*</span>
                            </Label>
                            <Input className=" " placeholder="" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 출고지 주소 */}
                        <FormGroup className=" position-relative mb-4">
                            <Label className="input_title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                출고지 주소
                                <Tippy content="주소 검색" theme="custom">
                                    <button type="button" className="small-button">
                                        <i className="bi bi-search"></i>
                                    </button>
                                </Tippy>
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
                            <Label className="input_title">기본 배송비</Label>
                            <div className="unit_set">
                                <Input className="unit" placeholder="가격을 입력하세요" /> {/* invalid */}
                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                <span style={{ width: "100%" }}>원</span>
                            </div>
                        </FormGroup>

                        {/* 무료배송 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">무료배송 기준 금액</Label>
                            <div className="unit_set">
                                <Input className="unit" placeholder="가격을 입력하세요" /> {/* invalid */}
                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                <span style={{ width: "100%" }}>원 이상 구매시 (묶음배송 상품만 해당)</span>
                            </div>
                        </FormGroup>

                        {/* 소개글 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">상점 소개</Label>
                            <Input type="textarea" />
                        </FormGroup>
                        <div className="btn_part">
                            <button type="button" className="primary-button saveBtn">
                                저장 <i className="bi bi-arrow-right-short"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
