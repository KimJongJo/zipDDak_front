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
import Main from "./main/pages/Main.jsx";
import MainSearch from "./main/pages/Main.jsx";
import MyTool from "./user/myPage/MyTool";
import ToolBorrowDetail from "./user/myPage/ToolBorrowDetail";
import ToolLent from "./user/myPage/ToolLent";
import ToolLentDetail from "./user/myPage/ToolLentDetail";
import ProductList from "./user/product/ProductList";
import ProductDetail from "./user/product/ProductDetail";
import ProductOrder from "./user/product/ProductOrder";
import ProductOrderComplate from "./user/product/ProductOrderComplate";
import StoreInfo from "./user/product/StoreInfo";
import Cart from "./user/product/Cart";
import Experts from "./user/expert/Experts";
import ExpertProfile from "./user/expert/ExpertProfile";
import ExpertMatchPayment from "./user/expert/ExpertMatchPayment";
import FindExpert from "./user/expert/FindExpert";
import AdminUserList from "./admin/pages/AdminUserList";
import AdminExpertList from "./admin/pages/AdminExpertList";
import AdminStoreList from "./admin/pages/AdminStoreList";
import AdminUserDetail from "./admin/pages/AdminUserDetail";
import AdminExpertDetail from "./admin/pages/AdminExpertDetail";
import AdminStoreDetail from "./admin/pages/AdminStoreDetail";
import AdminSwitchAccountRequests from "./admin/pages/AdminSwitchAccountRequests";
import AdminRentalRecords from "./admin/pages/AdminRentalRecords";
import AdminRentalDetail from "./admin/pages/AdminRentalDetail";
import AdminSalesHistory from "./admin/pages/AdminSalesHistory";
import AdminSalesDetail from "./admin/pages/AdminSalesDetail";
import AdminReportList from "./admin/pages/AdminReportList";
import AdminReportDetail from "./admin/pages/AdminReportDetail";
import AdminMatchingDetail from "./admin/pages/AdminMatchingDetail";
import PaymentHistory from "./admin/pages/PaymentHistory";
import AdminPaymentDetail from "./admin/pages/AdminPaymentDetail";
import AdminMembership from "./admin/pages/AdminMembership";
import AdminSettlementList from "./admin/pages/AdminSettlementList";
import InquiryList from "./admin/pages/InquiryList";
import InquiryReturn from "./admin/pages/InquiryReturn";
import Dashboard from "./admin/pages/Dashboard";
import UserLayout from "./main/pages/UserLayout.jsx";
import ExpertLayout from "./expert/pages/ExpertLayout";
import Best from "./main/pages/Best.jsx";

// 자재판매자
import SellerLayout from "./seller/pages/SellerLayout";
import SellerHome from "./seller/pages/MainHome";
import ProductRegist from "./seller/pages/ProductRegist";
import SellerPdList from "./seller/pages/ProductListSeller";
import OrderList from "./seller/pages/OrderList";
import ShippingList from "./seller/pages/ShippingList";
import ReturnList from "./seller/pages/ReturnList";
import ExchangeList from "./seller/pages/ExchangeList";
import SalesStatistics from "./seller/pages/SalesStatistics";
import SettleList from "./seller/pages/SettleList";
import InquireProduct from "./seller/pages/InquireProduct.jsx";
import InquireGeneral from "./seller/pages/InquireGeneral.jsx";
import MyProfile from "./seller/pages/MyProfile.jsx";
import MyInfo from "./seller/pages/MyInfo.jsx";
import AskToManager from "./seller/pages/AskToManager.jsx";
import ProductModify from "./seller/pages/ProductModify.jsx";
//자재판매자 임시링크
import OrderDetail from "./seller/pages/OrderDetail.jsx";
import ShippingDetail from "./seller/pages/ShippingDetail.jsx";
import ReturnDetail from "./seller/pages/ReturnDetail.jsx";
import ExchangeDetail from "./seller/pages/ExchangeDetail.jsx";
import SettleDetail from "./seller/pages/SettleDetail.jsx";

import Token from "./Token.jsx";
import SellerPdDetail from "./seller/pages/ProductDetail.jsx";

function App() {
    return (
        <Routes>
            <Route path="/auth/token" element={<Token />} />
            <Route path="/zipddak/*" element={<UserLayout />}>
                {/* 일반사용자 로그인 */}
                <Route path="login" element={<Login />} />
                <Route path="signUp/user" element={<SignUser />} />
                <Route path="signUp/expert" element={<SignExpert />} />
                <Route path="signUp/store1" element={<SignStore1 />} />
                <Route path="signUp/store2" element={<SignStore2 />} />
                <Route path="signUp/store3" element={<SignStore3 />} />

                {/* 일반사용자 메인 */}
                <Route path="main" element={<Main />} />
                <Route path="search" element={<MainSearch />} />
                <Route path="best" element={<Best />} />
                <Route path="market/return/:orderId" element={<MarketReturnForm />} />

                {/* 일반사용자 공구대여 */}
                <Route path="tool" element={<ToolMain />} />
                <Route path="tool/:toolId" element={<ToolDetail />} />
                <Route path="tool/regist" element={<RegistTool />} />
                <Route path="tool/apply" element={<ApplyTool />} />

                {/* 일반사용자 커뮤니티 */}
                <Route path="community" element={<CommunityList />} />
                <Route path="community/write" element={<ComForm />} />
                <Route path="community/:communityId" element={<Comdetail />} />

                {/* 일반사용자 자재구매 */}
                <Route path="productList" element={<ProductList />} />
                <Route path="product/:productId" element={<ProductDetail />} />
                <Route path="productOrder" element={<ProductOrder />} />
                <Route path="productOrderComplate" element={<ProductOrderComplate />} />
                <Route path="storeInfo" element={<StoreInfo />} />

                {/* 일반사용자 장바구니 */}
                <Route path="cart" element={<Cart />} />

                {/* 일반사용자 전문가찾기 */}
                <Route path="experts" element={<Experts />} />
                <Route path="expertProfile:/username" element={<ExpertProfile />} />
                <Route path="expertMatchPayment" element={<ExpertMatchPayment />} />
                <Route path="findExpert" element={<FindExpert />} />

                {/* 일반사용자 마이페이지 */}
                <Route path="mypage/*" element={<Mypage />}>
                    <Route path="account" element={<Account />} />
                    <Route path="expert/works" element={<MyWorks />} />
                    <Route path="inquiries" element={<Inquiries />} />
                    <Route path="inquiries/write" element={<InquiryForm />} />
                    <Route path="community" element={<Community />} />
                    <Route path="likes" element={<Likes />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="market/orders" element={<MarketOrders />} />
                    <Route path="market/returns" element={<MarketReturns />} />
                    <Route path="market/detail/:orderIdx" element={<MarketOrderDetail />} />
                    <Route path="market/exchange/:orderIdx" element={<MarketExchangeForm />} />
                    <Route path="tool" element={<MyTool />} />
                    <Route path="tool/borrow/:rentalId" element={<ToolBorrowDetail />} />
                    <Route path="tool/lent" element={<ToolLent />} />
                    <Route path="tool/lent/:rentalId" element={<ToolLentDetail />} />
                </Route>
            </Route>

            {/* 전문가 */}
            <Route path="/expert/*" element={<ExpertLayout />}>
                <Route path="profile/edit" element={<ProfileForm />} />
                <Route path="requests" element={<PublicRequest />} />

                {/* 전문가 마이페이지 */}
                <Route path="mypage/*" element={<ExpertMypage />}>
                    <Route path="works" element={<ExpertMyWorks />} />
                    <Route path="requests" element={<Requests />} />
                    <Route path="inquiries" element={<ExpertInquiries />} />
                    <Route path="inquiries/write" element={<ExpertInquiryForm />} />
                    <Route path="community" element={<ExpertCommunity />} />
                    <Route path="account" element={<ExpertAccount />} />
                    <Route path="settlement" element={<Settlement />} />
                    <Route path="membership" element={<Membership />} />
                </Route>
            </Route>

            {/* 자재판매자  */}
            <Route path="seller/*" element={<SellerLayout />}>
                <Route path="mainhome" element={<SellerHome />} />
                <Route path="productRegist" element={<ProductRegist />} />
                <Route path="productList" element={<SellerPdList />} />
                <Route path="orderList" element={<OrderList />} />
                <Route path="shippingList" element={<ShippingList />} />
                <Route path="returnList" element={<ReturnList />} />
                <Route path="exchangeList" element={<ExchangeList />} />

                <Route path="salesStatistics" element={<SalesStatistics />} />
                <Route path="settleList" element={<SettleList />} />
                <Route path="pdInquireList" element={<InquireProduct />} />
                <Route path="gnrInquireList" element={<InquireGeneral />} />

                <Route path="myProfile" element={<MyProfile />} />
                <Route path="myInfo" element={<MyInfo />} />

                <Route path="ask" element={<AskToManager />} />
                <Route path="productModify/:productIdx" element={<ProductModify />} />

                <Route path="orderDetail" element={<OrderDetail />} />
                <Route path="shippingDetail" element={<ShippingDetail />} />
                <Route path="returnDetail" element={<ReturnDetail />} />
                <Route path="exchangeDetail" element={<ExchangeDetail />} />
                <Route path="settleDetail" element={<SettleDetail />} />
            </Route>

            {/* 사이트 관리자 */}
            <Route path="admin/*">
                <Route path="userList" element={<AdminUserList />} />
                <Route path="expertList" element={<AdminExpertList />} />
                <Route path="storeList" element={<AdminStoreList />} />
                <Route path="userList/:username" element={<AdminUserDetail />} />
                <Route path="userList/:username" element={<AdminExpertDetail />} />
                <Route path="userList:/storeId" element={<AdminStoreDetail />} />
                <Route path="switchRequest" element={<AdminSwitchAccountRequests />} />

                <Route path="rentalList" element={<AdminRentalRecords />} />
                <Route path="rentalList/:rentalId" element={<AdminRentalDetail />} />
                <Route path="salesList" element={<AdminSalesHistory />} />
                <Route path="salesList/:saleId" element={<AdminSalesDetail />} />
                <Route path="matching/:matchingId" element={<AdminMatchingDetail />} />
                <Route path="reports" element={<AdminReportList />} />
                <Route path="reports/:reportId" element={<AdminReportDetail />} />
                <Route path="payments" element={<PaymentHistory />} />
                <Route path="payments/:paymentId" element={<AdminPaymentDetail />} />
                <Route path="membership" element={<AdminMembership />} />

                <Route path="settlementList" element={<AdminSettlementList />} />

                <Route path="inquiryList" element={<InquiryList />} />
                <Route path="inquiryList:/inquiryId" element={<InquiryReturn />} />

                <Route path="dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}

export default App;
