import { useState } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Likes() {
  const [tab, setTab] = useState("공구");

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">관심</h1>

      <div className="mypage-tabList">
        <div
          className={tab === "공구" ? "isActive" : ""}
          onClick={() => setTab("공구")}
        >
          공구
        </div>
        <div
          className={tab === "전문가" ? "isActive" : ""}
          onClick={() => setTab("전문가")}
        >
          전문가
        </div>
        <div
          className={tab === "상품" ? "isActive" : ""}
          onClick={() => setTab("상품")}
        >
          상품
        </div>
        <div
          className={tab === "시공후기" ? "isActive" : ""}
          onClick={() => setTab("시공후기")}
        >
          시공후기
        </div>
      </div>

      {tab === "공구" && <></>}
      {tab === "전문가" && <></>}
      {tab === "상품" && <></>}
      {tab === "시공후기" && <></>}

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
