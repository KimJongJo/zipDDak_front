import { useState, useRef, useEffect } from "react";
import "../css/ExpertProfile.css";
import ExpertReviewCard from "./ExpertReviewCard";
import ExpertQuestion from "./ExpertQuestion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config";

export default function ExpertProfile() {
    const [selectInfoCateNo, setSelectInfoCateNo] = useState(1);

    const { expertIdx } = useParams();

    const [career, setCareer] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [expertProfile, setExpertProfile] = useState({});
    const [portfolio, setportfolio] = useState([]);

    const expert = {
        nickname: "전문가 활동명",
        major: "도어 시공",
        intro: "전문가의 간단한 소개가 들어갑니다.",
        address: "서울시 금천구 가산동",
    };

    const infoRef = useRef(null);
    const portfolioRef = useRef(null);
    const reviewRef = useRef(null);
    const questionRef = useRef(null);

    const expertDetail = [
        { detailNo: 1, name: "전문가 정보", ref: infoRef },
        { detailNo: 2, name: "포트폴리오", ref: portfolioRef },
        { detailNo: 3, name: "리뷰", ref: reviewRef },
        { detailNo: 4, name: "질문답변", ref: questionRef },
    ];

    const handleNavClick = (item) => {
        setSelectInfoCateNo(item.detailNo);

        const top = item.ref.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top, behavior: "instant" });
    };

    function formatTimeToAmPm(timeStr) {
        if (!timeStr) return ""; // null/undefined 안전 처리

        const [hours, minutes] = timeStr.split(":");
        let h = parseInt(hours, 10);
        const m = parseInt(minutes, 10);

        const ampm = h >= 12 ? "오후" : "오전";
        if (h === 0) h = 12; // 0시는 12시 오전
        else if (h > 12) h -= 12; // 13~23시는 1~11시 오후

        return m === 0 ? `${ampm} ${h}시` : `${ampm} ${h}시 ${m}분`;
    }

    useEffect(() => {
        axios.get(`${baseUrl}/expertProfile?expertIdx=${expertIdx}&username=rlawhdwh`).then((res) => {
            console.log(res.data);
            setCareer(res.data.careerDto);
            setCategoryList(res.data.categoryList);
            setExpertProfile(res.data.expertProfile);
            setportfolio(res.data.protFolioDtoList);
        });
    }, []);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5, // 50% 보이면 해당 섹션으로 인식
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // 어떤 ref가 보였는지 찾기
                    const visibleSection = expertDetail.find((item) => item.ref.current === entry.target);
                    if (visibleSection) {
                        setSelectInfoCateNo(visibleSection.detailNo);
                    }
                }
            });
        }, options);

        // 모든 섹션 observer에 등록
        expertDetail.forEach((item) => {
            if (item.ref?.current) observer.observe(item.ref.current);
        });

        return () => {
            expertDetail.forEach((item) => {
                if (item.ref?.current) observer.unobserve(item.ref.current);
            });
        };
    }, []);

    const expertReview = [
        {
            profileImg: "/images/기본회원프로필.jpg",
            nickname: "닉네임",
            reviewScore: 4.3,
            createdAt: "2025-11-28",
            images: ["/images/이미지테스트.png", "/images/이미지테스트.png", "/images/이미지테스트.png"],
            reviewContent: "리뷰 내용이 들어갑니다.",
        },
        {
            profileImg: "/images/기본회원프로필.jpg",
            nickname: "닉네임",
            reviewScore: 4.8,
            createdAt: "2025-11-24",
            images: [],
            reviewContent: "두번 째 리뷰 내용이 들어갑니다.",
        },
    ];

    const questions = [
        {
            question: "서비스가 시작되기전 어떤 절차로 진행하나요?",
            answer: "견적서 확인 및 예상 금액 전달 전화 상담 또는 채팅 상담 진행 예약 양식 작성 및 예약금 입금 장소 전일 담당 팀장님 해피콜 진행 청소 완료 후 잔금 입금",
        },
    ];

    return (
        <div className="body-div">
            <div className="expertProfile-main-div">
                {/* 이미지 ~ 활동 지역 */}
                <div className="expertProfile-detail-info-div">
                    <div className="expertProfile-img-div">
                        {/* 이미지 */}
                        <img className="expertProfile-img" src={"/images/기본회원프로필.jpg"} />

                        {/* 견적요청 버튼, 관심, 신고 */}
                        <div className="expertProfile-request-div">
                            <button className="expertProfile-request-button">견적 요청하기</button>
                            <div>
                                <i className="bi bi-heart expertProfile-heart"></i>
                                <i className="bi bi-exclamation-triangle expertProfile-report"></i>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* 전문가 활동명 */}
                        <span className="font-22 semibold">{expertProfile.activityName}</span>
                    </div>
                    <div>
                        {/* 전문 분야 */}
                        <span className="font-15 semibold">{expertProfile.mainServiceName}</span>
                        {/* 소개글 */}
                        <div className="font-15">{expertProfile.introduction}</div>
                        <span className="font-14">
                            <i className="bi bi-geo-alt font-15"></i>
                            {expertProfile.addr1 + " " + expertProfile.addr2}
                        </span>
                    </div>
                </div>
                <div className="expertProfile-info-category">
                    <div className="expertProfile-info-category-button-bar">
                        {expertDetail.map((detail) => (
                            <button
                                onClick={() => handleNavClick(detail)}
                                className={selectInfoCateNo === detail.detailNo ? "expertProfile-select-info-cate" : "expertProfile-default-info-cate"}
                                key={detail.detailNo}
                            >
                                {detail.name}
                            </button>
                        ))}
                    </div>
                    {/* 빈처리 */}
                    <div className="expertProfile-empty-bar"></div>
                </div>

                <div>
                    {/* 전문가 정보 */}
                    <div className="expertProfile-under-info-div" ref={infoRef}>
                        {/* 전문가 정보 div */}
                        <div className="expertProfile-expert-info">
                            <span className="font-18 semibold">전문가 정보</span>
                            <div>
                                <i className="bi bi-building font-15"></i>
                                <span className="font-14 margin-left-5">직원수</span>
                                {/* 직원수 */}
                                <span className="font-14 margin-left-5">{expertProfile.employeeCount} 명</span>
                            </div>
                            <div>
                                <i className="bi bi-clock font-15"></i>
                                <span className="font-14 margin-left-5">연락 가능 시간:</span>
                                {/* 연락 가능 시간 */}
                                <span className="font-14 margin-left-5">
                                    {/* 오전 시간 */}
                                    {formatTimeToAmPm(expertProfile.contactStartTime)} ~ {/* 오흐 시간 */}
                                    {formatTimeToAmPm(expertProfile.contactEndTime)}
                                </span>
                            </div>
                            {expertProfile.externalLink1 && (
                                <div className="expertProfile-links">
                                    <div>
                                        <i className="bi bi-globe font-15"></i>
                                        <a className="expertProfile-homepage-link margin-left-5 font-14 medium" href={expertProfile.externalLink1} target="_blank" rel="noopener noreferrer">
                                            {expertProfile.externalLink1}
                                        </a>
                                    </div>

                                    {expertProfile.externalLink2 && (
                                        <div>
                                            <i className="bi bi-globe font-15"></i>
                                            <a className="expertProfile-homepage-link margin-left-5 font-14 medium" href={expertProfile.externalLink2} target="_blank" rel="noopener noreferrer">
                                                {expertProfile.externalLink2}
                                            </a>
                                        </div>
                                    )}

                                    {expertProfile.externalLink3 && (
                                        <div>
                                            <i className="bi bi-globe font-15"></i>
                                            <a className="expertProfile-homepage-link margin-left-5 font-14 medium" href={expertProfile.externalLink3} target="_blank" rel="noopener noreferrer">
                                                {expertProfile.externalLink3}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* 제공 서비스div */}
                        <div className="expertProfile-provide-service">
                            <span className="font-18 semibold">제공 서비스</span>
                            {/* 제공 서비스 뱃지 */}
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                {categoryList.map((category) => (
                                    <div
                                        style={{
                                            padding: "0 20px",
                                            border: "1px solid #e0e5eb",
                                            height: "30px",
                                            display: "flex",
                                            justifyContent: "content",
                                            alignItems: "center",
                                            borderRadius: "15px",
                                        }}
                                    >
                                        <span className="font-14 medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 경력div */}
                        <div className="expertProfile-info-career-div">
                            {/* 경력 */}
                            <div className="expertProfile-info-career">
                                <span className="font-18 semibold">경력</span>
                                <span className="font-15 medium mainColor">
                                    <span className="font-15 medium mainColor">
                                        총 경력{" "}
                                        {career.career <= 0
                                            ? "경력 없음"
                                            : career.career < 1
                                            ? "1개월 미만"
                                            : career.career < 12
                                            ? `${career.career}개월`
                                            : `${Math.floor(career.career / 12)}년 ${career.career % 12 > 0 ? (career.career % 12) + "개월" : ""}`}
                                    </span>
                                </span>
                            </div>

                            {/* 경력 타이틀 div */}
                            <div>
                                {career.career !== 0 ? (
                                    career.careerList?.map((c) => (
                                        <div>
                                            {/* 경력 타이틀 */}
                                            <span className="font-15 medium">{c.title}</span>
                                            <div className="expertProfile-info-career-content">
                                                {/* 경력 기간 */}
                                                <span className="font-14">
                                                    {c.startDate.replaceAll("-", ".")} ~ {c.endDate.replaceAll("-", ".")}
                                                </span>
                                                {/* 경력 내용 */}
                                                <span className="font-14">{c.description}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>

                        {/* 서비스 상세 설명 div */}
                        <div className="expertProfile-service-detail">
                            <span className="font-18 semibold">서비스 상세 설명</span>
                            {/* 상세 설명 내용 */}
                            <div className="font-15">{expertProfile.providedServiceDesc}</div>
                        </div>

                        {/* 자격증 및 기타 서류 div */}
                        <div className="expertProfile-auth-img-div">
                            <span className="font-18 semibold">자격증 및 기타 서류</span>
                            {/* 자격증 */}
                            <div>
                                <img className="expertProfile-auth-img" src="/images/이미지테스트.png" />
                            </div>
                        </div>
                    </div>

                    <hr className="expertProfile-hr" />

                    {/* 포트폴리오 */}
                    <div className="expertProfile-portfolio-div" ref={portfolioRef}>
                        <span className="font-18 semibold">포트폴리오</span>
                        <div>
                            <img className="expertProfile-portfolio" src="/images/이미지테스트.png" />
                        </div>
                    </div>

                    <hr className="expertProfile-hr" />

                    {/* 리뷰 */}
                    <div ref={reviewRef}>
                        <div className="expertProfile-review-score-div">
                            <span className="font-18 semibold">리뷰</span>
                            <div className="expertProfile-review-score">
                                <i className="bi bi-star-fill" style={{ fontSize: "28px", color: "#F7C444" }}></i>
                                {/* 리뷰 평점 */}
                                <span className="font-24 semibold margin-left-5">4.9</span>

                                {/* 리뷰 수 */}
                                <span>(500)</span>
                            </div>
                        </div>
                        {/* 리뷰 반복 */}
                        <div>
                            {expertReview.map((review) => (
                                <ExpertReviewCard expertReview={review} />
                            ))}
                        </div>
                        <div className="expertProfile-review-more-button-div">
                            <button className="expertProfile-review-more-button font-14">
                                리뷰 더보기 <i className="bi bi-chevron-down more-icon"></i>
                            </button>
                        </div>
                    </div>

                    {/* 질문 답변 */}
                    <div className="expertProfile-question-answer-div" ref={questionRef}>
                        <span className="font-18 semibold">질문 답변</span>

                        {questions.map((question) => (
                            <ExpertQuestion question={question} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
