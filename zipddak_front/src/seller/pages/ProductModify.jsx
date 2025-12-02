import "../css/frame.css";
import "../css/productRegist.css";
import imageUploadFunc from "../js/imgUpload_func.jsx";
import usePageTitle from "../js/usePageTitle.jsx";

import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Tippy from "@tippyjs/react";

export default function ProductRegist() {
    const pageTitle = usePageTitle("상품관리 > 상품 수정");

    const {
        thumbRef,
        addRef,
        detailRef,

        thumbPreview,
        addPreviewList,
        detailPreviewList,

        handleThumbChange,
        handleAddChange,
        handleDetailChange,

        deleteThumb,
        deleteAddImage,
        deleteDetailImage,
    } = imageUploadFunc({
        maxAddImages: 5,
        maxDetailImages: 2,
        maxSizeMB: 5,
    });

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame regiFrame">
                    <div className="headerFrame">
                        <i class="bi bi-pencil-square" />
                        <span>상품 수정</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="descript">
                            <span className="required">*</span> : 필수 입력
                        </div>

                        <FormGroup className="position-relative">
                            <Label for="examplePassword" style={{ fontSize: "20px" }}>
                                상품 번호 <span style={{ marginLeft: "10px", fontSize: "20px" }}>P123456</span>
                            </Label>
                        </FormGroup>

                        {/* 상품명 입력 */}
                        <FormGroup className="position-relative mb-4">
                            <Label for="examplePassword" className="input_title">
                                상품명<span className="required">*</span>
                            </Label>
                            <Input placeholder="상품명을 입력하세요" /> {/* invalid */}
                            {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                        </FormGroup>

                        {/* 썸네일 이미지 첨부 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">
                                썸네일<span className="required">*</span>
                            </Label>
                            <Tippy content="상품 이미지 첨부하기" theme="custom">
                                <img src="/Paperclip.svg" className="fileAttachIcon pointer" onClick={() => thumbRef.current.click()} />
                            </Tippy>
                            <Input type="file" accept="image/*" innerRef={thumbRef} onChange={handleThumbChange} hidden />
                            {thumbPreview && (
                                <div id="thumbPreview" className="img_previewBox thumb_preview">
                                    <div className="preview-wrap">
                                        <img src={thumbPreview} className="preview-img" />
                                        <button className="delete-btn" onClick={deleteThumb}>
                                            <i class="bi bi-x"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </FormGroup>

                        {/* 추가 이미지 첨부 */}
                        <FormGroup className="position-relative">
                            <Label className="input_title">
                                추가이미지 (최대 5장까지)<span className="required">*</span>
                            </Label>
                            <Tippy content="상품의 추가이미지 첨부하기" theme="custom">
                                <img src="/Paperclip.svg" className="fileAttachIcon pointer" onClick={() => addRef.current.click()} />
                            </Tippy>
                            <Input type="file" accept="image/*" innerRef={addRef} onChange={handleAddChange} multiple hidden />
                            {addPreviewList.length > 0 && (
                                <div className="img_previewBox add_preview">
                                    {addPreviewList.map((img, idx) => (
                                        <div key={idx} className="preview-wrap">
                                            <img src={img} className="preview-img" />
                                            <button className="delete-btn" onClick={() => deleteAddImage(idx)}>
                                                <i class="bi bi-x"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FormGroup>

                        {/* 상세 이미지 첨부 */}
                        <FormGroup className="position-relative mb-4">
                            <Label className="input_title">
                                상세이미지 (최대 2장)<span className="required">*</span>
                            </Label>
                            <Tippy content="본문 상세 이미지 첨부하기" theme="custom">
                                <img src="/Paperclip.svg" className="fileAttachIcon pointer" onClick={() => detailRef.current.click()} />
                            </Tippy>
                            <Input type="file" accept="image/*" multiple hidden innerRef={detailRef} onChange={handleDetailChange} />
                            {detailPreviewList.length > 0 && (
                                <div className="img_previewBox detail_preview">
                                    {detailPreviewList.map((img, idx) => (
                                        <div key={idx} className="preview-wrap">
                                            <img src={img} className="preview-img" />
                                            <button className="delete-btn" onClick={() => deleteDetailImage(idx)}>
                                                <i class="bi bi-x"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </FormGroup>

                        {/* 카테고리 */}
                        <FormGroup className="position-relative mb-4">
                            <Label for="examplePassword" className="input_title">
                                카테고리<span className="required">*</span>
                            </Label>
                            <div className="position-relative ">
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        카테1
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        카테2
                                    </Label>
                                </FormGroup>
                            </div>
                            {/* <div className="position-relative small-category">
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        소카테1
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        소카테2
                                    </Label>
                                </FormGroup>
                            </div> */}
                        </FormGroup>

                        {/* 가격 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                가격<span className="required">*</span>
                            </Label>
                            <div className="unit_set">
                                <Input className=" unit" placeholder="가격을 입력하세요" /> {/* invalid */}
                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                <span>원</span>
                            </div>
                        </FormGroup>

                        <div className="position-relative input_set mb-4">
                            <FormGroup className="position-relative">
                                <Label for="examplePassword" className="input_title">
                                    판매가
                                </Label>
                                <div className="unit_set">
                                    <Input className=" unit" /> {/* invalid */}
                                    {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    <span>원</span>
                                </div>
                            </FormGroup>

                            <FormGroup className="position-relative">
                                <Label for="examplePassword" className="input_title">
                                    할인율
                                </Label>
                                <div className="unit_set">
                                    <Input className=" unit" /> {/* invalid */}
                                    {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    <span>%</span>
                                </div>
                            </FormGroup>
                        </div>

                        {/* 옵션 유무 */}
                        <FormGroup className="position-relative optPart mb-4">
                            <div className="title_line mb-2">
                                <Label for="examplePassword" className="input_title" style={{ marginBottom: "0" }}>
                                    옵션 설정
                                </Label>
                                <div className="btn_group">
                                    <Tippy content="옵션을 추가하려면 클릭하세요" theme="custom">
                                        <button type="button" className="small-button ">
                                            <i class="bi bi-plus-lg"></i>
                                        </button>
                                    </Tippy>
                                    <Tippy content="옵션을 삭제하려면 클릭하세요" theme="custom">
                                        <button type="button" className="small-button ">
                                            <i class="bi bi-dash-lg"></i>
                                        </button>
                                    </Tippy>
                                </div>
                            </div>

                            {/* 옵션 추가버튼 클릭시 생성 */}
                            <div className="opt_frame mb-2 ps-3">
                                <div className="option_column">
                                    <div className="optionHeader">
                                        <Label for="examplePassword" className="sub_title">
                                            옵션명<span className="required">*</span>
                                        </Label>
                                        <Input className="optionName" placeholder="예: 색상" /> {/* invalid */}
                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    </div>

                                    <div className="optionBody">
                                        <div className="opt_subFrame">
                                            <div className="optionBodyColumn">
                                                <div className="optionContent">
                                                    <div className="optionValue">
                                                        <Label for="examplePassword" className="sub_title">
                                                            선택값<span className="required">*</span>
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 빨강" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                    <div className="optionPrice">
                                                        <Label for="examplePassword" className="sub_title">
                                                            옵션 가격
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 0" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                </div>
                                                <Tippy content="선택값을 삭제하려면 클릭하세요" theme="custom">
                                                    <button type="button" className="small-button2" style={{ marginBottom: "2px" }}>
                                                        <i class="bi bi-dash-lg"></i>
                                                    </button>
                                                </Tippy>
                                            </div>
                                        </div>

                                        <div className="add_btn">
                                            <Tippy content="선택값을 추가하려면 클릭하세요" theme="custom">
                                                <button type="button" className="small-button2">
                                                    <i class="bi bi-plus-lg"></i>
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>

                                <div className="option_column">
                                    <div className="optionHeader">
                                        <Label for="examplePassword" className="sub_title">
                                            옵션명<span className="required">*</span>
                                        </Label>
                                        <Input className="optionName" placeholder="예: 색상" /> {/* invalid */}
                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    </div>

                                    <div className="optionBody">
                                        <div className="opt_subFrame">
                                            <div className="optionBodyColumn">
                                                <div className="optionContent">
                                                    <div className="optionValue">
                                                        <Label for="examplePassword" className="sub_title">
                                                            선택값<span className="required">*</span>
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 빨강" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                    <div className="optionPrice">
                                                        <Label for="examplePassword" className="sub_title">
                                                            옵션 가격
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 0" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                </div>
                                                <Tippy content="선택값을 삭제하려면 클릭하세요" theme="custom">
                                                    <button type="button" className="small-button2" style={{ marginBottom: "2px" }}>
                                                        <i class="bi bi-dash-lg"></i>
                                                    </button>
                                                </Tippy>
                                            </div>
                                            <div className="optionBodyColumn">
                                                <div className="optionContent">
                                                    <div className="optionValue">
                                                        <Label for="examplePassword" className="sub_title">
                                                            선택값<span className="required">*</span>
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 빨강" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                    <div className="optionPrice">
                                                        <Label for="examplePassword" className="sub_title">
                                                            옵션 가격
                                                        </Label>
                                                        <Input className="optionName" placeholder="예: 0" /> {/* invalid */}
                                                        {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                    </div>
                                                </div>
                                                <Tippy content="선택값을 삭제하려면 클릭하세요" theme="custom">
                                                    <button type="button" className="small-button2" style={{ marginBottom: "2px" }}>
                                                        <i class="bi bi-dash-lg"></i>
                                                    </button>
                                                </Tippy>
                                            </div>
                                        </div>

                                        <div className="add_btn">
                                            <Tippy content="선택값을 추가하려면 클릭하세요" theme="custom">
                                                <button type="button" className="small-button2">
                                                    <i class="bi bi-plus-lg"></i>
                                                </button>
                                            </Tippy>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FormGroup>

                        {/* 배송정책 */}
                        <FormGroup className="position-relative mb-4">
                            <Label for="examplePassword" className="input_title">
                                배송정책<span className="required">*</span>
                            </Label>
                            <div>
                                <div className="mb-2">
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                            택배 배송
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input type="checkbox" />
                                            직접 픽업
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className="deli_frame mb-2 ps-3">
                                    <div className="deli_column1 position-relative">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                무료 배송
                                            </Label>
                                        </FormGroup>
                                    </div>
                                    <div className="deli_column2 border_top position-relative">
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="radio" name="radio2" />
                                                묶음 배송
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="radio" name="radio2" />
                                                개별 배송
                                            </Label>
                                        </FormGroup>
                                    </div>
                                    <div className="deli_column3 border_top position-relative">
                                        <FormGroup style={{ display: "flex", alignItems: "flex-end" }}>
                                            <Label for="examplePassword" className=" ms-2">
                                                배송비<span className="required">*</span>
                                            </Label>
                                            <div className="unit_set">
                                                <Input className=" unit" /> {/* invalid */}
                                                {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                                <span>원</span>
                                            </div>
                                        </FormGroup>
                                    </div>
                                </div>

                                <div className="addr_frame ps-3">
                                    <FormGroup className=" position-relative">
                                        <Label for="examplePassword" className="input_title">
                                            픽업 주소지
                                        </Label>
                                        <div className="addr_column1 mb-2">
                                            <Tippy content="주소 검색" theme="custom">
                                                <button type="button" className="small-button ">
                                                    <i className="bi bi-search"></i>
                                                </button>
                                            </Tippy>
                                            <Input className="me-2" style={{ width: "30%" }} placeholder="우편번호" readOnly />
                                            <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                                        </div>
                                        <div className="addr_column2 ">
                                            <Input type="text" placeholder="상세주소를 입력하세요" />
                                        </div>
                                    </FormGroup>
                                </div>
                            </div>
                        </FormGroup>

                        {/* 상품 공개 유무 */}
                        <FormGroup className="position-relative ">
                            <Label for="examplePassword" className="input_title">
                                상품 공개 유무<span className="required">*</span>
                            </Label>
                            <div>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        비공개
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="radio2" />
                                        공개
                                    </Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                        <div className="btn_part">
                            <button type="button" className="sub-button ">
                                미리보기
                            </button>
                            <button type="button" className="primary-button ">
                                등록 <i className="bi bi-arrow-right-short"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
