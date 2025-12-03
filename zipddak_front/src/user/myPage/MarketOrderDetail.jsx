import { useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function MarketOrderDetail() {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]);
  const [targetReview, setTargetReview] = useState({});

  const imgRef = useRef(null);
  const navigate = useNavigate();

  // 기본
  // const order = {
  //   orderId: "ORDER-20250201-001",
  //   orderDate: "2025-02-01",
  //   cancelInfo: null,
  //   exchangeInfo: null,
  //   returnInfo: null,
  //   deliveryGroups: [
  //     {
  //       brandName: "브랜드A",
  //       deliveryType: "택배배송",
  //       deliveryFeeType: "COMBINED",
  //       deliveryFeePrice: 4000,
  //       appliedDeliveryFee: 4000,
  //       items: [
  //         {
  //           productId: "PRD-001",
  //           productName: "싱크대 수전",
  //           optionName: "블랙",
  //           quantity: 1,
  //           price: 120000,
  //           thumbnail: "https://via.placeholder.com/80",
  //           orderStatus: "배송완료",
  //           reviewAvailable: true,
  //         },
  //         {
  //           productId: "PRD-002",
  //           productName: "싱크대 호스",
  //           optionName: "1.5m",
  //           quantity: 1,
  //           price: 18000,
  //           thumbnail: "https://via.placeholder.com/80",
  //           orderStatus: "배송완료",
  //           reviewAvailable: true,
  //         },
  //       ],
  //     },
  //   ],
  //   totalProductPrice: 138000,
  //   totalDeliveryFee: 4000,
  //   totalPaymentPrice: 142000,
  //   paymentMethod: "카드결제",

  //   ordererName: "홍길동",
  //   ordererPhone: "010-1234-5678",

  //   receiverName: "홍길동",
  //   receiverPhone: "010-1234-5678",
  //   receiverAddress1: "서울 강남구 테헤란로 10",
  //   receiverAddress2: "101동 1001호",
  //   deliveryMessage: "문 앞에 두세요",
  // };
  // 취소
  // const order = {
  //   orderId: "ORDER-20250201-002",
  //   orderDate: "2025-02-01",
  //   exchangeInfo: null,
  //   returnInfo: null,
  //   deliveryGroups: [
  //     {
  //       brandName: "브랜드B",
  //       deliveryType: "택배배송",
  //       deliveryFeeType: "INDIVIDUAL",
  //       deliveryFeePrice: 3000,
  //       appliedDeliveryFee: 3000,
  //       items: [
  //         {
  //           productId: "PRD-010",
  //           productName: "LED 전구",
  //           optionName: "하얀색",
  //           quantity: 2,
  //           price: 7000,
  //           thumbnail: "https://via.placeholder.com/80",
  //           orderStatus: "취소완료",
  //           reviewAvailable: false,
  //         },
  //       ],
  //     },
  //   ],

  //   totalProductPrice: 14000,
  //   totalDeliveryFee: 3000,
  //   totalPaymentPrice: 17000,
  //   paymentMethod: "카카오페이",

  //   ordererName: "김철수",
  //   ordererPhone: "010-2222-3333",

  //   receiverName: "김철수",
  //   receiverPhone: "010-2222-3333",
  //   receiverAddress1: "부산 해운대구 삼호로 20",
  //   receiverAddress2: "202동 304호",
  //   deliveryMessage: "부재 시 경비실",

  //   cancelInfo: {
  //     refundAmount: 17000,
  //     cancelDate: "2025-02-03",
  //   },
  // };
  // 교환
  const order = {
    orderId: "ORDER-20250201-003",
    orderDate: "2025-02-01",
    cancelInfo: null,
    returnInfo: null,
    deliveryGroups: [
      {
        brandName: "브랜드C",
        deliveryType: "택배배송",
        deliveryFeeType: "COMBINED",
        deliveryFeePrice: 4000,
        appliedDeliveryFee: 4000,
        items: [
          {
            productId: "PRD-020",
            productName: "샤워기 헤드",
            optionName: "실버",
            quantity: 1,
            price: 30000,
            thumbnail: "https://via.placeholder.com/80",
            orderStatus: "교환요청",
            reviewAvailable: false,
            exchangeOption: null,
          },
          {
            productId: "PRD-021",
            productName: "샤워기 호스",
            optionName: "1m",
            quantity: 1,
            price: 5000,
            thumbnail: "https://via.placeholder.com/80",
            orderStatus: "교환요청",
            reviewAvailable: false,
            exchangeOption: "샤워기 호스22",
          },
        ],
      },
    ],

    totalProductPrice: 35000,
    totalDeliveryFee: 4000,
    totalPaymentPrice: 39000,
    paymentMethod: "카드결제",

    ordererName: "박영희",
    ordererPhone: "010-4444-5555",

    receiverName: "박영희",
    receiverPhone: "010-4444-5555",
    receiverAddress1: "대구 수성구 들안로 50",
    receiverAddress2: "301호",
    deliveryMessage: "빠른 배송 부탁드립니다",

    exchangeInfo: {
      shippingPayer: "BUYER",
      roundTripShippingFee: 6000,

      pickupReceiverName: "박영희",
      pickupReceiverPhone: "010-4444-5555",
      pickupAddress1: "대구 수성구 들안로 50",
      pickupAddress2: "301호",
      pickupMessage: "문 앞 회수 부탁드립니다",

      exchangeDate: "2025-02-04",
    },
  };
  // 반품
  // const order = {
  //   orderId: "ORDER-20250201-004",
  //   orderDate: "2025-02-01",
  //   cancelInfo: null,
  //   exchangeInfo: null,
  //   deliveryGroups: [
  //     {
  //       brandName: "브랜드D",
  //       deliveryType: "택배배송",
  //       deliveryFeeType: "INDIVIDUAL",
  //       deliveryFeePrice: 3500,
  //       appliedDeliveryFee: 3500,
  //       items: [
  //         {
  //           productId: "PRD-030",
  //           productName: "전동 드릴",
  //           optionName: "세트 구성",
  //           quantity: 1,
  //           price: 45000,
  //           thumbnail: "https://via.placeholder.com/80",
  //           orderStatus: "반품요청",
  //           reviewAvailable: false,
  //         },
  //       ],
  //     },
  //   ],

  //   totalProductPrice: 45000,
  //   totalDeliveryFee: 3500,
  //   totalPaymentPrice: 48500,
  //   paymentMethod: "계좌이체",

  //   ordererName: "이민수",
  //   ordererPhone: "010-7777-8888",

  //   receiverName: "이민수",
  //   receiverPhone: "010-7777-8888",
  //   receiverAddress1: "서울 은평구 연서로 15",
  //   receiverAddress2: "201동 501호",
  //   deliveryMessage: null,

  //   returnInfo: {
  //     deductionAmount: 5000, // 반품 검수비/배송비 등
  //     refundAmount: 43500, // totalPaymentPrice - deduction
  //     returnDate: "2025-02-05",
  //   },
  // };

  return (
    <div className="mypage-layout">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <h1 className="mypage-title">주문상세</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontWeight: "500",
            fontSize: "15px",
          }}
        >
          <p>
            주문번호{" "}
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {order.orderId}
            </span>
          </p>
          <p>
            주문일자{" "}
            <span
              style={{
                fontWeight: "600",
              }}
            >
              {order.orderDate.slice(0, 10)}
            </span>
          </p>
        </div>
      </div>
      {/* 주문상품 정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">주문상품정보</h3>
        <table className="mypage-table" style={{ width: "100%" }}>
          <thead style={{ borderTop: "none" }}>
            <tr>
              <td>상품정보</td>
              <td width="70px">수량</td>
              <td width="110px">상품금액</td>
              <td width="110px">결제금액</td>
              <td width="120px">주문상태</td>
              <td width="140px">배송비</td>
            </tr>
          </thead>
          <tbody>
            {order.deliveryGroups.map((group, gidx) => (
              <>
                {group.items.map((item, idx) => (
                  <tr
                    style={
                      gidx === order.deliveryGroups.length - 1 &&
                      idx === group.items.length - 1
                        ? { borderBottom: "1px solid rgba(0, 0, 0, 0.60)" }
                        : idx === group.items.length - 1
                        ? {}
                        : { borderBottom: "none" }
                    }
                  >
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img src={item.thumbnail} width="80px" height="80px" />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "6px",
                            width: "100%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: "600",
                            }}
                          >
                            {group.brandName}
                          </p>
                          <p
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            {item.productName}
                          </p>
                          <p
                            style={{
                              color: "#6A7685",
                            }}
                          >
                            {item.optionName}
                          </p>
                        </div>
                      </div>
                      {item.exchangeOption && (
                        <p
                          style={{
                            textAlign: "left",
                            padding: "3px 6px",
                            margin: "6px 0 0 90px",
                            width: "fit-content",
                            borderRadius: "4px",
                            fontSize: "13px",
                            border: "1px solid rgba(255, 88, 51, 0.50)",
                            background: "rgba(255, 88, 51, 0.03)",
                          }}
                        >
                          교환희망옵션 - {item.exchangeOption}
                        </p>
                      )}
                    </td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.price).toLocaleString()}원</td>
                    <td>
                      <p style={{ fontWeight: "500" }}>
                        {Number(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </td>
                    <td>
                      <p
                        style={{
                          fontWeight: "600",
                          fontSize: "16px",
                        }}
                      >
                        {item.orderStatus}
                      </p>
                    </td>
                    {idx === 0 && (
                      <td
                        rowSpan={group.items.length}
                        style={{
                          fontWeight: "500",
                        }}
                      >
                        <p>{group.deliveryType}</p>
                        {group.deliveryFee !== 0 && (
                          <p
                            style={{
                              fontWeight: "600",
                              marginTop: "4px",
                            }}
                          >
                            {Number(group.deliveryFee).toLocaleString()}원
                          </p>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
      {/* 결제정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">결제정보</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>총 상품금액</label>
          <p style={{ fontWeight: "600" }}>
            {Number(order.totalProductPrice).toLocaleString()}원
          </p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>배송비</label>
          <p>{Number(order.totalDeliveryFee).toLocaleString()}원</p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>결제금액</label>
          <p style={{ fontWeight: "600", color: "#FF5833" }}>
            {Number(order.totalPaymentPrice).toLocaleString()}원
          </p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>결제방법</label>
          <p>{order.paymentMethod}</p>
        </div>
      </div>
      {/* 환불정보 섹션(취소) */}
      {order.cancelInfo !== null && (
        <div>
          <h3 className="mypage-sectionTitle">취소정보</h3>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>총 상품금액</label>
            <p style={{ fontWeight: "600" }}>
              {Number(order.totalProductPrice).toLocaleString()}원
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>환불금액</label>
            <p style={{ fontWeight: "600", color: "#FF5833" }}>
              {Number(order.cancelInfo.refundAmount).toLocaleString()}원
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>취소일자</label>
            <p>{order.cancelInfo.cancelDate.slice(0, 10)}</p>
          </div>
        </div>
      )}
      {/* 환불정보 섹션(반품) */}
      {order.returnInfo !== null && (
        <div>
          <h3 className="mypage-sectionTitle">반품정보</h3>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>총 상품금액</label>
            <p style={{ fontWeight: "600" }}>
              {Number(order.totalProductPrice).toLocaleString()}원
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>차감금액</label>
            <p>{Number(order.returnInfo.deductionAmount).toLocaleString()}원</p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>환불금액</label>
            <p style={{ fontWeight: "600", color: "#FF5833" }}>
              {Number(order.returnInfo.refundAmount).toLocaleString()}원
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>반품일자</label>
            <p>{order.returnInfo.returnDate.slice(0, 10)}</p>
          </div>
        </div>
      )}
      {/* 교환정보 섹션 */}
      {order.exchangeInfo !== null && (
        <div>
          <h3 className="mypage-sectionTitle">교환정보</h3>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>배송비부담주체</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginLeft: "12px",
              }}
            >
              <div className="mypage-radio">
                <input
                  id="shippingPayer"
                  type="radio"
                  name="shippingPayer"
                  checked={order.exchangeInfo.shippingPayer === "SELLER"}
                  disabled
                />
                <laebl for="shippingPayer">판매자</laebl>
              </div>
              <div className="mypage-radio">
                <input
                  id="shippingPayer"
                  type="radio"
                  name="shippingPayer"
                  checked={order.exchangeInfo.shippingPayer === "BUYER"}
                  disabled
                />
                <laebl for="shippingPayer">구매자</laebl>
              </div>
            </div>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>왕복배송비</label>
            <p style={{ fontWeight: "600" }}>
              {Number(order.exchangeInfo.roundTripShippingFee).toLocaleString()}
              원
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>교환일자</label>
            <p>{order.exchangeInfo.exchangeDate.slice(0, 10)}</p>
          </div>
        </div>
      )}
      {/* 주문자정보 + 배송지정보 섹션 */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "30px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h3 className="mypage-sectionTitle">주문자 정보</h3>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>주문자</label>
            <p>{order.ordererName}</p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>휴대폰 번호</label>
            <p>{order.ordererPhone}</p>
          </div>
        </div>
        <div style={{ flex: 2 }}>
          <h3 className="mypage-sectionTitle">배송지 정보</h3>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>받는 사람</label>
            <p>{order.receiverName}</p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>휴대폰 번호</label>
            <p>{order.receiverPhone}</p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>주소</label>
            <p>
              {order.receiverAddress1} {order.receiverAddress2}
            </p>
          </div>
          <div className="labelInput-wrapper">
            <label style={{ width: "150px" }}>배송요청사항</label>
            <p>{order.deliveryMessage}</p>
          </div>
        </div>
      </div>
      {/* 회수지정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">회수지 정보</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>받는 사람</label>
          <p>{order.exchangeInfo.pickupReceiverName}</p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>휴대폰 번호</label>
          <p>{order.exchangeInfo.pickupReceiverPhone}</p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>주소</label>
          <p>
            {order.exchangeInfo.pickupAddress1}{" "}
            {order.exchangeInfo.pickupAddress2}
          </p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>배송요청사항</label>
          <p>{order.exchangeInfo.pickupMessage}</p>
        </div>
      </div>
      {/* 수거방법 섹션 */}
      {(order.returnInfo !== null || order.exchangeInfo !== null) && (
        <div>
          <h3 className="mypage-sectionTitle">수거방법</h3>
          <div
            style={{
              display: "flex",
              padding: "20px 0",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "20px",
              fontSize: "14px",
            }}
          >
            <p
              style={{
                fontWeight: "500",
              }}
            >
              판매자 지정택배에서 수거합니다.
            </p>
            <p
              style={{
                lineHeight: "18px",
              }}
            >
              택배사에 직접 연락하지 않아도 영업일 기준
              <br />
              3일 이내에 방문 합니다.
            </p>
            <p
              style={{
                color: "#375FFF",
              }}
            >
              방문 택배사 : CJ대한통운
            </p>
          </div>
        </div>
      )}
      {/* 목록 버튼 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="secondary-button"
          style={{ width: "200px", height: "40px", fontSize: "14px" }}
          onClick={() => {
            type == "order"
              ? navigate("/user/mypage/market/orders")
              : navigate("/user/mypage/market/returns");
          }}
        >
          목록
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
        className="mypage-modal"
        style={{ width: "460px" }}
      >
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          후기 작성
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <img src="" width="80px" height="80px" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "14px",
              }}
            >
              <p style={{ fontWeight: "600" }}>{targetReview.brandName}</p>
              <p style={{ fontWeight: "500" }}>{targetReview.productName}</p>
              {targetReview.optionName && (
                <p style={{ color: "#6A7685" }}>{targetReview.optionName}</p>
              )}
            </div>
          </div>
          <div className="label-wrapper">
            <label>구매한 상품은 어떠셨나요?</label>
            <div className="review-star">
              {[1, 2, 3, 4, 5].map((num) => (
                <i
                  key={num}
                  class={`bi ${rating >= num ? "bi-star-fill" : "bi-star"}`}
                  style={{
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "rgba(247, 196, 68, 1)",
                  }}
                  onClick={() => setRating(num)}
                ></i>
              ))}
            </div>
          </div>

          <div className="label-wrapper">
            <label>상품 후기를 적어주세요</label>
            <Input
              type="textarea"
              placeholder="상품에 대해 만족스러웠던 점이나, 디자인, 팁 등을 남겨주세요."
            ></Input>
          </div>

          <div className="label-wrapper">
            <label>사진 첨부</label>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {images.map((img, idx) => (
                <img key={idx} src={img} width="60px" height="60px" />
              ))}
              {images.length < 5 && (
                <div
                  onClick={() => imgRef.current.click()}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="/Plus.svg"
                    style={{ width: "20px", height: "20px" }}
                  />
                  <input type="file" hidden ref={imgRef} />
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="primary-button"
            style={{ width: "100%", height: "40px", fontSize: "14px" }}
          >
            후기 등록하기
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
