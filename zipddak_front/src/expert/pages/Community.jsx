import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Eye, MessageCircle } from "lucide-react";

export function Community() {
  const [communityList, setCommunityList] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    allPage: 0,
    curPage: 1,
    endPage: 0,
    startPage: 1,
  });

  // 내 커뮤니티목록 조회
  const getCommunityList = (page) => {
    axios
      .get(
        "http://localhost:8080" +
          `/my/communityList?username=test@kosta.com&page=${page}`
      )
      .then((res) => {
        setCommunityList(res.data.myCommunityList);
        return res.data.pageInfo;
      })
      .then((pageData) => {
        setPageInfo(pageData);
        let pageBtns = [];
        for (let i = pageData.startPage; i <= pageData.endPage; i++) {
          pageBtns.push(i);
        }
        setPageBtn([...pageBtns]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCommunityList(1);
  }, []);

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">내 게시물</h1>

      {communityList.length !== 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {communityList.map((community) => (
            <a href="#" className="Com-card">
              <div className="Com-infoBox">
                <div className="Com-info">
                  <span className="Com-category">{community.categoryName}</span>
                  <div className="Com-title">{community.title}</div>
                  <span className="Com-content">{community.content}</span>
                </div>
                <div className="Com-reaction">
                  <span className="Com-writer">{community.writerNickname}</span>
                  <div className="favs">
                    <Eye size={15} />
                    {community.views}
                  </div>
                  <i className="bi bi-dot dot"></i>
                  <div className="chats">
                    <MessageCircle size={15} />
                    {community.replyCount}
                  </div>
                </div>
              </div>

              <div className="Com-image"></div>
            </a>
          ))}
        </div>
      )}

      <Pagination className="my-pagination">
        {pageBtn.map((b) => (
          <PaginationItem key={b} active={b === pageInfo.curPage}>
            <PaginationLink
              onClick={() => {
                setCommunityList([]);
                getCommunityList(b);
              }}
            >
              {b}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </div>
  );
}
