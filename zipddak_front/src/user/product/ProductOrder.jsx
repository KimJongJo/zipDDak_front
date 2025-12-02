import "../../css/user-product/ProductOrder.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";

export default function ProductOrder() {
    const storeInfo = {
        storeName: "자재업체이름",
        qothd: "무료배송",
    };

    const [totalPrice, setTotalPrice] = useState(0);

    // 테스트 객체배열
    const [productInfo, setProductInfo] = useState([
        {
            img: "/images/이미지테스트.png",
            productName: "발트 라운드 수납 선반 다용도 주방 거실장",
            size: "120x120x11700mm",
            color: "화이트",
            count: 1,
            price: 456000,
        },
        {
            img: "/images/이미지테스트.png",
            productName: "발트 라운드 수납 선반 다용도 주방 거실장",
            size: "120x120x11700mm",
            color: "블랙",
            count: 2,
            price: 456000,
        },
    ]);

    const [user, setUser] = useState({
        name: "",
        tel: "",
    });

    const [recvUser, setRecvUser] = useState({
        sender: "",
        recvier: "",
        tel: "",
        postCode: "",
        address: "",
        detailAddress: "",
        requestContent: "",
    });

    const changeRecvUserInfo = (e) => {
        setRecvUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // const [productInfo, setProductInfo] = useState([]);

    // 수량 증가
    const increaseCount = (index) => {
        setProductInfo((prev) => {
            const newArr = [...prev];
            newArr[index] = {
                ...newArr[index],
                count: newArr[index].count + 1,
            };
            return newArr;
        });
    };

    // 수량 감소
    const decreaseCount = (index) => {
        setProductInfo((prev) => {
            const newArr = [...prev];
            if (newArr[index].count > 1) {
                newArr[index] = {
                    ...newArr[index],
                    count: newArr[index].count - 1,
                };
            }
            return newArr;
        });
    };

    // 구매 목록에서 상품 삭제
    // -> index 번째 상품을 삭제
    const removeProduct = (index) => {
        setProductInfo((prev) =>
            // prev: 이전 productInfo 배열
            prev.filter(
                (_, i) =>
                    //  _ 의미 : Python에서 배운 것처럼 매개변수는 받지만 쓰지 않는 것을 의미
                    // i: 현재 요소의 index
                    i !== index // 클릭한 index가 아닌 요소만 남긴다
            )
        );
    };

    // 위와 동일하게 채우기 버튼 클릭 이벤트
    const sameInfo = () => {
        setRecvUser({
            recvier: user.name,
            tel: user.tel,
        });
    };

    useEffect(() => {
        let total = 0;
        productInfo.map((product) => {
            total += product.count * product.price;
        });

        setTotalPrice(total);
    }, [productInfo]);

    return (
        <div className="body-div">
            <div className="ProductOrder-main-div">
                <div>
                    <div className="productOrder-body-div">
                        {/* 주문상품 좌측 정보 들 */}
                        <div className="productOrder-left">
                            {/* 주문상품 */}
                            <div>
                                <span className="product-order-check-span">주문 상품</span>
                                {/* 업체이름 div */}
                                <div className="product-order-check-store-div">
                                    <span className="font-15">{storeInfo.storeName}</span>
                                    <span className="font-15">{storeInfo.qothd}</span>
                                </div>
                                {/* 상품 정보 */}
                                {/* 구매 목록 반복문으로 돌림 */}
                                {productInfo.map((product, index) => (
                                    <div className="product-order-check-detail" key={index}>
                                        <div className="product-order-check-img-div">
                                            <img className="product-order-check-img" src={product.img} />
                                        </div>

                                        <div className="product-order-check-buy-info">
                                            <div className="product-order-check-info">
                                                <span className="font-16">{product.productName}</span>
                                                <span className="font-14">
                                                    {product.size} / {product.color}
                                                </span>

                                                {/* 개수 조절 */}
                                                <div className="detail-append-button">
                                                    <button className="count-button-style" onClick={() => decreaseCount(index)}>
                                                        <i className="bi bi-dash-lg append-button-son"></i>
                                                    </button>

                                                    <span className="font-14">{product.count}</span>

                                                    <button className="count-button-style" onClick={() => increaseCount(index)}>
                                                        <i className="bi bi-plus-lg append-button-son"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* 삭제 + 가격 */}
                                            <div className="product-order-check-buy-right">
                                                <button onClick={() => removeProduct(index)} className="count-button-style">
                                                    <i className="bi bi-x-lg detail-x-button"></i>
                                                </button>
                                                <span className="font-14">
                                                    {(product.price * product.count).toLocaleString()}
                                                    <span>원</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 주문자 */}
                            <div>
                                <span className="product-order-check-span">주문자</span>
                                <div>
                                    <table className="product-order-info-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="font-15">이름</span>
                                                </td>
                                                <td>
                                                    <Input className="product-order-check-input font-15" onChange={(e) => setUser({ ...user, name: e.target.value })} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">이메일</span>
                                                </td>
                                                <td>
                                                    <div className="product-order-check-input-email-div">
                                                        <Input className="product-order-check-input font-15" />
                                                        <i className="bi bi-at email-icon"></i>
                                                        <select className="product-order-check-email-select font-15" id="emailDomain" defaultValue="none">
                                                            <option value="none" hidden>
                                                                선택
                                                            </option>
                                                            <option value="gmail.com">gmail.com</option>
                                                            <option value="naver.com">naver.com</option>
                                                            <option value="daum.net">daum.net</option>
                                                            <option value="hotmail.com">hotmail.com</option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">전화번호</span>
                                                </td>
                                                <td>
                                                    <div className="product-order-check-input-tel-div">
                                                        <Input className="product-order-check-input-tel-first font-15" value={"010"} readOnly />
                                                        <Input
                                                            onChange={(e) => setUser({ ...user, tel: e.target.value })}
                                                            maxLength={8}
                                                            className="product-order-check-input-tel-second font-15"
                                                            type="tel"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* 배송지 */}
                            <div>
                                <div className="product-order-check-address-div">
                                    <span className="product-order-check-span">배송지</span>
                                    <button className="product-order-check-address-same-button" onClick={() => sameInfo()}>
                                        위와 동일하게 채우기
                                    </button>
                                </div>
                                <div>
                                    <table className="product-order-check-address-table">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="font-15">배송자명</span>
                                                </td>
                                                <td>
                                                    <Input name="sender" onChange={changeRecvUserInfo} className="product-order-check-input font-15" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">받는사람</span>
                                                </td>
                                                <td>
                                                    <Input name="recvier" onChange={changeRecvUserInfo} value={recvUser.recvier} className="product-order-check-input font-15" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">전화번호</span>
                                                </td>
                                                <td>
                                                    <div className="product-order-check-input-tel-div">
                                                        <Input className="product-order-check-input-tel-first font-15" value={"010"} readOnly />
                                                        <Input
                                                            name="tel"
                                                            onChange={changeRecvUserInfo}
                                                            value={recvUser.tel}
                                                            maxLength={8}
                                                            className="product-order-check-input-tel-second font-15"
                                                            type="tel"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">주소</span>
                                                </td>
                                                <td>
                                                    <div className="product-order-check-input-address-button-div">
                                                        <button className="product-order-check-input-address-button">찾기</button>
                                                        <Input name="postCode" onChange={changeRecvUserInfo} className="product-order-check-input-address-input font-15" />
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Input name="address" onChange={changeRecvUserInfo} className="product-order-check-input-address font-15" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <Input name="detailAddress" onChange={changeRecvUserInfo} placeholder="상세주소를 입력해주세요" className="font-15 height-38" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>
                                                    <div className="product-order-check-input-save-address">
                                                        <input className="test" type="checkbox" id="beforeFormAddress" />
                                                        <label htmlFor="beforeFormAddress">
                                                            <span className="font-15">기본 배송지로 저장</span>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font-15">요청사항</span>
                                                </td>
                                                <td>
                                                    <Input name="requestContent" onChange={changeRecvUserInfo} className="product-order-check-input-address-detail font-15" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 오른쪽 결제 폼 */}
                        <div className="product-order-form-div">
                            <div className="product-order-form-div-top">
                                <div className="product-order-form-div-intop">
                                    <span className="font-16 semibold">결제금액</span>
                                    <div className="product-order-form-second">
                                        <span className="font-15">총 상품 금액</span>
                                        <span className="font-14">{totalPrice.toLocaleString()}원</span>
                                    </div>
                                    <div className="product-order-form-second">
                                        <span className="font-15">배송비</span>
                                        <span className="font-14">0원</span>
                                    </div>
                                    <div className="product-order-form-second">
                                        <span className="font-16 semibold">최종 결제 금액</span>
                                        <span>
                                            <span className="font-22 semibold order-price">{totalPrice.toLocaleString()}</span>원
                                        </span>
                                    </div>
                                </div>
                                {/* 아래 주문 확인 설명 */}
                                <div className="product-order-from-bottom-content">
                                    <span className="font-13 semibold">본인은 만 14세 이상이며, 주문 내용을 확인하였습니다.</span>
                                    <div className="font-11 product-order-from-bottom-content-indiv">
                                        본 사이트는 통신판매중개자로서 상품의 거래 당사자가 아닙니다. 따라서 판매자가 등록한 상품정보 및 거래 과정에서 발생하는 문제에 대해 책임을 지지 않습니다. 단,
                                        이용자는 업체 신고 및 문의하기 기능을 통해 판매자와의 소통이 가능하며, 문제가 발생한 경우 이를 통해 조치를 요청하실 수 있습니다.
                                    </div>
                                </div>
                            </div>
                            <button className="product-order-from-bottom-button font-16 semibold">{totalPrice.toLocaleString()}원 결제하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
