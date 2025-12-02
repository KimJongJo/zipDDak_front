import React, { useEffect, useState } from "react";
import "../../css/user-product/Cart.css";

export default function Cart() {
    const [checkedItems, setCheckedItems] = useState({});
    const [groupedCart, setGroupedCart] = useState([]);

    const handleCheck = (cartNo) => {
        setCheckedItems((prev) => ({
            ...prev,
            [cartNo]: !prev[cartNo], // 토글
        }));
    };

    const [cart, setCart] = useState([
        // 업체별로 나누기
        {
            storeId: 1,
            storeName: "업체 이름1",
            cartList: [
                {
                    cartNo: 1,
                    productId: 1,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "화이트",
                    productCount: 1,
                    // 배송단위
                    shipping_unit: "묶음배송",
                    // 배송비
                    shipping_fee: 4000,
                    productPrice: 240000,
                },
                {
                    cartNo: 2,
                    productId: 1,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "블랙",
                    productCount: 2,
                    // 배송단위
                    shipping_unit: "묶음배송",
                    // 배송비
                    shipping_fee: 4000,
                    productPrice: 240000,
                },
            ],
        },
        {
            storeId: 2,
            storeName: "업체 이름2",
            cartList: [
                {
                    cartNo: 3,
                    productId: 2,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "화이트",
                    productCount: 1,
                    // 배송단위
                    shipping_unit: "묶음배송",
                    // 배송비
                    shipping_fee: 4000,
                    productPrice: 240000,
                },
                {
                    cartNo: 4,
                    productId: 2,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "블랙",
                    productCount: 2,
                    // 배송단위
                    shipping_unit: "묶음배송",
                    // 배송비
                    shipping_fee: 4000,
                    productPrice: 240000,
                },
                {
                    cartNo: 5,
                    productId: 3,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "블랙",
                    productCount: 2,
                    // 배송단위
                    shipping_unit: "개별배송",
                    // 배송비
                    shipping_fee: 4000,
                    productPrice: 240000,
                },
                {
                    cartNo: 6,
                    productId: 3,
                    productImg: "/images/이미지테스트.png",
                    productName: "국내산 무광 다로스 니켈 고급 싱크대수전 주방수전 교체 2color",
                    productSize: "120x120x11700mm",
                    productColor: "블랙",
                    productCount: 2,
                    // 배송단위
                    shipping_unit: "무료배송",
                    // 배송비
                    shipping_fee: 0,
                    productPrice: 240000,
                },
            ],
        },
    ]);

    const calculateCheckedTotal = () => {
        let totalPrice = 0;
        let totalShippingFee = 0;

        cart.forEach((store) => {
            // 배송 단위별로 그룹핑
            const shippingGroups = store.cartList.reduce((acc, product) => {
                if (!acc[product.shipping_unit]) acc[product.shipping_unit] = [];
                acc[product.shipping_unit].push(product);
                return acc;
            }, {});

            Object.values(shippingGroups).forEach((products) => {
                let groupHasChecked = false;

                products.forEach((product) => {
                    if (checkedItems[product.cartNo]) {
                        totalPrice += product.productPrice * product.productCount;
                        groupHasChecked = true; // 그룹에 체크된 상품이 있음을 표시
                    }
                });

                // 그룹 내 체크된 상품이 하나라도 있으면 배송비 한 번만 추가
                if (groupHasChecked) {
                    totalShippingFee += products[0].shipping_fee;
                }
            });
        });

        return { totalPrice, totalShippingFee };
    };

    const { totalPrice, totalShippingFee } = calculateCheckedTotal();

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        const newCheckedItems = {};

        // cart 상태를 기준으로 모든 cartNo 가져오기
        cart.forEach((store) => {
            store.cartList.forEach((product) => {
                newCheckedItems[product.cartNo] = isChecked;
            });
        });

        setCheckedItems(newCheckedItems);
    };

    const increaseCount = (cartNo) => {
        setCart((prev) =>
            prev.map((store) => ({
                ...store,
                cartList: store.cartList.map((product) => (product.cartNo === cartNo ? { ...product, productCount: product.productCount + 1 } : product)),
            }))
        );
    };

    const decreaseCount = (cartNo) => {
        setCart((prev) =>
            prev.map((store) => ({
                ...store,
                cartList: store.cartList.map((product) => (product.cartNo === cartNo && product.productCount > 1 ? { ...product, productCount: product.productCount - 1 } : product)),
            }))
        );
    };

    return (
        <div className="body-div">
            <div className="Cart-main-div">
                {/* 왼쪽 장바구니 목록 */}
                <div className="cart-product-info-list">
                    <div>
                        <span className="font-22 semibold">장바구니</span>
                    </div>
                    <div className="cart-top-selectAll-div">
                        <div className="cart-top-selectAll-left-div">
                            <input
                                type="checkbox"
                                id="cartSelectAll"
                                className="cart-selectAll-input"
                                onChange={handleSelectAll}
                                checked={Object.keys(checkedItems).length > 0 && Object.values(checkedItems).every((v) => v)}
                            />
                            <label htmlFor="cartSelectAll" className="font-14 medium">
                                모두선택
                            </label>
                        </div>
                        <button className="cart-select-delete-button font-14 medium">선택삭제</button>
                    </div>
                    <table className="cart-table">
                        <thead>
                            <tr className="cart-table-trtd">
                                <td colSpan={2}>
                                    <span>상품정보</span>
                                </td>
                                <td>
                                    <span>수량</span>
                                </td>
                                <td style={{ width: "130px" }}>
                                    <span>상품금액</span>
                                </td>
                                <td style={{ width: "130px" }}>
                                    <span>배송단위</span>
                                </td>
                                <td style={{ width: "70px" }}>
                                    <span>배송비</span>
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((store) => {
                                // store.cartList를 배송단위별로 그룹핑
                                const groupedByUnit = store.cartList.reduce((acc, product) => {
                                    if (!acc[product.shipping_unit]) acc[product.shipping_unit] = [];
                                    acc[product.shipping_unit].push(product);
                                    return acc;
                                }, {});

                                return (
                                    <React.Fragment key={store.storeId}>
                                        {/* 업체 헤더 */}
                                        <tr className="store-row">
                                            <td colSpan={5}>
                                                <div className="store-title">
                                                    <span className="font-14 medium">{store.storeName}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <a href="#" className="font-14 cart-store-info-a">
                                                    <span>업체 정보</span> <i className="bi bi-chevron-right" style={{ fontSize: "12px" }}></i>
                                                </a>
                                            </td>
                                        </tr>

                                        {/* 배송단위별 그룹 */}
                                        {Object.entries(groupedByUnit).map(([unit, items], groupIdx, arr) => {
                                            const isLastGroup = groupIdx === arr.length - 1;

                                            return (
                                                <React.Fragment key={unit}>
                                                    {items.map((product, idx) => (
                                                        <tr
                                                            key={product.cartNo}
                                                            className="cart-product-under-tr"
                                                            style={{
                                                                borderBottom: !isLastGroup && idx === items.length - 1 ? "1px solid #e6e6e6" : "none",
                                                            }}
                                                        >
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    className="cart-selectAll-input"
                                                                    checked={!!checkedItems[product.cartNo]}
                                                                    onChange={() => handleCheck(product.cartNo)}
                                                                />
                                                            </td>

                                                            <td style={{ width: "380px" }}>
                                                                <div className="cart-product-img-info-div">
                                                                    <img className="cart-product-img" src={product.productImg} alt="" />
                                                                    <div className="cart-product-info-name">
                                                                        <span className="font-14 medium">{product.productName}</span>
                                                                        <span className="font-14" style={{ color: "#6A7685" }}>
                                                                            {product.productSize} / {product.productColor}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                                    <div className="detail-append-button">
                                                                        <button className="count-button-style" onClick={() => decreaseCount(product.cartNo)}>
                                                                            <i className="bi bi-dash-lg append-button-son"></i>
                                                                        </button>
                                                                        <span className="font-14">{product.productCount}</span>
                                                                        <button className="count-button-style" onClick={() => increaseCount(product.cartNo)}>
                                                                            <i className="bi bi-plus-lg append-button-son"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td style={{ textAlign: "center" }}>
                                                                <span className="font-14 medium">{(product.productPrice * product.productCount).toLocaleString()}원</span>
                                                            </td>

                                                            <td style={{ textAlign: "center" }}>
                                                                <span className="font-15">{product.shipping_unit}</span>
                                                            </td>

                                                            {idx === 0 && (
                                                                <td rowSpan={items.length} style={{ textAlign: "center" }}>
                                                                    <span className="font-15">{product.shipping_fee.toLocaleString()}원</span>
                                                                </td>
                                                            )}
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            );
                                        })}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* 결제 box */}
                <div className="cart-pay-box">
                    <div className="cart-pay-box-top-info">
                        <span className="font-15">총 상품 금액</span>
                        <span className="font-14">{totalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="cart-pay-box-top-info cart-pay-box-top-second-div">
                        <span className="font-15">총 배송비</span>
                        <span className="font-14">{totalShippingFee.toLocaleString()}원</span>
                    </div>
                    <div className="cart-pay-box-top-info cart-pay-box-top-last-div">
                        <span className="font-16 semibold">결제 금액</span>
                        <span className="font-22 semibold total-price-info">
                            {(totalPrice + totalShippingFee).toLocaleString()}
                            <span className="font-16">원</span>
                        </span>
                    </div>
                    {/* 구매 버튼 */}
                    {/* 수량 들어가야함 */}
                    <button className="cart-pay-box-bottom-button font-16 semibold">1개 상품 구매하기</button>
                </div>
            </div>
        </div>
    );
}
