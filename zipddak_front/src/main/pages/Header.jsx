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
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { useState } from "react";
import { useAtom, useSetAtom } from "jotai/react";
import { initUser, tokenAtom, userAtom } from "../../atoms";
import PropTypes from "prop-type";

export default function Header({ direction, ...args }) {

  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  // const [viewAlarm, setviewAlarm] = useState(false);
  // const setAlarms = useSetAtom(alarmsAtom);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const logout = () => {
    setUser(initUser)
    setToken(null);
    useSetAtom([]);
  }

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

          <a href="/zipddak/login" className="loginSign">
            <CircleUserRound size={20} />
            <span className="te">로그인/회원가입</span>
          </a>

          <a href="mypage/*" className="profile"></a>
            
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className="profileDropDown">
            <div className="profile-img"></div>
            <ChevronDown size={20} />
            <DropdownToggle caret>Dropdown</DropdownToggle>
              <DropdownMenu {...args}>
                <DropdownItem header>내 계정</DropdownItem>
                <DropdownItem>프로필 관리</DropdownItem>
                <DropdownItem>마이페이지</DropdownItem>
                <DropdownItem divider />
                {}
                <DropdownItem>고객전환</DropdownItem>
                <DropdownItem>전문가 전환</DropdownItem>
                <DropdownItem>로그아웃</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          
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
