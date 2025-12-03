import { Search, MapPinned, ChevronDown, MapPin, Heart, ChevronLeft, ChevronRight, Hammer, PlusCircle } from "lucide-react";
import { Button, FormGroup, Input, Label } from "reactstrap";
import "../css/ToolMain.css";
import Header from "../../main/pages/Header";
import { ToolL } from "../../Main/component/Tool";

export default function ToolMain() {
    const Tool = {
        TooltName: "공구 이름",
        address: "김포시 사우동",
        rentalPrice: 34900,
    };

    return (
        <>
            <Header1 />

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
                                <div className="mapBtn">
                                    <Button>
                                        <MapPinned size={20} />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="t-filter">
                            <span className="f-label">거래방식</span>
                            <div className="trade">
                                <select className="trade-select">
                                    <option>전체</option>
                                    <option>직거래</option>
                                    <option>택배거래</option>
                                </select>
                                <ChevronDown className="trade-arrow" />
                            </div>
                        </div>
                    </div>
                    <div className="t-filter">
                        <span className="f-label">카테고리</span>
                        <div className="f-category">
                            <FormGroup check>
                                <Input id="checkbox2" type="checkbox" /> <Label check>전동공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="checkbox2" type="checkbox" /> <Label check>일반공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="checkbox2" type="checkbox" /> <Label check>생활용품</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="checkbox2" type="checkbox" /> <Label check>기타공구</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="checkbox2" type="checkbox" /> <Label check>찾아요</Label>
                            </FormGroup>
                        </div>
                    </div>
                </div>

                <div className="findByMap">
                    <div className="title-main">
                        <MapPin size={24} color="#FF5833" />
                        <span>인천 남동구 공구대여</span>
                        <ChevronDown size={30} className="map-show" />
                    </div>

                    <div className="maplist">
                        <div className="map"></div>
                        <div className="list">
                            <div className="list-card">
                                <a href="#" className="tool-h">
                                    <div className="tool-image-h">
                                        <div className="favorite-iconh">
                                            <Heart />
                                        </div>
                                    </div>

                                    <div className="tool-info-h">
                                        <div className="tool-name-h">{Tool.TooltName}</div>
                                        <span className="tool-address-h">{Tool.address}</span>
                                        <div>
                                            <span className="oneday-h">1일</span>
                                            <span className="rental-price-h">{Tool.rentalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </a>

                                <a href="#" className="tool-h">
                                    <div className="tool-image-h">
                                        <div className="favorite-iconh">
                                            <Heart />
                                        </div>
                                    </div>

                                    <div className="tool-info-h">
                                        <div className="tool-name-h">{Tool.TooltName}</div>
                                        <span className="tool-address-h">{Tool.address}</span>
                                        <div>
                                            <span className="oneday-h">1일</span>
                                            <span className="rental-price-h">{Tool.rentalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </a>

                                <a href="#" className="tool-h">
                                    <div className="tool-image-h">
                                        <div className="favorite-iconh">
                                            <Heart />
                                        </div>
                                    </div>

                                    <div className="tool-info-h">
                                        <div className="tool-name-h">{Tool.TooltName}</div>
                                        <span className="tool-address-h">{Tool.address}</span>
                                        <div>
                                            <span className="oneday-h">1일</span>
                                            <span className="rental-price-h">{Tool.rentalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </a>
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

                <div className="listBy">
                    <div className="by">
                        <div className="bbtn active">별점높은순</div>
                        <div className="bbtn">낮은가격순</div>
                        <div className="bbtn">높은가격순</div>
                    </div>

                    <Button className="regibtn">
                        <Hammer size={22} />
                        <span className="btn-text">내 공구 등록하기</span>
                    </Button>
                </div>
                <div className="hiddenTool">
                    <FormGroup check>
                        <Input id="checkbox2" type="checkbox" /> <Label check>대여중인 공구 보기</Label>
                    </FormGroup>
                </div>

                <div className="cards">
                    <ToolL />
                    <ToolL />
                    <ToolL />
                    <ToolL />
                </div>

                <div className="moreBtn">
                    <span>더보기</span>
                    <PlusCircle size={20} />
                </div>
            </div>
        </>
    );
}
