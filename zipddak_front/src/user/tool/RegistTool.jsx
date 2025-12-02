import { SquarePlus, ChevronDown, MapPinned, Plus } from 'lucide-react'
import './css/RegistTool.css'
import { Input, FormGroup, Label, Button } from "reactstrap";
import { Header1 } from '../../main/Header';

export default function RegistTool() {
    return (
        <>
            <div className="regTool-container">
                <Header1/>

                <div className="regTool">

                    <div className="r-title">
                        <SquarePlus />
                        <span>내 공구 등록/수정</span>
                    </div>

                    <div className="regToolForm">

                        <div className="options">
                            <span className="o-label">공구명</span>
                            <Input placeholder="상품명을 입력하세요" name="toolName" type="text" />
                        </div>

                        <div className="options">
                            <span className="o-label">공구 썸네일</span>
                            <div className="thumbnail">
                                <Plus size={50} color="#B6BCC9" strokeWidth={0.5}/>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">상세이미지 (최대5장)</span>
                        </div>

                        <div className="options">
                            <span className="o-label">카테고리</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        전동공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        일반공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        생활용품
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        기타공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        찾아요
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">1일 대여비</span>
                            <div className="check-col">
                                <div className="won">
                                    <Input type="number" name="rentalPrice" className="wonInput" placeholder="1일 대여비" />
                                    <span>원</span>
                                </div>
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        무료대여
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">공구 상세설명</span>
                            <Input type="textarea" name="registToolDetail" placeholder="공구의 상세한 설명을 적어주세요! (최대 2000자)"
                                className="ttextarea" />
                        </div>

                        <div className="options">
                            <span className="o-label">결제옵션</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                        checked
                                    />
                                    {' '}
                                    <Label check>
                                        문의후 대여
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        바로대여
                                    </Label>
                                </FormGroup>
                                <span className="check-detail">
                                    바로대여 기능 선택 시 대여자가 조율 없이 대여기간, 대여 일정을 설정합니다
                                </span>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">거래방식</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        택배 배송
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        직접 픽업
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">배송비</span>
                            <div className="check-col">
                                <div className="won">
                                    <Input type="number" name="rentalPrice" className="wonInput" placeholder="배송비" />
                                    <span>원</span>
                                </div>
                                <FormGroup check>
                                    <Input
                                        id="checkbox2"
                                        type="checkbox"
                                    />
                                    {' '}
                                    <Label check>
                                        무료배송
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">받을주소</span>
                            <div className="post-box">
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        기본 주소지 (프로필 주소지)
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        직접 입력
                                    </Label>
                                </FormGroup>
                                <div className="check-col">
                                    <Input type="text" name="zonecode" className="zonecode" placeholder="우편번호" />
                                    <Button>주소검색</Button>
                                    <Input type="text" name="address" placeholder="주소" readOnly />
                                </div>
                                <Input type="text" name="detailAddress" placeholder="상세주소" />
                                <div className="trade">
                                    <select className="trade-select">
                                        <option>배송시 요청사항</option>
                                        <option>직거래</option>
                                        <option>택배거래</option>
                                    </select>
                                    <ChevronDown className="trade-arrow" />
                                </div>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">거래 희망장소</span>
                            <div className="check-col">
                                <div className="location-box">
                                    <input className="location" type="text" placeholder="지도에서 찾기" readOnly>
                                    </input>
                                    <div className="mapBtn"><Button><MapPinned size={20} /></Button></div>
                                </div>
                                <Input type="text" name="location" placeholder="" readOnly />
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">대여상태 설정</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                        defaultChecked
                                    />
                                    {' '}
                                    <Label check>
                                        대여가능
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Input
                                        name="radio2"
                                        type="radio"
                                    />
                                    {' '}
                                    <Label check>
                                        대여중지
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="btn-col">
                    <Button>작성취소</Button>
                    <Button>작성완료</Button>
                </div>
            </div>
        </>
    )
}