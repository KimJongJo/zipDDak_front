import { Button } from "reactstrap";
import "../css/CommunityDetail.css";
import { Community } from "../../main/component/Community";
import { useState, useEffect } from "react";

export default function CommunityList() {
    const [selectCate, setSelectCate] = useState(1);
    const cateList = [
        {
            no: 1,
            label: "우리집 자랑",
        },
        {
            no: 2,
            label: "자재 토론회",
        },
        {
            no: 3,
            label: "전문가에게 묻다",
        },
        {
            no: 4,
            label: "나만의 노하우",
        },
        {
            no: 5,
            label: "함께해요",
        },
        {
            no: 6,
            label: "전문가 소식",
        },
        {
            no: 7,
            label: "자유",
        },
    ];

    return (
        <>
            <div className="comList-container">
                <div className="row-cm commList-top">
                    <span className="comLabel">커뮤니티</span>
                    <Button>글쓰기</Button>
                </div>
                <div className="d-tab-nav">
                    {cateList.map((cate) => (
                        <div key={cate.no} onClick={() => setSelectCate(cate.no)} className={selectCate === cate.no ? "d-nav active" : "d-nav"}>
                            {cate.label}
                        </div>
                    ))}
                </div>

                <div className="col-cm commcardList">
                    {/* 페이지에 10개씩 */}
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                    <Community />
                </div>
            </div>
        </>
    );
}
