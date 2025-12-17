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
  UserRound,
} from "lucide-react";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ListGroupItem,
} from "reactstrap";
import { useState } from "react";
import { useAtom } from "jotai/react";
import { alarmsAtom, initUser, tokenAtom, userAtom } from "../../atoms";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { baseUrl, myAxios } from "../../config";

export default function Header({ direction, ...args }) {
  const [user, setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);
  const [alarms, setAlarms] = useAtom(alarmsAtom);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [alarmOpen, setAlarmOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const navigate = useNavigate();

  const logout = () => {
    setUser(initUser);
    setToken(null);
    setAlarms([]);
    navigate("/zipddak/login");
  };

  const [modal, setModal] = useState();

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

  const goToExpertmodal = () => {
    setModal(false);
    navigate("/zipddak/signUp/expert");
  };

  return (
    <>
      <div className="Userheader">
        <>
          <a href="/zipddak/main">
            <div className="logo"></div>
          </a>
          <div className="userBox">
            {user.username ? (
              <>
                {/* 견적요청 or 받은견적 */}
                {user.expert ? (
                  <a href="/zipddak/mypage/requests" className="estimate">
                    <Archive size={20} />
                    <span className="te">받은요청</span>
                  </a>
                ) : (
                  <a href="" className="estimate">
                    <Archive size={20} />
                    <span className="te">받은견적</span>
                  </a>
                )}

                {/* 멤버십 or 장바구니 */}
                {user.expert ? (
                  <a href="/zipddakmypage/membership" className="icon">
                    <Rocket size={20} />
                  </a>
                ) : (
                  <a href="/zipddak/cart" className="icon">
                    <ShoppingCart size={20} />
                  </a>
                )}

                {/* 공통 아이콘 */}
                <a href="" className="icon">
                  <MessageCircleMore size={20} />
                </a>

                {/* 알림 */}
                <Dropdown
                  isOpen={alarmOpen}
                  toggle={() => setAlarmOpen(!alarmOpen)}
                >
                  <DropdownToggle className="alarm-toggle" caret={false}>
                    <Bell size={20} />
                    {alarms.length !== 0 && (
                      <span className="alarm-badge">{alarms.length}</span>
                    )}
                  </DropdownToggle>
                  <DropdownMenu {...args} className="alarm-menu">
                    <DropdownItem header>알림</DropdownItem>

                    {alarms.length === 0 && (
                      <DropdownItem disabled>알림이 없습니다</DropdownItem>
                    )}

                    {alarms.map((alarm) => (
                      <DropdownItem
                        key={alarm.notificationIdx}
                        className="alarm-item"
                      >
                        {alarm.type === "REQUEST" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <img src="/fi-rs-document.svg" />
                            <div>
                              <p className="alarm-title">{alarm.title}</p>
                              <p className="alarm-body">{alarm.content}</p>
                            </div>
                          </div>
                        )}
                        {alarm.type === "ESTIMATE" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <img src="/fi-rs-woman-head.svg" />
                            <div>
                              <p className="alarm-title">{alarm.title}</p>
                              <p className="alarm-body">{alarm.content}</p>
                            </div>
                          </div>
                        )}
                        {alarm.type === "REVIEW" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <img src="/fi-rs-confetti.svg" />
                            <div>
                              <p className="alarm-title">{alarm.title}</p>
                              <p className="alarm-body">{alarm.content}</p>
                            </div>
                          </div>
                        )}
                        {alarm.type === "COMMUNITY" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <img src="/fi-rs-document.svg" />
                            <div>
                              <p className="alarm-title">{alarm.title}</p>
                              <p className="alarm-body">{alarm.content}</p>
                            </div>
                          </div>
                        )}
                        {alarm.type === "RENTAL" && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <img src="/fi-rs-document.svg" />
                            <div>
                              <p className="alarm-title">{alarm.title}</p>
                              <p className="alarm-body">{alarm.content}</p>
                            </div>
                          </div>
                        )}
                        <i
                          class="bi bi-x-lg"
                          o
                          onClick={(e) => {
                            e.stopPropagation();
                            // alarmConfirm(alarm.notificationIdx);
                          }}
                        ></i>
                      </DropdownItem>
                    ))}
                    <DropdownItem divider />
                  </DropdownMenu>
                </Dropdown>

                <a href="mypage/*" className="profile"></a>
                {/* 드롭다운 */}
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  direction={direction}
                  className="profileDropDown"
                >
                  <a href="/zipddak/mypage">
                    <div className="profile-img">
                      {user.profile != null && user.profile != "" ? (
                        <img
                          src={`${baseUrl}/imageView?type=${
                            user.expert ? "EXPERT" : "USER"
                          }&filename=${user.profile}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        <UserRound color="#303441" />
                      )}
                    </div>
                  </a>

                  <DropdownToggle className="myDropDown">
                    <ChevronDown size={20} color="#303441" />
                  </DropdownToggle>
                  <DropdownMenu {...args}>
                    <DropdownItem header className="myDropDown-item">
                      <div className="Header-nickname">
                        <span>{user.nickname}</span>
                        <span className="te">님</span>
                      </div>
                    </DropdownItem>
                    <DropdownItem>
                      <a href="/zipddak/mypage/account">프로필 관리</a>
                    </DropdownItem>

                    <DropdownItem>
                      <a href="/zipddak/mypage">마이페이지</a>
                    </DropdownItem>

                    <DropdownItem divider />
                    {
                      // 1. user.role이 "USER"인 경우
                      user.role === "USER" ? (
                        <DropdownItem onClick={() => setModal(true)}>
                          전문가 가입
                        </DropdownItem>
                      ) : user.expert ? (
                        <DropdownItem onClick={expertToggle}>
                          고객전환
                        </DropdownItem>
                      ) : (
                        <DropdownItem onClick={expertToggle}>
                          전문가전환
                        </DropdownItem>
                      )
                    }

                    <DropdownItem divider />

                    <DropdownItem onClick={logout}>
                      <span className="dropmenu-center">로그아웃</span>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              // 로그인 안 한 경우
              <a href="/zipddak/login" className="loginSign">
                <CircleUserRound size={20} />
                <span className="te">로그인/회원가입</span>
              </a>
            )}
          </div>
        </>
      </div>

      <div className="navigation">
        <a href="/zipddak/main" className="navitem active">
          홈
        </a>
        <a href="/zipddak/findExpert" className="navitem">
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
        <a href="/zipddak/main/best" className="navitem">
          자재 100
        </a>
        <a href="/zipddak/community" className="navitem">
          커뮤니티
        </a>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader>전문가 가입</ModalHeader>
        <ModalBody>
          <div>전문가 회원가입을 진행하시겠습니까?</div>
          <div className="space-px"> </div>
          <div>사업자등록증이 요구되며, 승인까지 최대 일주일이 소요됩니다.</div>
        </ModalBody>
        <div className="row-cm header-modal-button">
          <Button className="primary-button" onClick={() => setModal(false)}>
            취소
          </Button>
          <Button className="primary-button" onClick={goToExpertmodal}>
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
}
