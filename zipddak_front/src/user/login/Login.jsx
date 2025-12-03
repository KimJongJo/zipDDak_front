import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../css/Signup.css";

export default function Login() {
    return (
        <>
            <div className="login">
                <div className="logo"></div>
                <div className="title">로그인</div>

                <div className="input_form">
                    <div className="input_parts">
                        <div className="input_label">이메일</div>
                        <Input name="email" placeholder="이메일을 입력해주세요." type="email" />
                    </div>

                    <div className="input_parts">
                        <div className="input_label">비밀번호</div>
                        <Input name="password" placeholder="비밀번호를 입력해주세요." type="password" />
                    </div>

                    <div className="login_options">
                        <FormGroup check>
                            <Input type="checkbox" /> <Label check>로그인 유지</Label>
                        </FormGroup>
                        <a href="">
                            <span>아이디/비밀번호 찾기</span>
                        </a>
                    </div>

                    <div className="mainButton">
                        <Button>로그인</Button>
                    </div>
                </div>

                <div className="sns_login">
                    <div className="sns_top">
                        <div className="sns_line"></div>
                        <div>
                            <span className="sns_title">sns간편 로그인</span>
                        </div>
                        <div className="sns_line"></div>
                    </div>
                    <div className="sns_icon">
                        <img src="naver_r.png" alt="" style={{ width: 56, height: 56 }} />
                        <img src="kakao_r.png" alt="" style={{ width: 56, height: 56 }} />
                        <img src="google_r.png" alt="" style={{ width: 56, height: 56 }} />
                    </div>
                </div>

                <div className="loginFooter">
                    <div className="input_detail">아직 회원이 아니신가요?</div>
                    <a>
                        <div className="input_detail2">회원가입</div>
                    </a>
                </div>
            </div>
        </>
    );
}
