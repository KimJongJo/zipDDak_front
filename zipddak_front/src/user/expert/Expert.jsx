import "../../css/user-expert/Expert.css";

export default function Expert({ expert }) {
    // const expert = {
    //     img: "/images/기본회원프로필.jpg",
    //     name: "전문가명",
    //     major: "대표 전문가 서비스",
    //     reviewScore: 5.0,
    //     reviewCount: 10,
    //     address: "서울 금천구 가산동",
    //     career: 10,
    //     matching: 20,
    //     intro: "대충 한마디 설명 어쩌구 저쩌구 저쩌구 ...",
    // };

    return (
        <a href="#" className="expert-div">
            {/* 전문가 사진 + 전문가명, 서비스 */}
            <div className="expert-img-div">
                {/* 프로필 이미지 */}
                <img className="expert-img" src={expert.img} />
                <div className="expert-name-div">
                    {/* 전문가명 */}
                    <span className="font-14 semibold">{expert.name}</span>
                    {/* 대표 전문가 서비스 */}
                    <span className="font-13">{expert.major}</span>
                </div>
            </div>

            {/* 별점 */}
            <div className="expert-star-div">
                <i className="bi bi-star-fill expert-star"></i>
                <span className="font-13 medium">{expert.reviewScore.toFixed(1)}</span>
                <span className="font-12 expert-review-count">({expert.reviewCount})</span>
            </div>

            <div className="expert-info-div">
                {/* 활동지역 */}
                <div className="expert-career-div">
                    <span className="font-13">
                        <i className="bi bi-geo-alt font-11"></i>
                        {expert.address}
                    </span>
                </div>

                {/* 경력 + 고용 */}
                <div className="expert-career-div">
                    {/* 경력 */}
                    <span className="font-13">
                        <i className="bi bi-award font-11"></i>경력{expert.career}년
                    </span>
                    <i className="bi bi-dot font-11"></i>
                    {/* 고용 */}
                    <span className="font-13">
                        <i className="bi bi-emoji-smile font-11"></i>고용{expert.matching}회
                    </span>
                </div>
            </div>

            {/* 소개글 */}
            <div className="font-14 expert-intro">{expert.intro}</div>
        </a>
    );
}
