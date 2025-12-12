import React, { useEffect, useState } from "react";
import "../css/Cart.css";
import axios from "axios";
import { baseUrl } from "../../config";
import { useAtom } from "jotai";
import { orderListAtom } from "./productAtom";
import { useNavigate } from "react-router";
import { Modal } from "reactstrap";

export default function Cart() {
    const navigate = useNavigate();

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [checkedItems, setCheckedItems] = useState({});
    const [groupedCart, setGroupedCart] = useState([]);
    const [orderList, setOrderList] = useAtom(orderListAtom);

    const handleCheck = (cartNo) => {
        setCheckedItems((prev) => ({
            ...prev,
            [cartNo]: !prev[cartNo], // 토글
        }));
    };

    useEffect(() => {
        axios.get(`${baseUrl}/cartList?page=1&username=rlawhdwh`).then((res) => {
            console.log(res.data);
            setGroupedCart(res.data);

            setOrderList([]);
        });
    }, []);

    // 선택 상품 삭제
    const cartDeleteProducts = () => {
        setGroupedCart((prev) => {
            // 1. 각 store에서 선택된 product 제거
            const updated = prev
                .map((store) => ({
                    ...store,
                    productList: store.productList.filter((product) => !checkedItems[product.cartIdx]),
                }))
                // 2. productList가 비어 있으면 그 store 자체도 제거
                .filter((store) => store.productList.length > 0);

            return updated; // ⭐ 반드시 return 해야 state가 업데이트됨!
        });
        axios.post(`${baseUrl}/cartList/delete`, { cartIdxs: Object.keys(checkedItems).map(Number) }).then((res) => {
            console.log(res.data);
        });
    };

    const calculateCheckedTotal = () => {
        let totalPrice = 0;
        let totalShippingFee = 0;

        groupedCart.forEach((store) => {
            // 배송 단위별 그룹핑
            const shippingGroups = store.productList.reduce((acc, product) => {
                if (!acc[product.postType]) acc[product.postType] = [];
                acc[product.postType].push(product);
                return acc;
            }, {});

            Object.values(shippingGroups).forEach((products) => {
                // 묶음배송인지 확인
                const isBundleGroup = products[0].postType === "bundle";

                if (!isBundleGroup) {
                    // ★ 개별배송(single)
                    products.forEach((product) => {
                        if (checkedItems[product.cartIdx]) {
                            totalPrice += (product.productSalePrice + product.optionPrice) * product.quantity;
                            totalShippingFee += product.postCharge * product.quantity;
                        }
                    });
                } else {
                    // ★ 묶음배송(bundle)
                    let bundleCheckedAmount = 0; // 체크된 상품들의 합계
                    let hasChecked = false; // 이 묶음 그룹에 체크된 상품이 있는지

                    products.forEach((product) => {
                        if (checkedItems[product.cartIdx]) {
                            hasChecked = true;
                            bundleCheckedAmount += (product.productSalePrice + product.optionPrice) * product.quantity;
                            totalPrice += (product.productSalePrice + product.optionPrice) * product.quantity;
                        }
                    });

                    // 묶음배송인데 체크된 상품이 1개도 없으면 배송비 계산할 필요 없음
                    if (!hasChecked) return;

                    // ★ 묶음배송의 무료배송 조건 체크
                    if (bundleCheckedAmount < store.freeChargeAmount) {
                        totalShippingFee += store.basicPostCharge;
                    }
                }
            });
        });

        return { totalPrice, totalShippingFee };
    };

    const { totalPrice, totalShippingFee } = calculateCheckedTotal();

    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;

        const newCheckedItems = {};
        const newOrderList = [];

        // cart 상태를 기준으로 모든 cartNo 가져오기
        groupedCart.forEach((store) => {
            store.productList.forEach((product) => {
                newCheckedItems[product.cartIdx] = isChecked;

                // 모두선택 ON일 때만 orderList 채움
                if (isChecked) {
                    newOrderList.push({
                        productId: product.productIdx,
                        optionId: product.optionIdx,
                        name: product.optionName,
                        value: product.optionValue,
                        price: product.optionPrice,
                        count: product.quantity,
                    });
                }
            });
        });

        setCheckedItems(newCheckedItems);

        if (isChecked) {
            // 모두 선택 → 전체로 초기화
            setOrderList(newOrderList);
        } else {
            // 모두 해제 → 전체 비우기
            setOrderList([]);
        }
    };

    const increaseCount = (cartIdx, productIdx, optionIdx) => {
        // 1. groupedCart 업데이트
        setGroupedCart((prev) =>
            prev.map((store) => ({
                ...store,
                productList: store.productList.map((product) => (product.cartIdx === cartIdx ? { ...product, quantity: product.quantity + 1 } : product)),
            })),
        );
        // 2. orderListAtom 업데이트
        setOrderList((prev) => prev.map((order) => (order.productId === productIdx && order.optionId === optionIdx ? { ...order, count: order.count + 1 } : order)));

        // 3. DB에 카트 수량 증가 요청
        axios.post(`${baseUrl}/cartList/increaseCount`, { cartIdx });
    };

    const decreaseCount = (cartIdx, productIdx, optionIdx) => {
        // 1. groupedCart 업데이트
        setGroupedCart((prev) =>
            prev
                .map((store) => ({
                    ...store,
                    productList: store.productList.map((product) => (product.cartIdx === cartIdx ? { ...product, quantity: product.quantity - 1 } : product)).filter((product) => product.quantity > 0), // 0이면 삭제
                }))
                .filter((store) => store.productList.length > 0),
        );

        // 2. orderListAtom 업데이트
        setOrderList(
            (prev) => prev.map((order) => (order.productId === productIdx && order.optionId === optionIdx ? { ...order, count: order.count - 1 } : order)).filter((order) => order.count > 0), // 0이면 삭제
        );

        // 3. db에 카트 수량 감소
        axios.post(`${baseUrl}/cartList/decreaseCount`, { cartIdx: cartIdx });
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
                            <input type="checkbox" id="cartSelectAll" className="cart-selectAll-input" onChange={handleSelectAll} checked={Object.keys(checkedItems).length > 0 && Object.values(checkedItems).every((v) => v)} />
                            <label htmlFor="cartSelectAll" className="font-14 medium">
                                모두선택
                            </label>
                        </div>
                        <button className="cart-select-delete-button font-14 medium" onClick={cartDeleteProducts}>
                            선택삭제
                        </button>
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
                            {groupedCart.map((store) => {
                                // store.cartList를 배송단위별로 그룹핑
                                const groupedByUnit = store.productList.reduce((acc, product) => {
                                    if (!acc[product.postType]) acc[product.postType] = [];
                                    acc[product.postType].push(product);
                                    return acc;
                                }, {});

                                return (
                                    <React.Fragment key={store.brandId}>
                                        {/* 업체 헤더 */}
                                        <tr className="store-row">
                                            <td colSpan={5}>
                                                <div className="store-title" style={{ display: "flex", justifyContent: "flex-start" }}>
                                                    <span style={{ marginRight: "540px" }} className="font-14 medium">
                                                        {store.brandName}
                                                    </span>
                                                    <span>묶음배송 무료 전환 기준금액 : {store.freeChargeAmount}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <a href={"/zipddak/storeInfo/" + store.brandId} className="font-14 cart-store-info-a">
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
                                                            key={product.cartIdx}
                                                            className="cart-product-under-tr"
                                                            style={{
                                                                borderBottom: !isLastGroup && idx === items.length - 1 ? "1px solid #e6e6e6" : "none",
                                                            }}
                                                        >
                                                            <td>
                                                                <input
                                                                    type="checkbox"
                                                                    value={product.cartIdx}
                                                                    className="cart-selectAll-input"
                                                                    checked={!!checkedItems[product.cartIdx]}
                                                                    onChange={() => {
                                                                        handleCheck(product.cartIdx);

                                                                        const isChecked = !checkedItems[product.cartIdx];

                                                                        if (isChecked) {
                                                                            // 체크 ON
                                                                            setOrderList((prev) => [
                                                                                ...prev,
                                                                                {
                                                                                    productId: product.productIdx,
                                                                                    optionId: product.optionIdx,
                                                                                    name: product.optionName,
                                                                                    value: product.optionValue,
                                                                                    price: product.optionPrice,
                                                                                    count: product.quantity,
                                                                                },
                                                                            ]);
                                                                        } else {
                                                                            // 체크 OFF → 삭제
                                                                            setOrderList((prev) => prev.filter((item) => !(item.productId === product.productIdx && item.optionId === product.optionIdx)));
                                                                        }
                                                                    }}
                                                                />
                                                            </td>

                                                            <td style={{ width: "380px" }}>
                                                                <div className="cart-product-img-info-div">
                                                                    <img className="cart-product-img" src={product.productImg + "/" + product.imgStoragePath} alt="" />
                                                                    <div className="cart-product-info-name">
                                                                        <span className="font-14 medium">{product.productName}</span>
                                                                        <span className="font-14" style={{ color: "#6A7685" }}>
                                                                            {product.optionName} / {product.optionValue}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                                    <div className="detail-append-button">
                                                                        <button className="count-button-style" onClick={() => decreaseCount(product.cartIdx, product.productIdx, product.optionIdx)}>
                                                                            <i className="bi bi-dash-lg append-button-son"></i>
                                                                        </button>
                                                                        <span className="font-14">{product.quantity}</span>
                                                                        <button className="count-button-style" onClick={() => increaseCount(product.cartIdx, product.productIdx, product.optionIdx)}>
                                                                            <i className="bi bi-plus-lg append-button-son"></i>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td style={{ textAlign: "center" }}>
                                                                <span className="font-14 medium">{((product.productSalePrice + product.optionPrice) * product.quantity).toLocaleString()}원</span>
                                                            </td>

                                                            <td style={{ textAlign: "center" }}>
                                                                <span className="font-15">{product.postType === "bundle" ? "묶음배송" : "개별배송"}</span>
                                                            </td>

                                                            {idx === 0 && (
                                                                <td rowSpan={items.length} style={{ textAlign: "center" }}>
                                                                    <span className="font-15">
                                                                        {product.postType === "single"
                                                                            ? `${(product.postCharge * product.quantity).toLocaleString()}`
                                                                            : (() => {
                                                                                  let sum = 0;
                                                                                  store.productList?.map((p) => {
                                                                                      if (p.postType === "bundle") {
                                                                                          let hap = (p.productSalePrice + p.optionPrice) * p.quantity;
                                                                                          sum += hap;
                                                                                      }
                                                                                  });
                                                                                  const returnPostCharge = sum >= store.freeChargeAmount ? 0 : store.basicPostCharge;
                                                                                  return returnPostCharge.toLocaleString();
                                                                              })()}
                                                                        원
                                                                    </span>
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
                    <button
                        onClick={() => {
                            if (orderList.length === 0) {
                                toggle();
                                return;
                            }
                            navigate("/zipddak/productOrder");
                        }}
                        className="cart-pay-box-bottom-button font-16 semibold"
                    >
                        1개 상품 구매하기
                    </button>
                </div>
                <Modal className="ask-modal-box" isOpen={modal} toggle={toggle}>
                    <div className="ask-modal-body">
                        <div>1개 이상의 상품을 선택하셔야 합니다.</div>
                        <div className="ask-modal-body-button-div">
                            <button className="ask-modal-back ask-modal-button" type="button" onClick={toggle}>
                                확인
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
