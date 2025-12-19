import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "../css/mypage.css";
import { baseUrl, myAxios } from "../../config";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { UserRound } from "lucide-react";

export default function Mypage() {
  const navigate = useNavigate();

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 전문가 <-> 고객 전환
  const expertToggle = () => {
    myAxios(token, setToken)
      .get(`/expertYn?isExpert=${!user.expert}&username=${user.username}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navTitleStyle = {
    display: "flex",
    padding: "10px",
    alignItems: "center",
    gap: "10px",
    color: "#303441",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "18px",
  };
  const navStyle = {
    display: "flex",
    padding: "16px 10px",
    alignItems: "center",
    gap: "10px",
    color: "#303441",
    fontSize: "15px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "18px",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        display: "flex",
        width: "1200px",
        margin: "0 auto",
        padding: "72px 16px",
        alignItems: "flex-start",
        gap: "70px",
      }}
    >
      {/* 좌측 네비게이션 바 */}
      <div
        style={{
          display: "flex",
          minWidth: "180px",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#303441",
            fontSize: "22px",
            fontWeight: "700",
            lineHeight: "18px",
            padding: "0 10px 30px 10px",
            cursor: "pointer",
          }}
          onClick={() => {
            window.scrollTo(0, 0);
            navigate("/zipddak/mypage");
          }}
        >
          마이페이지
        </h1>
        <div
          style={{
            display: "flex",
            padding: "0 10px 24px 10px",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <img
            src={`${baseUrl}/imageView?type=profile&filename=${user.profile}`}
            width="96px"
            height="96px"
            style={{ borderRadius: "999px" }}
          />
          <button
            className="secondary-button"
            style={{ width: "160px", height: "33px" }}
            onClick={() => {
              expertToggle();
              navigate("/expert/mypage");
            }}
          >
            전문가로 전환
          </button>
        </div>
        <nav>
          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>공구 대여</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/tools/my"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              내 공구
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/tools/rentals"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              대여 내역
            </NavLink>
          </div>

          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>전문가 찾기</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/expert/works"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              시공·수리 내역
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/expert/requests/active"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              진행중인 견적 요청
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/expert/requests/history"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              과거 견적 요청
            </NavLink>
          </div>

          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>마켓</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/market/orders"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              주문·배송조회
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/market/returns"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              취소·교환·반품 내역
            </NavLink>
          </div>

          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>내 활동</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/likes"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              관심
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/reviews"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              후기
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/community"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              게시물
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/inquiries"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              1:1문의내역
            </NavLink>
          </div>

          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>내 정보</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/zipddak/mypage/account"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              회원정보수정
            </NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
