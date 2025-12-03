import { Form, FormGroup, Label, Input, Button, Col, UncontrolledAccordion, AccordionHeader, AccordionBody, AccordionItem } from "reactstrap";
import "../css/Signup.css";

export default function SignExpert() {
    return (
        <>
            <div className="SignExpert">
                <div className="logo"></div>
                <div className="title">전문가 회원가입</div>

                <div className="tabs">
                    <div className="tab_nav">전문분야 선택</div>
                    <div className="tab_nav">필수분야 입력</div>
                </div>

                <div className="tab1">
                    <div className="title2">어떤 전문가로 활동하실 수 있나요?</div>

                    <div className="experts_category">
                        <FormGroup check>
                            <Input type="checkbox" /> <Label check>시공견적 컨설팅</Label>
                        </FormGroup>
                        <div className="line"></div>
                        <span>컨설팅 전문가</span>
                    </div>

                    <div className="ecategory_part">
                        <div className="experts_category">
                            <FormGroup check>
                                <Input type="checkbox" /> <Label check>수리</Label>
                            </FormGroup>
                            <div className="line"></div>
                            <span>가전제품</span>
                            <span>문/창문</span>
                            <span>수도/보일러/전기</span>
                        </div>
                        <UncontrolledAccordion stayOpen>
                            <AccordionItem>
                                <AccordionHeader>수리 상세서비스</AccordionHeader>
                                <AccordionBody>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>수리</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>수리</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>수리</Label>
                                    </FormGroup>
                                </AccordionBody>
                            </AccordionItem>
                        </UncontrolledAccordion>
                    </div>

                    <div className="ecategory_part">
                        <div className="experts_category">
                            <FormGroup check>
                                <Input type="checkbox" /> <Label check>인테리어</Label>
                            </FormGroup>
                            <div className="line"></div>
                            <span>부분 인테리어</span>
                            <span>벽/천장 시공</span>
                            <span>바닥시공</span>
                        </div>
                        <UncontrolledAccordion stayOpen>
                            <AccordionItem>
                                <AccordionHeader>인테리어 상세서비스</AccordionHeader>
                                <AccordionBody>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>인테리어</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>인테리어</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input type="checkbox" /> <Label check>인테리어</Label>
                                    </FormGroup>
                                </AccordionBody>
                            </AccordionItem>
                        </UncontrolledAccordion>
                    </div>

                    <div className="mainButton">
                        <Button>다음으로</Button>
                    </div>

                    <div className="loginFooter">
                        <div className="input_detail">이미 아이디가 있으신가요?</div>
                        <a>
                            <div className="input_detail2">로그인</div>
                        </a>
                    </div>
                </div>

                {/* -------------------------------------------------------------- */}

                <div className="tab2">
                    <div className="title2">상세정보 입력</div>
                    <Form>
                        <div className="input_form">
                            <div className="input_parts">
                                <div className="input_label">활동명(회사이름)</div>
                                <Input name="expertsName" placeholder="활동명(2~20자)" type="text" />
                            </div>

                            <div className="input_parts">
                                <div className="input_label">직원수</div>
                                <Input id="exampleSelect" name="select" type="select">
                                    <option>직원수 선택</option>
                                    <option>직원수 1명 (본인포함)</option>
                                    <option>직원수 2명</option>
                                    <option>직원수 3명</option>
                                    <option>직원수 4명</option>
                                    <option>직원수 5명</option>
                                </Input>
                            </div>

                            <div className="input_parts">
                                <div className="input_label">사업자 등록 번호</div>
                                <Input name="businessCode" placeholder="숫자로만 13자" type="text" />
                            </div>

                            <div className="input_parts">
                                <div className="input_label">사업자등록증</div>
                                <Input name="businessFile" placeholder="*pdf파일" type="text" />
                            </div>

                            <div className="input_parts">
                                <div className="input_label">계좌번호</div>
                                <div className="input_detail">정산이 이루어지는 계좌입니다</div>
                                <Input name="expertsBAnk" type="select">
                                    <option>은행 선택</option>
                                    <option>은행</option>
                                    <option>은행</option>
                                    <option>은행</option>
                                    <option>은행</option>
                                    <option>은행</option>
                                </Input>
                                <Input name="expertsAccount" placeholder="숫자로만 계좌번호 입력" type="text" />
                            </div>

                            <div className="input_parts">
                                <div className="input_label">휴대폰 인증</div>
                                <Input id="tel" name="tel" placeholder="'-'없이 숫자만 입력" type="text">
                                    <Button>전송</Button>
                                </Input>
                            </div>

                            <div className="input_parts">
                                <div className="input_label">주소</div>
                                <div className="input_post">
                                    <Input name="zone" placeholder="우편번호" type="text" />
                                    <Button>주소찾기</Button>
                                </div>
                                <Input name="address" placeholder="도로명/지번 주소" type="text" />
                                <Input name="detailAddress" placeholder="상세주소" type="text" />
                            </div>

                            <div className="input_parts">
                                <div className="input_label">약관동의</div>
                                <div className="input_detail">회원가입 및 회원 관리등의 목적으로 이메일, 비밀번호, 휴대폰 번호 등의 정보를 수집 및 이용 하고 있습니다.</div>
                                <div className="condition_box">
                                    <div className="conditionAll">
                                        <FormGroup check>
                                            <Input type="checkbox" />{" "}
                                            <Label check className="check_All">
                                                전체동의
                                            </Label>
                                        </FormGroup>
                                    </div>
                                    <div className="line"></div>
                                    <div className="conditionOption">
                                        <FormGroup check>
                                            <Input type="checkbox" /> <Label check>이용약관(필수)</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" /> <Label check>만 14세 이상입니다(필수)</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" /> <Label check>개인정보 수집 및 이용동의(선택)</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" /> <Label check>개인정보 마케팅 활용동의(선택)</Label>
                                        </FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" /> <Label check>이벤트, 쿠폰, 특가알림 메일 및 sms수신 (선택)</Label>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>

                            <div className="mainButton">
                                <Button>전문가 회원가입하기</Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <div className="loginFooter">
                    <div className="input_detail">이미 아이디가 있으신가요?</div>
                    <a>
                        <div className="input_detail2">로그인</div>
                    </a>
                </div>
                <div className="loginFooter"></div>
            </div>
        </>
    );
}
