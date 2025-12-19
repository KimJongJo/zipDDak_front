import "../css/ToolDetail.css";
import { Heart, Share2, CircleAlert, MessageCircle, Dot, ArrowRight, ArrowLeft, Package } from "lucide-react";
import { Button } from "reactstrap";
import { Tool } from "../../main/component/Tool";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { useEffect, useState } from "react";
import { myAxios } from "../../config";
import { useNavigate, useParams } from "react-router-dom";

export default function ToolDetail() {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const { toolIdx } = useParams();
    console.log(toolIdx);
    console.log(token);
    const [tool, setTool] = useState(null);
    const navigate = useNavigate();

    const [ownerTool, setOwnerTool] = useState();
    const [ownerCnt, setOwnerCnt] = useState();

    const getTool = () => {
        const params = {
            toolIdx: toolIdx,
            username: user.username,
        };

        token &&
            myAxios(token, setToken)
                .get(`/tool/detail`, { params })
                .then((res) => {
                    console.log(res.data);
                    setTool(res.data);

                    const ownerParam = {
                        username: user.username,
                        owner: res.data.owner,
                        toolIdx: toolIdx,
                    };

                    return myAxios(token, setToken).get(`/tool/owner`, {
                        params: ownerParam,
                    });
                })
                .then((res) => {
                    console.log(res.data);
                    setOwnerTool(res.data.cards);
                    setOwnerCnt(res.data.totalCount);
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    useEffect(() => {
        if (toolIdx && token) {
            getTool();
        }
    }, [toolIdx, token]);

    //유저 주소 자르기
    const userAddressString = user?.addr1 || "";
    const userAdress = userAddressString.split(" ").slice(1, 3).join(" ");

    //공구 주소 자르기
    const toolAddressString = tool?.addr1 || "";
    const toolAdress = toolAddressString.split(" ").slice(1, 3).join(" ");

    //바로 대여
    const directApply = () => {
        console.log("toolIdx:", toolIdx);
        navigate(`/zipddak/tool/apply/${toolIdx}`);
    };

    if (!tool) {
        return <div>로딩중...</div>;
    }

    return (
        <>
            <div className="detail-container">
                <div className="d-info">
                    <div className="d-top">
                        <div className="d-user">
                            <div className="profileImage"></div>
                            <div className="userInfo">
                                <span className="nick">{tool.nickname}</span>
                                <span className="loca">{toolAdress}</span>
                            </div>
                        </div>
                        <div className="top-icons">
                            <Heart />
                            <Share2 />
                            <CircleAlert />
                        </div>
                    </div>
                    <div className="d-info-box">
                        <div className="d-tool-image">{/* <img src={`${tool.storagePath}/${tool.fileRename}`} /> */}</div>
                        <div className="d-infos">
                            <div className="infomation">
                                <div className="d-point">
                                    <div className="d-points">
                                        {tool.postRental && <div className="points">택배거래</div>}
                                        {tool.directRental && <div className="points">직거래</div>}
                                        <div className="points">{tool.categoryName}</div>
                                    </div>
                                    <span className="createdate">{tool.createdate}</span>
                                </div>

                                <div className="d-option">
                                    <span className="ca">{tool.categoryName}</span>
                                    <span className="na">{tool.name}</span>

                                    {/* <div className="d-ectInfo">
                                        <div className="ic">
                                            <Heart size={18} />
                                            {tool.favorite}
                                        </div>
                                        <Dot />
                                        <div className="ic">
                                            <MessageCircle size={18} />
                                            {tool.chatCnt}
                                        </div>
                                    </div> */}

                                    <div className="d-price">
                                        {tool.freeRental ? (
                                            <span className="dt orange">무료대여</span>
                                        ) : (
                                            <>
                                                <span className="od">1일</span>
                                                <span className="tp">{tool.rentalPrice.toLocaleString()}</span>
                                                <span className="tp">원</span>
                                            </>
                                        )}
                                    </div>
                                    <div className="d-price">
                                        {tool.postCharge == 0 ? (
                                            <>
                                                <Package />
                                                <span className="dt orange">무료배송</span>
                                            </>
                                        ) : (
                                            <>
                                                <Package />
                                                <span className="dt">배송비</span>
                                                <span className="dt">{tool.postCharge.toLocaleString()}</span>
                                                <span className="dt">원</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="short-info">{tool.contnet}</div>
                            </div>
                            <div className="rentalBtn">
                                {tool.quickRental && (
                                    <Button className="tertiary-button long-button" onClick={directApply}>
                                        바로대여
                                    </Button>
                                )}
                                <Button className="primary-button long-button">대여문의</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-tab-nav">
                    <div className="d-nav active">공구상세</div>
                    <div className="d-nav">리뷰</div>
                </div>

                <div className="d-tab">
                    <div className="de-label">상세이미지</div>
                    <div className="detailImage">
                        <div className="fbBtn">
                            <ArrowLeft />
                        </div>
                        <div className="dimgs">
                            <div className="imgNav">
                                <div className="dots">
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                </div>
                            </div>
                        </div>
                        <div className="fbBtn">
                            <ArrowRight />
                        </div>
                    </div>
                    <div className="de-two">
                        <div className="de-three">
                            <div className="de-label">상세설명</div>
                            <div>{tool.content}</div>
                        </div>
                        <div className="de-favlocation">
                            <div className="de-map"></div>
                            <div className="mapinfo">
                                <span className="map-label">거래 희망장소</span>
                                <span>{}</span>
                            </div>
                        </div>
                    </div>
                    <div className="moreTool">
                        <span className="de-label">'{tool.nickname}' 의 다른 공구</span>
                        <div className="morecards">{Array.isArray(ownerTool) && ownerTool.slice(0, 6).map((toolCard) => <Tool key={toolCard.toolIdx} tool={toolCard} />)}</div>
                    </div>
                </div>
                <div className="d-tab-review"></div>
            </div>
        </>
    );
}
