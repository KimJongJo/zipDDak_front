import { SquarePlus, ChevronDown, MapPinned, Plus, Minus } from "lucide-react";
import "../css/ProductOrder.css";
import "../css/RegistTool.css";
import "../../css/common.css";
import { Input, FormGroup, Label, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";
import { useParams } from "react-router";

export default function ApplyTool() {

    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const { toolIdx } = useParams();

    const [rental, setRental] = useState({

        rentalIdx: '',
        rentalCode: '',
        startDate: '',
        endDate: '',
        request: '',
        directRental: '',
        postCharge: '',
        postRental: '',
        zonecode: '',
        addr1: '',
        addr2: '',
        postRequest: '',
        paymentType: '',
        satus: '',
        borrower: '',
        owner: '',
        paymentIdx: '',
        createdAt: '',

        toolIdx: '',
        name: ''

    });

    const ChangeInput = (e) => {
        setRental({ ...rental, [e.target.name]: e.target.value })
    }


    //거래방식
    const [rentalType, setRentalType]= useState();

    //주소
    const [isAddOpen, setIsAddOpen] = useState(false);
    const complateHandler = (data) => {
        setRental({
            ...rental,
            zonecode: data.zonecode,
            addr1: data.roadAddress
                || data.address
        });
    }

    const closeHandler = (state) => {
        setIsAddOpen(false);
    }

    //주소지 설정
    const [useProfile, setUseProfile] = useState(true);
    useEffect(() => {
        if (useProfile && user) {
            setRental(prev => ({
                ...prev,
                addr1: user.addr1 ?? "",
                addr2: user.addr2 ?? "",
                zonecode: user.zonecode ?? ""
            }));
        }

        if (!useProfile) {
            // 직접 입력 → 초기화
            setRental(prev => ({
                ...prev,
                addr1: "",
                addr2: "",
                zonecode: ""
            }));
        }
    }, [useProfile, user]);

    //결제선택
    const [payType, setPayType] = useState(false);


    //대상 공구
    const targetTool = () => {

        token&&myAxios(token,setToken).get(`/tool/target`, {toolIdx:toolIdx})

    }



    return (
        <>
            <div className="regTool-container ">

                <div className="regTool applyTool">
                    <div className="col-cm appTool-userbox">
                        <div className="d-user tuserbox">
                            <div className="profileImage"></div>
                            <div className="userInfo">
                                <span className="nick">{ }닉네임</span>
                                <span className="loca">{ }지역</span>
                            </div>
                        </div>
                        <Button className="primary-button">대여문의</Button>
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
                                    <Label check><Input name="postRental" type="radio"
                                        value="POST"
                                        checked={rentalType==="POST"}
                                        onChange={(e) => setRentalType(e.target.value)}
                                    /> 택배 배송</Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check><Input name="directRental" type="radio"
                                        value="DIRECT"
                                        checked={rentalType==="DIRECT"}
                                        onChange={(e) => setRentalType(e.target.value)}
                                    /> 직접 픽업</Label>
                                </FormGroup>
                            </div>
                        </div>

                            {rentalType==="POST" &&
                                <div className="options">
                                    <span className="o-label">받을주소</span>
                                    <div className="post-box">
                                        {user.addr1 &&
                                            <FormGroup check>
                                                <Label check><Input type="radio"
                                                    checked={useProfile === true}
                                                    onChange={() => setUseProfile(true)}
                                                />기본 주소지 (프로필 주소지)</Label>
                                            </FormGroup>}
                                        <FormGroup check>
                                            <Label check><Input type="radio"
                                                checked={useProfile === false}
                                                onChange={() => setUseProfile(false)}
                                            /> 직접 입력</Label>
                                        </FormGroup>
                                        <div className="check-col">
                                            <Input
                                                className="zonecodeInput"
                                                type="text"
                                                name="zonecode"
                                                placeholder="우편번호"
                                                value={rental.zonecode}
                                                readOnly
                                            />
                                            {!useProfile &&
                                                <Button className="primary-button"
                                                    onClick={() => setIsAddOpen(!isAddOpen)}
                                                >주소검색</Button>}

                                        </div>
                                        <Input
                                            type="text"
                                            name="addr1"
                                            placeholder="지번/도로명주소"
                                            value={rental.addr1}
                                            readOnly
                                        />
                                        <Input
                                            type="text"
                                            name="addr2"
                                            placeholder="상세주소"
                                            value={rental.addr2}
                                            readOnly={useProfile}
                                            onChange={useProfile ? undefined : ChangeInput}
                                        />

                                        <Input name="settleBank" type="select" className="toolBank pqSelect"
                                            value={rental.postRequest} onChange={ChangeInput}>
                                            <option value={"배송시 요청사항 없음"}>배송시 요청사항</option>
                                            <option value={"문앞에 놔주세요"}>문앞에 놔주세요</option>
                                            <option value={"경비실에 맡겨주세요"}>경비실에 맡겨주세요</option>
                                        </Input>
                                    </div>
                                </div>
                            }

                            {rentalType==="DIRECT"&&
                                <div className="Rentalmap"></div>
                            }

                            {
                                isAddOpen &&
                                <AddrModal title='주소찾기'
                                    open={isAddOpen} footer={null} onCancel={() => setIsAddOpen(false)}>
                                    <DaumPostcode onComplete={complateHandler} onClose={closeHandler} />
                                </AddrModal>
                            }

                            <div className="options">
                                <span className="o-label">요청사항</span>
                                <Input type="textarea" name="registToolDetail" placeholder="공구의 상세한 설명을 적어주세요! (최대 2000자)" className="ttextarea" />
                            </div>

                            <div className="options">
                                <span className="o-label">결제방식</span>
                                <div className="flex-box pay">
                                    <div className="payOption"
                                    onClick={()=> setPayType(pre=>!pre)}
                                    >만나서 결제</div>
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
                    <Button className="tertiary-button">작성취소</Button>
                    <Button className="primary-button">결제하기</Button>
                </div>
            </div>
        </>
    );
}
