import "../../css/user-expert/ExpertOrder.css";

export default function ExpertOrder() {
    return (
        <div className="body-div">
            <div className="expertOrder-main-div">
                <span className="font-22 semibold">결제화면</span>

                <div className="expertOrder-table-div">
                    {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">내 요청 내용</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">작업 유형</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <span className="font-14">강화도어</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">희망 일정</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">2025-11-11</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">예산</span>
                                    </td>
                                    {/* 예산 */}
                                    <td>
                                        <span className="font-14">600</span>
                                        <span className="font-14"> 만원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">시공 장소</span>
                                    </td>
                                    {/* 시공 장소 */}
                                    <td>
                                        <span className="font-14">서울시 금천구 가산디지털1로 70</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">추가 요청사항</span>
                                    </td>
                                    {/* 추가 요청사항 */}
                                    <td>
                                        <span className="font-14">추가 요청사항에 대한 내용이 들어갑니다.</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 전문가 정보 div */}
                    <div>
                        <span className="font-18 semibold">전문가 정보</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">프로필 이미지</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <img className="expertProfileImg-img" src="/images/기본회원프로필.jpg" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">활동명</span>
                                    </td>
                                    {/* 활동명 */}
                                    <td>
                                        <span className="font-14">홍길동</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">전문</span>
                                    </td>
                                    {/* 전문 */}
                                    <td>
                                        {/* 전문 카테고리 */}
                                        <div className="font-12 medium expertOrder-badge">
                                            <span>전문가 카테고리</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">평점</span>
                                    </td>
                                    {/* 평점 */}
                                    <td>
                                        <span className="font-14">4.5</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">연락가능시간</span>
                                    </td>
                                    {/* 연락가능시간 */}
                                    <td>
                                        <span className="font-14">09:00 ~ 18:00</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 견적 금액 상세 div */}
                    <div>
                        <span className="font-18 semibold">견적 금액 상세</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                {/* 배열로 받아와서 반복 */}
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">타일</span>
                                    </td>
                                    <td>
                                        <div className="expertOrder-price-div">
                                            <span className="font-14 semibold">240</span>
                                            <span className="font-14 semibold"> 만원</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-16 semibold">시공비 합계</span>
                                    </td>
                                    <td>
                                        <div className="expertOrder-price-div">
                                            <span className="font-16 semibold">1520</span>
                                            <span className="font-16 semibold"> 만원</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">자재비</span>
                                    </td>
                                    <td>
                                        <div className="expertOrder-price-div">
                                            <span className="font-14 semibold">240</span>
                                            <span className="font-14 semibold"> 만원</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-16 semibold">총 견적 금액</span>
                                    </td>
                                    <td>
                                        <div className="expertOrder-price-div">
                                            <span className="font-16 semibold">1520</span>
                                            <span className="font-16 semibold"> 만원</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="expertOrder-more-request-div font-14">추가 설명이 들어갑니다.</div>
                    </div>

                    {/* 확인 항목 div */}
                    <div>
                        <span className="font-18 semibold">확인 항목</span>
                        <div className="expertOrder-checkList-div">
                            <div className="expertOrder-checkList">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span">견적 내용(서비스 항목, 작업 범위, 기간 등)을 정확히 확인했습니다.</span>
                            </div>
                            <div className="expertOrder-checkList">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span">결제 금액에 플랫폼 수수료 및 부가세가 포함되어 있음을 확인했습니다.</span>
                            </div>
                            <div className="expertOrder-checkList">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span">결제 후에는 전문가 배정 및 일정 조율이 진행되며, 단순 변심으로 인한 취소는 어려울 수 있음을 확인했습니다.</span>
                            </div>
                            <div className="expertOrder-checkList">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span">서비스 이용약관 및 개인정보 처리방침을 모두 확인했습니다.</span>
                            </div>
                            <div className="expertOrder-checkList">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span">결제 전 제공받은 견적서의 세부 항목(자재, 인건비, 수수료 등)을 모두 확인했습니다.</span>
                            </div>
                            <div className="expertOrder-checkList expertOrder-checkList-all">
                                <input type="checkbox" className="expertOrder-checkbox" />
                                <span className="font-14 expertOrder-span semibold">모두 확인했습니다.</span>
                            </div>
                        </div>
                    </div>

                    {/* 결제 버튼 div */}
                    <div className="expertOrder-complate-div">
                        <button className="expertOrder-complate-button font-14 semibold">계약 확정 및 결제하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
