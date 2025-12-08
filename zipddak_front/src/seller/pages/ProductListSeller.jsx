//css
import table from "../css/table.module.css";
//js
import usePageTitle from "../js/usePageTitle.jsx";
// library
import { useNavigate } from "react-router-dom"; //페이지 이동
import { FormGroup, Input, Label, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { useState, useEffect, useRef } from "react";
import { myAxios } from "../../config/config.jsx";

export default function ProductList() {
    const pageTitle = usePageTitle("상품 조회 리스트");
    const navigate = useNavigate();

    const [myProductList, setMyProductList] = useState([]);
    const [pageBtn, setPageBtn] = useState([]);
    const [pageInfo, setPageInfo] = useState({});

    //(필터) 셀러가 등록한 상품의 카테고리만 출력
    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({}); //리스트에 매핑할 카테고리Map
    useEffect(() => {
        myAxios()
            // .get(`/seller/product/categories?sellerId=${sellerId}`)
            .get(`/seller/product/categories?sellerId=test`)
            .then((res) => {
                setCategories(res.data); // 필터에 카테고리명 매핑

                // categories를 이용한 categoryMap 생성
                const map = Object.fromEntries(res.data.map((c) => [c.categoryIdx, c.name]));
                setCategoryMap(map);
            })
            .catch((err) => console.error(err));
    }, []);

    // 필터 상태값
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [keyword, setKeyword] = useState("");

    // (필터) 카테고리 선택
    const onChangeCategory = (e) => {
        const value = e.target.value;
        if (value === "all") {
            // 전체 체크 시 선택 초기화
            setSelectedCategory([]);
            return;
        }
        if (e.target.checked) {
            setSelectedCategory((prev) => [...prev, Number(value)]);
        } else {
            setSelectedCategory((prev) => prev.filter((v) => v !== Number(value)));
        }
    };

    // 검색/페이징 공통 함수
    const submit = (page = 1) => {
        const productListUrl = `/seller/product/myProductList` + `?sellerId=test` + `&page=${page}` + `&category=${selectedCategory.join(",")}` + `&keyword=${keyword}`;

        myAxios()
            .get(productListUrl)
            .then((res) => {
                const data = res.data;

                setMyProductList(data.myproductsList);

                const pageData = {
                    curPage: data.curPage,
                    allPage: data.allPage,
                    startPage: data.startPage,
                    endPage: data.endPage,
                };
                setPageInfo(pageData);

                const btns = [];
                for (let i = pageData.startPage; i <= pageData.endPage; i++) {
                    btns.push(i);
                }
                setPageBtn(btns);
            })
            .catch((err) => console.log(err));
    };

    // 최초 1회 로딩
    useEffect(() => {
        submit(1);
    }, []);

    // 필터 변경 시 자동 submit
    useEffect(() => {
        submit(1);
    }, [selectedCategory]);

    return (
        <>
            {/* 페이지 탭 타이틀 */}
            {pageTitle}

            <main className="main">
                <div className="mainFrame listFrame">
                    <div className="headerFrame">
                        <i className="bi bi-box2"></i>
                        <span>상품 조회</span>
                    </div>

                    <div className="bodyFrame">
                        <div className={table.tableFrame}>
                            {/* 필터영역 */}
                            <div className={table.filterArea}>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>판매 상태</div>
                                    <div className={table.filterBody}>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                전체
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                판매중
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                비공개
                                            </Label>
                                        </FormGroup>
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" />
                                                품절
                                            </Label>
                                        </FormGroup>
                                    </div>
                                </div>
                                <div className={table.filterColumn}>
                                    <div className={table.filterTitle}>카테고리</div>
                                    <div className={table.filterBody}>
                                        {/* 전체 체크박스 */}
                                        <FormGroup check inline>
                                            <Label check>
                                                <Input type="checkbox" value="all" />
                                                전체
                                            </Label>
                                        </FormGroup>

                                        {/* DB에서 받아온 카테고리만 렌더링 */}
                                        {categories.map((c) => (
                                            <FormGroup check inline key={c.categoryIdx}>
                                                <Label check>
                                                    <Input type="checkbox" value={c.categoryIdx} onChange={onChangeCategory} />
                                                    {c.name}
                                                </Label>
                                            </FormGroup>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* 테이블 영역 */}
                            <div className={table.tableArea}>
                                <div>
                                    <div className={table.tableHeader}>
                                        <div className={table.totalSearchBox}>
                                            <Input id="exampleSearch" name="search" placeholder="통합검색" type="search" className={table.searchInput} onChange={(e) => setKeyword(e.target.value)} />
                                            <button type="button" className="small-button" onClick={() => submit(1)}>
                                                검색
                                            </button>
                                        </div>
                                        <div className="btn_part">
                                            <button type="button" className="primary-button" onClick={() => navigate("/seller/productRegist")}>
                                                <i className="bi bi-plus-square"></i> 상품 등록
                                            </button>
                                        </div>
                                    </div>
                                    <div className={table.tableBody}>
                                        <table className={table.list_table}>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "5%" }}>Img</th>
                                                    <th style={{ width: "35%" }}>상품명</th>
                                                    <th style={{ width: "10%" }}>카테고리</th>
                                                    <th style={{ width: "10%" }}>판매가</th>
                                                    <th style={{ width: "10%" }}>리뷰수</th>
                                                    <th style={{ width: "10%" }}>리뷰평점</th>
                                                    <th style={{ width: "10%" }}>판매상태</th>
                                                    <th style={{ width: "10%" }}>등록일</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {myProductList.map((myProduct) => (
                                                    <tr key={myProduct.productIdx} onClick={() => navigate(`/productDetail/${myProduct.productIdx}`)}>
                                                        <td style={{ padding: "0" }}>
                                                            <img src="/no_img.svg" style={{ width: "100%" }} />
                                                        </td>
                                                        <td className={table.title_cell}> {myProduct.name}</td>
                                                        <td>{categoryMap[myProduct.categoryIdx] || "-"}</td>
                                                        <td>{myProduct.price}</td>
                                                        <td>리뷰수</td>
                                                        <td>리뷰평점</td>
                                                        <td>{myProduct.visibleYn ? "판매중" : "비공개"}</td>
                                                        <td>{myProduct.createdAt}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="pagination_part">
                                    <Pagination className={table.pagination}>
                                        <PaginationItem>
                                            <PaginationLink previous onClick={() => submit(pageInfo.curPage - 1)} />
                                        </PaginationItem>
                                        {pageBtn.map((p) => (
                                            <PaginationItem key={p} active={pageInfo.curPage == p}>
                                                <PaginationLink onClick={() => submit(p)}>{p}</PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationLink next onClick={() => submit(pageInfo.curPage + 1)} />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
