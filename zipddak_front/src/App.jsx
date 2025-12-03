import { Route, Routes } from "react-router-dom";
import Mypage from "./user/myPage/Mypage";
import Account from "./user/myPage/Account";
import Inquiries from "./user/myPage/Inquiries";
import InquiryForm from "./user/myPage/InquiryForm";
import Community from "./user/myPage/Community";
import Likes from "./user/myPage/Likes";
import Reviews from "./user/myPage/Reviews";
import MarketOrders from "./user/myPage/MarketOrders";
import MarketOrderDetail from "./user/myPage/MarketOrderDetail";
import MarketReturns from "./user/myPage/MarketReturns";
import MarketReturnForm from "./user/myPage/MarketReturnForm";
import MarketExchangeForm from "./user/myPage/MarketExchangeForm";
import MyWorks from "./user/myPage/MyWorks";
import { Mypage as ExpertMypage } from "./expert/pages/Mypage";
import { Inquiries as ExpertInquiries } from "./expert/pages/Inquiries";
import { InquiryForm as ExpertInquiryForm } from "./expert/pages/InquiryForm";
import { Community as ExpertCommunity } from "./expert/pages/Community";
import { Account as ExpertAccount } from "./expert/pages/Account";
import { Settlement } from "./expert/pages/Settlement";
import { Membership } from "./expert/pages/Membership";
import ProfileForm from "./expert/pages/ProfileForm";
import PublicRequest from "./expert/pages/PublicRequest";
import { MyWorks as ExpertMyWorks } from "./expert/pages/MyWorks";
import Requests from "./expert/pages/Requests";
import ToolMain from "./user/tool/ToolMain";
import ToolDetail from "./user/tool/ToolDetail";
import RegistTool from "./user/tool/RegistTool";
import ApplyTool from "./user/tool/ApplyTool";
import CommunityList from "./user/community/CommunityList";
import ComForm from "./user/community/CommunityForm";
import Comdetail from "./user/community/CommunityDetail";
import Login from "./user/login/Login";
import SignUser from "./user/login/SignUser";
import SignExpert from "./user/login/SignExpert";
import SignStore1 from "./user/login/SignStore1";
import SignStore2 from "./user/login/SignStore2";
import SignStore3 from "./user/login/SignStore3";
import Main from "./Main/pages/Main";
import MainSearch from "./Main/pages/Main";
import MyTool from "./user/myPage/MyTool";
import ToolBorrow from "./user/myPage/ToolBorrow";
import ToolBorrowDetail from "./user/myPage/ToolBorrowDetail";
import ToolLent from "./user/myPage/ToolLent";
import ToolLentDetail from "./user/myPage/ToolLentDetail";

function App() {
  return (
    <Routes>
      {/* 일반사용자 로그인 */}
      <Route path="login" element={<Login/>}/>
      <Route path="signUp/user" element={<SignUser/>}/>
      <Route path="signUp/expert" element={<SignExpert/>}/>
      <Route path="signUp/store1" element={<SignStore1/>}/>
      <Route path="signUp/store2" element={<SignStore2/>}/>
      <Route path="signUp/store3" element={<SignStore3/>}/>


      {/* 일반사용자 */}
      <Route path="/" element={<Main/>}/>
      <Route path="/search" element={<MainSearch/>}/>
      <Route path="market/return/:orderId" element={<MarketReturnForm />} />

      

      {/* 일반사용자 마이페이지 */}
      <Route path="/user/mypage/*" element={<Mypage />}>
        <Route path="account" element={<Account />} />
        <Route path="expert/works" element={<MyWorks />} />
        <Route path="inquiries" element={<Inquiries />} />
        <Route path="inquiries/wrtie" element={<InquiryForm />} />
        <Route path="community" element={<Community />} />
        <Route path="likes" element={<Likes />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="market/orders" element={<MarketOrders />} />
        <Route path="market/returns" element={<MarketReturns />} />
        <Route path="market/detail/:orderId" element={<MarketOrderDetail />} />
        <Route
          path="market/exchange/:orderId"
          element={<MarketExchangeForm />}
        />
        <Route path="tool" element={<MyTool/>}/>
        <Route path="tool/borrow" element={<ToolBorrow/>}/>
        <Route path="tool/borrow/:rentalId" element={<ToolBorrowDetail/>}/>
        <Route path="tool/lent" element={<ToolLent/>}/>
        <Route path="tool/lent/:rentalId" element={<ToolLentDetail/>}/>
      </Route>

      {/* 일반사용자 공구대여 */}
      <Route path="tool" element={<ToolMain/>}/>
      <Route path="tool/:toolId" element={<ToolDetail/>}/>
      <Route path="tool/regist" element={<RegistTool/>}/>
      <Route path="tool/apply" element={<ApplyTool/>}/>

      {/* 일반사용자 커뮤니티 */}
      <Route path="community" element={<CommunityList/>}/>
      <Route path="community/write" element={<ComForm/>}/>
      <Route path="community/:communityId" element={<Comdetail/>}/>

      {/* 전문가 */}
      <Route path="/expert/profile/edit" element={<ProfileForm />} />
      <Route path="/expert/requests" element={<PublicRequest />} />

      {/* 전문가 마이페이지 */}
      <Route path="/expert/mypage/*" element={<ExpertMypage />}>
        <Route path="works" element={<ExpertMyWorks />} />
        <Route path="requests" element={<Requests />} />
        <Route path="inquiries" element={<ExpertInquiries />} />
        <Route path="inquiries/wrtie" element={<ExpertInquiryForm />} />
        <Route path="community" element={<ExpertCommunity />} />
        <Route path="account" element={<ExpertAccount />} />
        <Route path="settlement" element={<Settlement />} />
        <Route path="membership" element={<Membership />} />
      </Route>
    </Routes>
  );
}

export default App;
