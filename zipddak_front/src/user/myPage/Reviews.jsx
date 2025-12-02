import { useRef, useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

export default function Reviews() {
  const [tab, setTab] = useState("작성 가능한 후기");
  const [chip, setChip] = useState("TOOL"); // TOOL, EXPERT, PRODUCT
  const [rating, setRating] = useState(0);
  const [images, setImages] = useState([]); // 이미지 미리보기 URL 배열
  const [files, setFiles] = useState([]); // 실제 업로드용 이미지 File 배열
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 등록, 수정, 삭제
  const [targetReview, setTargetReview] = useState({});

  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => [...prev, URL.createObjectURL(file)]);
    setFiles((prev) => [...prev, file]);
  };

  const ReceivedReviews = [
    {
      reviewId: "REV-T-001",
      reviewType: "TOOL",
      writerUsername: "USER-001",
      targetUsername: "USER-100",
      rating: 5,
      content: "상태 좋은 공구를 대여받았습니다! 설명도 정확했어요.",
      image1: "https://via.placeholder.com/100",
      image2: "https://via.placeholder.com/100",
      image3: null,
      createdAt: "2025-02-10T12:20:00",
      updatedAt: "2025-02-10T12:20:00",
      contextId: "RENTAL-5501",
    },
    {
      reviewId: "REV-T-002",
      reviewType: "TOOL",
      writerUsername: "USER-002",
      targetUsername: "USER-003",
      rating: 3,
      content: "사용은 가능했지만, 부품 하나가 살짝 헐거웠어요.",
      image1: null,
      image2: null,
      image3: null,
      createdAt: "2025-03-01T09:45:00",
      updatedAt: "2025-03-01T10:00:00",
      contextId: "RENTAL-8822",
    },
  ];
  const myReviews = [
    {
      reviewId: "REV-T-001",
      reviewType: "TOOL",
      writerUsername: "USER-001",
      targetUsername: "USER-100",
      rating: 5,
      content: "상태 좋은 공구를 대여받았습니다! 설명도 정확했어요.",
      image1: "https://via.placeholder.com/100",
      image2: "https://via.placeholder.com/100",
      image3: null,
      createdAt: "2025-02-10T12:20:00",
      updatedAt: "2025-02-10T12:20:00",
      contextId: "RENTAL-5501",
    },
    {
      reviewId: "REV-T-002",
      reviewType: "TOOL",
      writerUsername: "USER-002",
      targetUsername: "USER-003",
      rating: 3,
      content: "사용은 가능했지만, 부품 하나가 살짝 헐거웠어요.",
      image1: null,
      image2: null,
      image3: null,
      createdAt: "2025-03-01T09:45:00",
      updatedAt: "2025-03-01T10:00:00",
      contextId: "RENTAL-8822",
    },
    {
      reviewId: "REV-E-001",
      reviewType: "EXPERT",
      writerUsername: "USER-155",
      targetUsername: "EXPERT-909",
      rating: 4,
      content: "전문가님이 꼼꼼히 작업해주셨어요!",
      image1: "https://via.placeholder.com/120",
      image2: null,
      image3: null,
      createdAt: "2025-04-15T15:20:00",
      updatedAt: "2025-04-15T15:20:00",
      contextId: "WORK-2400",
    },
    {
      reviewId: "REV-E-002",
      reviewType: "EXPERT",
      writerUsername: "USER-200",
      targetUsername: "EXPERT-777",
      rating: 5,
      content: "정말 최고였습니다! 사진에서 보이는 것처럼 완성도가 높아요.",
      image1: "https://via.placeholder.com/100",
      image2: "https://via.placeholder.com/100",
      image3: "https://via.placeholder.com/100",
      createdAt: "2025-05-11T18:00:00",
      updatedAt: "2025-05-12T08:00:00",
      contextId: "WORK-3321",
    },
    {
      reviewId: "REV-P-001",
      reviewType: "PRODUCT",
      writerUsername: "USER-888",
      targetUsername: "PRD-510",
      rating: 4,
      content: "브랜드 제품이 생각보다 좋네요! 배송도 빨랐습니다.",
      image1: null,
      image2: null,
      image3: null,
      createdAt: "2025-02-28T11:00:00",
      updatedAt: "2025-02-28T11:00:00",
      contextId: "ORDER-9099",
    },
    {
      reviewId: "REV-P-002",
      reviewType: "PRODUCT",
      writerUsername: "USER-321",
      targetUsername: "PRD-411",
      rating: 5,
      content: "디자인도 예쁘고 만족도 최고입니다!",
      image1: "https://via.placeholder.com/80",
      image2: "https://via.placeholder.com/80",
      image3: "https://via.placeholder.com/80",
      createdAt: "2025-01-20T09:00:00",
      updatedAt: "2025-02-01T10:30:00",
      contextId: "ORDER-1200",
    },
  ];

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">후기</h1>

      <div>
        <div className="mypage-tabList">
          <div
            className={tab === "작성 가능한 후기" ? "isActive" : ""}
            onClick={() => setTab("작성 가능한 후기")}
          >
            작성 가능한 후기
          </div>
          <div
            className={tab === "작성한 후기" ? "isActive" : ""}
            onClick={() => setTab("작성한 후기")}
          >
            작성한 후기
          </div>
          <div
            className={tab === "받은 후기" ? "isActive" : ""}
            onClick={() => setTab("받은 후기")}
          >
            받은 후기
          </div>
        </div>

        {tab !== "받은 후기" && (
          <div className="mypage-chipList">
            <div
              className={chip === "TOOL" ? "isActive" : ""}
              onClick={() => setChip("TOOL")}
            >
              공구
            </div>
            <div
              className={chip === "EXPERT" ? "isActive" : ""}
              onClick={() => setChip("EXPERT")}
            >
              전문가
            </div>
            <div
              className={chip === "PRODUCT" ? "isActive" : ""}
              onClick={() => setChip("PRODUCT")}
            >
              상품
            </div>
          </div>
        )}

        {tab === "작성 가능한 후기" && (
          <div
            style={{
              display: "flex",
              padding: "20px 0",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
            }}
          >
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
                <p style={{ fontWeight: "600" }}>타이틀</p>
                <p style={{ fontWeight: "500" }}>내용</p>
              </div>
            </div>
            <button
              className="primary-button"
              style={{ width: "80px", height: "33px" }}
              onClick={() => {
                setModalType("등록");
                setIsModalOpen(true);
              }}
            >
              후기작성
            </button>
          </div>
        )}
        {tab === "작성한 후기" &&
          myReviews
            .filter((review) => review.reviewType === chip)
            .map((review) => (
              <table style={{ width: "100%" }}>
                <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
                  <td>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        padding: "30px 0",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <img src="" width="48px" height="48px" />
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            fontSize: "14px",
                          }}
                        >
                          <p style={{ fontWeight: "600" }}>
                            {review.targetUsername}
                          </p>
                          <p style={{ fontWeight: "500" }}>
                            {review.contextId}
                          </p>
                        </div>
                      </div>
                      <div className="review-star">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <i
                            key={num}
                            class={`bi ${
                              review.rating >= num ? "bi-star-fill" : "bi-star"
                            }`}
                            style={{
                              fontSize: "18px",
                              color: "rgba(247, 196, 68, 1)",
                            }}
                          ></i>
                        ))}
                      </div>
                      {review.image1 !== null && (
                        <div
                          style={{
                            display: "flex",
                            gap: "8px",
                          }}
                        >
                          {[review.image1, review.image2, review.image3]
                            .filter(Boolean)
                            .map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                width="80px"
                                height="80px"
                              />
                            ))}
                        </div>
                      )}
                      <p
                        style={{
                          color: "#303441",
                          fontSize: "14px",
                          fontWeight: "400",
                          lineHeight: "22px",
                        }}
                      >
                        {review.content}
                      </p>
                    </div>
                  </td>
                  <td
                    style={{
                      width: "150px",
                    }}
                  >
                    <p
                      style={{
                        color: "#303441",
                        textAlign: "center",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      {review.createdAt.slice(0, 10)}
                    </p>
                  </td>
                  <td
                    style={{
                      width: "118px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <button
                        className="secondary-button"
                        style={{ width: "66px", height: "33px" }}
                        onClick={() => {
                          setModalType("수정");
                          setTargetReview(review);
                          setRating(review.rating);
                          setImages(
                            [
                              review.image1,
                              review.image2,
                              review.image3,
                              review.image4,
                              review.image5,
                            ].filter(Boolean)
                          );
                          setIsModalOpen(true);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className="secondary-button"
                        style={{ width: "66px", height: "33px" }}
                        onClick={() => {
                          setModalType("삭제");
                          setIsModalOpen(true);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              </table>
            ))}
        {tab === "받은 후기" &&
          ReceivedReviews.map((review) => (
            <table style={{ width: "100%" }}>
              <tr style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.10)" }}>
                <td>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      padding: "30px 0",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img src="" width="48px" height="48px" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                          fontSize: "14px",
                        }}
                      >
                        <p style={{ fontWeight: "600" }}>
                          {review.writerUsername}
                        </p>
                        <p style={{ fontWeight: "500" }}>{review.contextId}</p>
                      </div>
                    </div>
                    <div className="review-star">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <i
                          key={num}
                          class={`bi ${
                            review.rating >= num ? "bi-star-fill" : "bi-star"
                          }`}
                          style={{
                            fontSize: "18px",
                            color: "rgba(247, 196, 68, 1)",
                          }}
                        ></i>
                      ))}
                    </div>
                    {review.image1 !== null && (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                        }}
                      >
                        {[review.image1, review.image2, review.image3]
                          .filter(Boolean)
                          .map((img, idx) => (
                            <img
                              key={idx}
                              src={img}
                              width="80px"
                              height="80px"
                            />
                          ))}
                      </div>
                    )}
                    <p
                      style={{
                        color: "#303441",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "22px",
                      }}
                    >
                      {review.content}
                    </p>
                  </div>
                </td>
                <td
                  style={{
                    width: "150px",
                  }}
                >
                  <p
                    style={{
                      color: "#303441",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {review.createdAt.slice(0, 10)}
                  </p>
                </td>
              </tr>
            </table>
          ))}
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

      {modalType == "삭제" ? (
        // 후기 삭제 모달
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
              <p>작성한 후기를 삭제할 경우 재작성이 불가합니다.</p>
              <p>삭제하시겠습니까?</p>
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
              >
                확인
              </button>
            </div>
          </ModalFooter>
        </Modal>
      ) : (
        // 후기 등록/수정 모달
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          className="mypage-modal"
          style={{ width: "460px" }}
        >
          <ModalHeader toggle={() => setIsModalOpen(false)}>
            {modalType === "등록" ? "후기 작성" : "후기 수정"}
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
                <p style={{ fontWeight: "600" }}>
                  {modalType === "등록"
                    ? "타이틀"
                    : targetReview.targetUsername}
                </p>
                <p style={{ fontWeight: "500" }}>
                  {modalType === "등록" ? "내용" : targetReview.contextId}
                </p>
              </div>
            </div>
            <div className="label-wrapper">
              <label>작업은 어떠셨나요?</label>
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
              <label>작업 후기를 적어주세요</label>
              <Input
                type="textarea"
                placeholder="작업에 대해 만족스러웠던 점이나, 팁 등을 남겨주세요"
                value={modalType === "등록" ? "" : targetReview.content}
                onChange={(e) =>
                  setTargetReview({ ...targetReview, content: e.target.value })
                }
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
              {modalType === "등록" ? "후기 등록하기" : "후기 수정하기"}
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
