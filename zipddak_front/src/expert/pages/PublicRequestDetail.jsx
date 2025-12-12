import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import "../css/expertEstimate.css";
import { Input, Modal, ModalBody } from "reactstrap";
import { useAtom, useAtomValue } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";

export default function PublicRequestDetail() {
  const { requestIdx } = useParams();
  const [searchParams] = useSearchParams();
  const largeServiceIdx = searchParams.get("largeServiceIdx");
  const midServiceIdx = searchParams.get("midServiceIdx");
  const smallServiceIdx = searchParams.get("smallServiceIdx");

  const [requestDetail, setRequestDetail] = useState(null);

  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 공개 요청서 상세 조회
  const getRequestDetail = () => {
    myAxios(token, setToken)
      .get(
        "http://localhost:8080" +
          `/publicRequestsDetail?requestIdx=${requestIdx}`
      )
      .then((res) => {
        setRequestDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRequestDetail();
  }, []);

  // 날짜 변환 함수
  function timeAgo(sqlDateString) {
    const now = new Date();
    const date = new Date(sqlDateString);

    // 날짜만 비교
    const diffMs = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);
    const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDay < 1) return "오늘";
    return `${diffDay}일 전`;
  }

  if (!requestDetail) {
    return <div className="mypage-layout">로딩 중...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        width: "1200px",
        padding: "48px 16px",
        gap: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 2,
          borderRight: "1px solid #EFF1F5",
          borderLeft: "1px solid #EFF1F5",
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "0 20px 30px 20px",
            flexDirection: "column",
            gap: "16px",
            borderBottom: "1px solid #EFF1F5",
          }}
        >
          <p
            style={{
              display: "flex",
              gap: "4px",
              fontSize: "13px",
              color: "#6A7685",
            }}
          >
            {timeAgo(requestDetail.createdAt)} · 견적 보낸 전문가
            <span
              style={{
                color: "#FF5833",
                fontWeight: "500",
              }}
            >
              {requestDetail.expertResponseCount}명
            </span>
          </p>

          <p
            style={{
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            {requestDetail.categoryName}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            padding: "30px 0",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "0 20px 30px 20px",
              flexDirection: "column",
              gap: "20px",
              borderBottom: "1px solid #EFF1F5",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              요청상세
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                color: "#6A7685",
                fontSize: "14px",
              }}
            >
              <p>
                <span>예산</span>{" "}
                {Number(requestDetail.budget).toLocaleString()}만원
              </p>
              <p>
                <span>지역</span> {requestDetail.location}
              </p>
              <p>
                <span>희망 일정</span> {requestDetail.preferredDate}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "30px 20px",
              flexDirection: "column",
              gap: "20px",
              borderBottom: "1px solid #EFF1F5",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              추가 요청사항
            </p>

            <p
              style={{
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {requestDetail.additionalRequest}
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {[
                requestDetail.image1,
                requestDetail.image2,
                requestDetail.image3,
              ]
                .filter(Boolean)
                .map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:8080/imageView?type=expert&filename=${img}`}
                    width="80px"
                    height="80px"
                  />
                ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "30px 20px",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
              }}
            >
              고객 정보
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={`http://localhost:8080/imageView?type=profile&filename=${requestDetail.requesterProfile}`}
                width="40px"
                height="40px"
                style={{ borderRadius: "26px" }}
              />
              <div
                style={{
                  color: "#6A7685",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {requestDetail.requesterName}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  전문가 매칭 {requestDetail.requesterMatchCount}회
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 수리 견적서 작성폼 */}
      <div className="expert-estimate-form">
        <div className="section-first">
          <div className="set-wrapper">
            <p>사전 진단 필요 여부</p>
            <div className="set-radio">
              <div className="one-radio">
                <Input
                  id="inquiryType"
                  type="radio"
                  name="inquiryType"
                  value="ACCOUNT"
                  // onChange={handleTypeChange}
                />
                <laebl for="inquiryType">현장 방문 필요</laebl>
              </div>
              <div className="one-radio">
                <Input
                  id="inquiryType"
                  type="radio"
                  name="inquiryType"
                  value="ACCOUNT"
                  // onChange={handleTypeChange}
                />
                <laebl for="inquiryType">사진으로 진단 가능</laebl>
              </div>
            </div>
          </div>
          <div className="set-wrapper">
            <p>수리 방식</p>
            <div className="set-radio">
              <div className="one-radio">
                <Input
                  id="inquiryType"
                  type="radio"
                  name="inquiryType"
                  value="ACCOUNT"
                  // onChange={handleTypeChange}
                />
                <laebl for="inquiryType">부분 수리</laebl>
              </div>
              <div className="one-radio">
                <Input
                  id="inquiryType"
                  type="radio"
                  name="inquiryType"
                  value="ACCOUNT"
                  // onChange={handleTypeChange}
                />
                <laebl for="inquiryType">전체 교체</laebl>
              </div>
              <div className="one-radio">
                <Input
                  id="inquiryType"
                  type="radio"
                  name="inquiryType"
                  value="ACCOUNT"
                  // onChange={handleTypeChange}
                />
                <laebl for="inquiryType">점검만 진행</laebl>
              </div>
            </div>
          </div>
        </div>

        <div className="section-second">
          <div className="set-wrapper">
            <p>예상 작업 시간</p>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div className="expert-chip-list">
                <span className="chip-active">시간</span>
                <span className="chip">일</span>
                <span className="chip">주</span>
                <span className="chip">개월</span>
              </div>
              <Input placeholder="작업 기간을 입력해 주세요" />
            </div>
          </div>
          <div className="set-wrapper">
            <p>작업 범위</p>
            <div className="set-checkbox">
              <div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">사전 점검</laebl>
                </div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">철거</laebl>
                </div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">수리 / 시공 / 설치</laebl>
                </div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">자재 구매 및 준비</laebl>
                </div>
              </div>
              <div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">마감 작업</laebl>
                </div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">잔여물 처리 및 청소</laebl>
                </div>
                <div className="one-checkbox">
                  <Input
                    id="inquiryType"
                    type="checkbox"
                    name="inquiryType"
                    value="ACCOUNT"
                    // onChange={handleTypeChange}
                  />
                  <laebl for="inquiryType">사후 점검</laebl>
                </div>
              </div>
            </div>
          </div>
          <div className="set-wrapper">
            <p>작업 상세 설명</p>
            <Input type="textarea" />
          </div>
        </div>

        <div className="section-third">
          <p className="cost-title">비용 내역</p>
          <div className="cost-set-wrapper">
            <div className="add">
              <p>공정별 시공비</p>
              <button
                className="secondary-button"
                style={{ height: "33px", width: "68px" }}
              >
                추가
              </button>
            </div>
            <div className="cost-wrapper">
              <div className="cost-list">
                <div className="cost-one-line">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Input style={{ width: "140px" }} placeholder="공정" />
                    <Input
                      style={{ width: "240px" }}
                      type="number"
                      placeholder="금액을 입력해 주세요."
                    />
                  </div>
                  <button
                    className="secondary-button"
                    style={{ height: "33px", width: "68px" }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p>
                시공비 합계
                <span>300,000 원</span>
              </p>
            </div>
          </div>

          <div className="cost-set-wrapper">
            <div className="add">
              <p>자재비</p>
              <button
                className="secondary-button"
                style={{ height: "33px", width: "68px" }}
              >
                추가
              </button>
            </div>

            <div className="cost-wrapper">
              <div className="cost-list">
                <div className="cost-one-line">
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <Input style={{ width: "140px" }} placeholder="공정" />
                    <Input
                      style={{ width: "240px" }}
                      type="number"
                      placeholder="금액을 입력해 주세요."
                    />
                  </div>
                  <button
                    className="secondary-button"
                    style={{ height: "33px", width: "68px" }}
                  >
                    삭제
                  </button>
                </div>
              </div>
              <p>
                시공비 합계
                <span>300,000 원</span>
              </p>
            </div>
          </div>
          <div className="etc-wrapper">
            <div className="etc-set-wrapper">
              <div className="etc-one-line">
                <p>폐기물 처리비</p>
                <Input
                  style={{ width: "240px" }}
                  type="number"
                  placeholder="금액을 입력해 주세요."
                />
              </div>
              <div className="etc-one-line">
                <p>철거비</p>
                <Input
                  style={{ width: "240px" }}
                  type="number"
                  placeholder="금액을 입력해 주세요."
                />
              </div>
              <div className="etc-one-line">
                <p>기타 비용</p>
                <Input
                  style={{ width: "240px" }}
                  type="number"
                  placeholder="금액을 입력해 주세요."
                />
              </div>
            </div>
            <p className="total">
              총 견적 금액
              <span>300,000 원</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
