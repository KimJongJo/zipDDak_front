import './css/ToolDetail.css'
import { Heart, Share2, CircleAlert, MessageCircle, Dot, ArrowRight, ArrowLeft } from 'lucide-react'
import { Button } from 'reactstrap'
import { Header1 } from '../../Main/pages/Header'
import { Tool } from '../../Main/component/Tool'

export default function ToolDetail() {
    const rentalTool = {
        toolName: "공구 이름",
        tradeType1: "택배거래",
        tradeType2: "직거래",
        category: "전동공구",
        createdate: "2025.04.26",
        toolPrice: 25000,
        toolDetialInfo: "이러이러하고 저러저러한 상품입니다.",
        deliveryType: "택배거래",
        deliveryPrice: 6000,
        heartCnt: 188,
        chatCnt: 7,
        toolUserNick: "오디오 광",
        toolUserLocation: "김포시 사우동",
        toolUserProfile: "",
        favLocation:"김포시 사우동 어쩌고 초등학교 앞",
    }
    return (
        <>
            <div className="detail-container">
                <Header1/>
                <div className="d-info">
                    <div className='d-top'>
                        <div className="d-user">
                            <div className='profileImage'></div>
                            <div className='userInfo'>
                                <span className='nick'>{rentalTool.toolUserNick}</span>
                                <span className='loca'>{rentalTool.toolUserLocation}</span>
                            </div>
                        </div>
                        <div className='top-icons'>
                            <Heart />
                            <Share2 />
                            <CircleAlert />
                        </div>

                    </div>
                    <div className="d-info-box">
                        <div className="d-tool-image"></div>
                        <div className='d-infos'>
                            <div className="infomation">
                                <div className="d-point">
                                    <div className='d-points'>
                                        <div className='points'>{rentalTool.tradeType1}</div>
                                        <div className='points'>{rentalTool.tradeType2}</div>
                                        <div className='points'>{rentalTool.category}</div>
                                    </div>
                                    <span className='createdate'>{rentalTool.createdate}</span>
                                </div>

                                <div className="d-option">
                                    <span className='ca'>{rentalTool.category}</span>
                                    <span className='na'>{rentalTool.toolName}</span>

                                    <div className="d-ectInfo">
                                        <div className='ic'><Heart size={18} />{rentalTool.heartCnt}</div>
                                        <Dot />
                                        <div className='ic'><MessageCircle size={18} />{rentalTool.chatCnt}</div>
                                    </div>

                                    <div className='d-price'>
                                        <span className='od'>1일</span>
                                        <span className='tp'>{rentalTool.toolPrice}</span>
                                    </div>
                                    <div className='d-price'>
                                        <span className='dt'>{rentalTool.deliveryType}</span>
                                        <span className='dt'>{rentalTool.deliveryPrice}</span>
                                    </div>
                                </div>

                                <div className="short-info">{rentalTool.toolDetialInfo}</div>

                            </div>
                            <div className="rentalBtn">
                                <Button>대여문의</Button>
                                <Button>바로대여</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-tab-nav">
                    <div className='d-nav active'>공구상세</div>
                    <div className='d-nav'>리뷰</div>
                </div>

                <div className="d-tab">
                    <div className='de-label'>상세이미지</div>
                    <div className='detailImage'>
                        <div className='fbBtn'><ArrowLeft /></div>
                        <div className='dimgs'>
                            <div className='imgNav'>
                                <div className='dots'>
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                    <Dot size={30} />
                                </div>
                            </div>
                        </div>
                        <div className='fbBtn'><ArrowRight /></div>
                    </div>
                    <div className='de-two'>
                        <div className='de-three'>
                            <div className='de-label'>상세설명</div>
                            <div>{rentalTool.toolDetialInfo}</div>
                        </div>
                        <div className='de-favlocation'>
                            <div className='de-map'></div>
                            <div className='mapinfo'>
                                <span className='map-label'>거래 희망장소</span>
                                <span>{rentalTool.favLocation}</span>
                            </div>
                        </div>
                    </div>
                    <div className='moreTool'>
                        <span className='de-label'>'{rentalTool.toolUserNick}' 의 다른 공구</span>
                        <div className='morecards'>
                            <Tool/>
                            <Tool/>
                            <Tool/>
                            <Tool/>
                            <Tool/>
                            <Tool/>
                        </div>

                    </div>

                </div>
                <div className="d-tab-review">

                </div>
            </div>
        </>
    )
}