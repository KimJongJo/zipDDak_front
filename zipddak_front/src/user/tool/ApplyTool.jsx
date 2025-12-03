import Header from "../../Main/pages/Header";
import { SquarePlus, ChevronDown, MapPinned, Plus, Minus } from "lucide-react";
import "../css/ProductOrder.css";
import "../css/RegistTool.css";
import "../../css/common.css";
import { Input, FormGroup, Label, Button } from "reactstrap";

export default function ApplyTool() {
    return (
        <>
            <div className="regTool-container">
                <Header />

                <div className="regTool">
                    <div className="col-cm appTool-userbox">
                        <div className="d-user tuserbox">
                            <div className="profileImage"></div>
                            <div className="userInfo">
                                <span className="nick">{}닉네임</span>
                                <span className="loca">{}지역</span>
                            </div>
                        </div>
                        <Button>대여문의</Button>
                    </div>

                    <div className="app-tool-form">
                        <div className="r-title">
                            <SquarePlus />
                            <span>공구대여 신청</span>
                        </div>

                        <div className="regToolForm">
                            <div className="options">
                                <span className="o-label">거래대상 공구</span>
                            </div>

                            <div className="options">
                                <span className="o-label">대여기간</span>
                                <div className="flex-box">
                                    <FormGroup>
                                        <Label>대여 시작일</Label>
                                        <Input className="pinput" name="rentalStartDate" placeholder="date placeholder" type="date" />
                                    </FormGroup>
                                    <div className="hypen">
                                        <Minus />
                                    </div>
                                    <FormGroup>
                                        <Label>대여 종료일</Label>
                                        <Input className="pinput" name="rentalEndDate" placeholder="date placeholder" type="date" />
                                    </FormGroup>
                                    {/* <div className="period">
                                    <span>총</span>
                                    <span>4</span>
                                    <span>일</span>
                                </div> */}
                                </div>
                            </div>

                            <div className="options">
                                <span className="o-label">주문자</span>
                                <div className="flex-box">
                                    <span className="tag">이름</span>
                                    <Input placeholder="이름(실명)" name="name" type="text" readOnly />
                                </div>
                                <div className="flex-box">
                                    <span className="tag">전화전호</span>
                                    <Input placeholder="'-'없이 숫자로만 입력" name="name" type="text" readOnly />
                                </div>
                            </div>

                            <div className="options">
                                <span className="o-label">거래방식</span>
                                <div className="check-col">
                                    <FormGroup check>
                                        <Input name="radio2" type="radio" /> <Label check>직거래</Label>
                                    </FormGroup>

                                    <FormGroup check>
                                        <Input name="radio2" type="radio" /> <Label check>택배배송</Label>
                                    </FormGroup>
                                </div>
                            </div>

                            <div className="options">
                                <span className="o-label">받을주소</span>
                                <div className="post-box">
                                    <FormGroup check>
                                        <Input name="radio2" type="radio" /> <Label check>기본 주소지 (프로필 주소지)</Label>
                                    </FormGroup>
                                    <FormGroup check>
                                        <Input name="radio2" type="radio" /> <Label check>직접 입력</Label>
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
                                <span className="o-label">요청사항</span>
                                <Input type="textarea" name="registToolDetail" placeholder="공구의 상세한 설명을 적어주세요! (최대 2000자)" className="ttextarea" />
                            </div>

                            <div className="options">
                                <span className="o-label">결제방식</span>
                                <div className="flex-box pay">
                                    <div className="payOption">만나서 결제</div>
                                    <div className="payOption">토스페이</div>
                                </div>
                            </div>

                            <div className="options">
                                <span className="o-label">결제금액</span>

                                {/* 오른쪽 결제 폼 */}
                                <div className="product-order-form-div wide">
                                    <div className="product-order-form-div-top wide">
                                        <div className="product-order-form-div-intop">
                                            <span className="font-16 semibold">결제금액</span>
                                            <div className="product-order-form-second">
                                                <span className="font-15">1일 대여비</span>
                                                <span className="font-14">원</span>
                                            </div>
                                            <div className="product-order-form-second">
                                                <div className="product-order-form-second totalRental">
                                                    <span className="font-15">총 대여비</span>
                                                    <span className="font-15 rental-period">4일</span>
                                                </div>
                                                <span className="font-14">원</span>
                                            </div>
                                            <div className="product-order-form-second">
                                                <span className="font-15">배송비</span>
                                                <span className="font-14">원</span>
                                            </div>
                                            <div className="product-order-form-second">
                                                <span className="font-16 total-rental-label">최종 결제 금액</span>
                                                <span className="total-rental-price">
                                                    <span className="font-22 semibold order-price"></span>원
                                                </span>
                                            </div>
                                        </div>
                                        {/* 아래 주문 확인 설명 */}
                                        <div className="product-order-from-bottom-content">
                                            <span className="font-13 semibold">본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.</span>
                                            <div className="font-11 product-order-from-bottom-content-indiv">
                                                본 사이트는 통신판매중개자로서 상품의 거래 당사자가 아닙니다. 따라서 판매자가 등록한 상품정보 및 거래 과정에서 발생하는 문제에 대해 책임을 지지
                                                않습니다. 단, 이용자는 업체 신고 및 문의하기 기능을 통해 판매자와의 소통이 가능하며, 문제가 발생한 경우 이를 통해 조치를 요청하실 수 있습니다.
                                            </div>
                                        </div>
                                    </div>
                                    {/* {totalPrice.toLocaleString()} */}
                                    {/* <button className="product-order-from-bottom-button font-16 semibold">원 결제하기</button> */}
                                </div>
                            </div>

                            <div className="options">
                                <div className="check-col">
                                    <FormGroup check>
                                        <Input id="checkbox2" type="checkbox" />{" "}
                                    </FormGroup>
                                    <span className="check-detail">(필수) 집딱의 파손면책 어쩌구에 동의 합니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="btn-col">
                    <Button>작성취소</Button>
                    <Button>결제하기</Button>
                </div>
            </div>
        </>
    );
}
