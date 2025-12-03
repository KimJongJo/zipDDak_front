import {Button} from 'reactstrap'
import './css/Signup.css'

export default function SignStore3() {
    return(
        <>
        <div className='signStore3'>
        <div className='signStoreHeader'>
            <div className='logo'></div>
            <div className='headerTitle'>입점신청</div>
        </div>
        <div className='signStorebody'>
            <div className='bigInfo'>
                <div className='checkIcon'></div>
                <span className='title'>입점신청이 완료되었습니다!</span>
            </div>
            <div className='bodybox'>
                <span className='info'>작성해주신 정보를 바탕으로 카테고리별 담당 MD가 입점을 검토하여 이메일을 드립니다.</span>
                <span className='info'>작성해주신 정보를 바탕으로 카테고리별 담당 MD가 입점을 검토하여 이메일을 드립니다.</span>
                <span className='info'>작성해주신 정보를 바탕으로 카테고리별 담당 MD가 입점을 검토하여 이메일을 드립니다.</span>
                <span className='info'>작성해주신 정보를 바탕으로 카테고리별 담당 MD가 입점을 검토하여 이메일을 드립니다.</span>
            </div>
            <div>
                <Button>로그인 페이지로 이동</Button>
            </div>
        </div>
        <div className='signStoreFooter'></div>
        </div>
        </>
    )
}