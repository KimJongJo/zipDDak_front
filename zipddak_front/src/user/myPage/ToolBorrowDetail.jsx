import {Heart} from 'lucide-react'

export default function ToolBorrowDetail() {
     const Tool = {
        TooltName: "공구 이름",
        address: "김포시 사우동",
        rentalPrice: 34900
    };

    return (
        <>
            <div className="myPage-rentalDetail-container">
                <span className="font-22 semibold">결제화면</span>

                {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">공구 정보</span>
                        <div>
                            <a href="#" className="tool-h">
                                    <div className="tool-image-h">
                                        <div className="favorite-iconh"><Heart /></div>
                                    </div>

                                    <div className="tool-info-h">
                                        <div className="tool-name-h">{Tool.TooltName}</div>
                                        <span className="tool-address-h">{Tool.address}</span>
                                        <div>
                                            <span className="oneday-h">1일</span>
                                            <span className="rental-price-h">{Tool.rentalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </a>
                        </div>
                    </div>

                <div className="expertOrder-table-div">
                    {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">결제정보</span>
                        <div className="expertOrder-table-div">
                    
                </div>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">대여기간</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <span className="font-14">2025-11-11</span>
                                        <span className="font-14">2025-11-11</span>
                                        <span className="font-14">4</span>
                                        <span className="font-14">일</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">거래방식</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">택배 배송</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">대여금액</span>
                                    </td>
                                    {/* 예산 */}
                                    <td>
                                        <span className="font-14">400000</span>
                                        <span className="font-14"> 원</span>
                                        <span className="font-14"> (10,000원 * 4일)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">배송비</span>
                                    </td>
                                    {/* 시공 장소 */}
                                    <td>
                                        <span className="font-14">4000</span>
                                        <span className="font-14"> 원</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">결제방식</span>
                                    </td>
                                    {/* 시공 장소 */}
                                    <td>
                                        <span className="font-14">카드 결제</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">총 입금 금액</span>
                                    </td>
                                    {/* 추가 요청사항 */}
                                    <td>
                                        <span className="font-14">4000</span>
                                        <span className="font-14"> 원</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="expertOrder-table-div">
                    {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">신청자 정보</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">신청자</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <span className="font-14">홍길동</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">휴대폰 번호</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">2025-11-11</span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="expertOrder-table-div">
                    {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">정산 정보</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">신청자</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <span className="font-14">홍길동</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">휴대폰 번호</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">2025-11-11</span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>

                 <div className="expertOrder-table-div">
                    {/* 내 요청내용 div */}
                    <div>
                        <span className="font-18 semibold">배송지 정보</span>
                        <table className="margin-top-20 expertOrder-table">
                            <tbody>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">받는사람</span>
                                    </td>
                                    {/* 작업 유형 */}
                                    <td>
                                        <span className="font-14">홍길동</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">휴대폰 번호</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">2025-11-11</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="expertOrder-trtd">
                                        <span className="font-14">주소</span>
                                    </td>
                                    {/* 희망 일정 */}
                                    <td>
                                        <span className="font-14">금천구 가산동</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>







            </div>
        </>
    )
}