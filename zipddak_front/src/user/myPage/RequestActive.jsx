import { useEffect, useState } from "react";
import { Input } from "reactstrap";

export default function RequestActive() {
  const [request, setRequest] = useState({}); // 요청서 상세
  const [estimateDetail, setEstimateDetail] = useState(null); // 선택한 전문가 견적서 상세
  const [selectedExpertIdx, setSelectedExpertIdx] = useState(null); // 선택한 전문가 id

  const [open, setOpen] = useState(true);

  // 전문가 클릭 시 견적서 상세 호출(임시)
  const handleExpertClick = (expertIdx) => {
    setSelectedExpertIdx(expertIdx);
    setEstimateDetail(estimateDetailRepairMock);
  };

  // mock
  const requestDetailRepairMock = {
    requestIdx: 101, // 요청서 ID
    largeServiceIdx: 23, // 서비스 대분류 (수리)
    smallServiceName: "냉장고 수리", // 서비스 소분류

    budget: 1000000, // 예산
    preferredDate: "2025-09-28", // 희망 시공일
    location: "서울시 강남구", // 시공 장소
    constructionSize: "욕실 1곳", // 시공 사이즈
    purpose: "욕실 타일 부분 수리", // 시공 목적
    place: "욕실", // 시공할 공간
    additionalRequest: "주말 시공 희망", // 추가 요청사항

    status: "RECRUITING", // 진행 상태
    createdAt: "2025-09-28", // 요청일

    imageUrls: [
      // 요청서 이미지
      "/mock/request/repair1.jpg",
      "/mock/request/repair2.jpg",
    ],

    experts: [
      {
        expertIdx: 1, // 전문가 ID
        expertName: "김수리", // 전문가 이름
        profileImageUrl: "/mock/expert/1.png", // 프로필 이미지
        totalEstimateCost: 520000, // 총 견적 금액
      },
      {
        expertIdx: 2,
        expertName: "박장인",
        profileImageUrl: "/mock/expert/2.png",
        totalEstimateCost: 610000,
      },
    ],
  };
  const estimateDetailRepairMock = {
    estimateIdx: 1001, // 견적서 ID
    expertIdx: 1, // 전문가 ID
    requestIdx: 101, // 요청서 ID
    largeServiceIdx: 23, // 서비스 대분류

    totalEstimateCost: 520000, // 총 견적 금액
    workDurationType: "DAY", // 작업 예상 시간 타입
    workDurationValue: 2, // 작업 예상 시간
    workScope: "타일,줄눈", // 작업 범위
    workDetail: "파손된 타일 제거 후 동일 타일로 부분 교체",

    costList: [
      {
        type: "BUILD", // 비용 타입
        label: "타일 시공비", // 항목명
        amount: 240000, // 금액
      },
      {
        type: "MATERIAL",
        label: "타일 자재비",
        amount: 280000,
      },
    ],

    disposalCost: 20000, // 폐기물 처리비
    demolitionCost: 40000, // 철거비
    etcFee: 20000, // 기타 비용
    costDetail: "기존 타일 철거 및 폐기물 처리 포함",

    createdAt: "2025-09-29T10:00:00",

    diagnosisType: "VISIT", // 사전 진단 방식
    repairType: "PART", // 수리 방식
  };

  // (임시)
  useEffect(() => {
    setRequest(requestDetailRepairMock);
  }, []);

  return (
    <div className="mypage-layout">
      {/* 타이틀 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <h1 className="mypage-title">{request.smallServiceName}</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            fontWeight: "400",
            fontSize: "15px",
          }}
        >
          <p>
            요청일 <span>{request.createdAt}</span>
          </p>
          <p
            style={{
              color: "#6A7685",
              fontSize: "12px",
            }}
          >
            요청 취소하기
          </p>
        </div>
      </div>
      {/* 요청 상세 */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <h3
            className="mypage-sectionTitle"
            style={{ borderBottom: "none", padding: 0 }}
          >
            요청 상세
          </h3>
          <i
            className={`bi bi-chevron-${open ? "up" : "down"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && (
          <div style={{ paddingTop: "20px" }}>
            {request.place && (
              <div
                style={{
                  display: "flex",
                  padding: "20px 0",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
                }}
              >
                <p
                  style={{
                    minWidth: "220px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  시공할 부분을 모두 선택해주세요.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {request.place}
                </p>
              </div>
            )}
            {request.constructionSize && (
              <div
                style={{
                  display: "flex",
                  padding: "20px 0",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
                }}
              >
                <p
                  style={{
                    minWidth: "220px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  시공 사이즈
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {request.constructionSize}
                </p>
              </div>
            )}
            {request.purpose && (
              <div
                style={{
                  display: "flex",
                  padding: "20px 0",
                  alignItems: "flex-start",
                  alignSelf: "stretch",
                  borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
                }}
              >
                <p
                  style={{
                    minWidth: "220px",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  어떤 서비스를 원하시나요?
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {request.purpose}
                </p>
              </div>
            )}
            <div
              style={{
                display: "flex",
                padding: "20px 0",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
              }}
            >
              <p
                style={{
                  minWidth: "220px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                시공희망장소
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {request.location}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                padding: "20px 0",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
              }}
            >
              <p
                style={{
                  minWidth: "220px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                예산을 선택해주세요.
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {request.budget}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                padding: "20px 0",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
              }}
            >
              <p
                style={{
                  minWidth: "220px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                시공 희망일이 언제인가요?
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {request.preferredDate}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                padding: "20px 0",
                alignItems: "flex-start",
                alignSelf: "stretch",
                borderBottom: "1px solid rgba(0, 0, 0, 0.10)",
              }}
            >
              <p
                style={{
                  minWidth: "220px",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                추가 요청사항
              </p>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {request.additionalRequest}
              </p>
            </div>
            {request.imageUrls && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "10px",
                }}
              >
                {request.imageUrls.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:8080/imageView?type=expert&filename=${img}`}
                    width="80px"
                    height="80px"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 전문가 목록 */}
      {request.experts && (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          {request.experts.map((expert) => (
            <div
              style={{
                display: "flex",
                width: "88px",
                padding: "14px 16px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "8px",
                fontSize: "12px",
                cursor: "pointer",

                border:
                  selectedExpertIdx === expert.expertIdx
                    ? "1px solid rgba(179, 235, 255, 0.50)"
                    : "1px solid #EFF1F5",

                background:
                  selectedExpertIdx === expert.expertIdx
                    ? "rgba(179, 235, 255, 0.10)"
                    : "#FFF",

                transition: "all 0.2s ease",
              }}
              key={expert.expertIdx}
              onClick={() => handleExpertClick(expert.expertIdx)}
            >
              <img
                src={`http://localhost:8080/imageView?type=expert&filename=${expert.profileImageUrl}`}
                width="40px"
                height="40px"
              />
              <p style={{ whiteSpace: "nowrap" }}>{expert.expertName}</p>
              <p style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
                {Number(expert.totalEstimateCost).toLocaleString()}원
              </p>
            </div>
          ))}
        </div>
      )}

      {!estimateDetail ? (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6A7685",
            fontSize: "14px",
          }}
        >
          전문가를 선택하면 견적서가 표시됩니다.
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              height: "60px",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(255, 88, 51, 0.15)",
              background: "rgba(255, 88, 51, 0.05)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                paddingLeft: "30px",
                alignItems: "center",
                gap: "10px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              <p>총 견적 금액</p>
              <p>
                {Number(estimateDetail.totalEstimateCost).toLocaleString()}원
              </p>
            </div>
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                paddingLeft: "30px",
                alignItems: "center",
                gap: "10px",
                fontSize: "16px",
                fontWeight: "600",
                borderLeft: "1px solid rgba(255, 88, 51, 0.15)",
              }}
            >
              <p>예상 작업 기간</p>
              <p>7일</p>
            </div>
          </div>

          {/* 견적서 상세 */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "30px",
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 className="mypage-sectionTitle">견적 금액 상세</h3>
              <div
                className="labelInput-wrapper"
                style={{ padding: "16px 40px" }}
              >
                <label style={{ width: "150px" }}>타일</label>
                <p
                  style={{
                    fontWeight: "600",
                    textAlign: "right",
                    width: "100%",
                  }}
                >
                  240만원
                </p>
              </div>
              <div
                className="labelInput-wrapper"
                style={{ padding: "16px 40px" }}
              >
                <label
                  style={{
                    width: "150px",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  시공비 합계
                </label>
                <p
                  style={{
                    fontWeight: "600",
                    textAlign: "right",
                    fontSize: "16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  240만원
                </p>
              </div>
              <Input
                type="textarea"
                style={{ marginTop: "20px" }}
                value={estimateDetail.costDetail}
              />
            </div>
            <div style={{ flex: 2 }}>
              <h3 className="mypage-sectionTitle">작업 상세</h3>
              {estimateDetail.diagnosisType && (
                <div className="labelInput-wrapper">
                  <label style={{ width: "150px" }}>사전 진단 필요 여부</label>
                  <p>{estimateDetail.diagnosisType}</p>
                </div>
              )}
              {estimateDetail.repairType && (
                <div className="labelInput-wrapper">
                  <label style={{ width: "150px" }}>수리 방식</label>
                  <p>{estimateDetail.repairType}</p>
                </div>
              )}
              {estimateDetail.demolitionType && (
                <div className="labelInput-wrapper">
                  <label style={{ width: "150px" }}>철거 방식</label>
                  <p>{estimateDetail.demolitionType}</p>
                </div>
              )}
              {estimateDetail.consultingType && (
                <div className="labelInput-wrapper">
                  <label style={{ width: "150px" }}>컨설팅 방식</label>
                  <p>{estimateDetail.consultingType}</p>
                </div>
              )}
              <div className="labelInput-wrapper">
                <label style={{ width: "150px" }}>작업 범위</label>
                <p>{estimateDetail.workScope}</p>
              </div>
              <div className="labelInput-wrapper">
                <label style={{ width: "150px" }}>상세 설명</label>
                <p>{estimateDetail.workDetail}</p>
              </div>
            </div>
          </div>

          {/* 전문가 정보 */}
          <div>
            <h3 className="mypage-sectionTitle">전문가 정보</h3>
            {/* {expertList.map((expert, index) => (
          <div
            key={expert.expertIdx}
            ref={expertList.length === index + 1 ? lastProductRef : null}
          >
            <Expert
              expert={expert}
              style={{ flex: "0 0 32%", boxSizing: "border-box" }}
            />
          </div>
        ))} */}
          </div>
        </>
      )}
    </div>
  );
}
