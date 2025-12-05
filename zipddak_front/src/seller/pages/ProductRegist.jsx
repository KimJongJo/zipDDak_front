// css
import product from "../css/productRegist.module.css";
// js
import imageUploadFunc from "../js/imgUpload_func.jsx";
import usePageTitle from "../js/usePageTitle.jsx";
import usePriceCalc from "../js/usePriceCalc.jsx";
import usePdOptionSetting from "../js/usePdOptionSetting.jsx";
import { useDeliveryPolicy } from "../js/useDeliveryPolicy.jsx";
// component
import ThumbUpload from "../component/UploadThumb.jsx";
import AddImagesUpload from "../component/UploadImages.jsx";
import DetailImagesUpload from "../component/UploadDetailImages";
import CategorySelector from "../component/ProductCategorySelector";
import PriceSection from "../component/ProductPriceSection";
import OptionSection from "../component/ProductOptionSection";
import DeliveryPolicySection from "../component/ProductDeliveryPolicy";
import VisibleSetting from "../component//ProductVisibleSetting";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

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
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    // DB에서 카테고리 전체 조회
    useEffect(() => {
        fetch("/seller/product/categories")
            .then((res) => res.json())
            .then((data) => {
                console.log("카테고리:", data);
                setCategories(data);
            })
            .catch((err) => {
                console.error("카테고리 로드 실패", err);
            });
    }, []);

    // 라디오로 카테고리 선택 시 subCategory 세팅
    useEffect(() => {
        if (!selectedCategory) {
            setSubCategories([]);
            return;
        }

        const category = categories.find((c) => String(c.categoryIdx) === String(selectedCategory));
        setSubCategories(category?.subCategories || []);
        setSelectedSubCategory(""); // 상위카테 바뀌면 소카테 초기화
    }, [selectedCategory, categories]);

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

    //배송정책 + 체크박스 상태
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            shippingMethod: {
                delivery: false,
                pickup: false,
            },
        },
    });
    const { selected, toggleDelivery, togglePickup } = useDeliveryPolicy(watch, setValue);

    //공개여부 라디오 버튼 상태
    const [visible, setVisible] = useState("hide");

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
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
                        <ThumbUpload thumbRef={thumbRef} thumbPreview={thumbPreview} handleThumbChange={handleThumbChange} deleteThumb={deleteThumb} />

                        {/* 추가 이미지 첨부 */}
                        <AddImagesUpload addRef={addRef} addPreviewList={addPreviewList} handleAddChange={handleAddChange} deleteAddImage={deleteAddImage} />

                        {/* 상세 이미지 첨부 */}
                        <DetailImagesUpload detailRef={detailRef} detailPreviewList={detailPreviewList} handleDetailChange={handleDetailChange} deleteDetailImage={deleteDetailImage} />

                        {/* 카테고리 */}
                        <CategorySelector categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} subCategories={subCategories} selectedSubCategory={selectedSubCategory} setSelectedSubCategory={setSelectedSubCategory} />

                        {/* 가격 */}
                        <PriceSection price={price} salePrice={salePrice} discountRate={discountRate} handlePrice={handlePrice} handleSalePrice={handleSalePrice} handleDiscountRate={handleDiscountRate} />

                        {/* 옵션 유무 */}
                        <OptionSection options={options} setOptions={setOptions} addOptionColumn={addOptionColumn} removeOptionColumn={removeOptionColumn} addValueLine={addValueLine} removeValueLine={removeValueLine} />

                        {/* 배송정책 */}
                        <DeliveryPolicySection register={register} watch={watch} errors={errors} selected={selected} toggleDelivery={toggleDelivery} togglePickup={togglePickup} />

                        {/* 상품 공개 유무 */}
                        <VisibleSetting visible={visible} setVisible={setVisible} />

                        {/* 등록 버튼 */}
                        <div className="btn_part">
                            <button type="button" className="primary-button saveBtn">
                                등록 <i className="bi bi-arrow-right-short"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
