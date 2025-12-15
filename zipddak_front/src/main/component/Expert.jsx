import "../css/Expert.css"
import { useNavigate } from "react-router";

export default function Expertmain({ expert }) {
    const navigate = useNavigate();

    return (
        <div className="expert-div-main"
         onClick={() => {
                navigate(`/zipddak/expertProfile/${expert.expertIdx}`);
            }}>
            {/* 전문가 사진 + 전문가명, 서비스 */}
            <div className="expert-img-div">
                {/* 프로필 이미지 */}
                 <img className="expert-img" 
                 src={`${expert.fileRename}/${expert.storagePath}`} alt="전문가" />
                <div className="expert-name-div">
                    {/* 전문가명 */}
                    <span className="font-14 semibold">{expert.activityName}</span>
                    {/* 대표 전문가 서비스 */}
                    <span className="font-13">{expert.mainServiceName}</span>
                </div>
            </div>

            {/* 별점 */}
            <div className="expert-star-div">
                <i className="bi bi-star-fill expert-star"></i>
                <span className="font-13 medium">{expert.avgRating}</span>
                <span className="font-12 expert-review-count">({expert.reviewCount})</span>
            </div>

            <div className="expert-info-div">
                {/* 활동지역 */}
                <div className="expert-career-div">
                    <span className="font-13">
                        <i className="bi bi-geo-alt font-11"></i>
                        {expert.addr1 + " " + expert.addr2}
                    </span>
                </div>

                {/* 경력 + 고용 */}
                <div className="expert-career-div">
                    {/* 경력 */}
                    <span className="font-13">
                        <i className="bi bi-award font-11"></i>
                        {expert.career < 12 ? "1년 미만" : `${Math.floor(expert.career / 12)}년`}
                    </span>
                    <i className="bi bi-dot font-11"></i>
                    {/* 고용 */}
                    <span className="font-13">
                        <i className="bi bi-emoji-smile font-11"></i>고용{expert.matchingCount}회
                    </span>
                </div>
            </div>

            {/* 소개글 */}
            {/* <div className="font-14 expert-intro">{expert.intro}</div> */}
        </div>
    );
}
