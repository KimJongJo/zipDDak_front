import { Route, Routes } from "react-router-dom";
import Mypage from "./user/Mypage";
import Account from "./user/Account";
import Inquiries from "./user/Inquiries";
import InquiryForm from "./user/InquiryForm";
import Community from "./user/Community";
import Likes from "./user/Likes";
import Reviews from "./user/Reviews";
import MarketOrders from "./user/MarketOrders";
import MarketOrderDetail from "./user/MarketOrderDetail";
import MarketReturns from "./user/MarketReturns";
import MarketReturnForm from "./user/MarketReturnForm";
import MarketExchangeForm from "./user/MarketExchangeForm";
import MyWorks from "./user/MyWorks";
import { Mypage as ExpertMypage } from "./expert/Mypage";
import { Inquiries as ExpertInquiries } from "./expert/Inquiries";
import { InquiryForm as ExpertInquiryForm } from "./expert/InquiryForm";
import { Community as ExpertCommunity } from "./expert/Community";
import { Account as ExpertAccount } from "./expert/Account";
import { Settlement } from "./expert/Settlement";
import { Membership } from "./expert/Membership";
import ProfileForm from "./expert/ProfileForm";
import PublicRequest from "./expert/PublicRequest";
import { MyWorks as ExpertMyWorks } from "./expert/MyWorks";
import Requests from "./expert/Requests";

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
