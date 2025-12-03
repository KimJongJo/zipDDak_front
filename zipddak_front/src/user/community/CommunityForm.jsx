import { Button, Input } from 'reactstrap'
import '../css/CommunityDetail.css'
import {ChevronDown, Plus} from 'lucide-react'
import { Header1 } from '../../Main/pages/Header'

export default function ComForm() {
    return (
        <>
            <div className="CommunityForm-container">
                <Header1/>

                <div className="col-cm comForm-body">
                    <div className="trade">
                        <select className="trade-select">
                            <option>카테고리</option>
                            <option>우리집 자랑</option>
                            <option>자재 토론회</option>
                            <option>전문가에게 묻다</option>
                            <option>나만의 노하우</option>
                            <option>함께해요</option>
                            <option>전문가 소식</option>
                        </select>
                        <ChevronDown className="trade-arrow" />
                    </div>
                    <Input type='text' placeholder='제목을 입력해주세요' name='title' />
                    <Input type='textarea' placeholder='내용을 입력해주세요' name='content'
                        className='community-input-content' />
                    <div className='row-cm com-write-images'>
                        <div className='img-preview'></div>
                        <div className='row-cm img-add-box'>
                            <Plus color='#ffffff' size={30}/>
                        </div>
                    </div>
                    <div className='row-cm com-write-buttons'>
                        <Button>작성완료</Button>
                        <Button>작성취소</Button>
                    </div>
                </div>
            </div>
        </>
    )
}