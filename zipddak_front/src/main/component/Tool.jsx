import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Tool.css";
import { Heart, Calendar } from 'lucide-react'
import { Button } from "reactstrap";

export function Tool() {
    const Tool = {
        TooltName: "공구 이름",
        address: "김포시 사우동",
        rentalPrice: 34900
    };

    return (
        <a href="#" className="Tool-card">
            <div className="tool-image">
                {/* <i className="bi bi-heart favorite-icon"></i> */}
                <div className="favorite-icon"><Heart /></div>
            </div>

            <div className="tool-info">
                <div className="tool-name">{Tool.TooltName}</div>
                <span className="tool-address">{Tool.address}</span>
                <div>
                    <span className="oneday">1일</span>
                    <span className="rental-price">{Tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
        </a>
    );
}

export function Toolmain() {
    const Tool = {
        TooltName: "공구 이름",
        address: "김포시 사우동",
        rentalPrice: 34900,
        toolfavorite: 118,
        toolchat: 7
    };

    return (
        <a href="#" className="Tool-card-m">
            <div className="tool-image-m">
                {/* <i className="bi bi-heart favorite-icon"></i> */}
                <div className="favorite-icon"><Heart /></div>
            </div>

            <div className="tool-info-m">
                <div className="tool-name-m">{Tool.TooltName}</div>
                <span className="tool-address-m">{Tool.address}</span>
                <div>
                    <span className="oneday-m">1일</span>
                    <span className="rental-price-m">{Tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
            <div className="tool-reaction-m">
                <div className="favs"><i className="bi bi-heart favicon"></i>{Tool.toolfavorite}</div>
                <i className="bi bi-dot dot"></i>
                <div className="chats"><i className="bi bi-chat chaticon"></i>{Tool.toolchat}</div>
            </div>
        </a>
    );
}

export function ToolL() {
    const Tool = {
        TooltName: "공구 이름",
        address: "김포시 사우동",
        rentalPrice: 34900,
        toolfavorite: 118,
        toolchat: 7,
        toolStatus: true
    };

    return (
        <a href="#" className="Tool-card-L">
            <div className="tool-image-L">
                {/* <i className="bi bi-heart favorite-icon"></i> */}
                <i className="bi bi-heart favorite-icon"></i>
                {
                    Tool.toolStatus &&
                    (<div className="tool-status-badge">대여중</div>)
                }
            </div>

            <div className="tool-info-L">
                <div className="tool-name-L">{Tool.TooltName}</div>
                <span className="tool-address-L">{Tool.address}</span>
                <div>
                    <span className="oneday-L">1일</span>
                    <span className="rental-price-L">{Tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
            <div className="tool-reaction-L">
                <div className="favs"><i className="bi bi-heart favicon"></i>{Tool.toolfavorite}</div>
                <i className="bi bi-dot dot"></i>
                <div className="chats"><i className="bi bi-chat chaticon"></i>{Tool.toolchat}</div>
            </div>
        </a>
    );
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