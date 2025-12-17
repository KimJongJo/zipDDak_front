import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Tool.css";
import { Heart, Calendar, MessageCircle } from 'lucide-react'
import { Button } from "reactstrap";
import { useNavigate } from "react-router";

export function Tool({ tool, toggleFavorite }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(1, 3).join(' ');

    const navigate = useNavigate();

    return (
        <div className="Tool-card" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image">
                <img src={`${tool.storagePath}/${tool.fileRename}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavorite();
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
            </div>

            <div className="tool-info">
                <div className="tool-name">{tool.name}</div>
                <span className="tool-address">{toolAddress}</span>
                <div>
                    <span className="oneday">1일</span>
                    <span className="rental-price">{tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}

export function Toolmain({ tool, toggleFavorite }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const navigate = useNavigate();

    return (
        <div className="Tool-card-m" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image-m">
                <img src={`${tool.storagePath}/${tool.fileRename}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavorite();
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
            </div>

            <div className="tool-info-m">
                <div className="tool-name-m">{tool.name}</div>
                <span className="tool-address-m">{toolAddress}</span>
                <div>
                    <span className="oneday-m">1일</span>
                    <span className="rental-price-m">{tool.rentalPrice.toLocaleString()}</span>
                    <span className="rental-price-m">원</span>
                </div>
            </div>
            <div className="tool-reaction-m">
                <div className="favs"><Heart size={14}/>{tool.favorite}</div>
                <i className="bi bi-dot dot"></i>
                <div className="chats"><MessageCircle size={13}/>{tool.toolchat}</div>
            </div>
        </div>
    );
}

export function ToolL({ tool, toggleFavorite }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const navigate = useNavigate();

    return (
        <div className="Tool-card-L" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image-L">
               <img src={`${tool.storagePath}/${tool.fileRename}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavorite();
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
                {
                    Tool.toolStatus &&
                    (<div className="tool-status-badge">대여중</div>)
                }
            </div>

            <div className="tool-info-L">
                <div className="tool-name-L">{tool.name}</div>
                <span className="tool-address-L">{toolAddress}</span>
                <div>
                    <span className="oneday-L">1일</span>
                    <span className="rental-price-L">{tool.rentalPrice.toLocaleString()}</span>
                    <span className="rental-price-L">원</span>
                </div>
            </div>
            <div className="tool-reaction-L">
                <div className="favs"><i className="bi bi-heart favicon"></i>{tool.toolfavorite}</div>
                <i className="bi bi-dot dot"></i>
                <div className="chats"><i className="bi bi-chat chaticon"></i>{tool.toolchat}</div>
            </div>
        </div>
    );
}

export function MapTool({ tool, toggleFavorite }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const navigate = useNavigate();

    return (
        <div className="tool-h">
            <div className="tool-image-h" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
                <img src={`${tool.storagePath}/${tool.fileRename}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavorite();
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
            </div>

            <div className="tool-info-h">
                <div className="tool-name-h">{tool.name}</div>
                <span className="tool-address-h">{toolAddress}</span>
                <div>
                    <span className="oneday-h">1일</span>
                    <span className="rental-price-h">{tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export function MyToolCard() {
    return (

        <a href="#" className="myTool">
            <div className="row-cm myTool-card">
                <div className="myTool-image"></div>
                <div className="col-cm myTool-box">
                    <div className="row-cm myTool-rabel">
                        <span className="myTool-name">{ }열풍기</span>
                        <span className="myTool-category">{ }전동공구</span>
                    </div>
                    <div className="myTool-price">{ }10,000</div>
                    <div className="row-cm myTool-bottom">
                        <div className="row-cm">
                            <div className="row-cm">
                                <Calendar />
                                <div className="col-cm myTool-status">
                                    <div className="myTool-rental-status">대여상태</div>
                                    <div className="myTool-rental-type">{ }대여중</div>
                                </div>
                            </div>
                            <div className="row-cm">
                                <Calendar />
                                <div className="col-cm myTool-status">
                                    <div className="myTool-rental-status">거래방식</div>
                                    <div className="myTool-rental-type">{ }직거래</div>
                                </div>
                            </div>
                        </div>
                        <div className="myTool-button">
                            <Button>대여중지</Button>
                            <Button>수정</Button>
                            <Button>삭제</Button>
                        </div>
                    </div>
                </div>
            </div>
        </a>

    )
}