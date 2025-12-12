import { useEffect, useState, useRef, useCallback } from "react";
import "../css/Experts.css";
import { Input } from "reactstrap";
import Expert from "./Expert";
import axios from "axios";
import { baseUrl } from "../../config";

export default function Experts() {
    const [selectMajor, setSelectMajor] = useState(1);
    const [expertList, setExpertList] = useState([]);

    const [sort, setSort] = useState("popular");
    const [page, setPage] = useState(1); // 현재 페이지
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터 존재 여부
    const observer = useRef();

    // 검색창에 있는 text 가져오기
    const inputRef = useRef(null);
    const [keyword, setKeyword] = useState("");

    const expertMajor = [
        { majorId: 1, major: "수리 전문가" },
        { majorId: 2, major: "인테리어 전문가" },
        { majorId: 3, major: "컨설팅 전문가" },
    ];

    const experts = [
        {
            img: "/images/기본회원프로필.jpg",
            name: "전문가명",
            major: "대표 전문가 서비스",
            reviewScore: 5.0,
            reviewCount: 10,
            address: "서울 금천구 가산동",
            career: 10,
            matching: 20,
            intro: "대충 한마디 설명 어쩌구 저쩌구 저쩌구 ...",
        },
        {
            img: "/images/기본회원프로필.jpg",
            name: "전문가명",
            major: "대표 전문가 서비스",
            reviewScore: 5.0,
            reviewCount: 10,
            address: "서울 금천구 가산동",
            career: 10,
            matching: 20,
            intro: "대충 한마디 설명 어쩌구 저쩌구 저쩌구 ...",
        },
        {
            img: "/images/기본회원프로필.jpg",
            name: "전문가명",
            major: "대표 전문가 서비스",
            reviewScore: 5.0,
            reviewCount: 10,
            address: "서울 금천구 가산동",
            career: 10,
            matching: 20,
            intro: "대충 한마디 설명 어쩌구 저쩌구 저쩌구 ...",
        },
    ];

    const fetchProducts = async (value) => {
        setLoading(true);
        console.log(page);

        let searchKeyword;
        searchKeyword = value === undefined ? keyword : value;

        try {
            // 테스트용으로 뒤에 username을 붙임
            const res = await axios.get(`${baseUrl}/experts?page=${page}&cateNo=${selectMajor}&sort=${sort}`);
            if (res.data.length === 0) {
                setHasMore(false); // 더 이상 데이터 없음
            } else {
                setExpertList((prev) => [...prev, ...res.data.experts]); // 기존 데이터에 추가
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const lastProductRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prev) => prev + 1); // 마지막 아이템이 화면에 보이면 페이지 증가
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // 첫 화면을 불러올때

    useEffect(() => {
        if (!hasMore) return;

        fetchProducts();
    }, [page, hasMore, selectMajor]);

    return (
        <div className="body-div">
            <div className="experts-main-div">
                {/* 전문가 목록 카테고리 */}
                <div className="experts-cate-select-bar">
                    <span className="font-22 semibold experts-cate-select-span">전문가 목록</span>
                    <div className="experts-cate-select-button-div">
                        {expertMajor.map((expert) => (
                            <button key={expert.majorId} onClick={() => setSelectMajor(expert.majorId)} className={expert.majorId === selectMajor ? "experts-select-major" : "experts-default-major"}>
                                {expert.major}
                            </button>
                        ))}
                    </div>
                </div>
                {/* 검색바 + 전문가 프로필 */}
                <div className="experts-search-expert-div">
                    {/* 검색바 */}
                    <div className="experts-search-bar-div">
                        <Input placeholder="위치 및 전문가 명을 검색해주세요" className="experts-search-bar-input font-14" />
                        <button className="experts-search-bar-button">
                            <i className="bi bi-search "></i>
                        </button>
                    </div>

                    {/* 추천 전문가(광고) + 견적 요청 버튼 */}
                    <div className="experts-add-expert-div">
                        <span className="font-18 semibold add-experts-span">
                            추천 전문가<span className="font-14 semibold add">(광고)</span>
                        </span>
                        <button type="button" className="experts-request-button font-14 semibold">
                            견적 요청
                        </button>
                    </div>

                    {/* 광고 전문가 프로필 3개 */}
                    <div
                        className="experts-add-expert-list"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            rowGap: "50px", // 줄 간격
                        }}
                    >
                        {experts.map((expert, index) => (
                            <Expert
                                key={index}
                                expert={expert}
                                style={{ flex: "0 0 32%", boxSizing: "border-box" }} // Expert 컴포넌트 안에서 style prop 받도록 수정 필요
                            />
                        ))}
                    </div>

                    {/* 전문가 + 정렬 필터 */}
                    <div className="experts-search-expert-sort">
                        <span className="font-18 semibold">전문가</span>
                        <select onChange={(e) => setSort(e.target.value)} className="experts-search-sort" name="" id="">
                            <option value="popular">인기순</option>
                            <option value="rating">평점순</option>
                            <option value="career">경력순</option>
                        </select>
                    </div>

                    {/* 전문가 프로필 3개씩 N줄 */}
                    <div
                        className="experts-add-expert-list"
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            rowGap: "50px", // 줄 간격
                        }}
                    >
                        {expertList.map((expert, index) => (
                            <div key={expert.expertIdx} ref={expertList.length === index + 1 ? lastProductRef : null}>
                                <Expert
                                    expert={expert}
                                    style={{ flex: "0 0 32%", boxSizing: "border-box" }} // Expert 컴포넌트 안에서 style prop 받도록 수정 필요
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
