import '../css/common.css'
import './css/Main.css'
import { Header1 } from "./component/Header";
import { Button } from 'reactstrap';
import { Search ,CirclePlus, MapPin, ArrowRight} from 'lucide-react'
import Expertmain from './component/Expert';
import { Toolmain } from './component/Tool';
import { Product } from './component/Product';
import { Community } from './component/Community';

export default function Main() {
    return (
        <>
        <div className='Main-container'>
        <Header1/>
        
        <div className='search'>
            <form className='search-form'>
                <input className='search-input' type='text' placeholder='통합검색'/>
                <Button>
                    <div className='sbutton'>
                    <Search size={18}/>
                    <span className='btxt'>검색</span>
                    </div>
                </Button>
            </form>
        </div>

        <div className='main-banner'>
            <div className='banner1'></div>
            <div className='banner2'></div>
        </div>
        

        <div className='card-box'>
            <div className='top'>
                <div className='title-box'>
                    <div className='title-main'>추천 전문가</div>
                    <div className='more'>
                        <span>전체보기</span>
                        <CirclePlus size={14}/>
                    </div>
                </div>
                <div className='category'>
                    <div className='category-item active'>전체</div>
                    <div className='category-item'>시공/견적 컨설팅</div>
                    <div className='category-item'>수리</div>
                    <div className='category-item'>인테리어</div>
                </div>
            </div>
            
            <div className='cards'>
                <Expertmain/>
                <Expertmain/>
                <Expertmain/>
                <Expertmain/>
                <div className='card-more'>
                    <ArrowRight />
                </div>
            </div>
        </div>

        <div className='card-box'>
            <div className='top'>
                <div className='title-box'>
                    <div className='title-main'>
                        <MapPin size={24} color='#FF5833'/>
                        <span>인천 남동구 공구대여</span>
                        {/* <MapPin size={24} color='#FF5833'/> */}
                    </div>
                    <div className='more'>
                        <span>전체보기</span>
                        <CirclePlus size={14}/>
                    </div>
                </div>
                <div className='category'>
                    <div className='category-item active'>전동공구</div>
                    <div className='category-item'>일반공구</div>
                    <div className='category-item'>생활용품</div>
                    <div className='category-item'>기타공구</div>
                    <div className='category-item'>찾아요</div>
                </div>
            </div>
            
            <div className='cards'>
                <Toolmain/>
                <Toolmain/>
                <Toolmain/>
                <Toolmain/>
                <Toolmain/>
            </div>
        </div>

        <div className='advertise'></div>

        <div className='card-box'>
            <div className='top'>
                <div className='title-box'>
                    <div className='title-main'>
                        <span>자재 마켓</span>
                    </div>
                    <div className='more'>
                        <span>전체보기</span>
                        <CirclePlus size={14}/>
                    </div>
                </div>
                <div className='category'>
                    <div className='category-item active'>주방</div>
                    <div className='category-item'>욕실</div>
                    <div className='category-item'>빌트인/수납</div>
                    <div className='category-item'>중문/도어</div>
                    <div className='category-item'>창호/폴딩도어</div>
                    <div className='category-item'>벽지/장판/마루</div>
                    <div className='category-item'>타일</div>
                    <div className='category-item'>시트/필름</div>
                    <div className='category-item'>스위치/콘센트</div>
                    <div className='category-item'>커튼/블라인드</div>
                    <div className='category-item'>페인트</div>
                    <div className='category-item'>조명</div>
                </div>
            </div>
            
            <div className='cards'>
                <Product/>
                <Product/>
                <Product/>
                <Product/>
            </div>
        </div>

        <div className='card-box'>
            <div className='top'>
                <div className='title-box'>
                    <div className='title-main'>
                        <span>커뮤니티</span>
                    </div>
                    <div className='more'>
                        <span>전체보기</span>
                        <CirclePlus size={14}/>
                    </div>
                </div>
                <div className='category'>
                    <div className='category-item active'>전문가에게 묻다</div>
                    <div className='category-item'>우리집 자랑</div>
                    <div className='category-item'>자재 토론회</div>
                    <div className='category-item'>나만의 노하우</div>
                    <div className='category-item'>함께해요</div>
                    <div className='category-item'>전문가 소식</div>
                </div>
            </div>
            
            <div className='community-cards'>
            <div className='cards'>
                <Community/>
                <Community/>
            </div>
            <div className='cards'>
                <Community/>
                <Community/>
            </div>
            </div>
        </div>
        </div>

        </>
    )
}