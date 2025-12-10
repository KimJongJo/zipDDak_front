import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/ProductDetail.css";
import { useState, useRef, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";

export default function ProductDetail() {
    const [bottomSelect, setBottomSelect] = useState(1);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [unmountOnClose, setUnmountOnClose] = useState(true);

    // --- 섹션 refs ---
    const infoRef = useRef(null);
    const reviewRef = useRef(null);
    const askRef = useRef(null);
    const deliveryRef = useRef(null);

    const navItems = [
        { id: 1, label: "상품정보", ref: infoRef },
        { id: 2, label: "리뷰", ref: reviewRef, count: 1001 },
        { id: 3, label: "문의", ref: askRef, count: 90 },
        { id: 4, label: "배송/환불", ref: deliveryRef },
    ];

    const handleNavClick = (item) => {
        setBottomSelect(item.id);
        // item.ref.current?.scrollIntoView({ behavior: "auto", block: "start" });
        const top = item.ref.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top, behavior: "instant" });
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5, // 50% 보이면 해당 섹션으로 인식
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 어떤 ref가 보였는지 찾기
                    const visibleSection = navItems.find((item) => item.ref.current === entry.target);
                    if (visibleSection) {
                        setBottomSelect(visibleSection.id);
                    }
                }
            });
        }, options);

        // 모든 섹션 observer에 등록
        navItems.forEach((item) => {
            if (item.ref?.current) observer.observe(item.ref.current);
        });

        return () => {
            navItems.forEach((item) => {
                if (item.ref?.current) observer.unobserve(item.ref.current);
            });
        };
    }, []);

    return (
        <div className="body-div">
            <div className="ProductDetail-main-div">
                {/* 상품 상세 상단 */}
                <div className="detail-top">
                    {/* 좌측 상품 이미지 */}
                    <div>
                        {/* 메인 이미지 */}
                        <div>
                            <img className="detail-main-img" src="/images/이미지테스트.png"></img>
                        </div>
                        {/* 이미지 리스트 */}
                        <div></div>
                    </div>

                    {/* 우측 구매 항목 */}
                    <div className="detail-top-right">
                        <div className="detail-product-info">
                            {/* 카테고리 */}
                            <span className="product-category">카테고리</span>

                            {/* 업체명 */}
                            <span className="product-store-name">자재판매업체</span>

                            <div className="detail-product-name-div">
                                {/* 상품 이름 */}
                                <div className="detail-product-name">발트 라운드 수납 선반 다용도 주방 거실장</div>
                                <i className="bi bi-heart product-like"></i>
                            </div>
                            <div className="detail-product-div-under">
                                <div className="detail-price-review-div">
                                    <div>
                                        <div className="detail-sale-div">
                                            {/* 세일 퍼센트 */}
                                            <span className="detail-sale-percent">5%</span>
                                            {/* 정가 */}
                                            <del className="detail-default-price">10,000원</del>
                                        </div>
                                        <div>
                                            {/* 판매 가격 */}
                                            <span className="detail-sale-price">10,000</span>
                                            <span className="won">원</span>
                                        </div>
                                    </div>
                                    <div className="detail-review">
                                        <div className="detail-star-list">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </div>
                                        {/* 리뷰 수 */}
                                        <span className="detail-review-count">1,001 개 리뷰</span>
                                    </div>
                                </div>
                                <hr className="hr" />
                                <div className="detail-select-option">
                                    <span className="detail-option-span">구매 옵션</span>
                                    <div className="detail-select-div">
                                        <select className="detail-select">
                                            <option value="">규격</option>
                                        </select>
                                    </div>
                                    <div className="detail-select-div">
                                        <select className="detail-select">
                                            <option value="">색상</option>
                                        </select>
                                    </div>
                                    <div className="detail-button-div">
                                        <button type="button" className="detail-append-buy">
                                            구매 추가
                                        </button>
                                    </div>

                                    {/* 추가될 div 박스 만들기 */}

                                    <div className="detail-append-box">
                                        <div className="detail-append-box-top detail-box-son">
                                            <span className="detail-size">120x120x11700mm, 화이트</span>
                                            <i className="bi bi-x-lg detail-x-button"></i>
                                        </div>
                                        <div className="detail-append-box-bottom detail-box-son">
                                            {/* 수량 증감 버튼 */}
                                            <div className="detail-append-button">
                                                <i className="bi bi-dash-lg append-button-son"></i>
                                                <span className="append-button-son">1</span>
                                                <i className="bi bi-plus-lg append-button-son"></i>
                                            </div>
                                            {/* 가격 */}
                                            <span className="detail-order-price">10,000원</span>
                                        </div>
                                    </div>

                                    {/* 여기까지 추가되는 div 박스 */}
                                </div>
                                <hr className="hr" />
                                <div>
                                    <div className="detail-order-price-div">
                                        <span className="detail-order-hard-span">주문 금액</span>
                                        {/* 주문 금액 */}
                                        <span className="detail-order-hard-price">20,000원</span>
                                    </div>
                                    <div className="font-15">배송정책</div>
                                    <div className="font-14">
                                        방법 : <span className="font-14"> 택배배송</span>
                                    </div>
                                    <div className="font-14">
                                        배송 단위 :<span className="font-14"> 묶음 배송</span>
                                    </div>
                                    <div className="font-14">결제 : 주문 시 결제</div>
                                    <div className="font-14">안내 : 상품이 발송되면 송장번호를 마이페이지에서 확인하실 수 있습니다.</div>
                                </div>
                                <div className="detail-order-button-div">
                                    <button className="detail-order-button go-cart">장바구니</button>
                                    <button className="detail-order-button go-order">구매</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 상품 상세 아래 */}

                {/* 상품상세 하단 네비 */}
                <div className="detail-product-bottom-nav">
                    {/* 문의하기 모달 */}
                    <Modal className="ask-modal-box" isOpen={modal} toggle={toggle}>
                        <ModalHeader style={{ border: "none", paddingBottom: "0" }} toggle={toggle}>
                            <span className="ask-title">문의하기</span>
                        </ModalHeader>
                        <div className="ask-modal-body">
                            <Input style={{ fontSize: "14px" }} className="ask-modal-body-input" type="textarea" placeholder="문의하실 내용을 입력해주세요" rows={5} />
                            <div className="ask-modal-body-checkbox">
                                <input type="checkbox" className="test" id="askPrivate" />
                                <label htmlFor="askPrivate" className="ask-modal-private-span">
                                    비밀글로 작성
                                </label>
                            </div>
                            <div className="ask-modal-body-button-div">
                                <button className="ask-modal-back ask-modal-button" type="button" onClick={toggle}>
                                    취소
                                </button>
                                <button className="ask-modal-write ask-modal-button" type="button" onClick={toggle}>
                                    등록하기
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}
