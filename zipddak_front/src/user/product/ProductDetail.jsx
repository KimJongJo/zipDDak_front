import "bootstrap-icons/font/bootstrap-icons.css";
import "../../css/user-product/ProductDetail.css";
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
                    {navItems.map((item) => (
                        <button key={item.id} className={bottomSelect === item.id ? "bottom-nav-select-button" : "bottom-nav-button"} onClick={() => handleNavClick(item)}>
                            {item.label}
                            {item.count && <span>{item.count.toLocaleString()}</span>}
                        </button>
                    ))}
                </div>

                <div>
                    <div className="detail-product-bottom">
                        {/* 상품 상세 좌측 라인 */}
                        <div className="detail-bottom-left">
                            {/* 상품 정보 */}
                            <div ref={infoRef}>
                                <img className="test-img-test" src="/images/이미지테스트.png"></img>
                            </div>

                            {/* 리뷰 */}
                            <div ref={reviewRef} className="detail-bottom-reivew">
                                <div>
                                    <span className="detail-bottom-review-span">리뷰</span>
                                    {/* 리뷰 수 */}
                                    <span className="detail-bottom-review-count">16 </span>
                                </div>

                                <div className="detail-bottom-review-box-div">
                                    <div className="detail-bottom-review-box">
                                        <div>
                                            {/* 사용자 닉네임 */}
                                            <span className="detail-bottom-review-nickname">닉네임</span>
                                        </div>
                                        <div>
                                            <div className="detail-bottom-review-start-list-div">
                                                <div className="detail-star-list">
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                </div>
                                                {/* 리뷰 작성일 */}
                                                <span className="detail-bottom-review-created">2025년 11월 09일 12시 12분</span>
                                            </div>
                                        </div>
                                        <img className="detail-bottom-review-img" src="/images/이미지테스트.png" />
                                        <div className="detail-bottom-review-content">
                                            상품에 대한 리뷰 작성 글 예시 입니다. <br />
                                            상품에 대한 리뷰
                                            <br />
                                            작성 글 예시 입니다.
                                            <br />
                                            상품에 대한 리뷰 작성 글 예시입니다.
                                        </div>
                                    </div>

                                    <div className="detail-bottom-review-box">
                                        <div>
                                            {/* 사용자 닉네임 */}
                                            <span className="detail-bottom-review-nickname">닉네임</span>
                                        </div>
                                        <div>
                                            <div className="detail-bottom-review-start-list-div">
                                                <div className="detail-star-list">
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                </div>
                                                {/* 리뷰 작성일 */}
                                                <span className="detail-bottom-review-created">2025년 11월 09일 12시 12분</span>
                                            </div>
                                        </div>
                                        <img className="detail-bottom-review-img" src="/images/이미지테스트.png" />
                                        <div className="detail-bottom-review-content">
                                            상품에 대한 리뷰 작성 글 예시 입니다. <br />
                                            상품에 대한 리뷰
                                            <br />
                                            작성 글 예시 입니다.
                                            <br />
                                            상품에 대한 리뷰 작성 글 예시입니다.
                                        </div>
                                    </div>
                                    <div className="detail-bottom-review-box">
                                        <div>
                                            {/* 사용자 닉네임 */}
                                            <span className="detail-bottom-review-nickname">닉네임</span>
                                        </div>
                                        <div>
                                            <div className="detail-bottom-review-start-list-div">
                                                <div className="detail-star-list">
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                    <i className="bi bi-star-fill"></i>
                                                </div>
                                                {/* 리뷰 작성일 */}
                                                <span className="detail-bottom-review-created">2025년 11월 09일 12시 12분</span>
                                            </div>
                                        </div>
                                        <img className="detail-bottom-review-img" src="/images/이미지테스트.png" />
                                        <div className="detail-bottom-review-content">
                                            상품에 대한 리뷰 작성 글 예시 입니다. <br />
                                            상품에 대한 리뷰
                                            <br />
                                            작성 글 예시 입니다.
                                            <br />
                                            상품에 대한 리뷰 작성 글 예시입니다.
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 문의 */}
                            <div ref={askRef} className="detail-bottom-ask">
                                <div className="detail-bottom-ask-title-div">
                                    <div>
                                        <span className="detail-bottom-ask-span">문의</span>
                                        {/* 문의 수 */}
                                        <span className="detail-bottom-ask-count">16 </span>
                                    </div>
                                    {/* 문의 하기 버튼 */}
                                    <button className="detail-bottom-ask-button" onClick={() => setModal(true)}>
                                        문의하기
                                    </button>
                                </div>

                                <div className="detail-bottom-ask-box-div">
                                    <div className="detail-bottom-ask-box">
                                        <div>
                                            {/* 문의 사용자 닉네임 */}
                                            <span className="detail-bottom-ask-nickname">닉네임</span>
                                            {/* 문의 날짜 */}
                                            <span className="detail-bottom-ask-created">2025년 11월 09일 12시 12분</span>
                                        </div>
                                        <table>
                                            <tbody className="detail-bottom-ask-table">
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-Q">Q</span>
                                                    </td>
                                                    <td>
                                                        {/* 문의 내용 */}
                                                        <span className="detail-bottom-ask-content">언제쯤 출고될지 대강 알 수 있을까요?</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-A">A</span>
                                                    </td>
                                                    <td>
                                                        {/* 자재업체 이름 */}
                                                        <span className="detail-bottom-ask-storeName">자재업체이름</span>
                                                        {/* 답변 날짜 */}
                                                        <span className="detail-bottom-ask-return-created">2025년 11월 09일 12시 12분</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div className="detail-bottom-ask-return">
                                                            안녕하세요 고객님 <br />
                                                            우선 이용에 불편드려서 죄송합니다. <br />
                                                            현재 출고는 완료되었으나, <br />
                                                            택배사 물량과다로 스캔 작업 지연되고 있습니다. <br />
                                                            금일 저녁~익일 새벽에 배송조회 가능 할 것 같습니다. <br />
                                                            시간 양해 부탁드립니다. <br />
                                                            불편드려서 죄송합니다.
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="detail-bottom-ask-box">
                                        <div>
                                            {/* 문의 사용자 닉네임 */}
                                            <span className="detail-bottom-ask-nickname">닉네임</span>
                                            {/* 문의 날짜 */}
                                            <span className="detail-bottom-ask-created">2025년 11월 09일 12시 12분</span>
                                        </div>
                                        <table>
                                            <tbody className="detail-bottom-ask-table">
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-Q">Q</span>
                                                    </td>
                                                    <td>
                                                        {/* 문의 내용 */}
                                                        <span className="detail-bottom-ask-content">언제쯤 출고될지 대강 알 수 있을까요?</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-A">A</span>
                                                    </td>
                                                    <td>
                                                        {/* 자재업체 이름 */}
                                                        <span className="detail-bottom-ask-storeName">자재업체이름</span>
                                                        {/* 답변 날짜 */}
                                                        <span className="detail-bottom-ask-return-created">2025년 11월 09일 12시 12분</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div className="detail-bottom-ask-return">
                                                            안녕하세요 고객님 <br />
                                                            우선 이용에 불편드려서 죄송합니다. <br />
                                                            현재 출고는 완료되었으나, <br />
                                                            택배사 물량과다로 스캔 작업 지연되고 있습니다. <br />
                                                            금일 저녁~익일 새벽에 배송조회 가능 할 것 같습니다. <br />
                                                            시간 양해 부탁드립니다. <br />
                                                            불편드려서 죄송합니다.
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="detail-bottom-ask-box">
                                        <div>
                                            {/* 문의 사용자 닉네임 */}
                                            <span className="detail-bottom-ask-nickname">닉네임</span>
                                            {/* 문의 날짜 */}
                                            <span className="detail-bottom-ask-created">2025년 11월 09일 12시 12분</span>
                                        </div>
                                        <table>
                                            <tbody className="detail-bottom-ask-table">
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-Q">Q</span>
                                                    </td>
                                                    <td>
                                                        {/* 문의 내용 */}
                                                        <span className="detail-bottom-ask-content">언제쯤 출고될지 대강 알 수 있을까요?</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className="detail-bottom-ask-A">A</span>
                                                    </td>
                                                    <td>
                                                        {/* 자재업체 이름 */}
                                                        <span className="detail-bottom-ask-storeName">자재업체이름</span>
                                                        {/* 답변 날짜 */}
                                                        <span className="detail-bottom-ask-return-created">2025년 11월 09일 12시 12분</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <div className="detail-bottom-ask-return">
                                                            안녕하세요 고객님 <br />
                                                            우선 이용에 불편드려서 죄송합니다. <br />
                                                            현재 출고는 완료되었으나, <br />
                                                            택배사 물량과다로 스캔 작업 지연되고 있습니다. <br />
                                                            금일 저녁~익일 새벽에 배송조회 가능 할 것 같습니다. <br />
                                                            시간 양해 부탁드립니다. <br />
                                                            불편드려서 죄송합니다.
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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

                            {/* 배송/환불 */}
                            <div ref={deliveryRef} className="detail-bottom-return-div">
                                {/* 배송 */}
                                <div>
                                    <span className="detail-bottom-return-title">
                                        <i className="bi bi-box-seam"></i> 배송
                                    </span>
                                    <table className="detail-bottom-return-table">
                                        <tbody>
                                            <tr>
                                                <td className="detail-bottom-return-table-first-td">배송 단위</td>
                                                {/* 배송 단위 */}
                                                <td>묶음 배송</td>
                                            </tr>
                                            <tr>
                                                <td className="detail-bottom-return-table-first-td">배송비</td>
                                                {/* 배송비 */}
                                                <td>10,000원</td>
                                            </tr>
                                            <tr>
                                                <td className="detail-bottom-return-table-first-td">안내</td>
                                                <td>상품이 발송되면 송장번호를 마이페이지에서 확인하실 수 있습니다.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <span className="detail-bottom-return-title">
                                        <i className="bi bi-coin"></i> 환불
                                    </span>
                                    <div className="detail-bottom-return-second-div">
                                        <div>
                                            환불 신청은 <a href="#">마이페이지</a> <i className="bi bi-caret-right-fill"></i> <a href="#">주문 목록</a>에서 가능합니다.
                                        </div>
                                        <div>상품 수령 후 단순 변심으로 인한 환불 시, 왕복 배송비가 발생할 수 있습니다. </div>
                                        <div>환불 진행 상황은 마이페이지에서 확인하실 수 있습니다.</div>
                                    </div>
                                </div>
                                <div>
                                    <span className="detail-bottom-return-title">
                                        <i className="bi bi-arrow-repeat"></i> 반품/교환 불가능 사유
                                    </span>
                                    <div className="detail-bottom-return-third-div">
                                        <div>1. 이미 설치하거나 사용한 제품은 재판매가 어렵기 때문에 반품 불가.</div>
                                        <div>2. 제품의 포장이나 라벨이 훼손되어 상품 가치가 감소한 경우.</div>
                                        <div>
                                            3. 배송 후 일정 기간 <span className="detail-bottom-return-third-div-span">(예: 7일, 14일 등)</span> 이상 지난 경우, 또는 날씨·환경으로 인해 제품 가치가
                                            감소한 경우.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 상품 상세 우측 라인 (주문 폼) */}
                        <div className="detail-bottom-right">
                            <div className="detail-select-option">
                                <div className="detail-select-div">
                                    <select className="detail-select2">
                                        <option value="">규격</option>
                                    </select>
                                </div>
                                <div className="detail-select-div">
                                    <select className="detail-select2">
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
                                    <div className="detail-append-box-top detail-box-son2">
                                        <span className="detail-size">120x120x11700mm, 화이트</span>
                                        <i className="bi bi-x-lg detail-x-button"></i>
                                    </div>
                                    <div className="detail-append-box-bottom detail-box-son2">
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

                                <hr className="hr" />
                                <div>
                                    <div className="detail-order-price-div">
                                        <span className="detail-order-hard-span">주문 금액</span>
                                        <div>
                                            {/* 주문 금액 */}
                                            {/* 세일 퍼센트 */}
                                            <span className="detail-sale-percent">5%</span>
                                            {/* 정가 */}
                                            <del className="detail-default-price">10,000원</del>
                                            <span className="detail-order-hard-price2">20,000원</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-order-button-div">
                                    <button className="detail-bottom-order-heart">
                                        <i className="bi bi-heart "></i>
                                    </button>
                                    <button className="detail-order-button2 go-cart">장바구니</button>
                                    <button className="detail-order-button2 go-order">구매</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
