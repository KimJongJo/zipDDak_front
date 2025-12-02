import { useState } from "react";
import { Input } from "reactstrap";
import PublicRequestCard from "../component/PublicRequestCard";

export default function PublicRequest() {
  const [targetRequest, setTargetRequest] = useState();
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  function timeAgo(sqlDateString) {
    const now = new Date();
    const date = new Date(sqlDateString);

    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMin < 1) return "방금 전";
    if (diffMin < 60) return `${diffMin}분 전`;
    if (diffHour < 24) return `${diffHour}시간 전`;
    return `${diffDay}일 전`;
  }

  // mock
  const requestList = [
    {
      requestId: "REQ-20250301-001",
      status: "OPEN",
      requesterName: "홍길동",
      expertResponseCount: 3,
      createdAt: "2025-02-25T10:00:00",

      categoryName: "도어 시공",
      region: "서울 강남구",
      workType: "강화도어",
      budget: "80만 원 ~ 120만 원",
      preferredDate: "가능한 빨리 진행하고 싶어요.",
    },

    {
      requestId: "REQ-20250301-002",
      status: "OPEN",
      requesterName: "홍길동",
      expertResponseCount: 3,
      createdAt: "2025-02-26T15:00:00",

      categoryName: "도배 시공",
      region: "경기 성남시",
      workType: "방문 시공",
      budget: "50만 원 이하",
      preferredDate: "2025-03-15",
    },

    {
      requestId: "REQ-20250301-003",
      status: "OPEN",
      requesterName: "홍길동",
      expertResponseCount: 3,
      createdAt: "2025-02-27T09:00:00",

      categoryName: "싱크대 교체",
      region: "경기 부천시",
      workType: "철거 + 설치",
      budget: "100만 원 ~ 150만 원",
      preferredDate: "2025-04-01",
    },

    {
      requestId: "REQ-20250301-004",
      status: "OPEN",
      requesterName: "홍길동",
      expertResponseCount: 3,
      createdAt: "2025-02-27T13:30:00",

      categoryName: "욕실 리모델링",
      region: "서울 송파구",
      workType: "전체 리모델링",
      budget: "250만 원 ~ 400만 원",
      preferredDate: "2025-04-10 ~ 2025-04-20",
    },
  ];
  const requestDetail = {
    requestId: "REQ-20250301-001",
    status: "OPEN",

    createdAt: "2025-02-25T10:00:00",
    expertResponseCount: 3,

    categoryName: "도어 시공",

    workType: "강화도어",
    budget: "80만 원 ~ 120만 원",
    region: "서울 강남구",
    preferredDate: "가능한 빨리 진행하고 싶어요.",

    additionalRequestText: "도어 교체와 문틀 보수가 필요합니다.",
    additionalRequestImages: [
      "https://via.placeholder.com/300x200?img1",
      "https://via.placeholder.com/300x200?img2",
    ],

    requesterName: "홍길동",
    requesterMatchCount: 10,
  };

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
          gap: "30px",
          flex: 1.3,
        }}
      >
        <h1 className="mypage-title">받은 요청서</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <Input
              type="select"
              style={{
                width: "100px",
                padding: "4px 14px",
                alignItems: "center",
                borderRadius: "16px",
                border: "1px solid #E0E5EB",
                fontSize: "14px",
                color: "#303441",
              }}
            >
              <option value="">카테고리</option>
            </Input>
            <div
              style={{
                display: "flex",
                padding: "4px 16px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "16px",
                border: isCustomSelected
                  ? "1px solid #293341"
                  : "1px solid #E0E5EB",
                fontSize: "14px",
                color: isCustomSelected ? "#fff" : "#303441",
                backgroundColor: isCustomSelected ? "#293341" : "#fff",
                cursor: "pointer",
              }}
              onClick={() => setIsCustomSelected(!isCustomSelected)}
            >
              맞춤견적
            </div>
          </div>
          {requestList.map((request) => (
            <PublicRequestCard
              key={request?.requestId}
              request={request}
              onClick={() => setTargetRequest(request)}
              isSelect={request?.requestId === targetRequest?.requestId}
            />
          ))}
        </div>
      </div>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              {requestDetail.categoryName}
            </p>
            <button
              className="primary-button"
              style={{ width: "100px", height: "33px" }}
            >
              견적 보내기
            </button>
          </div>
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
                <span>작업 유형</span> {requestDetail.workType}
              </p>
              <p>
                <span>예산</span> {requestDetail.budget}
              </p>
              <p>
                <span>지역</span> {requestDetail.region}
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
              {requestDetail.additionalRequestText}
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {requestDetail.additionalRequestImages.map((img, idx) => (
                <img key={idx} src={img} width="80px" height="80px" />
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
                src=""
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
    </div>
  );
}
