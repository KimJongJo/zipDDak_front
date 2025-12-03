// css
import "../css/productRegist.module.css";
// js
import imageUploadFunc from "../js/imgUpload_func.jsx";
import usePageTitle from "../js/usePageTitle.jsx";
import usePriceCalc from "../js/usePriceCalc.jsx";
import usePdOptionSetting from "../js/usePdOptionSetting.jsx";
import { useDeliveryPolicy } from "../js/useDeliveryPolicy.jsx";
// component
import DeliveryTab from "../component/DeliveryTab";
import PickupTab from "../component/PickupTab";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Tippy from "@tippyjs/react";

export default function ProductRegist() {
    //탭 타이틀 설정
    const pageTitle = usePageTitle("상품관리 > 상품 등록");

    //이미지 첨부 + 미리보기
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

    //카테고리 선택
    const [selectedCategory, setSelectedCategory] = useState("");
    // 카테별 소카테 리스트 (데이터 기반)
    const subCategories = {
        카테1: ["소카테1-1", "소카테1-2"],
        카테2: ["소카테2-1", "소카테2-2"],
    };

    //가격 계산
    const {
        price,
        salePrice,
        discountRate,

        handlePrice,
        handleSalePrice,
        handleDiscountRate,
    } = usePriceCalc();

    //옵션 세팅
    const {
        options,
        setOptions,

        addOptionColumn,
        removeOptionColumn,

        addValueLine,
        removeValueLine,
    } = usePdOptionSetting();

    //배송정책
    const {
        register,
        watch,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {
            shippingMethod: {
                delivery: false,
                pickup: false,
            },
            delivery: {
                freeShipping: false,
                shippingType: "",
                shippingFee: "",
            },
            pickup: {
                postalCode: "",
                roadAddress: "",
                detailAddress: "",
            },
        },
    });

    const { selected, toggleDelivery, togglePickup } = useDeliveryPolicy(watch, setValue);

    const validateMethod = () => {
        const m = getValues("shippingMethod");
        return m.delivery || m.pickup || "배송 방식을 1개 이상 선택하세요.";
    };

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main>
                <div className="mainFrame regiFrame">
                    <div className="headerFrame">
                        <i className="bi bi-plus-square" />
                        <span>상품 등록</span>
                    </div>

                    <div className="bodyFrame">
                        <div className="descript">
                            <span className="required">*</span> : 필수 입력
                        </div>

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
                            <Label className="input_title" style={{ minWidth: "fit-content" }}>
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

                            {/* 상위 카테고리 */}
                            <div className="position-relative ">
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="category" value="카테1" onChange={(e) => setSelectedCategory(e.target.value)} />
                                        카테1
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="category" value="카테2" onChange={(e) => setSelectedCategory(e.target.value)} />
                                        카테2
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                        <Input type="radio" name="category" value="카테3" onChange={(e) => setSelectedCategory(e.target.value)} />
                                        카테3
                                    </Label>
                                </FormGroup>
                            </div>

                            {/* 소분류 카테고리 조건부 렌더링: 카테1일 때만 보이게 */}
                            {subCategories[selectedCategory] && (
                                <div className="position-relative small-category mt-3">
                                    {subCategories[selectedCategory].map((sub, idx) => (
                                        <FormGroup check inline key={idx}>
                                            <Label check>
                                                <Input type="radio" name="subcategory" value={sub} />
                                                {sub}
                                            </Label>
                                        </FormGroup>
                                    ))}
                                </div>
                            )}
                        </FormGroup>

                        {/* 가격 */}
                        <FormGroup className="position-relative">
                            <Label for="examplePassword" className="input_title">
                                가격<span className="required">*</span>
                            </Label>
                            <div className="unit_set">
                                <Input className=" unit" value={price} onChange={(e) => handlePrice(e.target.value)} placeholder="가격을 입력하세요" />
                                {/* invalid */}
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
                                    <Input className=" unit" value={salePrice} onChange={(e) => handleSalePrice(e.target.value)} /> {/* invalid */}
                                    {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    <span>원</span>
                                </div>
                            </FormGroup>

                            <FormGroup className="position-relative">
                                <Label for="examplePassword" className="input_title">
                                    할인율
                                </Label>
                                <div className="unit_set">
                                    <Input className=" unit" value={discountRate} onChange={(e) => handleDiscountRate(e.target.value)} /> {/* invalid */}
                                    {/* <FormFeedback tooltip>Oh noes! that name is already taken</FormFeedback> */}
                                    <span>%</span>
                                </div>
                            </FormGroup>
                        </div>

                        {/* 옵션 유무 */}
                        <FormGroup className="position-relative optPart mb-4">
                            <div className="title_line mb-2">
                                <Label className="input_title" style={{ marginBottom: 0, minWidth: "fit-content" }}>
                                    옵션 설정
                                </Label>

                                <div className="btn_group" style={{ gap: "3px" }}>
                                    <Tippy content="옵션을 추가하려면 클릭하세요" theme="custom">
                                        <button type="button" className="small-button" onClick={addOptionColumn}>
                                            <i className="bi bi-plus-lg"></i>
                                        </button>
                                    </Tippy>

                                    <Tippy content="옵션을 삭제하려면 클릭하세요" theme="custom">
                                        <button type="button" className="small-button" onClick={removeOptionColumn}>
                                            <i className="bi bi-dash-lg"></i>
                                        </button>
                                    </Tippy>
                                </div>
                            </div>

                            {/* 옵션이 하나도 없으면 opt_frame 숨김 */}
                            {options.length > 0 && (
                                <div className="opt_frame mb-2 ps-3">
                                    {options.map((opt, optionIdx) => (
                                        <div className="option_column" key={optionIdx}>
                                            <div className="optionHeader">
                                                <Label className="sub_title">
                                                    옵션명<span className="required">*</span>
                                                </Label>

                                                <Input
                                                    className="optionName"
                                                    placeholder="예: 색상"
                                                    value={opt.optionName}
                                                    onChange={(e) => {
                                                        const updated = [...options];
                                                        updated[optionIdx].optionName = e.target.value;
                                                        setOptions(updated);
                                                    }}
                                                />
                                            </div>

                                            <div className="optionBody">
                                                <div className="opt_subFrame">
                                                    {opt.values.map((val, valueIdx) => (
                                                        <div className="optionBodyColumn" key={valueIdx}>
                                                            <div className="optionContent">
                                                                <div className="optionValue">
                                                                    <Label className="sub_title">
                                                                        선택값<span className="required">*</span>
                                                                    </Label>
                                                                    <Input
                                                                        className="optionName"
                                                                        placeholder="예: 빨강"
                                                                        value={val.value}
                                                                        onChange={(e) => {
                                                                            const updated = [...options];
                                                                            updated[optionIdx].values[valueIdx].value = e.target.value;
                                                                            setOptions(updated);
                                                                        }}
                                                                    />
                                                                </div>

                                                                <div className="optionPrice">
                                                                    <Label className="sub_title">옵션 가격</Label>
                                                                    <Input
                                                                        className="optionName"
                                                                        placeholder="예: 0"
                                                                        value={val.price}
                                                                        onChange={(e) => {
                                                                            const updated = [...options];
                                                                            updated[optionIdx].values[valueIdx].price = e.target.value;
                                                                            setOptions(updated);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="add_btn">
                                                                <Label>
                                                                    <span className="blankSpace">~</span>
                                                                </Label>
                                                                <Tippy content="선택값을 삭제하려면 클릭하세요" theme="custom">
                                                                    <button type="button" className="small-button2" style={{ marginBottom: "2px" }} onClick={() => removeValueLine(optionIdx, valueIdx)}>
                                                                        <i className="bi bi-dash-lg"></i>
                                                                    </button>
                                                                </Tippy>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="add_btn">
                                                    <Label>
                                                        <span className="blankSpace">~</span>
                                                    </Label>
                                                    <Tippy content="선택값을 추가하려면 클릭하세요" theme="custom">
                                                        <button type="button" className="small-button2" onClick={() => addValueLine(optionIdx)}>
                                                            <i className="bi bi-plus-lg"></i>
                                                        </button>
                                                    </Tippy>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
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
                                            <Input
                                                type="checkbox"
                                                value="delivery"
                                                {...register("shippingMethod.delivery", {
                                                    validate: validateMethod,
                                                })}
                                                checked={selected.delivery}
                                                onChange={toggleDelivery}
                                            />
                                            택배 배송
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                value="pickup"
                                                {...register("shippingMethod.pickup", {
                                                    validate: validateMethod,
                                                })}
                                                checked={selected.pickup}
                                                onChange={togglePickup}
                                            />
                                            직접 픽업
                                        </Label>
                                    </FormGroup>
                                </div>

                                {/* 에러 메시지 */}
                                {errors.shippingMethod?.delivery && <p style={{ color: "red", fontSize: 13 }}>{errors.shippingMethod.delivery.message}</p>}
                                {errors.shippingMethod?.pickup && <p style={{ color: "red", fontSize: 13 }}>{errors.shippingMethod.pickup.message}</p>}

                                {selected.delivery && <DeliveryTab register={register} errors={errors} />}
                                {selected.pickup && <PickupTab register={register} errors={errors} />}
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
