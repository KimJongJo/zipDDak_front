import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink, Input } from "reactstrap";

export default function MarketReturns() {
  const navigate = useNavigate();

  const orders = [
    {
      orderId: "ORDER-20250201-001",
      orderDate: "2025-02-01",
      canCancel: true,
      canExchange: false,
      canReturn: false,
      deliveryGroups: [
        {
          brandName: "브랜드A",
          deliveryType: "택배배송",
          deliveryFeeType: "INDIVIDUAL",
          deliveryFee: 4000 + 6000,
          items: [
            {
              productId: "PRD-001",
              brandName: "브랜드A",
              productName: "국내산 무광 다크스 나엘 고급 싱크대수전",
              optionName: "추가상품 - 냉/온수 호스 1세트",
              quantity: 1,
              price: 245000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "INDIVIDUAL",
              deliveryFeePrice: 4000,
              appliedDeliveryFee: 4000,

              orderStatus: "상품준비중",
              reviewAvailable: false,
            },
            {
              productId: "PRD-002",
              brandName: "브랜드A",
              productName: "상품명이 들어갑니다",
              optionName: "옵션명",
              quantity: 2,
              price: 245000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "INDIVIDUAL",
              deliveryFeePrice: 6000,
              appliedDeliveryFee: 6000,

              orderStatus: "상품준비중",
              reviewAvailable: false,
            },
          ],
        },
        {
          brandName: "브랜드Z",
          deliveryType: "직접픽업",
          deliveryFeeType: "FREE",
          deliveryFee: 0,
          items: [
            {
              productId: "PRD-200",
              brandName: "브랜드Z",
              productName: "직접픽업 상품",
              optionName: "옵션1",
              quantity: 1,
              price: 30000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "직접픽업",
              deliveryFeeType: "FREE",
              deliveryFeePrice: 0,
              appliedDeliveryFee: 0,

              orderStatus: "배송완료",
              reviewAvailable: true,
            },
          ],
        },
      ],
    },

    {
      orderId: "ORDER-20250201-002",
      orderDate: "2025-02-01",
      canCancel: false,
      canExchange: true,
      canReturn: true,
      deliveryGroups: [
        {
          brandName: "브랜드B",
          deliveryType: "택배배송",
          deliveryFeeType: "FREE",
          deliveryFee: 0,
          items: [
            {
              productId: "PRD-010",
              brandName: "브랜드B",
              productName: "무료배송 상품",
              optionName: null,
              quantity: 1,
              price: 45000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "FREE",
              deliveryFeePrice: 0,
              appliedDeliveryFee: 0,

              orderStatus: "배송중",
              reviewAvailable: false,
            },
          ],
        },
      ],
    },

    {
      orderId: "ORDER-20250201-003",
      orderDate: "2025-02-01",
      canCancel: false,
      canExchange: true,
      canReturn: true,
      deliveryGroups: [
        {
          brandName: "브랜드X",
          deliveryType: "택배배송",
          deliveryFeeType: "COMBINED",
          deliveryFee: 4000, // 첫 번째 아이템의 배송비
          items: [
            {
              productId: "PRD-100",
              brandName: "브랜드X",
              productName: "묶음배송 상품1",
              optionName: "옵션1",
              quantity: 1,
              price: 25000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "COMBINED",
              deliveryFeePrice: 4000,
              appliedDeliveryFee: 4000,

              orderStatus: "배송완료",
              reviewAvailable: true,
            },
            {
              productId: "PRD-101",
              brandName: "브랜드X",
              productName: "묶음배송 상품2",
              optionName: "옵션2",
              quantity: 1,
              price: 15000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "COMBINED",
              deliveryFeePrice: 4000,
              appliedDeliveryFee: 0,

              orderStatus: "배송완료",
              reviewAvailable: true,
            },
            {
              productId: "PRD-102",
              brandName: "브랜드X",
              productName: "묶음배송 상품3",
              optionName: "옵션3",
              quantity: 1,
              price: 35000,
              thumbnail: "https://via.placeholder.com/80",

              deliveryType: "택배배송",
              deliveryFeeType: "COMBINED",
              deliveryFeePrice: 4000,
              appliedDeliveryFee: 0,

              orderStatus: "배송완료",
              reviewAvailable: true,
            },
          ],
        },
      ],
    },
  ];

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">취소·교환·반품 내역</h1>
      <div>
        {/* 날짜 선택 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "0 0 14px 0",
          }}
        >
          <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input> -{" "}
          <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input>
        </div>

        <table className="mypage-table">
          <thead>
            <tr>
              <td colSpan={2}>상품정보</td>
              <td width="80px">수량</td>
              <td width="140px">결제금액</td>
              <td width="168px">주문상태</td>
              <td width="140px">배송비</td>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <>
                {/* 주문번호 한 줄 */}
                <tr style={{ borderTop: "1px solid rgba(0, 0, 0, 0.60)" }}>
                  <td colSpan={6} style={{ height: "66px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "20px",
                          fontWeight: "500",
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
                      <p
                        style={{
                          fontWeight: "400",
                          alignItems: "center",
                          display: "flex",
                          paddingLeft: "6px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          navigate(
                            `/user/mypage/market/detail/${order.orderId}?type=return`
                          );
                        }}
                      >
                        주문상세
                        <i
                          class="bi bi-chevron-right"
                          style={{ fontSize: "13px" }}
                        ></i>
                      </p>
                    </div>
                  </td>
                </tr>
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
                          <Input type="checkbox"></Input>
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              paddingLeft: "10px",
                            }}
                          >
                            <img
                              src={item.thumbnail}
                              width="80px"
                              height="80px"
                            />
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "6px",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {item.brandName}
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
                        <td>{item.quantity}</td>
                        <td style={{ fontWeight: "500" }}>
                          {Number(item.price).toLocaleString()}원
                        </td>
                        <td>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <p
                              style={{
                                fontWeight: "600",
                                fontSize: "16px",
                              }}
                            >
                              {item.orderStatus}
                            </p>
                            {item.orderStatus === "교환완료" && (
                              <button
                                className="primary-button"
                                style={{
                                  width: "68px",
                                  height: "33px",
                                  fontSize: "12px",
                                }}
                                onClick={() => {}}
                              >
                                배송조회
                              </button>
                            )}
                          </div>
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
                <div style={{ height: "20px" }} />
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination className="my-pagination">
        <PaginationItem active>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
}
