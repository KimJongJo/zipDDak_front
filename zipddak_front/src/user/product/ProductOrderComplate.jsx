import "../css/ProductOrderComplate.css";
import { useState } from "react";

export default function ProductOrderComplate() {
    // 테스트 객체배열
    const [productInfo, setProductInfo] = useState([
        {
            img: "/images/이미지테스트.png",
            productName: "발트 라운드 수납 선반 다용도 주방 거실장",
            size: "120x120x11700mm",
            color: "화이트",
            count: 1,
            price: 456000,
        },
        {
            img: "/images/이미지테스트.png",
            productName: "발트 라운드 수납 선반 다용도 주방 거실장",
            size: "120x120x11700mm",
            color: "블랙",
            count: 2,
            price: 456000,
        },
    ]);

    return (
        <div className="body-div">
            <div className="ProductOrderComplate-main-div">
                {/* 주문완료 이미지 + 날짜 */}
                <div className="order-complate-img-div">
                    <img className="order-complate-img" src="/images/이미지테스트.png" />
                    <span className="font-20 semibold">주문이 완료되었습니다</span>
                    {/* 주문 날짜 */}
                    <span className="font-14 semibold">
                        주문날짜 : <span>2025-11-27</span>
                    </span>
                </div>
                <div className="order-complate-first-table">
                    <span className="font-18 semibold">주문 상품</span>
                    <table className="order-complate-top-table margin-top-20">
                        <tbody>
                            <tr className="order-complate-top-table-first-tr">
                                <td className="order-complate-td-img">
                                    <span className="font-14">이미지</span>
                                </td>
                                <td className="order-complate-td-productName">
                                    <span className="font-14">상품명</span>
                                </td>
                                <td className="order-complate-td-colorSize">
                                    <span className="font-14">색상/규격</span>
                                </td>
                                <td>
                                    <span className="font-14">수량</span>
                                </td>
                                <td className="order-complate-td-totalPrice">
                                    <span className="font-14">합계금액</span>
                                </td>
                            </tr>
                            {productInfo.map((product) => (
                                <tr className="order-complate-second-table-tr">
                                    <td>
                                        <img className="order-complate-product-img" src={product.img} />
                                    </td>
                                    <td>
                                        <span className="font-14">{product.productName}</span>
                                    </td>
                                    <td>
                                        <span className="font-14">
                                            {product.size} / {product.color}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="font-14">{product.count}</span>
                                    </td>
                                    <td>
                                        <span className="font-14">{(product.count * product.price).toLocaleString()}원</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* 배송지 정보 */}
                <div>
                    <span className="font-18 semibold">배송지 정보</span>
                    <table className="order-complate-second-table margin-top-20">
                        <tbody>
                            <tr>
                                <td className="order-complate-th">
                                    <span className="font-14">이름</span>
                                </td>
                                <td className="order-complate-td">
                                    {/* 받는 사람 */}
                                    <span className="font-14">김종조</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="order-complate-th order-complate-line">
                                    <span className="font-14">전화번호</span>
                                </td>
                                <td className="order-complate-td  order-complate-line">
                                    {/* 전화번호 */}
                                    <span className="font-14">010-1111-1111</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="order-complate-th  order-complate-line">
                                    <span className="font-14">배송지주소</span>
                                </td>
                                <td className="order-complate-td  order-complate-line">
                                    {/* 배송지 주소 */}
                                    <span className="font-14">(12345) 서울 금천구 가산디지털1로 70 9층</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* 결제 정보 */}
                <div>
                    <span className="font-18 semibold">결제 정보</span>
                    <table className="order-complate-third-table margin-top-20">
                        <tbody>
                            <tr>
                                <td className="order-complate-th">
                                    <span className="font-14">상품 금액</span>
                                </td>
                                {/* 상품 금액 */}
                                <td className="order-complate-td">
                                    <span className="font-14">10,000원</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="order-complate-th order-complate-line">
                                    <span className="font-14">배송비</span>
                                </td>
                                <td className="order-complate-td order-complate-line">
                                    <span className="font-14">0원</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="order-complate-th order-complate-line">
                                    <span className="font-14">총 결제 금액</span>
                                </td>
                                <td className="order-complate-td order-complate-line">
                                    <span className="font-14">10,000원</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="order-complate-button-div">
                    <button className="order-complate-button">홈으로</button>
                </div>
            </div>
        </div>
    );
}
