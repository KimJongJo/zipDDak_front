import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";
import { useNavigate } from "react-router";

export default function RequestActive() {
  const [request, setRequest] = useState({}); // 요청서 상세
  const [expertList, setExpertList] = useState([]); // 전문가 목록
  const [estimate, setEstimate] = useState(null); // 선택한 전문가 견적서 상세
  const [costList, setCostList] = useState([]); // 견적서 비용 상세
  const [selectedExpertIdx, setSelectedExpertIdx] = useState(null); // 선택한 전문가 id
  const [selectedExpertUsername, setSelectedExpertUsername] = useState(null); // 선택한 전문가 username

  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 진행중인 요청서 조회
  const getRequest = () => {
    myAxios(token, setToken)
      .get(
        "http://localhost:8080" +
          `/active/requestDetail?username=${user.username}`
      )
      .then((res) => {
        setRequest(res.data.requestDetail);
        setExpertList(res.data.expertList);
        setSelectedExpertUsername(res.data.expertUsername);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 견적서 상세 조회
  const getEstimateDetail = (estimateIdx) => {
    myAxios(token, setToken)
      .get(
        "http://localhost:8080" +
          `/active/estimateDetail?estimateIdx=${estimateIdx}`
      )
      .then((res) => {
        setEstimate(res.data.estimateDetail);
        setCostList(res.data.costList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 채팅하기
  const chat = () => {
    myAxios(token, setToken)
      .post("http://localhost:8080/message-room", {
        type: "EXPERT",
        sendUsername: user.username,
        recvUsername: selectedExpertUsername,
        estimateIdx: estimate.estimateIdx,
      })
      .then((res) => {
        const roomId = res.data;
        navigate(`/zipddak/message?roomId=${roomId}`);
      });
  };

  // 사전진단 매핑
  const DIAGNOSIS_TYPE_MAPPING = {
    VISIT: "현장 방문 필요",
    PHOTO: "사진으로 진단 가능",
  };
  // 수리방식 매핑
  const REPAIR_TYPE_MAPPING = {
    PART: "부분 수리",
    ALL: "전체 교체",
    CHECK: "점검만 진행",
  };
  // 철거여부 매핑
  const DEMOLITION_TYPE_MAPPING = {
    INCLUDED: "기존 자재 철거 포함",
    EXTRA: "철거 비용 별도",
    NONE: "철거 없음",
  };
  // 컨설팅방식 매핑
  const CONSULTING_TYPE_MAPPING = {
    ONLINE: "온라인 (채팅/화상)",
    VISIT: "직접 방문",
  };

  // 시공비, 자재비 총액
  const getCostTotalByType = (costList, type) => {
    return costList
      .filter((cost) => cost.type === type)
      .reduce((sum, cost) => sum + Number(cost.amount || 0), 0);
  };
  const buildTotal = getCostTotalByType(costList, "BUILD");
  const materialTotal = getCostTotalByType(costList, "MATERIAL");

  // 기타 비용 총액
  const getExtraCostTotal = (estimate) => {
    return (
      Number(estimate.consultingLaborCost || 0) +
      Number(estimate.stylingDesignCost || 0) +
      Number(estimate.threeDImageCost || 0) +
      Number(estimate.reportProductionCost || 0) +
      Number(estimate.demolitionCost || 0) +
      Number(estimate.disposalCost || 0) +
      Number(estimate.etcFee || 0)
    );
  };

  // 전체 견적금액 총액
  const getTotalAmount = (costList, estimate) => {
    const buildTotal = getCostTotalByType(costList, "BUILD");
    const materialTotal = getCostTotalByType(costList, "MATERIAL");
    const extraTotal = getExtraCostTotal(estimate);

    return buildTotal + materialTotal + extraTotal;
  };

  useEffect(() => {
    user.username && getRequest();
  }, [user.username]);

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
            요청일 <span>{request.requestAt}</span>
          </p>
          <p
            style={{
              color: "#6A7685",
              fontSize: "12px",
              cursor: "pointer",
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
            {request.image1Idx && (
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "10px",
                }}
              >
                {[request.image1Idx, request.image2Idx, request.image3Idx]
                  .filter((img) => img)
                  .map((img, idx) => (
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

      {expertList.length !== 0 ? (
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          {expertList.map((expert) => (
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
                  selectedExpertIdx === expert.estimateIdx
                    ? "1px solid rgba(179, 235, 255, 0.50)"
                    : "1px solid #EFF1F5",

                background:
                  selectedExpertIdx === expert.estimateIdx
                    ? "rgba(179, 235, 255, 0.10)"
                    : "#FFF",

                transition: "all 0.2s ease",
              }}
              key={expert.estimateIdx}
              onClick={() => {
                setSelectedExpertIdx(expert.estimateIdx);
                getEstimateDetail(expert.estimateIdx);
              }}
            >
              <img
                src={`http://localhost:8080/imageView?type=expert&filename=${expert.profileImage}`}
                width="40px"
                height="40px"
              />
              <p style={{ whiteSpace: "nowrap" }}>{expert.activityName}</p>
              <p style={{ fontWeight: "600", whiteSpace: "nowrap" }}>
                {Math.floor(expert.totalCost / 10000)}만원
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#6A7685",
            fontSize: "14px",
          }}
        >
          받은 견적서가 없습니다.
        </div>
      )}

      {expertList.length !== 0 && (
        <>
          {!estimate ? (
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
                    {Math.floor(getTotalAmount(costList, estimate) / 10000)}원
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
                  {estimate.workDurationType === "HOUR" && (
                    <p>{estimate.workDurationValue}시간</p>
                  )}
                  {estimate.workDurationType === "DAY" && (
                    <p>{estimate.workDurationValue}일</p>
                  )}
                  {estimate.workDurationType === "WEEK" && (
                    <p>{estimate.workDurationValue}주</p>
                  )}
                  {estimate.workDurationType === "MONTH" && (
                    <p>{estimate.workDurationValue}개월</p>
                  )}
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
                  {/* 시공비 */}
                  {costList
                    .filter((cost) => cost.type === "BUILD")
                    .map((cost) => (
                      <div
                        className="labelInput-wrapper"
                        style={{ padding: "16px 40px" }}
                      >
                        <label style={{ width: "150px" }}>{cost.label}</label>
                        <p
                          style={{
                            fontWeight: "600",
                            textAlign: "right",
                            width: "100%",
                          }}
                        >
                          {Math.floor(cost.amount / 10000)} 만원
                        </p>
                      </div>
                    ))}
                  {buildTotal !== 0 && (
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
                          width: "100%",
                          fontWeight: "600",
                          textAlign: "right",
                          fontSize: "16px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {Math.floor(buildTotal / 10000)} 만원
                      </p>
                    </div>
                  )}

                  {/* 자재비 */}
                  {costList
                    .filter((cost) => cost.type === "MATERIAL")
                    .map((cost) => (
                      <div
                        className="labelInput-wrapper"
                        style={{ padding: "16px 40px" }}
                      >
                        <label style={{ width: "150px" }}>{cost.label}</label>
                        <p
                          style={{
                            fontWeight: "600",
                            textAlign: "right",
                            width: "100%",
                          }}
                        >
                          {Math.floor(cost.amount / 10000)} 만원
                        </p>
                      </div>
                    ))}
                  {materialTotal !== 0 && (
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
                        자재비 합계
                      </label>
                      <p
                        style={{
                          width: "100%",
                          fontWeight: "600",
                          textAlign: "right",
                          fontSize: "16px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {Math.floor(materialTotal / 1000)} 만원
                      </p>
                    </div>
                  )}

                  {/* 그 외 비용 */}
                  {estimate.consultingLaborCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>컨설팅 인건비</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.consultingLaborCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.stylingDesignCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>
                        스타일링 디자인비
                      </label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.stylingDesignCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.threeDImageCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>3D이미지 작업비</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.threeDImageCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.reportProductionCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>보고서 제작비</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.reportProductionCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.demolitionCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>철거비</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.demolitionCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.disposalCost !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>폐기물 처리비</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.disposalCost / 10000)} 만원
                      </p>
                    </div>
                  )}
                  {estimate.etcFee !== 0 && (
                    <div
                      className="labelInput-wrapper"
                      style={{ padding: "16px 40px" }}
                    >
                      <label style={{ width: "150px" }}>기타비용</label>
                      <p
                        style={{
                          fontWeight: "600",
                          textAlign: "right",
                          width: "100%",
                        }}
                      >
                        {Math.floor(estimate.etcFee / 10000)} 만원
                      </p>
                    </div>
                  )}
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
                      총 견적 금액
                    </label>
                    <p
                      style={{
                        fontWeight: "600",
                        textAlign: "right",
                        fontSize: "16px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {Math.floor(getTotalAmount(costList, estimate) / 10000)}{" "}
                      만원
                    </p>
                  </div>
                  {estimate.costDetail && (
                    <Input
                      type="textarea"
                      readOnly
                      style={{ marginTop: "20px" }}
                      value={estimate.costDetail}
                    />
                  )}
                </div>
                <div style={{ flex: 2 }}>
                  <h3 className="mypage-sectionTitle">작업 상세</h3>
                  {estimate.diagnosisType && (
                    <div className="labelInput-wrapper">
                      <label style={{ width: "150px" }}>
                        사전 진단 필요 여부
                      </label>
                      <p>{DIAGNOSIS_TYPE_MAPPING[estimate.diagnosisType]}</p>
                    </div>
                  )}
                  {estimate.repairType && (
                    <div className="labelInput-wrapper">
                      <label style={{ width: "150px" }}>수리 방식</label>
                      <p>{REPAIR_TYPE_MAPPING[estimate.repairType]}</p>
                    </div>
                  )}
                  {estimate.demolitionType && (
                    <div className="labelInput-wrapper">
                      <label style={{ width: "150px" }}>철거 방식</label>
                      <p>{DEMOLITION_TYPE_MAPPING[estimate.demolitionType]}</p>
                    </div>
                  )}
                  {estimate.consultingType && (
                    <div className="labelInput-wrapper">
                      <label style={{ width: "150px" }}>컨설팅 방식</label>
                      <p>{CONSULTING_TYPE_MAPPING[estimate.consultingType]}</p>
                    </div>
                  )}
                  <div className="labelInput-wrapper">
                    <label style={{ width: "150px" }}>작업 범위</label>
                    <p>{estimate.workScope}</p>
                  </div>
                  <div className="labelInput-wrapper">
                    <label style={{ width: "150px" }}>상세 설명</label>
                    <p>{estimate.workDetail}</p>
                  </div>
                </div>
              </div>

              {/* 전문가 정보 */}
              <div>
                <h3 className="mypage-sectionTitle">전문가 정보</h3>
                <button className="primary-button" onClick={chat}>
                  채팅하기
                </button>
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
        </>
      )}
    </div>
  );
}
