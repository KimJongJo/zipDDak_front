import { SquarePlus, ChevronDown, MapPinned, Plus } from "lucide-react";
import "../css/RegistTool.css";
import { Input, FormGroup, Label, Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import { Modal as AddrModal } from "antd";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";

export default function RegistTool() {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const [tool, setTool] = useState({
        toolIdx: null,
        name: "",
        category: "83",
        rentalPrice: null,
        freeRental: false,
        content: "",
        tradeAddr: "주소",
        directRental: false,
        postRental: false,
        freePost: false,
        postCharge: 0,
        zonecode: "",
        addr1: "",
        addr2: "",
        postRequest: "배송시 요청사항 없음",
        satus: "ABLE",
        owner: "",
        thunbnail: null,
        img1: null,
        img2: null,
        img3: null,
        img4: null,
        img5: null,
        quickRental: false,
        toolChatCnt: 0,
        settleBank: "",
        settleAccount: "",
        settleHost: "",
    });

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const ChangeInput = (e) => {
        setTool({ ...tool, [e.target.name]: e.target.value });
    };

    //파일
    const fileRef = useRef(null);
    const detailRefs = useRef([]);
    const [thumbPreview, setThumbPreview] = useState();
    const [thumbnailFile, setThumbnailFile] = useState();

    const [detailImages, setDetailImages] = useState([]);

    const handleDetailChange = (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImages = [...detailImages];
        newImages[index] = {
            file,
            preview: URL.createObjectURL(file),
        };

        setDetailImages(newImages);
    };

    //주소
    const [isAddOpen, setIsAddOpen] = useState(false);
    const complateHandler = (data) => {
        setTool({
            ...tool,
            zonecode: data.zonecode,
            addr1: data.roadAddress || data.address,
        });
    };

    const closeHandler = (state) => {
        setIsAddOpen(false);
    };

    //카테고리
    const [tCategory, setTCategory] = useState(83);

    //무료 대여
    const [freeRental, setFreeRental] = useState(false);
    useEffect(() => {
        if (freeRental) {
            setTool((prev) => ({
                ...prev,
                rentalPrice: 0,
            }));
        }
    }, [freeRental]);

    //바로대여 여부
    const [quickRental, setQuickRental] = useState(false);

    //거래방식
    const [postRental, setPostRental] = useState(false);
    const [directRental, setDirectRental] = useState(false);

    //무료배송 여부
    const [freePost, setFreePost] = useState(false);

    useEffect(() => {
        if (freePost) {
            setTool(prev => ({
                ...prev,
                postCharge: 0,
            }));
        }
    }, [freePost]);

    //주소지 설정
    const [useProfile, setUseProfile] = useState(false);
    useEffect(() => {
        if (useProfile && user) {
            setTool((prev) => ({
                ...prev,
                addr1: user.addr1 ?? "",
                addr2: user.addr2 ?? "",
                zonecode: user.zonecode ?? "",
            }));
        }

        if (!useProfile) {
            // 직접 입력 → 초기화
            setTool((prev) => ({
                ...prev,
                addr1: "",
                addr2: "",
                zonecode: "",
            }));
        }
    }, [useProfile, user]);

    //계좌
    const [userBank, setUserBank] = useState(false);
    useEffect(() => {
        if (userBank && user) {
            // 기본 계좌 사용
            setTool((prev) => ({
                ...prev,
                settleBank: user.settleBank ?? "",
                settleAccount: user.settleAccount ?? "",
                settleHost: user.settleHost ?? "",
            }));
        }

        if (!userBank) {
            // 직접 입력 → 초기화
            setTool((prev) => ({
                ...prev,
                settleBank: "",
                settleAccount: "",
                settleHost: "",
            }));
        }
    }, [userBank, user]);

    //대여 가능 상태설정
    const [toolStatus, setToolStatus] = useState("ABLE");

    //대여문의 수

    //등록
    const regist = () => {
        const submitTool = {
            ...tool,
            category: tCategory,
            satus: toolStatus,
            freeRental,
            quickRental,
            postRental,
            directRental,
            freePost,
            owner: user.username,
        };

        const formData = new FormData();
        formData.append("tool", new Blob([JSON.stringify(submitTool)], { type: "application/json" }));

        if (thumbnailFile) {
            formData.append("thumbnail", thumbnailFile);
        }

        detailImages.forEach((img) => {
            formData.append("images", img.file);
        });

        // ⭐⭐⭐ 여기
        // for (let [key, value] of formData.entries()) {
        //     console.log("FormData key:", key);
        //     console.log("FormData value:", value);

        //     new Blob(
        //         [JSON.stringify(submitTool)],
        //         { type: "application/json; charset=utf-8" }
        //     )

        //     if (value instanceof Blob) {
        //         value.text().then(text => {
        //             console.log("Blob 내용:", text);
        //         });
        //     }
        // }

        token &&
            myAxios(token, setToken)
                .post("/tool/regist", formData)
                .then((res) => {
                    if (res.data) {
                        alert("공구등록 완료");
                    } else {
                        alert("공구 등록 실패");
                    }
                    const toolIdx = res.data;
                    navigate(`/zipddak/tool/${toolIdx}`);
                })
                .catch((err) => {
                    console.log(err);
                });
    };

    //취소 
    const cancal = () => {

    }

    //항목확인
    // const checkOption = () => {
    //     if(tool.name == null){
    //         setMessage("공구 이름을 등록해주세요")
    //     }else if (tool.rentalPrice == null){
    //         setMessage("공구 1일 대여 금액을 설정해주세요")
    //     }else if ()
    // }


    return (
        <>
            <div className="regTool-container">
                <div className="regTool">
                    <div className="r-title">
                        <SquarePlus />
                        <span>내 공구 등록/수정</span>
                    </div>

                    <div className="regToolForm">
                        <div className="options">
                            <span className="o-label">공구명</span>
                            <Input placeholder="상품명을 입력하세요" name="name" type="text" onChange={ChangeInput} />
                        </div>

                        <div className="options">
                            <span className="o-label">공구 썸네일</span>
                            <div className={thumbPreview ? "thumbnail" : "thumbnail add"} onClick={() => fileRef.current?.click()}>
                                {thumbPreview ? <img src={thumbPreview} alt="공구" /> : <Plus size={50} color="#B6BCC9" strokeWidth={0.5} />}
                            </div>
                            <Input
                                type="file"
                                innerRef={fileRef}
                                hidden
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    setThumbnailFile(file);
                                    setThumbPreview(URL.createObjectURL(file));
                                }}
                            />
                        </div>

                        <div className="options">
                            <span className="o-label">상세이미지 (최대 5장)</span>

                            <div className="row-cm detail-img-list">
                                {/* 기존 이미지들 */}
                                {detailImages.map((img, idx) => (
                                    <div key={idx} className="thumbnail" onClick={() => detailRefs.current[idx]?.click()}>
                                        <img src={img.preview} alt={`detail-${idx}`} />

                                        <Input type="file" hidden accept="image/*" innerRef={(el) => (detailRefs.current[idx] = el)} onChange={(e) => handleDetailChange(e, idx)} />
                                    </div>
                                ))}

                                {/* + 버튼 (5개 미만일 때만) */}
                                {detailImages.length < 5 && (
                                    <div className="thumbnail add" onClick={() => detailRefs.current[detailImages.length]?.click()}>
                                        <Plus size={40} color="#B6BCC9" strokeWidth={0.5} />

                                        <Input type="file" hidden accept="image/*" innerRef={(el) => (detailRefs.current[detailImages.length] = el)} onChange={(e) => handleDetailChange(e, detailImages.length)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">카테고리</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Label check>
                                        <Input name="category" type="radio" value={83} checked={tCategory == 83} onChange={(e) => setTCategory(83)} /> 전동공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input name="category" type="radio" value={84} checked={tCategory == 84} onChange={(e) => setTCategory(84)} /> 일반공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input name="category" type="radio" value={85} checked={tCategory == 85} onChange={(e) => setTCategory(85)} /> 생활용품
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input name="category" type="radio" value={86} checked={tCategory == 86} onChange={(e) => setTCategory(86)} />
                                        기타공구
                                    </Label>
                                </FormGroup>

                                <FormGroup check>
                                    <Label check>
                                        <Input name="category" type="radio" value={87} checked={tCategory == 87} onChange={(e) => setTCategory(87)} />
                                        찾아요
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">1일 대여비</span>
                            <div className="check-col">
                                <div className="won">
                                    <Input type="number" name="rentalPrice" className="wonInput" placeholder="1일 대여비" value={freeRental ? 0 : Number(tool.rentalPrice)} readOnly={freeRental} onChange={ChangeInput} />
                                    <span>원</span>
                                </div>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="freeRental" id="checkbox2" type="checkbox" checked={freeRental} onChange={() => setFreeRental((prev) => !prev)} /> 무료대여
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">공구 상세설명</span>
                            <Input type="textarea" name="content" placeholder="공구의 상세한 설명을 적어주세요! (최대 2000자)" className="ttextarea" onChange={ChangeInput} />
                        </div>

                        <div className="options">
                            <span className="o-label">결제옵션</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" defaultChecked /> 문의후 대여
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="quickRental" type="checkbox" checked={quickRental} onChange={() => setQuickRental((prev) => !prev)} /> 바로대여
                                    </Label>
                                </FormGroup>
                                <span className="check-detail">바로대여 기능 선택 시 대여자가 조율 없이 대여기간, 대여 일정을 설정합니다</span>
                            </div>
                        </div>

                        <div className="options">
                            <span className="o-label">거래방식</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Label check>
                                        <Input name="postRental" type="checkbox" checked={postRental} onChange={() => setPostRental((prev) => !prev)} /> 택배 배송
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="directRental" type="checkbox" checked={directRental} onChange={() => setDirectRental((prev) => !prev)} /> 직접 픽업
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>

                        {postRental && (
                            <div className="options">
                                <span className="o-label">배송비</span>
                                <div className="check-col">
                                    <div className="won">
                                        <Input type="number" name="postCharge" className="wonInput" placeholder="배송비" value={freePost ? 0 : Number(tool.postCharge)} readOnly={freePost} onChange={ChangeInput} />
                                        <span>원</span>
                                    </div>
                                    <FormGroup check>
                                        <Label check>
                                            <Input name="freePost" type="checkbox" checked={freePost} onChange={() => setFreePost((prev) => !prev)} /> 무료배송
                                        </Label>
                                    </FormGroup>
                                </div>
                            </div>
                        )}

                        {postRental && (
                            <div className="options">
                                <span className="o-label">받을주소</span>
                                <div className="post-box">
                                    {user.addr1 && (
                                        <FormGroup check>
                                            <Label check>
                                                <Input type="radio" checked={useProfile === true} onChange={() => setUseProfile(true)} />
                                                기본 주소지 (프로필 주소지)
                                            </Label>
                                        </FormGroup>
                                    )}
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="radio" checked={useProfile === false} onChange={() => setUseProfile(false)} /> 직접 입력
                                        </Label>
                                    </FormGroup>
                                    <div className="check-col">
                                        <Input className="zonecodeInput" type="text" name="zonecode" placeholder="우편번호" value={tool.zonecode} readOnly />
                                        {!useProfile && (
                                            <Button className="primary-button" onClick={() => setIsAddOpen(!isAddOpen)}>
                                                주소검색
                                            </Button>
                                        )}
                                    </div>
                                    <Input type="text" name="addr1" placeholder="지번/도로명주소" value={tool.addr1} readOnly />
                                    <Input type="text" name="addr2" placeholder="상세주소" value={tool.addr2} readOnly={useProfile} onChange={useProfile ? undefined : ChangeInput} />

                                    <Input name="postRequest" type="select" className="toolBank pqSelect" value={tool.postRequest} onChange={ChangeInput}>
                                        <option value={"배송시 요청사항 없음"}>배송시 요청사항</option>
                                        <option value={"문앞에 놔주세요"}>문앞에 놔주세요</option>
                                        <option value={"경비실에 맡겨주세요"}>경비실에 맡겨주세요</option>
                                    </Input>
                                </div>
                            </div>
                        )}

                        {isAddOpen && (
                            <AddrModal title="주소찾기" open={isAddOpen} footer={null} onCancel={() => setIsAddOpen(false)}>
                                <DaumPostcode onComplete={complateHandler} onClose={closeHandler} />
                            </AddrModal>
                        )}

                        {directRental && (
                            <div className="options">
                                <span className="o-label">거래 희망장소</span>
                                <div className="check-col">
                                    <div className="location-box">
                                        <input className="location" type="text" placeholder="지도에서 찾기" readOnly></input>
                                        <div className="">
                                            <Button className="primary-button mapPinI">
                                                <MapPinned size={20} />
                                            </Button>
                                        </div>
                                    </div>
                                    <Input type="text" name="location" placeholder="" readOnly />
                                </div>
                            </div>
                        )}

                        <div className="options">
                            <div className="row-cm">
                                <div className="o-label">계좌번호</div>
                                {/* <span className="necc">*</span> */}
                            </div>
                            {user.settleAccount && (
                                <FormGroup check>
                                    <Label check>
                                        <Input type="radio" checked={userBank === true} onChange={() => setUserBank(true)} />
                                        기본 계좌 (프로필 계좌)
                                    </Label>
                                </FormGroup>
                            )}
                            <FormGroup check>
                                <Label check>
                                    <Input type="radio" checked={userBank === false} onChange={() => setUserBank(false)} /> 직접 입력
                                </Label>
                            </FormGroup>
                            <div className="input_detail">정산이 이루어지는 계좌입니다</div>
                            {userBank ? (
                                <Input name="settleBank" type="text" className="toolBank sbSelect" value={tool.settleBank} readOnly />
                            ) : (
                                <Input name="settleBank" type="select" className="toolBank sbSelect" value={tool.settleBank} onChange={ChangeInput}>
                                    <option>은행 선택</option>
                                    <option value={"국민은행"}>국민은행</option>
                                    <option value={"신한은행"}>신한은행</option>
                                    <option value={"농협은행"}>농협은행</option>
                                    <option value={"카카오뱅크"}>카카오뱅크</option>
                                </Input>
                            )}

                            <Input className="toolBank" name="settleAccount" placeholder="'-'제외 숫자로만 계좌번호 입력" type="text" value={tool.settleAccount} readOnly={userBank} onChange={userBank ? undefined : ChangeInput} />
                            <Input className="toolBank" name="settleHost" placeholder="예금주" type="text" value={tool.settleHost} readOnly={userBank} onChange={userBank ? undefined : ChangeInput} />
                        </div>

                        <div className="options">
                            <span className="o-label">대여상태 설정</span>
                            <div className="check-col">
                                <FormGroup check>
                                    <Label check>
                                        <Input name="satus" type="radio" value={"ABLE"} checked={toolStatus == "ABLE"} onChange={() => setToolStatus("ABLE")} /> 대여가능
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="satus" type="radio" value={"INABLE"} checked={toolStatus == "INABLE"} onChange={() => setToolStatus("INABLE")} /> 대여중지
                                    </Label>
                                </FormGroup>
                            </div>
                        </div>
                    </div>
                    <div className="btn-col">
                        <Button className="tertiary-button">작성취소</Button>
                        <Button className="primary-button" onClick={regist}>
                            작성완료
                        </Button>
                    </div>
                </div>

                <Modal isOpen={modal}>
                    <ModalHeader>공구등록</ModalHeader>
                    <ModalBody>
                        {message}
                    </ModalBody>
                    <Button color="primary" onClick={() => setModal(false)} >확인</Button>
                </Modal>
            </div>
        </>
    );
}
