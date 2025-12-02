import { useState, useEffect, useRef } from "react";
import { Input } from "reactstrap";
import "../../css/user-expert/FindExpert.css";

export default function FindExpert() {
    const chatEndRef = useRef(null);

    const serviceOptions = ["수리", "인테리어", "시공/견적 컨설팅"];

    const secondOptions = {
        수리: {
            가전제품: ["냉장고", "식기세척기", "인덕션", "세탁기", "에어컨", "기타 전자제품"],
            "문 & 창문": ["도어락", "도어", "방범창", "방충망", "샷시"],
            "수도 & 보일러 & 전기": ["싱크대", "보일러", "화장실 누수", "수도관련", "온수기", "전기배선"],
        },
        인테리어: {
            "부분 인테리어": ["도어 시공", "블라인드 & 커튼 시공", "샷시 설치", "신발장 시공", "싱크대 교체", "욕실 & 화장실 리모델링", "주방 리모델링", "중문 시공", "줄눈 시공"],
            "벽 / 천장 시공": ["단열필름 시공", "도배 시공", "몰딩 시공", "방음 시공", "아트월 시공", "외풍차단 & 틈막이 시공", "유리필름 & 시트 시공", "인테리어 필름 시공", "페인트 시공"],
            "바닥 시공": ["마루 보수", "마루 시공", "바닥재 시공", "에폭시바닥 시공", "층간소음매트 시공", "카페트 시공", "타일 시공", "장판 시공"],
        },
        "시공/견적 컨설팅": {
            거실: ["공간 효율화", "미관 향상", "기능 개선", "기타"],
            주방: ["공간 효율화", "미관 향상", "기능 개선", "기타"],
            "침실 / 아이방": ["공간 효율화", "미관 향상", "기능 개선", "기타"],
            "사무실 / 상업공간": ["공간 효율화", "미관 향상", "기능 개선", "기타"],
            기타: ["공간 효율화", "미관 향상", "기능 개선", "기타"],
        },
    };

    const commonQuestionsMap = {
        "시공/견적 컨설팅": [
            { text: "예산은 어느 정도로 생각하시나요?", key: "budget", type: "text" },
            { text: "서비스 완료 희망일이나 방문 가능 날짜가 있나요?", key: "schedule", type: "date" },
            { text: "추가 요청사항이 있으면 알려주세요", key: "notes", type: "text" },
        ],
        수리: [
            { text: "작업 희망일을 선택해주세요", key: "schedule", type: "date" },
            { text: "작업할 장소는 어딘가요?", key: "place", type: "text" },
            { text: "추가 요청사항이 있으면 알려주세요", key: "notes", type: "text" },
        ],
        인테리어: [
            { text: "예산은 어느 정도로 생각하시나요?", key: "budget", type: "text" },
            { text: "작업 희망일을 선택해주세요", key: "schedule", type: "date" },
            { text: "작업할 장소는 어딘가요?", key: "place", type: "text" },
            { text: "대략적인 작업 사이즈를 입력해주세요", key: "size", type: "text" },
            { text: "추가 요청사항이 있으면 알려주세요", key: "notes", type: "text" },
        ],
    };

    const [messages, setMessages] = useState([{ id: 1, type: "bot", text: "원하시는 서비스를 선택해주세요", options: serviceOptions }]);
    const [category, setCategory] = useState(null);
    const [firstChoice, setFirstChoice] = useState(null);
    const [step, setStep] = useState(0); // 단계 관리
    const [commonStep, setCommonStep] = useState(0); // 공통 질문 단계
    const [inputValue, setInputValue] = useState("");

    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

        console.log("현재 메세지: ", messages);
    }, [messages]);

    const handleSelect = (option) => {
        // 마지막 메시지에서 버튼 제거
        setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            if (newMessages[lastIndex].options) {
                newMessages[lastIndex] = { ...newMessages[lastIndex], options: [] };
            }
            // 사용자 메시지 추가
            newMessages.push({ id: newMessages.length + 1, type: "user", text: option });
            return newMessages;
        });

        // 이후 기존 로직 유지
        setTimeout(() => {
            if (step === 0) {
                setCategory(option);
                let firstQ = "";
                let firstOptions = [];
                if (option === "수리") {
                    firstQ = "어떤 수리를 원하시나요?";
                    firstOptions = ["가전제품", "문 & 창문", "수도 & 보일러 & 전기"];
                } else if (option === "인테리어") {
                    firstQ = "인테리어 서비스를 선택해주세요";
                    firstOptions = ["부분 인테리어", "벽 / 천장 시공", "바닥 시공"];
                } else if (option === "시공/견적 컨설팅") {
                    firstQ = "시공할 공간은 어디인가요?";
                    firstOptions = ["거실", "주방", "침실 / 아이방", "사무실 / 상업공간", "기타"];
                }
                setMessages((prev) => [...prev, { id: prev.length + 1, type: "bot", text: firstQ, options: firstOptions }]);
                setStep(1);
                return;
            }

            if (step === 1) {
                setFirstChoice(option);
                let secondQText = category === "수리" ? `수리하실 ${option} 종류를 선택해주세요` : category === "인테리어" ? "작업 유형을 선택해주세요" : "이번 시공의 주된 목적은 무엇인가요?";
                setMessages((prev) => [...prev, { id: prev.length + 1, type: "bot", text: secondQText, options: secondOptions[category][option] || [] }]);
                setStep(2);
                return;
            }

            if (step === 2) {
                const questions = commonQuestionsMap[category] || [];
                setMessages((prev) => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        type: "bot",
                        text: questions[0].text,
                        key: questions[0].key,
                        typeInput: questions[0].type,
                        showInput: true, // 여기를 추가
                    },
                ]);
                setStep(3);
                setCommonStep(0);
                setInputValue("");
            }
        }, 500);
    };

    const handleCommonConfirm = (value) => {
        const questions = commonQuestionsMap[category] || [];

        setMessages((prev) => {
            const newMessages = [...prev];

            // 마지막 bot 메시지의 input만 제거
            for (let i = newMessages.length - 1; i >= 0; i--) {
                if (newMessages[i].type === "bot" && newMessages[i].showInput) {
                    newMessages[i] = { ...newMessages[i], showInput: false };
                    break;
                }
            }

            // 사용자 메시지 추가
            newMessages.push({ id: newMessages.length + 1, type: "user", text: value });

            // 다음 bot 메시지 추가
            if (commonStep + 1 < questions.length) {
                const nextStep = commonStep + 1;
                newMessages.push({
                    id: newMessages.length + 1,
                    type: "bot",
                    text: questions[nextStep].text,
                    key: questions[nextStep].key,
                    typeInput: questions[nextStep].type,
                    showInput: true, // input 표시
                });
            }

            return newMessages;
        });

        setInputValue("");
        setCommonStep((prev) => prev + 1);
    };

    // 마지막 추가 요청사항 처리
    const handleLastConfirm = (value) => {
        if (!value) return; // 빈값 무시
        setMessages((prev) => [...prev, { id: prev.length + 1, type: "user", text: value }, { id: prev.length + 2, type: "bot", text: "견적 요청서가 정상적으로 제출되었습니다!" }]);
        setInputValue(""); // 입력 초기화
    };

    return (
        <div className="chat-window">
            {messages.map((msg) => (
                <div key={msg.id} className={`chat-bubble ${msg.type}`}>
                    <div className="font-14 medium">{msg.text}</div>

                    {msg.options && msg.options.length > 0 && (
                        <div className="options-box">
                            {msg.options.map((opt) => (
                                <button key={opt} className="option-btn" onClick={() => handleSelect(opt)}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* 공통 질문 입력칸 */}
                    {msg.type === "bot" && msg.showInput && (
                        <div className="common-input-box">
                            {msg.key === "place" ? (
                                // 작업할 장소는 어딘가요?
                                <div style={{ marginTop: "14px", width: "290px" }}>
                                    <div className="find-select-address-div">
                                        {/* 읽기 전용 주소 입력 */}
                                        <Input
                                            style={{ width: "215px" }}
                                            className="font-14"
                                            type="text"
                                            value={address} // <<< 주소 값 바인딩
                                            readOnly
                                            placeholder="주소 찾기 버튼으로 선택"
                                        />

                                        {/* 우편번호 API 연결 */}
                                        <button className="find-select-address-button font-14" type="button">
                                            주소찾기
                                        </button>
                                    </div>

                                    {/* 상세 주소 입력 */}
                                    <Input
                                        className="font-14"
                                        type="text"
                                        placeholder="상세 주소를 입력하세요"
                                        onChange={(e) => setDetailAddress(e.target.value)}
                                        style={{ marginTop: "8px", height: "42px" }}
                                    />
                                    <div style={{ marginTop: "8px", display: "flex", justifyContent: "center" }}>
                                        <button
                                            style={{
                                                height: "42px",
                                                border: "none",
                                                borderRadius: "5px",
                                                backgroundColor: "#ff5833",
                                                color: "#ffffff",
                                                width: "50px",
                                            }}
                                            type="button"
                                            color="primary"
                                            size="sm"
                                            onClick={() => {
                                                // onClick={openPostcode}
                                                handleCommonConfirm(address + " " + detailAddress);
                                            }}
                                            className="font-14"
                                        >
                                            다음
                                        </button>
                                    </div>
                                </div>
                            ) : msg.key === "size" ? (
                                // 대략적인 작업 사이즈를 입력해주세요
                                <div>
                                    <Input
                                        className="font-14"
                                        style={{ resize: "none", width: "290px", height: "100px", marginTop: "14px" }}
                                        type="textarea"
                                        placeholder="ex. 800 x 1,200mm 창문 4개"
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
                                        <button
                                            style={{ width: "50px", height: "42px", border: "none", color: "#ffffff", backgroundColor: "#ff5833", borderRadius: "5px" }}
                                            type="button"
                                            color="primary"
                                            size="sm"
                                            onClick={() => handleCommonConfirm(inputValue)}
                                            className="font-14"
                                        >
                                            다음
                                        </button>
                                    </div>
                                </div>
                            ) : msg.key === "budget" ? (
                                // 예산은 어느정도 생각하시나요?
                                <div style={{ marginTop: "14px" }}>
                                    <div className="find-expert-want-money">
                                        <Input
                                            style={{ width: "230px" }}
                                            className="font-14 want-money-input"
                                            type="number"
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder="(단위 : 만원)"
                                        />
                                        <button
                                            className="font-14 money-button"
                                            type="button"
                                            color="primary"
                                            size="sm"
                                            onClick={() => {
                                                handleCommonConfirm(inputValue); // 기존 함수 실행
                                            }}
                                            style={{ height: "44px", width: "50px", marginLeft: "10px" }}
                                        >
                                            다음
                                        </button>
                                    </div>
                                </div>
                            ) : msg.key === "schedule" ? (
                                // 작업 희망일이 있나요?
                                <div style={{ marginTop: "14px" }}>
                                    <div className="findExpert-select-date-div">
                                        <Input className="font-14" type="date" onChange={(e) => setInputValue(e.target.value)} style={{ width: "230px" }} />
                                        <button
                                            style={{ height: "44px", width: "50px", marginLeft: "10px" }}
                                            type="button"
                                            className="font-14 select-date-button"
                                            size="sm"
                                            onClick={() => handleCommonConfirm(inputValue)}
                                        >
                                            선택
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // 추가 요청 사항이 있으면 알려주세요?
                                <>
                                    <div style={{ marginTop: "14px", width: "663px" }}>
                                        <Input className="font-14" type="textarea" style={{ width: "100%", height: "162px", resize: "none" }} onChange={(e) => setInputValue(e.target.value)} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "8px" }}>
                                        <button
                                            className="font-14 semibold"
                                            style={{ border: "none", borderRadius: "5px", height: "42px", backgroundColor: "#ff5833", color: "#ffffff", width: "122px" }}
                                            onClick={() => {
                                                handleLastConfirm(inputValue);
                                            }}
                                        >
                                            견적 요청서 제출
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
}
