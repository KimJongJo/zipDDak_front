import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useSetAtom } from "jotai";
import { deliveryGroupsAtom } from "./orderAtoms";
import { useNavigate } from "react-router-dom";
import DeliveryButton from "./DeliveryButton";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default function MarketOrders() {
  const [orders, setOrders] = useState([]);
  const [orderStatusSummary, setOrderStatusSummary] = useState({});
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    allPage: 0,
    curPage: 1,
    endPage: 0,
    startPage: 1,
  });
  const [selectDate, setSelectDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [selectOrderIdx, setSelectOrderIdx] = useState(0);
  const [checkedItems, setCheckedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 취소 | 후기

  const [targetReview, setTargetReview] = useState({});
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]); // 이미지 미리보기 URL 배열
  const [files, setFiles] = useState([]); // 실제 업로드용 이미지 File 배열

  const setDeliveryGroups = useSetAtom(deliveryGroupsAtom);

  const imgRef = useRef(null);
  const navigate = useNavigate();

  // 주문 목록 조회
  const getOrders = (page, startDate, endDate) => {
    axios
      .get(
        "http://localhost:8080" +
          `/market/orderList?username=test@kosta.com&page=${page}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {
        setOrders(res.data.orderListDtoList);
        return res.data.pageInfo;
      })
      .then((pageData) => {
        setPageInfo(pageData);
        let pageBtns = [];
        for (let i = pageData.startPage; i <= pageData.endPage; i++) {
          pageBtns.push(i);
        }
        setPageBtn([...pageBtns]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 주문 취소
  const cancelOrderItems = (orderIdx) => {
    axios
      .post("http://localhost:8080/market/cancel", checkedItems[orderIdx])
      .then((res) => {
        if (res.data) {
          setCheckedItems({});
          getOrders(pageInfo.curPage, selectDate.startDate, selectDate.endDate);
          getOrderStatusSummary();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 상품주문상태 써머리
  const getOrderStatusSummary = () => {
    axios
      .get(
        "http://localhost:8080/market/orderStatusSummary?username=test@kosta.com"
      )
      .then((res) => {
        setOrderStatusSummary(res.data.orderStatusSummary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 후기작성 시 이미지 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => [...prev, URL.createObjectURL(file)]);
    setFiles((prev) => [...prev, file]);
  };

  useEffect(() => {
    getOrders(1, selectDate.startDate, selectDate.endDate);
    getOrderStatusSummary();
  }, []);

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">주문배송조회</h1>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "2px",
          }}
        >
          <span
            style={{
              color: "#A0A0A0",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "20px",
              margin: "0",
            }}
          >
            최근 6개월간 주문 상품 상태
          </span>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="mypage-statusCard">
              <p>상품준비중</p>
              <span>{orderStatusSummary.readyStatus}</span>
            </div>
            <div className="mypage-statusCard">
              <p>배송중</p>
              <span>{orderStatusSummary.shippingStatus}</span>
            </div>
            <div className="mypage-statusCard">
              <p>배송완료</p>
              <span>{orderStatusSummary.deliveredStatus}</span>
            </div>
            <div
              className="mypage-statusCard"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/zipddak/mypage/market/returns")}
            >
              <p>취소/교환/환불</p>
              <span>{orderStatusSummary.returnsStatus}</span>
            </div>
          </div>
        </div>

        {/* 날짜 선택 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "30px 0 14px 0",
          }}
        >
          <Input
            type="date"
            bsSize="sm"
            style={{ width: "140px", height: "32px" }}
            onChange={(e) => {
              setSelectDate({ ...selectDate, startDate: e.target.value });
              getOrders(pageInfo.curPage, e.target.value, selectDate.endDate);
            }}
          ></Input>{" "}
          -{" "}
          <Input
            type="date"
            bsSize="sm"
            style={{ width: "140px", height: "32px" }}
            onChange={(e) => {
              setSelectDate({ ...selectDate, endDate: e.target.value });
              getOrders(pageInfo.curPage, selectDate.startDate, e.target.value);
            }}
          ></Input>
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
                <tr
                  style={{ borderTop: "1px solid rgba(0, 0, 0, 0.60)" }}
                  key={order.orderIdx}
                >
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
                            {order.orderCode}
                          </span>
                        </p>
                        <p>
                          주문일자{" "}
                          <span
                            style={{
                              fontWeight: "600",
                            }}
                          >
                            {order.orderDate}
                          </span>
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {order.canCancel && (
                          <button
                            className="secondary-button"
                            style={{ width: "60px", height: "33px" }}
                            onClick={() => {
                              const selected =
                                checkedItems[order.orderIdx] || [];
                              if (selected.length === 0) {
                                alert("취소할 상품을 선택해주세요");
                                return;
                              }
                              setModalType("취소");
                              setSelectOrderIdx(order.orderIdx);
                              setIsModalOpen(true);
                            }}
                          >
                            취소
                          </button>
                        )}
                        {order.canReturn && (
                          <>
                            <button
                              className="secondary-button"
                              style={{ width: "60px", height: "33px" }}
                              onClick={() => {
                                const selected =
                                  checkedItems[order.orderIdx] || [];

                                if (selected.length === 0) {
                                  alert("교환할 상품을 선택해주세요");
                                  return;
                                }

                                navigate(
                                  `/zipddak/mypage/market/exchange/${order.orderIdx}`,
                                  {
                                    state: { selectedOrderItemIdxs: selected },
                                  }
                                );
                              }}
                            >
                              교환
                            </button>
                            <button
                              className="secondary-button"
                              style={{ width: "60px", height: "33px" }}
                              onClick={() => {
                                const selected =
                                  checkedItems[order.orderIdx] || [];

                                if (selected.length === 0) {
                                  alert("반품할 상품을 선택해주세요");
                                  return;
                                }

                                navigate(
                                  `/zipddak/mypage/market/return/${order.orderIdx}`,
                                  {
                                    state: { selectedOrderItemIdxs: selected },
                                  }
                                );
                              }}
                            >
                              반품
                            </button>
                          </>
                        )}
                        <p
                          style={{
                            fontWeight: "400",
                            alignItems: "center",
                            display: "flex",
                            paddingLeft: "6px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setDeliveryGroups(order.deliveryGroups);
                            window.scrollTo(0, 0);
                            navigate(
                              `/zipddak/mypage/market/detail/${order.orderIdx}?type=order`
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
                    </div>
                  </td>
                </tr>
                {order.deliveryGroups.map((group, gidx) => (
                  <>
                    {group.orderItems.map((item, idx) => (
                      <tr
                        style={
                          gidx === order.deliveryGroups.length - 1 &&
                          idx === group.orderItems.length - 1
                            ? { borderBottom: "1px solid rgba(0, 0, 0, 0.60)" }
                            : idx === group.orderItems.length - 1
                            ? {}
                            : { borderBottom: "none" }
                        }
                        key={item.orderItemIdx}
                      >
                        <td>
                          <Input
                            type="checkbox"
                            checked={
                              checkedItems[order.orderIdx]?.includes(
                                item.orderItemIdx
                              ) || false
                            }
                            disabled={
                              !(
                                item.orderStatus === "상품준비중" ||
                                item.orderStatus === "배송중" ||
                                item.orderStatus === "배송완료"
                              )
                            }
                            onChange={(e) => {
                              const checked = e.target.checked;

                              setCheckedItems((prev) => {
                                const current = prev[order.orderIdx] || [];

                                return {
                                  ...prev,
                                  [order.orderIdx]: checked
                                    ? [...current, item.orderItemIdx] // 추가
                                    : current.filter(
                                        (id) => id !== item.orderItemIdx
                                      ), // 제거
                                };
                              });
                            }}
                          />
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
                                gap: "4px",
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
                                  fontSize: "13px",
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
                          {Number(item.price * item.quantity).toLocaleString()}
                          원
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
                            {(item.orderStatus === "배송중" ||
                              item.orderStatus === "교환회수" ||
                              item.orderStatus === "교환발송" ||
                              item.orderStatus === "반품회수") && (
                              <DeliveryButton
                                tCode={item.postComp}
                                invoice={item.trackingNo}
                              />
                            )}
                            {item.orderStatus === "배송완료" && (
                              <button
                                className="primary-button"
                                style={{
                                  width: "68px",
                                  height: "33px",
                                }}
                                onClick={() => {
                                  setTargetReview(item);
                                  setIsModalOpen(true);
                                }}
                              >
                                후기작성
                              </button>
                            )}
                          </div>
                        </td>
                        {idx === 0 && (
                          <td
                            rowSpan={group.orderItems.length}
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            {group.deliveryType !== "pickup" ? (
                              group.appliedDeliveryFee !== 0 ? (
                                <p
                                  style={{
                                    fontWeight: "600",
                                  }}
                                >
                                  {Number(
                                    group.appliedDeliveryFee
                                  ).toLocaleString()}
                                  원
                                </p>
                              ) : (
                                <p
                                  style={{
                                    fontWeight: "600",
                                  }}
                                >
                                  무료배송
                                </p>
                              )
                            ) : (
                              <p
                                style={{
                                  fontWeight: "600",
                                }}
                              >
                                직접픽업
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
        {/* <PaginationItem disabled={pageInfo.curPage < 2}>
          <PaginationLink
            previous
            onClick={
              pageInfo.curPage > 1
                ? () => getOrders(pageInfo.curPage - 1)
                : undefined
            }
          />
        </PaginationItem> */}
        {pageBtn.map((b) => (
          <PaginationItem key={b} active={b === pageInfo.curPage}>
            <PaginationLink
              onClick={() =>
                getOrders(b, selectDate.startDate, selectDate.endDate)
              }
            >
              {b}
            </PaginationLink>
          </PaginationItem>
        ))}
        {/* <PaginationItem disabled={pageInfo.curPage > pageInfo.endPage - 1}>
          <PaginationLink
            next
            onClick={
              pageInfo.curPage < pageInfo.endPage
                ? () => getOrders(pageInfo.curPage + 1)
                : undefined
            }
          />
        </PaginationItem> */}
      </Pagination>

      {modalType === "후기" && (
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
      )}

      {modalType === "취소" && (
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          className="mypage-modal"
          style={{ width: "380px" }}
        >
          <ModalHeader toggle={() => setIsModalOpen(false)}></ModalHeader>
          <ModalBody>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
                fontSize: "14px",
              }}
            >
              <p>주문 취소 시 즉시 취소처리됩니다.</p>
              <p>주문을 취소하시겠습니까?</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <button
                className="secondary-button"
                style={{ width: "100%", height: "33px" }}
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="primary-button"
                style={{ width: "100%", height: "33px" }}
                onClick={() => {
                  setIsModalOpen(false);
                  cancelOrderItems(selectOrderIdx);
                }}
              >
                확인
              </button>
            </div>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
