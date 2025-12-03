import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../css/Header.css";
import "../../css/common.css";

import {
  ChevronDown,
  Rocket,
  CircleUserRound,
  MessageCircleMore,
  Bell,
  ShoppingCart,
  Archive,
} from "lucide-react";

export default function Header() {
  return (
    <>
      <div className="Userheader">
        <a href="/zipddak/main">
          <div className="logo"></div>
        </a>
        <div className="userBox">
          {
            <>
              <a href="" className="estimate">
                <Archive size={20} />
                <span className="te">받은견적</span>
              </a>

              <a href="" className="estimate">
                <Archive size={20} />
                <span className="te">받은요청</span>
              </a>
            </>
          }

          {
            <>
              {/* <div className="membership">
                        <Rocket size={20} strokeWidth={1.5}/>
                        <span className="te">멤버십</span>
                    </div> */}

              <a href="" className="icon">
                <Rocket size={20} />
              </a>

              <a href="/zipddak/cart" className="icon">
                <ShoppingCart size={20} />
              </a>
            </>
          }

          <a href="" className="icon">
            <MessageCircleMore size={20} />
          </a>

          <a href="" className="icon">
            <Bell size={20} />
          </a>

          <a href="login" className="loginSign">
            <CircleUserRound size={20} />
            <span className="te">로그인/회원가입</span>
          </a>

          <a href="mypage/*" className="profile">
            <div className="profile-img"></div>
            <ChevronDown size={20} />
          </a>
        </div>
      </div>

      <div className="navigation">
        <a href="/zipddak/main" className="navitem active">
          홈
        </a>
        <a href="/zipddak" className="navitem">
          견적요청
        </a>
        <a href="/zipddak/experts" className="navitem">
          전문가찾기
        </a>
        <a href="/zipddak/tool" className="navitem">
          공구대여
        </a>
        <a href="/zipddak/productList" className="navitem">
          자재마켓
        </a>
        <a href="/zipddak/best" className="navitem">
          자재 100
        </a>
        <a href="/zipddak/community" className="navitem">
          커뮤니티
        </a>
      </div>
    </>
  );
}
