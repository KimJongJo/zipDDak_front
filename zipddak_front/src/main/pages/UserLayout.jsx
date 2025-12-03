import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

export default function UserLayout() {
  return (
    <>
      {/* 공통 헤더 */}
      <Header />

      {/* 중첩 라우트가 이곳에 렌더링 */}
      <Outlet />

      {/* 공통 푸터 */}
    </>
  );
}
