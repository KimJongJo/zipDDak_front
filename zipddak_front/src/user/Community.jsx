import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function Community() {
  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">내 게시물</h1>
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
