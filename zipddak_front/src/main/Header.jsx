import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './css/Header.css'
import '../css/common.css'

import { ChevronDown, Rocket, CircleUserRound, MessageCircleMore, Bell, ShoppingCart, Archive } from 'lucide-react'

export  function Header1() {

    return (
        <>
            <div className="Userheader">
                <a href=""><div className="logo"></div></a>
                <div className="userBox">

                    {
                    <div className="estimate">
                        <Archive size={20}/>
                        <span className="te">받은견적</span>
                    </div>
                    }
                    {/* <div className="estimate">
                        <Archive size={20}/>
                        <span className="te">받은요청</span>
                    </div> */}

                     {/* <div className="membership">
                        <Rocket size={20} strokeWidth={1.5}/>
                        <span className="te">멤버십</span>
                    </div> */}
                    
                    <div className="icon">
                         <Rocket size={20} />
                    </div>

                    {/* <div className="icon">
                        <ShoppingCart size={20}/>
                    </div> */}

                    <div className="icon">
                        <MessageCircleMore size={20}/>
                    </div>

                    <div className="icon">
                        <Bell size={20} />
                    </div>
                    
                    {/* <div className="loginSign">
                        <CircleUserRound size={20}/>
                        <span className="te">로그인/회원가입</span>
                    </div> */}

                    <div className="profile">
                        <div className="profile-img"></div>
                        <ChevronDown size={20} />
                    </div>

                </div>
            </div>

             <div className="navigation">
            <div className="navitem active">홈</div>
            <div className="navitem">견적요청</div>
            <div className="navitem">전문가찾기</div>
            <div className="navitem">공구대여</div>
            <div className="navitem">자재마켓</div>
            <div className="navitem">자재 100</div>
            <div className="navitem">커뮤니티</div>
            </div>

        </>
    )
}

export  function Header2() {

    return (
        <>
            <div className="Userheader">
                <a href=""><div className="logo"></div></a>
                <div className="userBox">

                    {
                    <div className="estimate">
                        <i className="bi bi-archive Headericon"></i>
                        <span className="estimate-t">받은견적</span>
                    </div>
                    }

                    <div className="membership">
                        <i className="bi bi-rocket-takeoff Headericon"></i>
                        <span className="membership-t">멤버십</span>
                    </div>

                    {/* <div className="cart">
                        <i className="bi bi-cart Headericon"></i>
                    </div> */}
                    <div className="chat">
                        <i className="bi bi-chat-dots Headericon"></i>
                    </div>
                    <div className="alarm">
                        <i className="bi bi-bell Headericon"></i>
                    </div>
                    
                    {/* <div className="loginSign">
                        <i className="bi bi-person Headericon"></i> 
                        <span className="login-t">로그인/회원가입</span>
                    </div> */}

                    <div className="profile">
                        <div className="profile-img"></div>
                        <ChevronDown size={20}/>
                    </div>

                </div>
            </div>

            <div className="navigation">
            <div className="navitem">홈</div>
            <div className="navitem">견적요청</div>
            <div className="navitem">전문가찾기</div>
            <div className="navitem">공구대여</div>
            <div className="navitem">자재마켓</div>
            <div className="navitem">자재 100</div>
            <div className="navitem">커뮤니티</div>

            </div>
        </>
    )
}
