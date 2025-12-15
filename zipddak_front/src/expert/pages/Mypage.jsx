import { Outlet, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import "../../user/css/mypage.css";

export function Mypage() {
  const navigate = useNavigate();

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
            navigate("/expert/mypage");
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
            src="/Icon.svg"
            width="96px"
            height="96px"
            style={{ borderRadius: "12px" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button
                className="secondary-button"
                style={{
                  width: "fit-content",
                  height: "33px",
                  fontSize: "12px",
                }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/expert/profile/edit");
                }}
              >
                프로필 수정
              </button>
              <button
                className="secondary-button"
                style={{
                  width: "fit-content",
                  height: "33px",
                  fontSize: "12px",
                }}
                // onClick={() => {
                //   window.scrollTo(0, 0);
                //   navigate(`/expert/mypage/profile/${user.username}`);
                // }}
              >
                미리보기
              </button>
            </div>
            <button
              className="secondary-button"
              style={{
                width: "100%",
                height: "33px",
                fontSize: "12px",
                backgroundColor: "#293341",
                color: "#fff",
              }}
            >
              일반 사용자로 전환
            </button>
          </div>
        </div>
        <nav>
          <div style={{ padding: " 10px 0 14px 0" }}>
            <p style={navTitleStyle}>전문가 활동</p>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/works"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              작업내역
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/receive/requests"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              받은 요청서
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/sent/estimates"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              보낸 견적서
            </NavLink>
          </div>

          <div style={{ padding: " 10px 0 14px 0" }}>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/settlement"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              매출정산 관리
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/membership"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              내 멤버십
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/community"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              내 게시글
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/inquiries"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              1:1 문의내역
            </NavLink>
            <NavLink
              onClick={() => window.scrollTo(0, 0)}
              to="/expert/mypage/account"
              style={({ isActive }) => ({
                ...navStyle,
                backgroundColor: isActive
                  ? "rgba(179, 235, 255, 0.30)"
                  : "white",
              })}
            >
              정산계좌 관리
            </NavLink>
          </div>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
