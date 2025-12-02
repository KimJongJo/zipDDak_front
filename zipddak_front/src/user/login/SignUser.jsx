import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'
import '../css/Signup.css'

export default function SignUser() {
    return (
        <>
            <div className="signUser">
                <div className="logo"></div>
                <div className="title">회원가입</div>

                <div className='sns_login'>
                    <div className='sns_top'>

                        <div className='sns_title'>sns계정으로 간편 회원가입</div>

                    </div>
                    <div className='sns_icon'>
                        <img src="naver_r.png" alt="" style={{ width: 56, height: 56 }} />
                        <img src="kakao_r.png" alt="" style={{ width: 56, height: 56 }} />
                        <img src="google_r.png" alt="" style={{ width: 56, height: 56 }} />
                    </div>
                </div>

                <div className='line1'></div>

                <Form>
                    <div className='input_form'>
                        <div className='input_parts'>
                            <div className='input_label'>이름</div>
                            <Input
                                name="name"
                                placeholder="이름(실명)을 입력해주세요"
                                type="text"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>이메일</div>
                            <Input
                                id="email"
                                name="email"
                                placeholder="아이디로 사용할 이메일을 입력해주세요."
                                type="email"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>비밀번호</div>
                            <div className='input_detail'>영문, 숫자를 포함한 8자 이상의 비밀번호를 설정해주세요</div>

                            <Input
                                id="password"
                                name="password"
                                placeholder="비밀번호를 입력해주세요."
                                type="password"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>비밀번호 확인</div>
                            <Input
                                id="cPassword"
                                name="cPassword"
                                placeholder="비밀번호를 입력해주세요."
                                type="password"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>닉네임</div>
                            <Input
                                id="nickname"
                                name="nickname"
                                placeholder="닉네임(2~20자)"
                                type="text"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>휴대폰 인증</div>
                            <Input
                                id="tel"
                                name="tel"
                                placeholder="'-'없이 숫자만 입력"
                                type="text"
                            >
                                <Button>전송</Button>
                            </Input>
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>주소</div>
                            <div className='input_post'>
                                <Input
                                    name="zone"
                                    placeholder="우편번호"
                                    type="text"
                                />
                                <Button>주소찾기</Button>
                            </div>
                            <Input
                                name="address"
                                placeholder="도로명/지번 주소"
                                type="text"
                            />
                            <Input
                                name="detailAddress"
                                placeholder="상세주소"
                                type="text"
                            />
                        </div>

                        <div className='input_parts'>
                            <div className='input_label'>약관동의</div>
                            <div className='input_detail'>
                                회원가입 및 회원 관리등의 목적으로 이메일, 비밀번호, 휴대폰 번호 등의 정보를 수집 및 이용 하고 있습니다.
                            </div>
                            <div className='condition_box'>
                                <div className='conditionAll'>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check className='check_All'>
                                            전체동의
                                        </Label>
                                    </FormGroup>
                                </div>
                                <div className='line'></div>
                                <div className='conditionOption'>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check>
                                            이용약관(필수)
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check>
                                            만 14세 이상입니다(필수)
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check>
                                            개인정보 수집 및 이용동의(선택)
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check>
                                            개인정보 마케팅 활용동의(선택)
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" />
                                        {' '}
                                        <Label check>
                                            이벤트, 쿠폰, 특가알림 메일 및 sms수신 (선택)
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                        </div>

                        <div className='mainButton'>
                            <Button>회원가입하기</Button>
                        </div>

                    </div>
                </Form >


                <div className="loginFooter">
                    <div className='input_detail'>
                        이미 아이디가 있으신가요?
                    </div>
                    <a><div className='input_detail2'>로그인</div></a>
                </div>

            </div >
        </>
    )
}