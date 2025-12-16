import { Search, MapPinned, ChevronDown, MapPin, Heart, ChevronLeft, ChevronRight, Hammer, PlusCircle, ChevronUp } from "lucide-react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "../css/ToolMain.css";
import { ToolL, MapTool } from "../../main/component/Tool";
import { userAtom, tokenAtom } from "../../atoms";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function ToolMain() {

    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const [tool, setTool] = useState([]);
    const navigate = useNavigate();

    //키워드
    const [keyword, setKeyword] = useState('');

    //공구 지도로 찾기
    const [openMap, setOpenMap] = useState(false);

    //유저 주소 자르기
    const userAddressString = user?.addr1 || '';
    const userAdress = userAddressString.split(' ').slice(0, 2).join(' ');

    //카테고리
    const [checkedCategory, setCheckedCategory] = useState([]);

    const handleCategoryCheck = (e) => {
        const idx = Number(e.target.value);
        const checked = e.target.checked;

        setCheckedCategory(prev => {
            if (checked) {
                return prev.includes(idx) ? prev : [...prev, idx];
            } else {
                return prev.filter(v => v !== idx);
            }
        });
    };

    const toolCateIdx = checkedCategory.join(",");

    //거래방식
    const [tWay, seTWay] = useState(0);

    //정렬기준
    const [tOrder, setTOrder] = useState();
    const [tActiveOrder, setTActiveOrder] = useState(0);

    const toolOrder = (orderNo) => {
        setTOrder(orderNo);
        setTActiveOrder(orderNo);
    }

    //대여중인 공구 보기
    const [rentalTool, setRentalTool] = useState(false);
    const checkRentalRool = (e) => {
        setRentalTool(e.target.checked);
    }

    //공구 리스트
    const toolList = () => {
       
        //지도 기준

        const params = {
            //키워드
            keyword: keyword || undefined,
            //유저
            username: user.username || undefined,
            //카테고리
            categoryNo: categoryNo || undefined,
             //거래방식
            tWay: tWay || undefined,
            //정렬기준
            tOrder: tOrder || undefined,
            //대여중인 공구
            rentalTool: rentalTool ? false : undefined,
        };

        const tokenPharam = token ? token : null;


        myAxios(tokenPharam, setToken).get('/tool/main',{params})
            .then((res) => {
                console.log(res.data);
                setTool(res.data);

            })
            .catch((err) => {
                console.log(err);
            })
    }

      useEffect(()=> {

        toolList();

      },[user.username, checkedCategory,tWay,tOrder,rentalTool,keyword])

    return (
        <>
            <div className="tool-container">
                <div className="filters">
                    <div className="tool-filter">
                        <div className="t-filter">
                            <span className="f-label">검색</span>
                            <div className="search-box">
                                <input className="keyword" type="text" placeholder="공구명으로 검색"></input>
                                <Search size={15} />
                            </div>
                        </div>
                        <div className="t-filter">
                            <span className="f-label">지역검색</span>
                            <div className="location-box">
                                <input className="location" type="text" placeholder="동네찾기" readOnly></input>
                                <Button className="primary-button mapBtn">
                                    <MapPinned size={20} />
                                </Button>
                            </div>
                        </div>
                        <div className="t-filter">
                            <span className="f-label">거래방식</span>
                            <div className="trade-main">
                                <select className="trade-select"
                                    value={tWay}
                                    onChange={(e) => seTWay(number(e.target.value))}>
                                    <option value={0}>전체</option>
                                    <option value={1}>직거래</option>
                                    <option value={2}>택배거래</option>
                                </select>
                                <ChevronDown className="trade-arrow" />
                            </div>
                        </div>
                    </div>
                    <div className="t-filter">
                        <span className="f-label">카테고리</span>
                        <div className="f-category">
                            <FormGroup check>
                                <Label check><Input id="checkbox2" type="checkbox"
                                    value={83}
                                    onChange={handleCategoryCheck} /> 전동공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check> <Input id="checkbox2" type="checkbox"
                                    value={84}
                                    onChange={handleCategoryCheck} /> 일반공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check><Input id="checkbox2" type="checkbox"
                                    value={85}
                                    onChange={handleCategoryCheck} />생활용품</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check><Input id="checkbox2" type="checkbox"
                                    value={86}
                                    onChange={handleCategoryCheck} />기타공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Label check><Input id="checkbox2" type="checkbox"
                                    value={87}
                                    onChange={handleCategoryCheck} />찾아요</Label>
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="findByMap">
                    <div className="title-main">
                        <MapPin size={24} color="#FF5833" />
                        <span>{user.addr1 ? `${userAdress} 공구대여` : '공구대여'}</span>
                        {openMap ?
                            <ChevronDown size={30} className="map-show"
                                onClick={() => setOpenMap(prev => !prev)} />
                            :
                            <ChevronUp size={30} className="map-close"
                                onClick={() => setOpenMap(prev => !prev)} />
                        }
                    </div>

                    <div className={`maplist ${openMap ? "open" : ""}`}>
                        <div className="map"></div>
                        <div className="list">
                            <div className="list-card">

                                {
                                    tool.map(toolCard => (
                                        <MapTool key={toolCard.toolIdx} tool={toolCard} toggleFavorite={toolCard.isFavorite} />
                                    ))
                                }

                            </div>

                            <div className="c-btn">
                                <div className="m-btn">
                                    <ChevronLeft />
                                </div>
                                <div className="m-btn">
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="map-bottom-list">
                    <div className="listBy">
                        <div className="by">
                            <div className={tActiveOrder === 0 ? "bbtn active" : "bbtn"}
                                onClick={() => toolOrder(0)}>전체</div>
                            <div className={tActiveOrder === 1 ? "bbtn active" : "bbtn"}
                                onClick={() => toolOrder(1)}>별점높은순</div>
                            <div className={tActiveOrder === 2 ? "bbtn active" : "bbtn"}
                                onClick={() => toolOrder(2)}>낮은가격순</div>
                            <div className={tActiveOrder === 3 ? "bbtn active" : "bbtn"}
                                onClick={() => toolOrder(3)}>높은가격순</div>
                        </div>

                        <Button className="primary-button" onClick={() => navigate(`/zipddak/tool/regist`)}>
                            <Hammer size={22} />
                            <span className="btn-text">내 공구 등록하기</span>
                        </Button>
                    </div>
                    <div className="hiddenTool">
                        <FormGroup check>
                            <Label check><Input id="checkbox2" type="checkbox"
                                checked={rentalTool}
                                onChange={checkRentalRool} /> 대여중인 공구 보기</Label>
                        </FormGroup>
                    </div>

                    <div className="cards">
                        {
                            tool.map(toolCard => (
                                <ToolL key={toolCard.toolIdx} tool={toolCard} toggleFavorite={toolCard.isFavorite} />
                            ))
                        }
                    </div>

                    <div className="moreBtn">
                        <span>더보기</span>
                        <PlusCircle size={20} />
                    </div>
                </div>
            </div>
        </>
    );
}
