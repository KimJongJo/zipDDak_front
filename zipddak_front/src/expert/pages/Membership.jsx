import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import MembershipInfoCard from "../component/MembershipInfoCard";
import { useState } from "react";

export function Membership() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = { hasMembership: true };

  const membership = {
    nextPaymentDate: "2025.09.29",
    totalMembershipMonths: 29,

    payments: [
      {
        paymentId: "PAY-001",
        paymentDate: "2025.09.29",
        paymentTitle: "집닥 멤버십 정기결제",
        usagePeriodStart: "2025.09.29",
        usagePeriodEnd: "2025.10.28",
        amount: 30000,
        paymentMethod: "토스페이",
      },
      {
        paymentId: "PAY-002",
        paymentDate: "2025.08.29",
        paymentTitle: "집닥 멤버십 정기결제",
        usagePeriodStart: "2025.08.29",
        usagePeriodEnd: "2025.09.28",
        amount: 30000,
        paymentMethod: "토스페이",
      },
      {
        paymentId: "PAY-003",
        paymentDate: "2025.07.29",
        paymentTitle: "집닥 멤버십 정기결제",
        usagePeriodStart: "2025.07.29",
        usagePeriodEnd: "2025.08.28",
        amount: 30000,
        paymentMethod: "토스페이",
      },
    ],
  };

  return user.hasMembership ? (
    <div className="mypage-layout">
      <h1 className="mypage-title">내 멤버십</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MembershipInfoCard type="short" />
        <div
          style={{
            display: "flex",
            width: "266px",
            height: "126px",
            padding: "30px",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            borderRadius: "8px",
            border: "1px solid #EFF1F5",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
          <p>
            다음 결제일{" "}
            <span style={{ marginLeft: "20px" }}>
              {membership.nextPaymentDate}
            </span>
          </p>
          <p>
            총 가입기간{" "}
            <span style={{ marginLeft: "20px", color: "#FF5833" }}>
              {membership.totalMembershipMonths}개월
            </span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="mypage-sectionTitle">결제내역</h3>
        <table className="mypage-table">
          <thead style={{ borderTop: "none" }}>
            <tr>
              <td>결제일</td>
              <td>결제내역</td>
              <td>이용기간</td>
              <td>결제금액</td>
              <td>결제방법</td>
            </tr>
          </thead>
          <tbody>
            {membership.payments.map((payment) => (
              <tr>
                <td style={{ fontWeight: "500" }}>{payment.paymentDate}</td>
                <td>{payment.paymentTitle}</td>
                <td>
                  {payment.usagePeriodStart} - {payment.usagePeriodEnd}
                </td>
                <td>{Number(payment.amount).toLocaleString()}원</td>
                <td>{payment.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p
        style={{
          color: "#ADADAD",
          fontSize: "14px",
          fontWeight: "400",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        해지하기
      </p>
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

      <Modal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(false)}
        className="mypage-modal"
        style={{ width: "380px" }}
      >
        <ModalHeader toggle={() => setIsModalOpen(false)}>
          멤버십을 해지하시겠어요?
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              whiteSpace: "nowrap",
              fontSize: "14px",
            }}
          >
            <p>해지 시 다음 결제일부터 멤버십 혜택이 제공되지 않습니다.</p>
            <p>이미 결제된 기간은 만료일까지 이용할 수 있습니다.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <button
              className="secondary-button"
              style={{ width: "100%", height: "33px" }}
              onClick={() => setIsModalOpen(false)}
            >
              취소
            </button>
            <button
              className="primary-button"
              style={{ width: "100%", height: "33px" }}
            >
              해지하기
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  ) : (
    <div className="mypage-layout">
      <h1 className="mypage-title">내 멤버십</h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "44px",
        }}
      >
        <MembershipInfoCard type="default" />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "44px",
          }}
        >
          <div style={{ width: "100%" }}>
            <h3 className="mypage-sectionTitle">고객정보</h3>
            <div className="labelInput-wrapper">
              <label style={{ width: "100px" }}>이름</label>
              <p>{user.name}</p>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "100px" }}>휴대폰 번호</label>
              <p>{user.phoneNumber}</p>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <h3 className="mypage-sectionTitle">결제정보</h3>
            <div className="labelInput-wrapper">
              <label style={{ width: "100px" }}>총 결제금액</label>
              <p>30,000</p>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "100px" }}>자동 결제일</label>
              <p>매월 29일</p>
            </div>
            <div className="labelInput-wrapper">
              <label style={{ width: "100px" }}>다음 결제일</label>
              <p>{membership.nextPaymentDate}</p>
            </div>
          </div>

          <button
            className="primary-button"
            style={{ width: "200px", height: "40px", fontSize: "14px" }}
          >
            멤버십 가입하기
          </button>
        </div>
      </div>
      <p
        style={{
          color: "#6A7685",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "18px",
        }}
      >
        본 멤버십은 월 단위 자동 결제 방식으로 운영됩니다.
        <br />
        사용자는 언제든 해지할 수 있으며, 해지 시 다음 결제 주기부터 자동 결제가
        중단됩니다.
      </p>
    </div>
  );
}
