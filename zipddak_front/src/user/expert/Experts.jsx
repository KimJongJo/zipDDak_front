import { useState } from "react";
import "../../css/user-expert/Experts.css";
import { Input } from "reactstrap";
import Expert from "./Expert";

export default function Experts() {
    const [selectMajor, setSelectMajor] = useState(1);

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
                    <div className="experts-add-expert-list">
                        {experts.map((expert) => (
                            <Expert expert={expert} />
                        ))}
                    </div>

                    {/* 전문가 + 정렬 필터 */}
                    <div className="experts-search-expert-sort">
                        <span className="font-18 semibold">전문가</span>
                        <select className="experts-search-sort" name="" id="" defaultValue={"none"}>
                            <option value="none" hidden>
                                정렬
                            </option>
                            <option value="">인기순</option>
                        </select>
                    </div>

                    {/* 전문가 프로필 3개씩 N줄 */}
                    <div className="experts-add-expert-list">
                        {experts.map((expert) => (
                            <Expert expert={expert} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
