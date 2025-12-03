import { Button, Input } from "reactstrap";
import "../css/CommunityDetail.css";
import { Eye, Dot, Heart } from "lucide-react";

export default function Comdetail() {
    const ComContent = {
        title: "두개 중에 어떤 배치가 나은가요",
        Writer: "닉네임",
        content:
            "방을 꾸미는데 자꾸 의견이 안맞아서 여기에 조언을 구합니다..!방을 꾸미는데 자꾸 의견이 안맞아서 여기에 조언을 구합니다..!방을 꾸미는데 자꾸 의견이 안맞아서 여기에 조언을 구합니다..!둘중에 더 괜찮은 것 같은 배치를 알려주세요..ㅜ귀찮으시면 1 / 2 이렇게라도..아니면 다른 배치에 대한 조언도 환영입니다~!!!",
        commentCnt: 5,
        viewCnt: 80,
        category: "전문가에게 묻다",
        createDate: "2025.03.05",
    };

    return (
        <>
            <div className="ComDetail-container">
                <div className="col-cm">
                    <div className="col-cm comTop">
                        <div className="category">{ComContent.category}</div>
                        <div className="title">{ComContent.title}</div>
                        <div className="row-cm ects">
                            <div className="row-cm ectInfo">
                                <div>{ComContent.createDate}</div>
                                <Dot size={18} />
                                <span>조회</span>
                                <div>{ComContent.viewCnt}</div>
                            </div>
                            <div className="row-cm ectInfo">
                                <span>수정</span>
                                <Dot size={18} />
                                <span>삭제</span>
                                <Dot size={18} />
                                <span>신고</span>
                            </div>
                        </div>
                    </div>
                    <div className="row-cm UserInfo">
                        <div className="profileImg"></div>
                        <span className="nick">{ComContent.Writer}</span>
                    </div>

                    <div className="col-cm ComBody">
                        <div className="ComContext">{ComContent.content}</div>
                        <div className="col-cm contextImgs">
                            <div className="c-img"></div>
                        </div>
                        <div className="row-cm favdiv">
                            <div className="col-cm favBtn">
                                <Heart size={26} className="htn" />
                                <span>12121</span>
                            </div>
                        </div>
                    </div>

                    <div className="row-cm comment">
                        <span className="cms">댓글</span>
                        <span className="cmsCnt">{ComContent.commentCnt}</span>
                    </div>

                    <div className="col-cm write-box">
                        <div className="row-cm writer-user">
                            <div className="profileImg small"></div>
                            <span className="cnick">닉네임</span>
                        </div>
                        <div className="row-cm textInput">
                            <textarea className="texta" />
                            <Button>작성</Button>
                        </div>
                    </div>

                    {/* 댓글 리스트 */}
                    <div className="col-cm commentList">
                        <div className="col-cm ">
                            <div className="row-cm writer-user">
                                <div className="profileImg small"></div>
                                <span className="cnick">닉네임</span>
                            </div>
                            <div className="comms">{ComContent.content}</div>
                            <div className="row-cm ectInfo reply">
                                <div>{ComContent.createDate}</div>
                                <Dot size={18} />
                                <span>신고</span>
                            </div>
                        </div>

                        <div className="col-cm ">
                            <div className="row-cm writer-user">
                                <div className="profileImg small"></div>
                                <span className="cnick">닉네임</span>
                            </div>
                            <div className="comms">{ComContent.content}</div>
                            <div className="row-cm ectInfo reply">
                                <div>{ComContent.createDate}</div>
                                <Dot size={18} />
                                <span>신고</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
