import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Inquiries() {
  const [openRowId, setOpenRowId] = useState(null);

  const navigate = useNavigate();

  const toggleRow = (id) => {
    if (openRowId === id) setOpenRowId(null);
    else setOpenRowId(id);
  };

  const inquiryList = [
    {
      inquiryId: "INQ-20250101-0001",
      inquiryType: "상품",
      content: "문의내용이 여기에 들어갑니다. 제품에 대한 질문이 있습니다.",
      createdAt: "2025-08-02",
      status: "ANSWERED",
      answerContent:
        "답변이 여기에 작성됩니다. 클릭하면 상세가 보이는 형태로 표시됩니다.",
      answeredAt: "2025-08-03",
      orderId: "PRD-001",
    },
    {
      inquiryId: "INQ-20250101-0002",
      inquiryType: "상품",
      content: "문의내용이 여기에 들어갑니다. 제품에 대한 질문이 있습니다.",
      createdAt: "2025-08-02",
      status: "ANSWERED",
      answerContent:
        "답변이 여기에 작성됩니다. 클릭하면 상세가 보이는 형태로 표시됩니다.",
      answeredAt: "2025-08-03",
      image1: "https://via.placeholder.com/80",
      orderId: "PRD-001",
    },
    {
      inquiryId: "INQ-20250101-0003",
      inquiryType: "상품",
      content: "문의내용이 여기에 들어갑니다. 제품에 대한 질문이 있습니다.",
      createdAt: "2025-08-02",
      status: "ANSWERED",
      answerContent:
        "답변이 여기에 작성됩니다. 클릭하면 상세가 보이는 형태로 표시됩니다.",
      answeredAt: "2025-08-03",
      image1: "https://via.placeholder.com/80",
      orderId: "PRD-001",
    },
  ];

  return (
    <div className="mypage-layout">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 className="mypage-title">1:1문의내역</h1>
        <button
          className="primary-button"
          style={{ width: "100px", height: "33px" }}
          onClick={() => navigate("/user/mypage/inquiries/wrtie")}
        >
          1:1문의하기
        </button>
      </div>

      <table className="mypage-table">
        <thead>
          <tr>
            <td>문의유형</td>
            <td>문의내용</td>
            <td>작성일</td>
            <td>답변상태</td>
          </tr>
        </thead>
        <tbody>
          {inquiryList.map((inquiry) => (
            <>
              <tr
                key={inquiry.inquiryId}
                onClick={() => toggleRow(inquiry.inquiryId)}
              >
                <td style={{ width: "140px" }}>{inquiry.inquiryType}</td>
                <td style={{ textAlign: "left", width: "498px" }}>
                  {inquiry.content}
                </td>
                <td style={{ width: "150px" }}>{inquiry.createdAt}</td>
                <td style={{ width: "130px" }}>{inquiry.status}</td>
              </tr>

              {openRowId === inquiry.inquiryId && (
                <tr>
                  <td colSpan="4" style={{ background: "#FDFDFD" }}>
                    <div
                      style={{
                        display: "flex",
                        padding: "0 60px 20px",
                        alignItems: "center",
                        gap: "56px",
                      }}
                    >
                      <span
                        style={{
                          color: "#888",
                          fontSize: "32px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "150%",
                        }}
                      >
                        Q
                      </span>
                      <div>
                        <p>{inquiry.content}</p>
                        {inquiry.image1 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              marginTop: "14px",
                            }}
                          >
                            {[
                              inquiry.image1,
                              inquiry.image2,
                              inquiry.image3,
                              inquiry.image4,
                              inquiry.image5,
                            ]
                              .filter((img) => img)
                              .map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  width="50px"
                                  height="50px"
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        padding: "20px 60px 0",
                        alignItems: "center",
                        gap: "56px",
                      }}
                    >
                      <span
                        style={{
                          color: "#FF5833",
                          fontSize: "32px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "150%",
                        }}
                      >
                        A
                      </span>
                      <p>{inquiry.answerContent}</p>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>

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
