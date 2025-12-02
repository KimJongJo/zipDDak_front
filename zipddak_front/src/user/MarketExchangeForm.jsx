import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { Input, Modal, ModalBody } from "reactstrap";

export default function MarketExchangeForm() {
  const { orderId } = useParams();
  const { state } = useLocation();
  console.log(state.selectedProductIds);

  const [modal, setModal] = useState(false);
  const [images, setImages] = useState([]); // 이미지 미리보기 URL 배열
  const [files, setFiles] = useState([]); // 실제 업로드용 이미지 File 배열

  const imgRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => [...prev, URL.createObjectURL(file)]);
    setFiles((prev) => [...prev, file]);
  };

  const handleComplate = (data) => {
    let { zonecode, address } = data;
    // setUser({ ...user, postcode: zonecode, address1: address });
  };

  const handleClose = (state) => {
    if (state == "COMPLETE_CLOSE") setModal(false);
  };

  const order = {
    orderId: "ORDER-20250928-5576",
    orderDate: "2025-09-28",

    deliveryGroups: [
      {
        brandName: "브랜드A",
        deliveryType: "택배배송",
        deliveryFeeType: "COMBINED",
        deliveryFeePrice: 4000,
        appliedDeliveryFee: 4000,

        items: [
          {
            productId: "PRD-001",
            productName: "상품명이 들어갑니다",
            optionName: "블랙 / 1개입",
            quantity: 1,
            price: 245000,
            thumbnail: "https://via.placeholder.com/100",
            orderStatus: "배송완료",
            reviewAvailable: false,
            exchangeOption: "화이트 / 1개입", // 교환 희망 옵션
          },
          {
            productId: "PRD-002",
            productName: "상품명이 들어갑니다",
            optionName: "그레이 / 1개입",
            quantity: 1,
            price: 245000,
            thumbnail: "https://via.placeholder.com/100",
            orderStatus: "배송완료",
            reviewAvailable: false,
            exchangeOption: "블루 / 1개입",
          },
        ],
      },
    ],

    reasonCode: "WRONG_OPTION",
    reasonDetail: "주문 시 옵션을 잘못 선택하여 교환 요청합니다.",

    reasonImage1: "https://via.placeholder.com/120",
    reasonImage2: null,
    reasonImage3: null,
    reasonImage4: null,
    reasonImage5: null,

    receiverName: "홍길동",
    receiverPhone: "010-1234-5678",
    receiverAddress1: "서울특별시 강남구 테헤란로 120",
    receiverAddress2: "101동 1001호",

    shippingPayer: "BUYER",
    roundTripShippingFee: 6000,

    pickupReceiverName: "홍길동",
    pickupReceiverPhone: "010-1234-5678",
    pickupPostcode: "06236",
    pickupAddress1: "서울시 강남구 테헤란로 120",
    pickupAddress2: "101동 1001호",
    pickupMessage: "문 앞에 놓아두셔도 됩니다.",
  };
  const options = [
    {
      productId: "PRD-001",
      options: [
        {
          optionId: "OPT-001-1",
          optionName: "블랙 / 1개입",
          additionalPrice: 0,
        },
        {
          optionId: "OPT-001-2",
          optionName: "화이트 / 1개입",
          additionalPrice: 0,
        },
        {
          optionId: "OPT-001-3",
          optionName: "블루 / 1개입",
          additionalPrice: 2000,
        },
      ],
    },

    {
      productId: "PRD-002",
      options: [
        {
          optionId: "OPT-002-1",
          optionName: "그레이 / 1개입",
          additionalPrice: 0,
        },
        {
          optionId: "OPT-002-2",
          optionName: "블루 / 1개입",
          additionalPrice: 1000,
        },
        {
          optionId: "OPT-002-3",
          optionName: "레드 / 1개입",
          additionalPrice: 1000,
        },
      ],
    },
  ];

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
        <h1 className="mypage-title">교환신청</h1>
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

      <p
        style={{
          fontSize: "14px",
          fontWeight: "500",
          lineHeight: "20px",
        }}
      >
        교환 신청은 동일 상품 내 옵션 변경만 가능합니다.
        <br />
        상품 상태 및 회수 정보 입력 후 교환을 진행해주세요.
      </p>

      {/* 교환상품 정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">교환상품정보</h3>
        <table className="mypage-table" style={{ width: "100%" }}>
          <thead style={{ borderTop: "none" }}>
            <tr>
              <td>상품정보</td>
              <td width="200px">교환희망옵션</td>
              <td width="70px">수량</td>
              <td width="110px">상품금액</td>
              <td width="110px">결제금액</td>
              <td width="120px">배송비</td>
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
                    </td>
                    <td style={{ padding: "0 10px" }}>
                      <Input type="select" size="sm" required>
                        <option value="" disabled selected hidden>
                          옵션 선택
                        </option>
                        {(
                          options.find(
                            (opt) => opt.productId === item.productId
                          )?.options || []
                        ).map((opt) => (
                          <option key={opt.optionId} value={opt.optionId}>
                            {opt.optionName}
                            {opt.additionalPrice > 0 &&
                              ` (+${opt.additionalPrice.toLocaleString()}원)`}
                          </option>
                        ))}
                      </Input>
                    </td>
                    <td>{item.quantity}</td>
                    <td>{Number(item.price).toLocaleString()}원</td>
                    <td>
                      <p style={{ fontWeight: "500" }}>
                        {Number(item.price * item.quantity).toLocaleString()}원
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

      {/* 교환사유 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">교환 사유</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>교환 사유</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <Input type="select" required>
              <option value="" disabled selected hidden>
                사유를 선택해주세요
              </option>
              <option disabled>--- 구매자 배송비 부담 ---</option>
              <option>규격/사이즈가 현장 조건과 맞지 않음</option>
              <option>색상 또는 옵션을 잘못 선택함</option>
              <option>필요한 사이즈/길이/두께를 잘못 선택함</option>
              <option disabled>--- 판매자 배송비 부담 ---</option>
              <option>제품에 흠집/파손/변형이 있음</option>
              <option>성능 이상 또는 제조 불량으로 사용이 어려움</option>
              <option>주문한 자재와 다른 제품이 배송됨</option>
              <option>옵션/규격이 다른 제품이 배송됨</option>
            </Input>
            <Input
              type="textarea"
              placeholder="현장 사용 여부, 규격 불일치, 파손 여부 등 자세한 내용을 입력해주세요."
            ></Input>
            <div
              style={{
                display: "flex",
                gap: "12px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {images.map((img, idx) => (
                  <div style={{ position: "relative" }}>
                    <img key={idx} src={img} width="60px" height="60px" />
                    <i
                      class="bi bi-x-circle-fill"
                      style={{
                        width: "16px",
                        height: "16px",
                        position: "absolute",
                        top: "-4px",
                        right: "-4px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== idx));
                        setFiles((prev) => prev.filter((_, i) => i !== idx));
                      }}
                    />
                  </div>
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
                    <i
                      class="bi bi-plus-lg"
                      style={{
                        fontSize: "30px",
                        color: "#fff",
                      }}
                    ></i>
                    <input
                      type="file"
                      hidden
                      ref={imgRef}
                      onChange={handleImageUpload}
                    />
                  </div>
                )}
              </div>
              <p
                style={{
                  color: "#A0A0A0",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "20px",
                  margin: "0",
                }}
              >
                불량/파손 사유일 경우, 상태가 확인 가능한 사진을 함께
                첨부해주세요.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 회수지정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">회수지 정보</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>받는사람</label>
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
      </div>

      {/* 배송지정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">배송지 정보</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>받는사람</label>
          <Input />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>휴대폰 번호</label>
          <Input />
        </div>
        <div
          className="labelInput-wrapper"
          style={{ borderBottom: "none", padding: "10px 0" }}
        >
          <label style={{ width: "150px" }}>우편번호</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "100px",
            }}
          >
            <p>{order.postcode}</p>
            <button
              className="secondary-button"
              style={{ width: "100px", height: "33px" }}
              onClick={() => setModal(!modal)}
            >
              우편번호 검색
            </button>
          </div>
        </div>
        <div
          className="labelInput-wrapper"
          style={{ borderBottom: "none", padding: "10px 0" }}
        >
          <label style={{ width: "150px" }}>도로명 주소</label>
          <p>{order.address1}</p>
        </div>
        <div
          className="labelInput-wrapper"
          style={{ padding: "10px 0 16px 0" }}
        >
          <label style={{ width: "150px" }}>상세 주소</label>
          <Input value={order.address2} />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>배송요청사항</label>
          <Input />
        </div>
      </div>

      {/* 교환정보 섹션 */}
      <div>
        <h3 className="mypage-sectionTitle">
          교환정보
          <span
            style={{
              color: "#A0A0A0",
              fontSize: "12px",
              marginLeft: "10px",
              fontWeight: "400",
            }}
          >
            왕복 배송비는 교환 상품 회수 시 택배 기사님에게 착불로 부과됩니다.
          </span>
        </h3>
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
                checked={order.shippingPayer === "SELLER"}
                disabled
              />
              <laebl for="shippingPayer">판매자</laebl>
            </div>
            <div className="mypage-radio">
              <input
                id="shippingPayer"
                type="radio"
                name="shippingPayer"
                checked={order.shippingPayer === "BUYER"}
                disabled
              />
              <laebl for="shippingPayer">구매자</laebl>
            </div>
          </div>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "150px" }}>왕복배송비</label>
          <p style={{ fontWeight: "600" }}>
            {Number(order.roundTripShippingFee).toLocaleString()}원
            <span
              style={{
                color: "#A0A0A0",
                fontSize: "12px",
                marginLeft: "10px",
                fontWeight: "400",
              }}
            >
              단순 변심 교환 시 왕복 배송비는 고객 부담입니다.
            </span>
          </p>
        </div>
      </div>

      {/* 수거방법 섹션 */}
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

      {/* 목록 버튼 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          className="secondary-button"
          style={{ width: "200px", height: "40px", fontSize: "14px" }}
          onClick={() => {
            navigate("/user/mypage/market/orders");
          }}
        >
          취소
        </button>
        <button
          className="primary-button"
          style={{ width: "200px", height: "40px", fontSize: "14px" }}
          onClick={() => {
            navigate("/user/mypage/market/orders");
          }}
        >
          교환 신청 접수하기
        </button>
      </div>

      {/* 다음 주소 모달 */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalBody>
          <DaumPostcode onComplete={handleComplate} onClose={handleClose} />
        </ModalBody>
      </Modal>
    </div>
  );
}
