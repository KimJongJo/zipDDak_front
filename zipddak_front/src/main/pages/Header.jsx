import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../css/Header.css";
import "../../css/common.css";

import { ChevronDown, Rocket, CircleUserRound, MessageCircleMore, Bell, ShoppingCart, Archive, UserRound } from "lucide-react";
import { Dropdown, DropdownItem, DropdownToggle, DropdownMenu, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useAtom, useSetAtom } from "jotai/react";
import { initUser, tokenAtom, userAtom } from "../../atoms";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";
import { baseUrl, myAxios } from "../../config";

export default function Header({ direction, ...args }) {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const [profileImg, setProfileImg] = useState({});
    // const [viewAlarm, setviewAlarm] = useState(false);
    // const setAlarms = useSetAtom(alarmsAtom);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const navigate = useNavigate();

    const logout = () => {
        setUser(initUser);
        setToken(null);
        // useSetAtom([]);
        navigate("/zipddak/main");
    };

    const [modal, setModal] = useState();

    const expertToggle = () => {
        myAxios(token, setToken)
            .post(`/expertYn?username=${user.username}`)
            .then((res) => {
                setUser(res.data);
                setProfileImg({ rename: res.data.profile, type: res.data.role });
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        if (user.expert) {
        } else {
            setModal(true);
            console.log("왜 안돼");
            // navigate("/zipddak/signUp/expert")
        }
    };

    // useEffect(()=> {
    //   setUser({...user, expert:!user.expert})
    // },[user.expert])

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
                                    <a href="" className="estimate">
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
                                    <a href="" className="icon">
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
                                <div className="icon">
                                    <Bell size={20} />
                                </div>
                                <a href="mypage/*" className="profile"></a>

                                {/* 드롭다운 */}
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} className="profileDropDown">
                                    <a href="/zipddak/mypage">
                                        <div className="profile-img">{profileImg.rename ? <img src={`${baseUrl}/imageView?type=${profileImg.type}&filename=${profileImg.rename}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <UserRound color="#303441" />}</div>
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

                                        {user.expert ? (
                                            <DropdownItem className="" onClick={expertToggle}>
                                                고객전환
                                            </DropdownItem>
                                        ) : (
                                            <DropdownItem className="" onClick={expertToggle}>
                                                전문가전환
                                            </DropdownItem>
                                        )}
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
