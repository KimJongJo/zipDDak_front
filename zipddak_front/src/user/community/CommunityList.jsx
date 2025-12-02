import { Button } from 'reactstrap'
import { Header1 } from '../../component/Header'
import '../css/CommunityDetail.css'
import { Community } from '../../component/Community'

export default function CommunityList() {
    return (
        <>
        <div className="comList-container">
            <Header1/>
            <div className='row-cm commList-top'>
                <span className='comLabel'>커뮤니티</span>
                <Button>글쓰기</Button>
            </div>
            <div className="d-tab-nav">
                    <div className='d-nav active'>우리집 자랑</div>
                    <div className='d-nav'>자재 토론회</div>
                    <div className='d-nav'>전문가에게 묻다</div>
                    <div className='d-nav'>나만의 노하우</div>
                    <div className='d-nav'>함께해요</div>
                    <div className='d-nav'>전문가 소식</div>
                    <div className='d-nav'>자유</div>
                </div>

                <div className='col-cm commcardList'>
                    <Community/>
                    <Community/>
                    <Community/>
                </div>
        </div>
        </>
    )
}