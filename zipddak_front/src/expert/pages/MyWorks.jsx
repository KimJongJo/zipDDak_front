import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { tokenAtom, userAtom } from "../../atoms";

export function MyWorks() {
  const [status, setStatus] = useState("전체");

  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 작업상태 매핑
  const WORK_STATUS_LABEL = {
    PAYMENT_COMPLETED: "결제 완료",
    IN_PROGRESS: "작업 중",
    COMPLETED: "작업 완료",
    CANCELLED: "취소",
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // mock
  const workList = [
    {
      workId: "WORK-20250001",
      categoryName: "도어 시공",
      region: "서울 강남구",
      workType: "강화도어",
      budget: "80만 원 ~ 120만 원",
      preferredDate: "가능한 빨리 진행하고 싶어요",

      customerName: "홍길동",

      contractDate: "2025-07-28",
      workStartDate: "2025-07-28",
      workEndDate: "2025-07-31",

      paymentAmount: 245000,
      workStatus: "PAYMENT_COMPLETED", // 결제완료
    },

    {
      workId: "WORK-20250002",
      categoryName: "도어 시공",
      region: "서울 송파구",
      workType: "문틀 보수",
      budget: "40만 원 ~ 70만 원",
      preferredDate: "2025-08-02",

      customerName: "홍길동",

      contractDate: "2025-07-28",
      workStartDate: "2025-07-28",
      workEndDate: "2025-07-31",

      paymentAmount: 245000,
      workStatus: "IN_PROGRESS", // 작업중
    },

    {
      workId: "WORK-20250003",
      categoryName: "도어 시공",
      region: "서울 성동구",
      workType: "문짝교체",
      budget: "50만 원 ~ 90만 원",
      preferredDate: "2025-08-10",

      customerName: "홍길동",

      contractDate: "2025-07-28",
      workStartDate: "2025-07-28",
      workEndDate: "2025-07-31",

      paymentAmount: 245000,
      workStatus: "CANCELLED", // 취소완료
    },

    {
      workId: "WORK-20250004",
      categoryName: "도어 시공",
      region: "서울 광진구",
      workType: "문턱 교체",
      budget: "20만 원 이하",
      preferredDate: "2025-08-05",

      customerName: "홍길동",

      contractDate: "2025-07-28",
      workStartDate: "2025-07-28",
      workEndDate: "2025-07-31",

      paymentAmount: 245000,
      workStatus: "COMPLETED", // 작업완료
    },
  ];

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">작업내역</h1>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="mypage-statusCard">
            <p>결제완료</p>
            <span>0</span>
          </div>
          <div className="mypage-statusCard">
            <p>작업중</p>
            <span>0</span>
          </div>
          <div className="mypage-statusCard">
            <p>취소</p>
            <span>0</span>
          </div>
          <div className="mypage-statusCard">
            <p>작업완료</p>
            <span>0</span>
          </div>
        </div>

        {/* 날짜 선택 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "30px 0 14px 0",
          }}
        >
          <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input> -{" "}
          <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input>
        </div>

        {/* 상태 선택 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "6px 0 14px 0",
          }}
        >
          <div className="mypage-radio">
            <Input
              id="inquiryType"
              type="radio"
              value="전체"
              name="inquiryType"
              checked={status === "전체"}
              onChange={handleStatusChange}
            />
            <laebl for="inquiryType">전체</laebl>
          </div>
          <div className="mypage-radio">
            <Input
              id="inquiryType"
              type="radio"
              value="결제완료"
              name="inquiryType"
              checked={status === "결제완료"}
              onChange={handleStatusChange}
            />
            <laebl for="inquiryType">결제완료</laebl>
          </div>
          <div className="mypage-radio">
            <Input
              id="inquiryType"
              type="radio"
              value="작업중"
              name="inquiryType"
              checked={status === "작업중"}
              onChange={handleStatusChange}
            />
            <laebl for="inquiryType">작업중</laebl>
          </div>
          <div className="mypage-radio">
            <Input
              id="inquiryType"
              type="radio"
              value="작업완료"
              name="inquiryType"
              checked={status === "작업완료"}
              onChange={handleStatusChange}
            />
            <laebl for="inquiryType">작업완료</laebl>
          </div>
          <div className="mypage-radio">
            <Input
              id="inquiryType"
              type="radio"
              value="취소"
              name="inquiryType"
              checked={status === "취소"}
              onChange={handleStatusChange}
            />
            <laebl for="inquiryType">취소</laebl>
          </div>
        </div>

        <table className="mypage-table">
          <thead>
            <tr>
              <td>작업정보</td>
              <td width="90px">고객명</td>
              <td width="140px">계약일자</td>
              <td width="140px">작업일자</td>
              <td width="140px">결제금액</td>
              <td width="130px">작업상태</td>
            </tr>
          </thead>
          <tbody>
            {workList.map((work) => (
              <tr
                key={work.workId}
                style={{ cursor: "pointer" }}
                onClick={() => {}}
              >
                <td style={{ textAlign: "left", fontSize: "13px" }}>
                  <p style={{ fontWeight: "600", fontSize: "14px" }}>
                    {work.categoryName}
                  </p>
                  <p style={{ margin: "6px 0" }}>{work.region}</p>
                  <p>
                    {work.workType} · {work.budget} · {work.preferredDate}
                  </p>
                </td>
                <td>{work.customerName}</td>
                <td
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {work.contractDate.slice(0, 10)}
                </td>
                <td
                  style={{
                    fontWeight: "500",
                  }}
                >
                  <p>{work.workStartDate.slice(0, 10)}</p>-
                  <p>{work.workEndDate.slice(0, 10)}</p>
                </td>
                <td
                  style={{
                    fontWeight: "500",
                  }}
                >
                  {Number(work.paymentAmount).toLocaleString()}원
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span style={{ fontSize: "16px", fontWeight: "700" }}>
                      {WORK_STATUS_LABEL[work.workStatus]}
                    </span>
                    {work.workStatus === "PAYMENT_COMPLETED" && (
                      <button
                        className="secondary-button"
                        style={{ width: "60px", height: "33px" }}
                        onClick={() => {}}
                      >
                        취소신청
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination className="my-pagination">
        <PaginationItem active>
          <PaginationLink>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink>3</PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
}
