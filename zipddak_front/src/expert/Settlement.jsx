import { useNavigate } from "react-router-dom";
import { Input, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export function Settlement() {
  const navigate = useNavigate();

  const settlementList = {
    expectedSettlementDate: "2025-11-20",
    expectedSettlementAmount: 1400000,
    totalSalesCount: 20,
    totalSalesAmount: 1400000,

    settlements: [
      {
        settlementId: "SET-001",
        serviceName: "도어시공",
        customerPayment: 100000,
        platformFee: 10000,
        settlementAmount: 90000,

        workStartDate: "2025-01-02",
        workEndDate: "2025-01-03",
        workDays: 2,

        settlementStatus: "PENDING",
        settlementCompletedDate: null,
        comment: "홍길동",
      },

      {
        settlementId: "SET-002",
        serviceName: "도어시공",
        customerPayment: 100000,
        platformFee: 10000,
        settlementAmount: 90000,

        workStartDate: "2025-01-02",
        workEndDate: "2025-01-02",
        workDays: 1,

        settlementStatus: "COMPLETED",
        settlementCompletedDate: "2025-01-02",
        comment: "홍길동",
      },

      {
        settlementId: "SET-003",
        serviceName: "싱크대 교체",
        customerPayment: 180000,
        platformFee: 18000,
        settlementAmount: 162000,

        workStartDate: "2025-01-10",
        workEndDate: "2025-01-11",
        workDays: 2,

        settlementStatus: "PENDING",
        settlementCompletedDate: null,
        comment: null,
      },

      {
        settlementId: "SET-004",
        serviceName: "욕실 리모델링",
        customerPayment: 500000,
        platformFee: 50000,
        settlementAmount: 450000,

        workStartDate: "2025-01-04",
        workEndDate: "2025-01-07",
        workDays: 4,

        settlementStatus: "COMPLETED",
        settlementCompletedDate: "2025-01-08",
        comment: "정산 완료 처리",
      },
    ],
  };

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">매출정산 관리</h1>

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "14px",
          }}
        >
          {/* 날짜 선택 */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input> -{" "}
            <Input type="date" bsSize="sm" style={{ width: "140px" }}></Input>
          </div>

          {/* 요약 카드 */}
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "250px",
                padding: "20px",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "8px",
                border: "1px solid #EFF1F5",
              }}
            >
              <p
                style={{
                  color: "#6A7685",
                  fontSize: "12px",
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                }}
              >
                정산 예정일 {settlementList.expectedSettlementDate}
              </p>
              <p
                style={{
                  color: "#303441",
                  fontSize: "14px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  margin: "6px 0 16px 0",
                }}
              >
                다음 정산 예정 금액
              </p>
              <p
                style={{
                  color: "#303441",
                  fontSize: "16px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {Number(
                  settlementList.expectedSettlementAmount
                ).toLocaleString()}
                원
              </p>
            </div>
            <div
              style={{
                display: "flex",
                width: "250px",
                padding: "20px",
                flexDirection: "column",
                alignItems: "flex-start",
                borderRadius: "8px",
                border: "1px solid #EFF1F5",
              }}
            >
              <p
                style={{
                  color: "#6A7685",
                  fontSize: "12px",
                  fontWeight: "400",
                  whiteSpace: "nowrap",
                }}
              >
                매출 건 수 {settlementList.totalSalesCount}건
              </p>
              <p
                style={{
                  color: "#303441",
                  fontSize: "14px",
                  fontWeight: "500",
                  whiteSpace: "nowrap",
                  margin: "6px 0 16px 0",
                }}
              >
                이번 달 총 매출금액
              </p>
              <p
                style={{
                  color: "#303441",
                  fontSize: "16px",
                  fontWeight: "600",
                  whiteSpace: "nowrap",
                  textAlign: "right",
                  width: "100%",
                }}
              >
                {Number(settlementList.totalSalesAmount).toLocaleString()}원
              </p>
            </div>
          </div>
        </div>

        <table className="mypage-table">
          <thead>
            <tr>
              <td>서비스명</td>
              <td>고객결제금액</td>
              <td>플랫폼수수료</td>
              <td>정산금액</td>
              <td>작업기간(일수)</td>
              <td>정산여부</td>
              <td>관리자코멘트</td>
            </tr>
          </thead>
          <tbody>
            {settlementList.settlements.map((settlement) => (
              <>
                <tr>
                  <td>{settlement.serviceName}</td>
                  <td style={{ fontWeight: "500" }}>
                    {Number(settlement.customerPayment).toLocaleString()}원
                  </td>
                  <td style={{ fontWeight: "500" }}>
                    {Number(settlement.platformFee).toLocaleString()}원
                  </td>
                  <td style={{ fontWeight: "500" }}>
                    {Number(settlement.settlementAmount).toLocaleString()}원
                  </td>
                  <td>
                    {settlement.workStartDate} - {settlement.workEndDate}(
                    <span style={{ color: "#FF5833" }}>
                      {settlement.workDays}
                    </span>
                    )
                  </td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={
                        settlement.settlementStatus === "COMPLETED"
                          ? { fontWeight: "500" }
                          : { color: "#FF5833", fontWeight: "600" }
                      }
                    >
                      {settlement.settlementStatus === "COMPLETED"
                        ? "정산완료"
                        : "정산예정"}
                    </span>
                    <span style={{ fontSize: "11px" }}>
                      {settlement.settlementCompletedDate}
                    </span>
                  </td>
                  <td>{settlement.comment}</td>
                </tr>
              </>
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
