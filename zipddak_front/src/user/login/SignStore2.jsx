import { Button, Input, FormGroup, Label } from 'reactstrap'
import './css/Signup.css'

export default function SignStore2() {
    return (
        <>
            <div className='signStore2'>

                <div className='signStoreHeader'>
                    <div className='s_headerItem'>
                        <div className='logo'></div>
                        <div className='headerTitle'>입점신청</div>
                    </div>
                </div>

                <div className='s_form'>
                    <div className='signStoreForm'>
                        <div className='s_title'>대표계정</div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>이메일</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="email"
                                        placeholder="이메일 아이디 생성"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <Button>인증하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>비밀번호</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="password"
                                        placeholder="비밀번호를 입력"
                                        type="password"
                                    />
                                </div>

                                <div className='s_input'>
                                    <Input
                                        name="password"
                                        placeholder="비밀번호 확인"
                                        type="password"
                                    />
                                </div>

                            </div>
                            <div className='input_detail'>영문,숫자,특문 포함 8자리 이상 입력해주세요</div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>이름</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="name"
                                        placeholder="이름(실명) 입력"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>휴대폰번호</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="tel"
                                        placeholder="‘-’제외 숫자만 입력"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <Button>인증하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='s_form'>
                    <div className='signStoreForm'>
                        <div className='s_title'>회사정보</div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>사업자등록번호</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="email"
                                        placeholder="숫자만 13자 입력"
                                        type="email"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>사업자등록증</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="email"
                                        placeholder="*pdf파일 첨부"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <Button>첨부하기</Button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>이름</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="name"
                                        placeholder="이름(실명) 입력"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>회사 이름</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="email"
                                        placeholder="회사이름 입력"
                                        type="email"
                                    />
                                </div>
                            </div>
                            <div className='input_detail'>사업자 등록증의 법인명 또는 상호명을 입력하세요</div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>회사 주소</div>
                        </div>
                        <div className='s_formColt'>
                            <div className='s_formRow'>
                                <div className='s_post'>
                                    <div className='input_post'>
                                        <Input
                                            name="zone"
                                            placeholder="우편번호"
                                            type="text"
                                        />
                                        <Button>주소찾기</Button>
                                    </div>
                                    <div className='s_input'>
                                    <Input
                                        name="address"
                                        placeholder="도로명/지번 주소"
                                        type="text"
                                    />
                                    </div>
                                    <div className='s_input'>
                                    <Input
                                        name="detailAddress"
                                        placeholder="상세주소"
                                        type="text"
                                    />
                                    </div>
                                </div>
                            </div>
                            <div className='input_detail'>사업자 등록증의 법인명 또는 상호명을 입력하세요</div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>홈페이지</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="site"
                                        placeholder="https://"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className='input_detail'>홈페이지 또는 상품확인이 가능한 대표상품 URL을 넣어주세요</div>
                        </div>
                    </div>

                </div>

                <div className='s_form'>
                    <div className='signStoreForm'>
                        <div className='s_title'>회사 내 영업담당자 정보</div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>이름</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="name"
                                        placeholder="이름(실명) 입력"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>휴대폰번호</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="tel"
                                        placeholder="‘-’제외 숫자만 입력"
                                        type="text"
                                    />
                                </div>
                                <div>
                                    <Button>인증하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>이메일</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="email"
                                        placeholder="가입한 이메일 아이디"
                                        type="email"
                                    />
                                </div>
                                <div>
                                    <Button>인증하기</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='s_form'>
                    <div className='signStoreForm'>
                        <div className='s_title'>상품정보</div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>상점 이름</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        name="name"
                                        placeholder="상점이름 입력"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>취급 카테고리</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRowc'>
                                <table>
                                    <tbody>

                                        <tr>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            시트/필름
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            스위치/콘센트
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            커튼/블라인드
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            창호/폴딩도어
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            벽지/장판/마루
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            중문/도어
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            주방
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            욕실
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            타일
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            페인트
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='s_check'>
                                                    <FormGroup check>
                                                        <Input type="checkbox" />
                                                        {' '}
                                                        <Label check>
                                                            조명
                                                        </Label>
                                                    </FormGroup>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div className='signStoreForm'>
                        <div className='s_formtitle'>
                            <div className='s_tr'>상점소개</div>
                        </div>
                        <div className='s_formCol'>
                            <div className='s_formRow'>
                                <div className='s_input'>
                                    <Input
                                        placeholder="상점 소개글 (공백 포함 최대 200자)"
                                        name="text"
                                        type="textarea"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='s_form'>
                    <div className='signStoreForm'>
                        <div className='s_titleM'>
                            <div className='s_title'>개인정보수집 및 이용동의</div>
                            <div className='input_detail'>(주) 집딱!은 개인정보법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률 등 관련 법령상의 개인정보보호 규정을 준수하며, 판매자님의 입점신청시 필요한 최소한의 개인정보를 수집합니다.</div>
                        </div>
                    </div>


                    <div className='signStoreForm'>

                        <div className='s_formCol'>
                            <div className='s_formTable'>
                                <div className='s_formRow'>
                                    <div>
                                        <table className='s_infoTable'>
                                            <tbody className='s_table'>
                                                <tr className='s_tableb'>
                                                    <td className='s_tableb'>항목</td>
                                                    <td className='s_tableb'>목적</td>
                                                    <td className='s_tableb'>보유기간</td>
                                                </tr>
                                                <tr className='s_tableb'>
                                                    <td className='s_tableb'>판매자, 식별, 입점검토, 공지사항의 전달</td>
                                                    <td className='s_tableb'>영업 담당자의 이름/전화번호/ 이메일 </td>
                                                    <td className='s_tableb'>입점 처리 기간이 종료되는 시점</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='s_checkbody'>
                    <div className='s_check'>
                        <FormGroup check>
                            <Input type="checkbox" />
                            {' '}
                            <Label check>
                                입점신청을 위한 개인정보  수집 및 이용에 동의 [필수]
                            </Label>
                        </FormGroup>
                    </div>
                    </div>

                </div>

                <div className='mainButton'>
                <Button>입점신청하기</Button>
                </div>

            </div>
        </>
    )
}