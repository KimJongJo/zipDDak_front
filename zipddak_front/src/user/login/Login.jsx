import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import "../css/Signup.css";
import { baseUrl } from "../../config";
import { useNavigate } from "react-router";
import { useState } from "react";


export default function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [token, setToken] = useState();

    const navigate = useNavigate();

    const submit = () => {
        let formData = new FormData();
        formData.append('username', username)
        formData.append('password', password)
        formData.append('fcmToken', fcmToken)

        myAxios(null, setToken).post(`/zipddak`, formData)
        .then (res=> {
            console.log(res.headers.authorization) //token
            console.log(res)

            if(res){
                setUser(res.data);
                // myAxios(res.headers.authorization,setToken).post(`/user/alarms`)
                // .then(res=> {
                //     console.log(res)
                //     console.log(res.data)
                //     setAlarms(res.data);
                //     navigate("/")
                // })
            }

            navigate("/zipddak/main");
        })
        .catch (err=> {
            console.log(err)
            alert(err.response.data.message);
        })

    }


    return (
        <>
            <div className="signUp-box">
                <div className="login">
                    <div className="logo"></div>
                    <div className="title">로그인</div>

                    <div className="sns_login">
                        <div className="sns_top">
                            <div className="sns_line"></div>
                            <div>
                                <span className="sns_title">sns간편 로그인</span>
                            </div>
                            <div className="sns_line"></div>
                        </div>
                        <div className="sns_icons">
                            <a href={`${baseUrl}/oauth2/authorization/naver`}>
                                <img src="/naver_r.png" alt="naver" style={{ width: 56, height: 56 }} />
                            </a>
                            <a href={`${baseUrl}/oauth2/authorization/kakao`}>
                                <img src="/kakao_r.png" alt="kakao" style={{ width: 56, height: 56 }} />
                            </a>
                            <a href={`${baseUrl}/oauth2/authorization/google`}>
                                <img src="/google_r.png" alt="google" style={{ width: 56, height: 56 }} />
                            </a>
                        </div>
                    </div>

                    <div className="line1"></div>
                    
                    <div className="input_form">
                        <div className="input_parts">
                            <div className="input_label">이메일</div>
                            <Input name="email" placeholder="이메일을 입력해주세요." type="email" />
                        </div>

                        <div className="input_parts">
                            <div className="input_label">비밀번호</div>
                            <Input name="password" placeholder="비밀번호를 입력해주세요." type="password" />
                        </div>

                        <div className="col-cm">
                        <div className="login_options">
                            <FormGroup check>
                                <Input type="checkbox" /> <Label check>로그인 유지</Label>
                            </FormGroup>
                            <a href="">
                                <span>아이디/비밀번호 찾기</span>
                            </a>
                        </div>

                        <div className="mainButton loginStep">
                            <Button className="primary-button long-button"
                            onClick={submit}>로그인</Button>
                        </div>
                        </div>

                    </div>

                    <div className="loginFooter">
                        <div className="input_detail">아직 회원이 아니신가요?</div>
                        <a href="/zipddak/signUp/user">
                            <div className="input_detail2">회원가입</div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
