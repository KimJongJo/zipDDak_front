import { Input } from "reactstrap";
import { useState } from "react";
import "../../css/user-product/ProductList.css";
import Product from "./Product";

export default function ProductList() {
    const [pCateNo, setpCateNo] = useState(1);
    const [middleCateNo, setMiddleCateNo] = useState(1);
    const [filterNo, setFilterNo] = useState(1);

    // 주방 중분류
    const cate1Arr = [
        { middleCateNo: 1, name: "전체" },
        { middleCateNo: 2, name: "싱크볼" },
        { middleCateNo: 3, name: "후드" },
        { middleCateNo: 4, name: "주방수전" },
        { middleCateNo: 5, name: "주방상하부장" },
    ];

    // 욕실 중분류
    const cate2Arr = [
        { middleCateNo: 1, name: "전체" },
        { middleCateNo: 2, name: "욕실수전" },
        { middleCateNo: 3, name: "세면대" },
        { middleCateNo: 4, name: "양변기" },
        { middleCateNo: 5, name: "욕실상하부장" },
        { middleCateNo: 6, name: "파티션&샤워부스" },
        { middleCateNo: 7, name: "환풍기" },
        { middleCateNo: 8, name: "욕실기기&부자재" },
    ];

    const dataMap = {
        1: cate1Arr,
        2: cate2Arr,
    };

    // 정렬 필터
    const filter = [
        { filterNo: 1, name: "인기순" },
        { filterNo: 2, name: "최신순" },
        { filterNo: 3, name: "낮은가격순" },
        { filterNo: 4, name: "높은가격순" },
    ];

    // 불러올 상품 개수 -> 나중에 수정
    const total = 16;

    return (
        <div className="body-div">
            <div className="productList-main-div">
                {/* 검색바 */}
                <div className="search-bar">
                    <Input className="search-input" placeholder="검색어를 입력해주세요" />
                    <button className="search-btn">
                        <i className="bi bi-search"></i>
                    </button>
                </div>

                {/* 상품 카테고리 */}
                <div className="cate-list">
                    <button
                        className="p-cate-btn"
                        onClick={() => {
                            setpCateNo(1);
                            setMiddleCateNo(1);
                        }}
                    >
                        <img className="p-cate-img" src="/images/주방.jpg" />
                        <span className="p-cate-span">주방</span>
                    </button>

                    <button
                        className="p-cate-btn"
                        onClick={() => {
                            setpCateNo(2), setMiddleCateNo(1);
                        }}
                    >
                        <img className="p-cate-img" src="/images/욕실.jpg" />
                        <span className="p-cate-span">욕실</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(3)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">중문/도어</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(4)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">폴딩도어</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(5)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">벽지/장판/마루</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(6)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">타일</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(7)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">시트/필름</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(8)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">스위치/콘센트</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(9)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">커튼블라인드</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(10)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">페인트</span>
                    </button>

                    <button className="p-cate-btn" onClick={() => setpCateNo(11)}>
                        <img className="p-cate-img" src="/images/이미지테스트.png" />
                        <span className="p-cate-span">조명</span>
                    </button>
                </div>

                {/* 추가 카테고리, 정렬 필터 */}
                <div className="cate-filter">
                    {/* 주방, 욕실인 경우에만 보이는 중분류 */}
                    <div>
                        {dataMap[pCateNo]?.map((cate) => (
                            <button className={middleCateNo === cate.middleCateNo ? "click-middle-cate" : "middle-cate"} key={cate.middleCateNo} onClick={() => setMiddleCateNo(cate.middleCateNo)}>
                                {cate.name}
                            </button>
                        ))}
                    </div>
                    <div className="filter-div">
                        {filter.map((fil) => (
                            <button key={fil.filterNo} onClick={() => setFilterNo(fil.filterNo)} className={filterNo === fil.filterNo ? "product-click-filter" : "product-filter"}>
                                {fil.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 상품 리스트 */}
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: "38px", // 위아래 간격
                        columnGap: "46.66px", // 좌우 간격 계산
                        width: "1200px",
                        justifyContent: "flex-start", // 좌측 정렬
                        boxSizing: "border-box",
                    }}
                >
                    {[...Array(total)].map((_, idx) => (
                        <div
                            key={idx}
                            style={{
                                flex: "0 0 265px", // 고정 너비
                                boxSizing: "border-box",
                            }}
                        >
                            <Product />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
