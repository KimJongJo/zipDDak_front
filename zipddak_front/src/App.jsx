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

function App() {
  return (
    <Routes>
      {/* 일반사용자 */}
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
      </Route>

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
