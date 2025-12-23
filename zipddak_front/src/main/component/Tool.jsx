import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Tool.css";
import { Heart, Calendar, MessageCircle,Package2 } from 'lucide-react'
import { Button } from "reactstrap";
import { useNavigate } from "react-router";
import { myAxios } from "../../config";
import { useState } from "react";
import { tokenAtom, userAtom } from "../../atoms";
import { useAtom } from "jotai";

export function Tool({ tool, toggleFavoriteTool }) {

    const [user, setUsre] = useAtom(userAtom);

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(1, 3).join(' ');

    const toolDirectAddrString = tool.tradeAddr1;
    const toolDirectAddress = toolDirectAddrString.split(' ').slice(1, 3).join(' ');

    const navigate = useNavigate();

    return (
        <div className="Tool-card" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image">
                <img src={`http://localhost:8080/imageView?type=tool&filename=${tool.thunbnail}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        user.username && toggleFavoriteTool(tool.toolIdx);
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart iconNoneBack"></i>}
                </button>
            </div>

            <div className="tool-info">
                <div className="tool-name">{tool.name}</div>
                <span className="tool-address">{tool.tradeAddr? toolDirectAddress : toolAddress }</span>
                <div>
                    <span className="oneday">1일</span>
                    <span className="rental-price">{tool.rentalPrice.toLocaleString()}</span>
                    <span className="rental-price">원</span>
                </div>
            </div>
        </div>
    );
}

export function Toolmain({ tool, toggleFavoriteTool }) {

    const [user, setUsre] = useAtom(userAtom);

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const toolDirectAddrString = tool.tradeAddr1;
    const toolDirectAddress = toolDirectAddrString.split(' ').slice(1, 3).join(' ');

    const navigate = useNavigate();


    return (
        <div className="Tool-card-m" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image-m">
                <img src={`http://localhost:8080/imageView?type=tool&filename=${tool.thunbnail}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        user.username && toggleFavoriteTool(tool.toolIdx);
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart iconNoneBack"></i>}
                </button>
                {
                    tool.satus == "INABLE" &&
                    (<div className="tool-status-badge">대여중</div>)
                }
            </div>

            <div className="tool-info-m">
                <div className="tool-name-m">{tool.name}</div>
                <span className="tool-address-m">{tool.tradeAddr? toolDirectAddress : toolAddress }</span>
                <div>
                    <span className="oneday-m">1일</span>
                    <span className="rental-price-m">{tool.rentalPrice.toLocaleString()}</span>
                    <span className="rental-price-m">원</span>
                </div>
            </div>
            <div className="tool-reaction-m">
                {tool.favoriteCount&&
                <div className="favs"><Heart size={14}/>{tool.favoriteCount}</div>
                }
                {tool.favoriteCount&&tool.rentalCount&&
                <i className="bi bi-dot dot"></i>
                }
                {tool.rentalCount&&
                <div className="chats"><Package2 size={13}/>{tool.rentalCount}</div>
                }
            </div>
        </div>
    );
}

export function ToolL({ tool, toggleFavoriteTool }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const toolDirectAddrString = tool.tradeAddr1;
    const toolDirectAddress = toolDirectAddrString.split(' ').slice(1, 3).join(' ');

    const navigate = useNavigate();

    return (
        <div className="Tool-card-L" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="tool-image-L">
                {console.log(tool.sumbnail)}
               <img src={`http://localhost:8080/imageView?type=tool&filename=${tool.thunbnail}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavoriteTool(tool.toolIdx);
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart iconNoneBack"></i>}
                </button>
                {
                    Tool.toolStatus &&
                    (<div className="tool-status-badge">대여중</div>)
                }
            </div>

            <div className="tool-info-L">
                <div className="tool-name-L">{tool.name}</div>
                <span className="tool-address-L">{tool.tradeAddr? toolDirectAddress : toolAddress }</span>
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

export function MapTool({ tool, toggleFavoriteTool }) {

    const toolAddrString = tool.addr1;
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const toolDirectAddrString = tool.tradeAddr1;
    const toolDirectAddress = toolDirectAddrString.split(' ').slice(1, 3).join(' ');

    return (
        <div className="tool-h">
            <div className="tool-image-h" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
                <img src={`http://localhost:8080/imageView?type=tool&filename=${tool.thunbnail}`} alt="공구" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavoriteTool(tool.toolIdx);
                    }}
                    className="favorite-icon"
                >
                    {tool.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart iconNoneBack"></i>}
                </button>
            </div>

            <div className="tool-info-h">
                <div className="tool-name-h">{tool.name}</div>
                <span className="tool-address-h">{tool.tradeAddr? toolDirectAddress : toolAddress }</span>
                <div>
                    <span className="oneday-h">1일</span>
                    <span className="rental-price-h">{tool.rentalPrice.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}

export function MyToolCard({ tool,onChanged }) {

     const navigate = useNavigate();

     const [user, setUser]= useAtom(userAtom);
     const [token,setToken]=useAtom(tokenAtom);

    //대여중지 변경
    const stopRental = async () => {
    await myAxios(token, setToken).post('/tool/stop', {
        toolIdx: tool.toolIdx,
        username: user.username
    });
    onChanged();
};

    //tool삭제
    const deleteTool = async()=> {
        myAxios(token,setToken).post(`/tool/delete`,{
                toolIdx:tool.toolIdx,
                username:user.username
            });
        
        onChanged();
        
    }

    return (

        <div className="myTool" onClick={() => navigate(`/zipddak/tool/${tool.toolIdx}`)}>
            <div className="row-cm myTool-card">
                <div className="myTool-image">
                <img src={`http://localhost:8080/imageView?type=tool&filename=${tool.thunbnail}`} alt="공구" />
                {
                    Tool.toolStatus &&
                    (<div className="tool-status-badge">대여중</div>)
                }
                </div>
                <div className="col-cm myTool-box">
                    <div className="col-cm titleMyTool">
                    <div className="row-cm myTool-rabel">
                        <span className="myTool-name">{ tool.name}</span>
                        <span className="myTool-category">{ tool.categoryName}</span>
                    </div>
                    <div className={tool.rentalPrice==0? "myTool-price orangeColor":"myTool-price"}>{tool.rentalPrice==0? "무료대여" : tool.rentalPrice.toLocaleString()+"원"}</div>
                    </div>
                    <div className="row-cm myTool-bottom">
                        <div className="row-cm ToolMyBox">
                            <div className="row-cm rentalBox" >
                                <Calendar />
                                <div className="col-cm myTool-status">
                                    <div className="myTool-rental-status">대여상태</div>
                                    <div className={tool.satus=="STOP"? "myTool-rental-type orange":"myTool-rental-type"}>{tool.satus=="ABLE"&& "대여가능" }
                                        {tool.satus=="INABLE"&& "대여중" }{tool.satus=="STOP"&& "대여중지" }</div>
                                </div>
                            </div>
                            <div className="row-cm rentalBox">
                                <Calendar />
                                <div className="col-cm myTool-status">
                                    <div className="myTool-rental-status">거래방식</div>
                                    <div className="myTool-rental-type">
                                        {tool.postRental&& "택배거래"}
                                        {tool.postRental&& tool.directRental && ", "}
                                        {tool.directRental&& "직거래"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="myTool-button">
                            {tool.satus != "INABLE"&&
                                <Button className={tool.satus=="ABLE"? "secondary-button rentalAble" :"secondary-button rentalDisable"}
                            onClick={(e)=>{stopRental(); e.stopPropagation();}}>
                                {tool.satus=="ABLE"? "대여가능" : "대여중지"}</Button>}
                            
                            <Button className="secondary-button"
                            onClick={(e)=> {navigate(`/zipddak/tool/modify/${tool.toolIdx}`); e.stopPropagation();}}>수정</Button>
                            
                            <Button className="secondary-button"
                            onClick={(e)=>{deleteTool(); e.stopPropagation();}}>삭제</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}