import "../css/ProductOrder.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { orderListAtom } from "./productAtom";
import { baseUrl } from "../../config";
import axios from "axios";
import { Modal } from "reactstrap";
import { Modal as AddrModal } from "antd";
import DaumPostcode from "react-daum-postcode";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { tokenAtom, userAtom } from "../../atoms";
import { useAtom, useAtomValue } from "jotai";
import { myAxios } from "../../config";

export default function ProductOrder() {
  // const user = useAtomValue(userAtom);
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  // 주문에 쓰일 데이터
  const [orderData, setOrderData] = useState({});

  const [brand, setBrand] = useState([]);

  const [orderList, setOrderList] = useAtom(orderListAtom);
  const [options, setOptions] = useState({});

  const [productInfo, setProductInfo] = useState([]);

  // 총 상품 금액
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  // 총 결제 금액
  const [totalPrice, setTotalPrice] = useState(0);
  // 총 배송 금액
  const [postChargeTotal, setPostChargeTotal] = useState(0);

  const totalPostChargeAllBrands = brand.reduce((sumBrand, b) => {
    const singlePostCharge = b.orderList
      .filter((o) => o.postType === "single")
      .reduce((sum, o) => sum + o.postCharge, 0);

    const bundleOptions = b.orderList.filter((o) => o.postType === "bundle");
    const bundleTotalPrice = bundleOptions.reduce(
      (sum, o) => sum + o.price * o.count,
      0
    );

    let bundlePostCharge = 0;
    if (bundleOptions.length > 0) {
      bundlePostCharge =
        bundleTotalPrice >= b.freeChargeAmount ? 0 : b.basicPostCharge;
    }

    const totalPostCharge = singlePostCharge + bundlePostCharge;

    return sumBrand + totalPostCharge;
  }, 0);

  const [recvUser, setRecvUser] = useState({
    sender: "",
    recvier: "",
    tel: "",
    zonecode: "",
    addr1: "",
    detailAddress: "",
    requestContent: "",
  });

  //주소
  const [isAddOpen, setIsAddOpen] = useState(false);

  const complateHandler = (data) => {
    console.log(data);
    setRecvUser({
      ...recvUser,
      zonecode: data.zonecode,
      addr1: data.roadAddress || data.address,
    });
  };

  const closeHandler = (state) => {
    setIsAddOpen(false);
  };

  const changeRecvUserInfo = (e) => {
    setRecvUser({
      ...recvUser,
      [e.target.name]: e.target.value,
    });
  };

  // 수량 증가
  const increaseCount = (sellerIdx, productId, optionId) => {
    setBrand((prevBrands) =>
      prevBrands.map((brand) => {
        if (brand.sellerIdx === sellerIdx) {
          return {
            ...brand,
            orderList: brand.orderList.map((option) =>
              option.optionId === optionId
                ? { ...option, count: option.count + 1 }
                : option
            ),
          };
        }
        return brand;
      })
    );

    // 2. Atom 업데이트
    setOrderList((prevOrders) =>
      prevOrders.map((order) =>
        order.productId === productId && order.optionId === optionId
          ? { ...order, count: order.count + 1 }
          : order
      )
    );
  };

  // 수량 감소
  const decreaseCount = (sellerIdx, productId, optionId) => {
    // 1. brand 업데이트
    setBrand((prevBrands) =>
      prevBrands.map((brand) => {
        if (brand.sellerIdx === sellerIdx) {
          return {
            ...brand,
            orderList: brand.orderList
              .map((option) =>
                option.productId === productId && option.optionId === optionId
                  ? { ...option, count: option.count - 1 }
                  : option
              )
              .filter((option) => option.count > 0),
          };
        }
        return brand;
      })
    );

    // 2. Atom 업데이트
    setOrderList((prevOrders) =>
      prevOrders
        .map((order) =>
          order.productId === productId && order.optionId === optionId
            ? { ...order, count: order.count - 1 }
            : order
        )
        .filter((order) => order.count > 0)
    );
  };

  // 구매 목록에서 상품 삭제
  const removeProduct = (sellerIdx, optionId) => {
    setBrand((prevBrands) =>
      prevBrands.map((brand) => {
        if (brand.sellerIdx === sellerIdx) {
          return {
            ...brand,
            orderList: brand.orderList.filter(
              (option) => option.optionId !== optionId
            ),
          };
        }
        return brand;
      })
    );
  };

  // 위와 동일하게 채우기 버튼 클릭 이벤트
  const sameInfo = () => {
    setRecvUser({ ...recvUser, recvier: user.name, tel: user.tel });
  };

  useEffect(() => {
    let total = 0;
    brand.map((option) => {
      option.orderList.map((order) => {
        total += order.count * (order.price + order.salePrice);
      });
    });

    setPostChargeTotal(totalPostChargeAllBrands);
    setProductTotalPrice(total);
    total += postChargeTotal;
    setTotalPrice(total);
  }, [brand]);

  useEffect(() => {
    if (orderList.length > 0) {
      myAxios(token, setToken)
        .post(`${baseUrl}/user/orderListProduct2`, {
          orderList,
          username: user.username,
        })
        .then((res) => {
          console.log(res.data);
          // setOptions(res.data);
          setBrand(res.data.brandDto);
          // setProductInfo(res.data.orderList);
          setUser({
            ...user,
            name: res.data.userInfo.name,
            tel: res.data.userInfo.phone,
          });
        });
    }
  }, [orderList]);

  // 토스 페이먼츠 결제 요청 시작
  const requestTossPaymentApi = async () => {
    const res = await axios.post(`${baseUrl}/user/payment/product`, {
      username: user.username,
      brandList: brand,
      recvUser: recvUser,
    });

    const { orderId, orderName, amount } = res.data;

    const encodedOrderName = encodeURIComponent(orderName);

    // 테스트 경우 클라이언트 키가 노출되어도 상관 없음
    // 실제 운영하는 환경에서는 서버에서 clientKey를 내려주고 클라이언트 요청시 가져와서 사용
    const tossPayments = await loadTossPayments(
      "test_ck_Ba5PzR0ArnGLGeODLa1B8vmYnNeD"
    );

    await tossPayments.requestPayment({
      method: "CARD",
      amount: amount,
      orderId: orderId,
      orderName: orderName,
      successUrl: `http://localhost:8080/user/payment/complate?productId=${options.productId}&orderName=${encodedOrderName}&username=${user.username}`, // 성공시 서버쪽으로 보냄
      failUrl: "http://localhost:5173/zipddak/productOrder",
    });
  };

  return (
    <div className="body-div">
      <div className="ProductOrder-main-div">
        <div>
          <div className="productOrder-body-div">
            {/* 주문상품 좌측 정보 들 */}
            <div className="productOrder-left">
              {/* 주문상품 */}
              <div>
                <span className="product-order-check-span">주문 상품</span>
                {/* 업체이름 div */}
                {brand.map((brand) => {
                  // 1. single 배송비 누적
                  let singlePostCharge = brand.orderList
                    .filter((o) => o.postType === "single")
                    .reduce((sum, o) => sum + o.postCharge, 0);

                  // 2. bundle 합계
                  const bundleOptions = brand.orderList.filter(
                    (o) => o.postType === "bundle"
                  );
                  const bundleTotalPrice = bundleOptions.reduce(
                    (sum, o) => sum + o.price * o.count,
                    0
                  );

                  // 3. bundle 배송비 계산
                  let bundlePostCharge = 0;
                  if (bundleOptions.length > 0) {
                    bundlePostCharge =
                      bundleTotalPrice >= brand.freeChargeAmount
                        ? 0
                        : brand.basicPostCharge;
                  }

                  // 4. 브랜드 전체 배송비
                  const totalPostCharge = singlePostCharge + bundlePostCharge;

                  return (
                    <React.Fragment key={brand.sellerIdx}>
                      <div className="product-order-check-store-div">
                        <span className="font-15">{brand.brandName}</span>
                        {totalPostCharge !== 0 ? (
                          <span className="font-15">
                            배송비: {totalPostCharge.toLocaleString()}원
                          </span>
                        ) : (
                          <span className="font-15">무료배송</span>
                        )}
                      </div>

                      {brand.orderList.map((option, index) => (
                        <div
                          className="product-order-check-detail"
                          key={option.optionId}
                        >
                          <div className="product-order-check-img-div">
                            <img
                              className="product-order-check-img"
                              src={
                                option.imgStoragePath + "" + option.productImg
                              }
                            />
                          </div>

                          <div className="product-order-check-buy-info">
                            <div className="product-order-check-info">
                              <span className="font-16">
                                {option.productName}
                              </span>
                              <span className="font-14">
                                {option.name} / {option.value}
                              </span>

                              <div className="detail-append-button">
                                <button
                                  className="count-button-style"
                                  onClick={() =>
                                    decreaseCount(
                                      brand.sellerIdx,
                                      option.productId,
                                      option.optionId
                                    )
                                  }
                                >
                                  <i className="bi bi-dash-lg append-button-son"></i>
                                </button>

                                <span className="font-14">{option.count}</span>

                                <button
                                  className="count-button-style"
                                  onClick={() =>
                                    increaseCount(
                                      brand.sellerIdx,
                                      option.productId,
                                      option.optionId
                                    )
                                  }
                                >
                                  <i className="bi bi-plus-lg append-button-son"></i>
                                </button>
                              </div>
                            </div>

                            <div className="product-order-check-buy-right">
                              <button
                                onClick={() =>
                                  removeProduct(
                                    brand.sellerIdx,
                                    option.optionId
                                  )
                                }
                                className="count-button-style"
                              >
                                <i className="bi bi-x-lg detail-x-button"></i>
                              </button>
                              <span className="font-14">
                                {(
                                  (option.price + option.salePrice) *
                                  option.count
                                ).toLocaleString()}
                                <span>원</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* 주문자 */}
              <div>
                <span className="product-order-check-span">주문자</span>
                <div>
                  <table className="product-order-info-table">
                    <tbody>
                      <tr>
                        <td>
                          <span className="font-15">이름</span>
                        </td>
                        <td>
                          <Input
                            value={user.name}
                            className="product-order-check-input font-15"
                            onChange={(e) =>
                              setUser({ ...user, name: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">이메일</span>
                        </td>
                        <td>
                          <div className="product-order-check-input-email-div">
                            <Input className="product-order-check-input font-15" />
                            <i className="bi bi-at email-icon"></i>
                            <select
                              className="product-order-check-email-select font-15"
                              id="emailDomain"
                              defaultValue="none"
                            >
                              <option value="none" hidden>
                                선택
                              </option>
                              <option value="gmail.com">gmail.com</option>
                              <option value="naver.com">naver.com</option>
                              <option value="daum.net">daum.net</option>
                              <option value="hotmail.com">hotmail.com</option>
                            </select>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">전화번호</span>
                        </td>
                        <td>
                          <div className="product-order-check-input-tel-div">
                            <Input
                              className="product-order-check-input-tel-first font-15"
                              value={"010"}
                              readOnly
                            />
                            <Input
                              value={user.tel || ""}
                              onChange={(e) =>
                                setUser({ ...user, tel: e.target.value })
                              }
                              maxLength={8}
                              className="product-order-check-input-tel-second font-15"
                              type="tel"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 배송지 */}
              <div>
                <div className="product-order-check-address-div">
                  <span className="product-order-check-span">배송지</span>
                  <button
                    className="product-order-check-address-same-button"
                    onClick={() => sameInfo()}
                  >
                    위와 동일하게 채우기
                  </button>
                </div>
                <div>
                  <table className="product-order-check-address-table">
                    <tbody>
                      <tr>
                        <td>
                          <span className="font-15">배송자명</span>
                        </td>
                        <td>
                          <Input
                            name="sender"
                            onChange={changeRecvUserInfo}
                            className="product-order-check-input font-15"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">받는사람</span>
                        </td>
                        <td>
                          <Input
                            name="recvier"
                            onChange={changeRecvUserInfo}
                            value={recvUser.recvier}
                            className="product-order-check-input font-15"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">전화번호</span>
                        </td>
                        <td>
                          <div className="product-order-check-input-tel-div">
                            <Input
                              className="product-order-check-input-tel-first font-15"
                              value={"010"}
                              readOnly
                            />
                            <Input
                              name="tel"
                              onChange={changeRecvUserInfo}
                              value={recvUser.tel || ""}
                              maxLength={8}
                              className="product-order-check-input-tel-second font-15"
                              type="tel"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">주소</span>
                        </td>
                        <td>
                          <div className="product-order-check-input-address-button-div">
                            <button
                              className="product-order-check-input-address-button"
                              onClick={() => setIsAddOpen(!isAddOpen)}
                            >
                              찾기
                            </button>
                            <Input
                              readOnly
                              value={recvUser.zonecode || ""}
                              name="postCode"
                              className="product-order-check-input-address-input font-15"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <Input
                            readOnly
                            value={recvUser.addr1 || ""}
                            name="address"
                            className="product-order-check-input-address font-15"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <Input
                            name="detailAddress"
                            onChange={changeRecvUserInfo}
                            placeholder="상세주소를 입력해주세요"
                            className="font-15 height-38"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          <div className="product-order-check-input-save-address">
                            <input
                              className="test"
                              type="checkbox"
                              id="beforeFormAddress"
                            />
                            <label htmlFor="beforeFormAddress">
                              <span className="font-15">
                                기본 배송지로 저장
                              </span>
                            </label>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span className="font-15">요청사항</span>
                        </td>
                        <td>
                          <Input
                            name="requestContent"
                            onChange={changeRecvUserInfo}
                            className="product-order-check-input-address-detail font-15"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 오른쪽 결제 폼 */}
            <div className="product-order-form-div">
              <div className="product-order-form-div-top">
                <div className="product-order-form-div-intop">
                  <span className="font-16 semibold">결제금액</span>
                  <div className="product-order-form-second">
                    <span className="font-15">총 상품 금액</span>
                    <span className="font-14">
                      {productTotalPrice.toLocaleString()}원
                    </span>
                  </div>
                  <div className="product-order-form-second">
                    <span className="font-15">배송비</span>
                    <span className="font-14">
                      {postChargeTotal.toLocaleString()}원
                    </span>
                  </div>
                  <div className="product-order-form-second">
                    <span className="font-16 semibold">최종 결제 금액</span>
                    <span>
                      <span className="font-22 semibold order-price">
                        {totalPrice.toLocaleString()}
                      </span>
                      원
                    </span>
                  </div>
                </div>
                {/* 아래 주문 확인 설명 */}
                <div className="product-order-from-bottom-content">
                  <span className="font-13 semibold">
                    본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.
                  </span>
                  <div className="font-11 product-order-from-bottom-content-indiv">
                    본 사이트는 통신판매중개자로서 상품의 거래 당사자가
                    아닙니다. 따라서 판매자가 등록한 상품정보 및 거래 과정에서
                    발생하는 문제에 대해 책임을 지지 않습니다. 단, 이용자는 업체
                    신고 및 문의하기 기능을 통해 판매자와의 소통이 가능하며,
                    문제가 발생한 경우 이를 통해 조치를 요청하실 수 있습니다.
                  </div>
                </div>
              </div>
              <button
                onClick={requestTossPaymentApi}
                className="product-order-from-bottom-button font-16 semibold"
              >
                {totalPrice.toLocaleString()}원 결제하기
              </button>
            </div>
          </div>

          <Modal className="ask-modal-box" isOpen={modal} toggle={toggle}>
            <div className="ask-modal-body">
              <div>한 개 이상의 상품을 선택해야 주문할 수 있습니다.</div>

              <div className="ask-modal-body-button-div">
                <button
                  className="ask-modal-write ask-modal-button"
                  type="button"
                  onClick={toggle}
                >
                  확인
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </div>

      {isAddOpen && (
        <AddrModal
          title="주소찾기"
          open={isAddOpen}
          footer={null}
          onCancel={() => setIsAddOpen(false)}
        >
          <DaumPostcode onComplete={complateHandler} onClose={closeHandler} />
        </AddrModal>
      )}
    </div>
  );
}
