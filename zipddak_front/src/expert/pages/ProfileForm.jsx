import { Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import DaumPostcode from "react-daum-postcode";
import { useRef, useState } from "react";
import "../css/expertProfile.css";

export default function ProfileForm() {
  const [step, setStep] = useState({ 1: true, 2: false, 3: false, 4: false });
  const [profileImage, setProfileImage] = useState(null);
  const [certificateImages, setCertificateImages] = useState([]); // 이미지 미리보기 URL 배열
  const [certificateFiles, setCertificateFiles] = useState([]); // 실제 업로드용 이미지 File 배열
  const [portfolioImages, setPortfolioImages] = useState([]); // 이미지 미리보기 URL 배열
  const [portfolioFiles, setPortfolioFiles] = useState([]); // 실제 업로드용 이미지 File 배열
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // 경력 | 포트폴리오 | 질문 | 주소
  const [durationUnitChip, setDurationUnitChip] = useState(""); // HOUR | DAY | WEEK | MONTH

  /* 이미지 업로드를 위한 ref */
  const fileRef = useRef(null); // 숨겨진 <Input type="file" />을 대신 클릭하기 위한 ref
  const imgRef = useRef(null); // 이미지 미리보기용 <img> 태그의 src를 변경하기 위한 ref
  const certificateImgRef = useRef(null);
  const portfolioImgRef = useRef(null);
  const businessFileRef = useRef(null);
  const businessImgRef = useRef(null);
  /* 시점 이동을 위한 ref */
  const basicRef = useRef(null);
  const infoRef = useRef(null);
  const portfolioRef = useRef(null);
  const qaRef = useRef(null);

  /* 주소 이벤트 */
  const handleComplate = (data) => {
    // let { zonecode, address } = data;
    // setUser({ ...user, postcode: zonecode, address1: address });
  };
  const handleClose = (state) => {
    if (state == "COMPLETE_CLOSE") setIsModalOpen(false);
  };

  // 지역 목록
  const regions = [
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];
  // mock
  const expert = {
    profileImage: "https://via.placeholder.com/200x200",

    displayName: "하우스닥터 인테리어",
    shortIntroduction: "15년 경력의 전문가가 직접 시공합니다.",

    mainServiceId: "SRV-102",
    mainServiceName: "도배 시공",

    activityArea: {
      postcode: "06236",
      address1: "서울특별시 강남구 테헤란로 120",
      address2: "12층 1205호",
    },

    employeeCount: 5,

    availableStartTime: "09:00",
    availableEndTime: "18:00",

    externalLinks: [
      "https://instagram.com/example_profile",
      "https://blog.naver.com/example",
      "https://www.youtube.com/@example",
    ],

    serviceList: [
      { categoryId: "SRV-101", categoryName: "도어시공" },
      { categoryId: "SRV-102", categoryName: "도배 시공" },
      { categoryId: "SRV-103", categoryName: "바닥 시공" },
    ],

    serviceDescription:
      "고객 만족을 최우선으로 시공해드리며, 프리미엄 자재와 체계적인 프로세스로 완성도 높은 결과물을 제공합니다. " +
      "무료 방문견적 및 상담이 가능하며, 모든 작업은 직접 시공합니다.",

    certificates: [
      "https://via.placeholder.com/300x200?cert1",
      "https://via.placeholder.com/300x200?cert2",
      "https://via.placeholder.com/300x200?cert3",
    ],

    businessRegistrationImage: "https://via.placeholder.com/400x300?bizReg",
    qaList: [
      {
        question: "방문 견적 가능한가요?",
        answer:
          "네, 서울/경기 지역은 무료 방문 견적이 가능합니다.네, 서울/경기 지역은 무료 방문 견적이 가능합니다.네, 서울/경기 지역은 무료 방문 견적이 가능합니다.네, 서울/경기 지역은 무료 방문 견적이 가능합니다.네, 서울/경기 지역은 무료 방문 견적이 가능합니다.",
      },
      {
        question: "AS 기간은 어떻게 되나요?",
        answer: "시공 후 1년간 무상 AS를 제공합니다.",
      },
      {
        question: "사용하는 자재는 어떻게 되나요?",
        answer:
          "친환경 인증 자재만 사용하며, 고객 요청 시 브랜드 선택도 가능합니다.",
      },
    ],
  };
  const expertServiceList = [
    { serviceId: "SRV-001", serviceName: "냉장고 수리" },
    { serviceId: "SRV-002", serviceName: "식기세척기 수리" },
    { serviceId: "SRV-003", serviceName: "인덕션 수리" },
    { serviceId: "SRV-004", serviceName: "세탁기 수리" },
    { serviceId: "SRV-005", serviceName: "에어컨 수리" },
    { serviceId: "SRV-006", serviceName: "기타 전자제품 수리" },
    { serviceId: "SRV-007", serviceName: "도어락 수리" },
    { serviceId: "SRV-008", serviceName: "도어 수리" },
    { serviceId: "SRV-009", serviceName: "방범창 수리" },
    { serviceId: "SRV-010", serviceName: "방충망 수리" },
    { serviceId: "SRV-011", serviceName: "샷시 수리" },
    { serviceId: "SRV-012", serviceName: "싱크대 수리" },
    { serviceId: "SRV-013", serviceName: "보일러 수리" },
    { serviceId: "SRV-014", serviceName: "온수기 수리" },
    { serviceId: "SRV-015", serviceName: "수도 관련 수리" },
    { serviceId: "SRV-016", serviceName: "화장실 누수 수리" },
    { serviceId: "SRV-017", serviceName: "전기배선 수리" },
    { serviceId: "SRV-018", serviceName: "도어 시공" },
    { serviceId: "SRV-019", serviceName: "중문 시공" },
    { serviceId: "SRV-020", serviceName: "샷시 설치" },
    { serviceId: "SRV-021", serviceName: "신발장 시공" },
    { serviceId: "SRV-022", serviceName: "싱크대 교체" },
    { serviceId: "SRV-023", serviceName: "욕실/화장실 리모델링" },
    { serviceId: "SRV-024", serviceName: "주방 리모델링" },
    { serviceId: "SRV-025", serviceName: "블라인드/커튼 시공" },
    { serviceId: "SRV-026", serviceName: "줄눈 시공" },
    { serviceId: "SRV-027", serviceName: "단열필름 시공" },
    { serviceId: "SRV-028", serviceName: "도배 시공" },
    { serviceId: "SRV-029", serviceName: "몰딩 시공" },
    { serviceId: "SRV-030", serviceName: "방음 시공" },
    { serviceId: "SRV-031", serviceName: "아트월 시공" },
    { serviceId: "SRV-032", serviceName: "외풍차단/틈막이 시공" },
    { serviceId: "SRV-033", serviceName: "유리필름/시트 시공" },
    { serviceId: "SRV-034", serviceName: "인테리어필름 시공" },
    { serviceId: "SRV-035", serviceName: "페인트 시공" },
    { serviceId: "SRV-036", serviceName: "마루 보수" },
    { serviceId: "SRV-037", serviceName: "마루 시공" },
    { serviceId: "SRV-038", serviceName: "바닥재 시공" },
    { serviceId: "SRV-039", serviceName: "에폭시바닥 시공" },
    { serviceId: "SRV-040", serviceName: "장판 시공" },
    { serviceId: "SRV-041", serviceName: "층간소음매트 시공" },
    { serviceId: "SRV-042", serviceName: "카페트 시공" },
    { serviceId: "SRV-043", serviceName: "타일 시공" },
  ];
  const careers = [
    {
      title: "하우스닥터 인테리어 대표",
      description: "15년간 인테리어 시공 전문",
      startDate: "2010-03-01",
      endDate: "2025-03-01",
    },
    {
      title: "대한인테리어협회 등록 전문가",
      description: "도배·바닥재 전문 시공 자격 인증",
      startDate: "2013-05-01",
      endDate: "2025-03-01",
    },
  ];
  const portfolioList = [
    {
      title: "강남구 30평 아파트 도배 시공",
      serviceCategoryId: "SRV-102",
      serviceCategoryName: "도배 시공",
      area: "서울시 강남구",
      servicePrice: 1200000,
      durationUnit: "DAY",
      durationValue: 3,
      description:
        "전체 벽지 교체 및 하자 보수 작업을 진행했습니다. 친환경 벽지를 사용해 고객 만족도가 높았습니다.",
      images: [
        "https://via.placeholder.com/400x300?port1",
        "https://via.placeholder.com/400x300?port2",
        "https://via.placeholder.com/400x300?port3",
      ],
    },
    {
      title: "송파구 오피스텔 부분 도배 시공",
      serviceCategoryId: "SRV-102",
      serviceCategoryName: "도배 시공",
      area: "서울시 송파구",
      servicePrice: 350000,
      durationUnit: "HOUR",
      durationValue: 5,
      description:
        "부분 벽면만 깔끔하게 보수한 프로젝트로, 빠르고 정확한 시공이 특징입니다.",
      images: [
        "https://via.placeholder.com/400x300?port4",
        "https://via.placeholder.com/400x300?port5",
      ],
    },
  ];

  return (
    <div className="expert-profile-wrapper">
      <h1 className="mypage-title">프로필 수정</h1>

      <div
        style={{
          display: "flex",
          gap: "100px",
        }}
      >
        <div className="step-icon-wrapper">
          <p
            className={step[1] ? "step-icon-active" : "step-icon"}
            onClick={() =>
              basicRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>1</span>
            기본 정보
          </p>
          <p
            className={step[2] ? "step-icon-active" : "step-icon"}
            onClick={() =>
              infoRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>2</span>
            전문가 정보
          </p>
          <p
            className={step[3] ? "step-icon-active" : "step-icon"}
            onClick={() =>
              portfolioRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>3</span>
            포트폴리오
          </p>
          <p
            className={step[4] ? "step-icon-active" : "step-icon"}
            onClick={() =>
              qaRef.current?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span>4</span>
            질문답변
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "44px",
          }}
        >
          <div ref={basicRef}>
            <h3 className="mypage-sectionTitle">기본 정보</h3>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>프로필 이미지</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={expert.profileImage}
                  width="72px"
                  height="72px"
                  ref={imgRef}
                  style={{ borderRadius: "12px" }}
                />
                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={(e) => {
                    setProfileImage(e.target.files[0]);
                    imgRef.current.src = URL.createObjectURL(e.target.files[0]);
                  }}
                />
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    className="secondary-button"
                    style={{ width: "66px", height: "33px" }}
                    onClick={() => fileRef.current.click()}
                  >
                    변경
                  </button>
                  <button
                    className="secondary-button"
                    style={{ width: "66px", height: "33px" }}
                    onClick={() => (imgRef.current.src = "")}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>전문가 활동명</label>
              <Input value={expert.displayName} />
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>한 줄 소개</label>
              <Input
                value={expert.shortIntroduction}
                type="textarea"
                style={{ height: "72px" }}
              />
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>대표 서비스</label>
              <Input
                type="select"
                style={{ width: "200px", height: "37px" }}
                required
              >
                {expertServiceList.map((s) => (
                  <option
                    key={s.serviceId}
                    value={s.serviceId}
                    selected={s.serviceId === expert.mainServiceId}
                  >
                    {s.serviceName}
                  </option>
                ))}
              </Input>
            </div>
            <div
              className="labelInput-wrapper"
              style={{ padding: "8px 0", borderBottom: "none" }}
            >
              <label style={{ width: "160px" }}>우편번호</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "40px",
                }}
              >
                <p>{expert.activityArea.postcode}</p>
                <button
                  className="secondary-button"
                  style={{ width: "100px", height: "33px" }}
                  onClick={() => {
                    setModalType("주소");
                    setIsModalOpen(true);
                  }}
                >
                  우편번호 검색
                </button>
              </div>
            </div>
            <div
              className="labelInput-wrapper"
              style={{ borderBottom: "none" }}
            >
              <label style={{ width: "160px" }}>도로명 주소</label>
              <p>{expert.activityArea.address1}</p>
            </div>
            <div
              className="labelInput-wrapper"
              style={{ padding: "8px 0 16px 0" }}
            >
              <label style={{ width: "160px" }}>상세 주소</label>
              <Input value={expert.activityArea.address2} />
              <span
                style={{
                  color: "#A0A0A0",
                  fontSize: "12px",
                  fontWeight: "400",
                  marginLeft: "10px",
                }}
              >
                {" "}
                입력하신 주소는 시/구 단위까지만 공개됩니다.
              </span>
            </div>
          </div>

          <div ref={infoRef}>
            <h3 className="mypage-sectionTitle">전문가 정보</h3>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>직원수</label>
              <Input value={expert.employeeCount} />
            </div>
            <div className="labelInput-wrapper time">
              <label style={{ width: "160px" }}>연락가능시간</label>
              <Input type="time" value={expert.availableStartTime} />
              <span>~</span>
              <Input type="time" value={expert.availableEndTime} />
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>외부링크</label>
              <div className="add">
                <div className="expert-profile-add-input">
                  <Input />
                  <button
                    className="secondary-button"
                    style={{ width: "66px", height: "37px" }}
                    onClick={() => {}}
                  >
                    추가
                  </button>
                </div>
                <div className="expert-profile-add-wrapper">
                  {expert.externalLinks.map((link) => (
                    <div>
                      <p>{link}</p>
                      <button
                        className="secondary-button"
                        style={{ width: "66px", height: "33px" }}
                        onClick={() => {}}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>제공 서비스</label>
              <div className="add">
                <div className="expert-profile-add-input">
                  <Input
                    type="select"
                    style={{ width: "348px", height: "37px" }}
                    required
                  >
                    {expertServiceList.map((s) => (
                      <option
                        key={s.serviceId}
                        value={s.serviceId}
                        selected={s.serviceId === expert.mainServiceId}
                      >
                        {s.serviceName}
                      </option>
                    ))}
                  </Input>
                  <button
                    className="secondary-button"
                    style={{ width: "66px", height: "37px" }}
                    onClick={() => {}}
                  >
                    추가
                  </button>
                </div>
                <div className="expert-profile-chip-wrapper">
                  {expert.serviceList.map((service) => (
                    <span className="expert-profile-chip">
                      {service.categoryName}
                      <i class="bi bi-x-circle"></i>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>경력</label>
              <div className="add">
                <button
                  className="secondary-button"
                  style={{ width: "66px", height: "37px" }}
                  onClick={() => {
                    setModalType("경력");
                    setIsModalOpen(true);
                  }}
                >
                  추가
                </button>
                <div className="expert-profile-card-wrapper">
                  {careers.map((career) => (
                    <div className="expert-profile-careerCard">
                      <div>
                        <span
                          style={{
                            fontWeight: "500",
                            marginBottom: "6px",
                            color: "#303441",
                          }}
                        >
                          {career.title}
                        </span>
                        <span>
                          {career.startDate} - {career.endDate}
                        </span>
                        <span>{career.description}</span>
                      </div>
                      <button
                        className="secondary-button"
                        style={{ width: "66px", height: "33px" }}
                        onClick={() => {}}
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>서비스 상세설명</label>
              <Input
                value={expert.serviceDescription}
                type="textarea"
                style={{ height: "158px" }}
              />
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>자격증 및 기타서류</label>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <button
                  className="secondary-button"
                  style={{ width: "66px", height: "37px" }}
                  onClick={() => {
                    certificateImgRef.current.click();
                  }}
                >
                  추가
                </button>
                <input
                  type="file"
                  hidden
                  ref={certificateImgRef}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    setCertificateImages((prev) => [
                      ...prev,
                      URL.createObjectURL(file),
                    ]);
                    setCertificateFiles((prev) => [...prev, file]);
                  }}
                />
                {certificateImages.length !== 0 && (
                  <div style={{ display: "flex", gap: "8px" }}>
                    {certificateImages.map((certificate, idx) => (
                      <div style={{ position: "relative" }}>
                        <img
                          key={idx}
                          src={certificate}
                          width="120px"
                          height="175px"
                          style={{ borderRadius: "8px" }}
                        />
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
                            setCertificateImages((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                            setCertificateFiles((prev) =>
                              prev.filter((_, i) => i !== idx)
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "160px" }}>사업자등록증</label>
              <img
                src={expert.usinessRegistrationImage}
                width="120px"
                height="175px"
                style={{ borderRadius: "8px" }}
                ref={businessImgRef}
                onClick={() => businessFileRef.current.click()}
              />
              <input
                type="file"
                hidden
                ref={businessFileRef}
                onChange={(e) => {
                  // setProfileImage(e.target.files[0]);
                  businessImgRef.current.src = URL.createObjectURL(
                    e.target.files[0]
                  );
                }}
              />
            </div>
          </div>
          <div ref={portfolioRef}>
            <h3 className="mypage-sectionTitle">포트폴리오</h3>
            <div className="labelInput-wrapper">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <button
                  className="secondary-button"
                  style={{ width: "66px", height: "37px" }}
                  onClick={() => {
                    setModalType("포트폴리오");
                    setIsModalOpen(true);
                  }}
                >
                  추가
                </button>
                <div style={{ display: "flex", gap: "8px" }}>
                  {portfolioList.map((portfolio) => (
                    <img
                      src={portfolio.images[0]}
                      width="150px"
                      height="150px"
                      style={{ borderRadius: "8px" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div ref={qaRef}>
            <h3 className="mypage-sectionTitle">질문답변</h3>
            <div className="labelInput-wrapper">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <button
                  className="secondary-button"
                  style={{ width: "66px", height: "37px" }}
                  onClick={() => {
                    setModalType("질문");
                    setIsModalOpen(true);
                  }}
                >
                  추가
                </button>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                  }}
                >
                  {expert.qaList.map((qa) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          fontWeight: "500",
                        }}
                      >
                        {qa.question}
                      </p>
                      <p
                        style={{
                          margin: "0",
                          color: "#6A7685",
                          lineHeight: "22px",
                          width: "424px",
                        }}
                      >
                        {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <button
              className="primary-button"
              style={{ width: "200px", height: "40px", fontSize: "14px" }}
            >
              완료
            </button>
          </div>
        </div>
      </div>

      {modalType === "주소" && (
        <Modal isOpen={isModalOpen} toggle={() => setIsModalOpen(!isModalOpen)}>
          <ModalBody>
            <DaumPostcode onComplete={handleComplate} onClose={handleClose} />
          </ModalBody>
        </Modal>
      )}

      {modalType === "경력" && (
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          className="mypage-modal"
          style={{ width: "460px" }}
        >
          <ModalHeader toggle={() => setIsModalOpen(false)}>
            경력 추가
          </ModalHeader>
          <ModalBody>
            <div className="label-wrapper">
              <label>
                경력 타이틀
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input placeholder="ex) 회사명" />
            </div>
            <div className="label-wrapper">
              <label>
                시작 연월
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input type="month" />
            </div>
            <div className="label-wrapper">
              <label>
                종료 연월
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Input
                  type="checkbox"
                  style={{ width: "18px", height: "18px" }}
                />
                <span
                  style={{
                    color: "#6D758F",
                    fontSize: "13px",
                    fontWeight: "400",
                  }}
                >
                  현재 진행 중
                </span>
              </div>
              <Input type="month" />
            </div>
            <div className="label-wrapper">
              <label>상세 설명</label>
              <Input
                type="textarea"
                placeholder="해당 경력에 대한 상세한 설명을 작성해주세요."
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="primary-button"
              style={{ width: "100%", height: "40px", fontSize: "14px" }}
            >
              경력 추가하기
            </button>
          </ModalFooter>
        </Modal>
      )}
      {modalType === "포트폴리오" && (
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          className="mypage-modal"
          style={{ width: "460px" }}
        >
          <ModalHeader toggle={() => setIsModalOpen(false)}>
            포트폴리오 작성
          </ModalHeader>
          <ModalBody>
            <div className="label-wrapper">
              <label>
                제목
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input placeholder="포트폴리오 제목을 작성해주세요" />
            </div>
            <div className="label-wrapper">
              <label>
                서비스 종류
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input
                type="select"
                style={{ height: "37px", fontSize: "14px" }}
                required
              >
                {expertServiceList.map((s) => (
                  <option key={s.serviceId} value={s.serviceId}>
                    {s.serviceName}
                  </option>
                ))}
              </Input>
            </div>
            <div className="label-wrapper">
              <label>
                지역
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input
                type="select"
                style={{ height: "37px", fontSize: "14px" }}
                required
              >
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Input>
            </div>
            <div className="label-wrapper">
              <label>
                서비스 금액
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <Input placeholder="서비스 금액을 입력해 주세요" />
            </div>
            <div className="label-wrapper">
              <label>
                작업 기간
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <div>
                <div className="mypage-chipList" style={{ paddingTop: "8px" }}>
                  <div
                    className={durationUnitChip === "HOUR" ? "isActive" : ""}
                    onClick={() => setDurationUnitChip("HOUR")}
                  >
                    시간
                  </div>
                  <div
                    className={durationUnitChip === "DAY" ? "isActive" : ""}
                    onClick={() => setDurationUnitChip("DAY")}
                  >
                    일
                  </div>
                  <div
                    className={durationUnitChip === "WEEK" ? "isActive" : ""}
                    onClick={() => setDurationUnitChip("WEEK")}
                  >
                    주
                  </div>
                  <div
                    className={durationUnitChip === "MONTH" ? "isActive" : ""}
                    onClick={() => setDurationUnitChip("MONTH")}
                  >
                    개월
                  </div>
                </div>
                <Input placeholder="작업기간을 입력해주세요" />
              </div>
            </div>
            <div className="label-wrapper">
              <label>상세 설명</label>
              <Input
                type="textarea"
                placeholder="해당 작업에 대한 상세한 설명을 작성해주세요."
              />
            </div>
            <div className="label-wrapper">
              <label>
                사진 첨부
                <span
                  style={{
                    color: "#F21724",
                    fontSize: "14px",
                    fontWeight: "700",
                    marginLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                }}
              >
                {portfolioImages.map((img, idx) => (
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
                        setPortfolioImages((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                        setPortfolioFiles((prev) =>
                          prev.filter((_, i) => i !== idx)
                        );
                      }}
                    />
                  </div>
                ))}
                {portfolioImages.length < 5 && (
                  <div
                    onClick={() => portfolioImgRef.current.click()}
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
                      ref={portfolioImgRef}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;

                        setPortfolioImages((prev) => [
                          ...prev,
                          URL.createObjectURL(file),
                        ]);
                        setPortfolioFiles((prev) => [...prev, file]);
                      }}
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
              포트폴리오 등록하기
            </button>
          </ModalFooter>
        </Modal>
      )}
      {modalType === "질문" && (
        <Modal
          isOpen={isModalOpen}
          toggle={() => setIsModalOpen(false)}
          className="mypage-modal"
          style={{ width: "460px" }}
        >
          <ModalHeader toggle={() => setIsModalOpen(false)}>
            질문답변 등록
          </ModalHeader>
          <ModalBody>
            <div className="label-wrapper">
              <label>서비스가 시작되기 전 어떤 절차로 진행하나요?</label>
              <Input
                type="textarea"
                placeholder="상담,예약, 서비스 진행, 대금 납부까지 어떻게 진행하는지 자세히 적어주세요."
                style={{ height: "100px" }}
              />
            </div>
            <div className="label-wrapper">
              <label>서비스의 견적은 어떤 방식으로 산정 되나요?</label>
              <Input
                type="textarea"
                placeholder="답변을 추가해주세요."
                style={{ height: "100px" }}
              />
            </div>
            <div className="label-wrapper">
              <label>A/S 또는 환불 규정은 어떻게 되나요?</label>
              <Input
                type="textarea"
                placeholder="답변을 추가해주세요."
                style={{ height: "100px" }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="primary-button"
              style={{ width: "100%", height: "40px", fontSize: "14px" }}
            >
              질문답변 등록하기
            </button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
}
