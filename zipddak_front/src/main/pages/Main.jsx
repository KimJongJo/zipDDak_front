import "../../css/common.css";
import "../css/Main.css";
import { Button } from "reactstrap";
import { Search, CirclePlus, MapPin, ArrowRight, UserStar, Store, MessageSquareHeart } from "lucide-react";
import Expertmain from "../component/Expert";
import Expert from "../../user/expert/Expert";
import { Toolmain } from "../component/Tool";
import { Community } from "../component/Community";
import Product from "../../user/product/Product";
import { useEffect, useState } from "react";
import { myAxios, baseUrl } from "../../config";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { useNavigate } from "react-router";

export default function Main() {
    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    const [product, setProduct] = useState([]);
    const [expert, setExpert] = useState([]);
    const [tool, setTool] = useState([]);
    const [community, setCommunity] = useState([]);

    //공구 주소 자르기
    const userAddressString = user?.addr1 || "";
    const userAdress = userAddressString.split(" ").slice(0, 2).join(" ");

    const navigate = useNavigate();

    //검색
<<<<<<< HEAD
    const [searchKeyword, setSearchKeyword] = useAtom(keywordAtom);
=======
    const [searchKeyword, setSearchKeyword] = useState();
>>>>>>> main

    const mainSearch = (e) => {
        e.preventDefault();

        if (searchKeyword.trim()) {
<<<<<<< HEAD
            navigate(`/zipddak/main/search?keyword=${searchKeyword.trim()}`);
=======
            navigate(`/zipddak/main/search/${searchKeyword.trim()}`);
>>>>>>> main
        } else {
            alert("검색어를 입력해주세요.");
        }
    };

    //전문가 리스트
    const [eCategory, setECategory] = useState();
    const [eActiveCategory, setEActiveCategory] = useState(0);

    const expertCategory = (categoryNo) => {
        setECategory(categoryNo);
        setEActiveCategory(categoryNo);
    };

    const expertList = () => {
        const categoryPharam = eCategory ? eCategory : 0;
        const keywordPharam = "";

        myAxios(token, setToken)
            .get(`/main/expert?keyword=${keywordPharam}&categoryNo=${categoryPharam}`)
            .then((res) => {
                console.log(res.data);
                setExpert(res.data.cards);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        expertList();
    }, [user.username, eCategory]);

    //상품 리스트
    const [pCategory, setPCategory] = useState();
<<<<<<< HEAD
    const [pActiveCategory, setPActiveCategory] = useState(1);
=======
    const [pActiveCategory, setPActiveCategory] = useState(0);
>>>>>>> main

    const productCategory = (categoryNo) => {
        setPCategory(categoryNo);
        setPActiveCategory(categoryNo);
    };

    const productList = () => {
        const usernamePharam = user ? user.username : "";
<<<<<<< HEAD
        const categoryPharam = pCategory ? pCategory : 1;
=======
        const categoryPharam = pCategory ? pCategory : 0;
>>>>>>> main
        const keywordPharam = "";

        let url = `/main/product?keyword=${keywordPharam}&categoryNo=${categoryPharam}`;
        if (usernamePharam) {
            url += `&username=${usernamePharam}`;
        }

        const tokenPharam = token ? token : null;

        myAxios(tokenPharam, setToken)
            .get(url)
            .then((res) => {
                console.log(res.data);
                setProduct(res.data.cards);
<<<<<<< HEAD
=======
                favoriteProduct(res.data.cards.productIdx);
>>>>>>> main
            })
            .catch((err) => {
                console.log(err);
            });
    };

<<<<<<< HEAD
    useEffect(() => {
        productList();
    }, [user.username, pCategory]);

    //공구 리스트
    const [tCategory, setTcategory] = useState();
    const [tActiveCategory, setTActiveCategory] = useState(83);
=======
     // 관심 상품 토글
    const favoriteToggle = async (productIdx) => {
        if (user.username === "") {
            navigate("/zipddak/login");
            return;
        }
        await myAxios(token, setToken).post(`${baseUrl}/user/favoriteToggle`, {
            productIdx,
            username: user.username,
        });

        setProduct(prev =>
    prev.map(t =>
      t.productIdx === productIdx
        ? { ...t, favorite: !t.favorite }
        : t
    )
  );
    };

    useEffect(() => {
        productList();
    }, [ user.username,pCategory]);


    //공구 리스트
    const [tCategory, setTcategory] = useState();
    const [tActiveCategory, setTActiveCategory] = useState(0);
>>>>>>> main

    const toolCategory = (categoryNo) => {
        setTcategory(categoryNo);
        setTActiveCategory(categoryNo);
    };

    const toolList = () => {
        const usernamePharam = user ? user.username : "";
<<<<<<< HEAD
        const categoryPharam = tCategory ? tCategory : 83;
        const keywordPharam = "";

        let url = `/main/tool?keyword=${keywordPharam}&categoryNo=${categoryPharam}&username=${usernamePharam}`;
=======
        const categoryPharam = tCategory ? tCategory : 0;
        const keywordPharam = "";

        let url = `/main/tool?keyword=${keywordPharam}&categoryNo=${categoryPharam}`;
>>>>>>> main
        if (usernamePharam) {
            url += `&username=${usernamePharam}`;
        }

        const tokenPharam = token ? token : null;

        myAxios(tokenPharam, setToken)
            .get(url)
            .then((res) => {
                console.log(res.data);
                setTool(res.data.cards);
<<<<<<< HEAD
=======
                
>>>>>>> main
            })
            .catch((err) => {
                console.log(err);
            });
    };

<<<<<<< HEAD
    useEffect(() => {
        toolList();
    }, [user.username, tCategory]);

    //커뮤니티 리스트
    const [cCategory, setCCategory] = useState(76);
    const [cActiveCategory, setCActiveCategory] = useState(76);
=======
        // 관심 공구 토글
      const toggleFavorite = async (toolIdx) => {
  if (!user.username) {
    navigate("/zipddak/login");
    return;
  }

  await myAxios(token, setToken).post(
    `${baseUrl}/user/favoriteToggle/tool`,
    {
      toolIdx,
      username: user.username,
    }
  );

  setTool(prev =>
    prev.map(t =>
      t.toolIdx === toolIdx
        ? { ...t, favorite: !t.favorite }
        : t
    )
  );
};

   

    useEffect(() => {
        toolList();
        
    }, [user.username, tCategory]);

    //커뮤니티 리스트
    const [cCategory, setCCategory] = useState(0);
    const [cActiveCategory, setCActiveCategory] = useState(0);
>>>>>>> main

    const communityCategory = (categoryNo) => {
        setCCategory(categoryNo);
        setCActiveCategory(categoryNo);
    };

    const communityList = () => {
<<<<<<< HEAD
        const categoryPharam = cCategory ? cCategory : 76;
=======
        const categoryPharam = cCategory ? cCategory : 0;
>>>>>>> main

        const tokenPharam = token ? token : null;

        myAxios(tokenPharam, setToken)
            .get(`/main/community?categoryNo=${categoryPharam}`)
            .then((res) => {
                console.log(res.data);
                setCommunity(res.data.cards);
<<<<<<< HEAD
=======
                
>>>>>>> main
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        communityList();
<<<<<<< HEAD
    }, [cCategory]);
=======
        
    }, [user.username,cCategory]);

>>>>>>> main

    return (
        <>
            <div className="Main-container">
                <form className="search-form" onSubmit={mainSearch}>
                    <div className="search">
                        <input className="search-input" type="text" placeholder="통합검색" onChange={(e) => setSearchKeyword(e.target.value)} />
                    </div>
<<<<<<< HEAD
                    <Button className="primary-button" type="submit">
=======
                    <Button className="primary-button btn-pd" type="submit">
>>>>>>> main
                        <div className="sbutton">
                            <Search size={18} />
                            <span className="btxt">검색</span>
                        </div>
                    </Button>
                </form>

                <div className="main-banner">
                    <div className="banner1"></div>
                    <div className="banner2"></div>
                </div>

                <div className="card-box">
                    <div className="top">
                        <div className="title-box">
<<<<<<< HEAD
                            <div className="title-main-main">추천 전문가</div>
=======
                            <div className="title-main-main">
                                <UserStar />
                                <span>추천 전문가</span>
                            </div>
>>>>>>> main
                            <div className="more" onClick={() => navigate(`/zipddak/experts`)}>
                                <span>전체보기</span>
                                <CirclePlus size={14} />
                            </div>
                        </div>
                        <div className="main-category">
                            <div className={eActiveCategory === 0 ? "category-item active" : "category-item"} onClick={() => expertCategory(0)}>
                                전체
                            </div>

                            <div className={eActiveCategory === 23 ? "category-item active" : "category-item"} onClick={() => expertCategory(23)}>
                                시공/견적 컨설팅
                            </div>

                            <div className={eActiveCategory === 44 ? "category-item active" : "category-item"} onClick={() => expertCategory(44)}>
                                수리
                            </div>

                            <div className={eActiveCategory === 74 ? "category-item active" : "category-item"} onClick={() => expertCategory(74)}>
                                인테리어
                            </div>
                        </div>
                    </div>

                    <div className="expert-cards">
<<<<<<< HEAD
                        {Array.isArray(expert) && expert.map((expertCard) => <Expert key={expertCard.expertIdx} expert={expertCard} toggleFavorite={expertCard.isFavorite} />)}
                        <div className="card-more">
                            <ArrowRight />
                        </div>
=======
                        {Array.isArray(expert) && expert.map((expertCard) => <Expertmain key={expertCard.expertIdx} expert={expertCard} toggleFavorite={expertCard.isFavorite} />)}

>>>>>>> main
                    </div>
                </div>

                <div className="card-box">
                    <div className="top">
                        <div className="title-box">
                            <div className="title-main-main">
<<<<<<< HEAD
                                <MapPin size={24} color="#FF5833" />
=======
                                <MapPin size={24} />
>>>>>>> main
                                <span>{user?.addr1 ? `${userAdress} 공구대여` : "공구대여"}</span>
                                {/* <MapPin size={24} color='#FF5833'/> */}
                            </div>
                            <div className="more" onClick={() => navigate(`/zipddak/tool`)}>
                                <span>전체보기</span>
                                <CirclePlus size={14} />
                            </div>
                        </div>
                        <div className="main-category">
<<<<<<< HEAD
=======
                            <div className={tActiveCategory === 0 ? "category-item active" : "category-item"} onClick={() => toolCategory(0)}>
                                전체
                            </div>

>>>>>>> main
                            <div className={tActiveCategory === 83 ? "category-item active" : "category-item"} onClick={() => toolCategory(83)}>
                                전동공구
                            </div>

                            <div className={tActiveCategory === 84 ? "category-item active" : "category-item"} onClick={() => toolCategory(84)}>
                                일반공구
                            </div>

                            <div className={tActiveCategory === 85 ? "category-item active" : "category-item"} onClick={() => toolCategory(85)}>
                                생활용품
                            </div>

                            <div className={tActiveCategory === 86 ? "category-item active" : "category-item"} onClick={() => toolCategory(86)}>
                                기타공구
                            </div>

                            <div className={tActiveCategory === 87 ? "category-item active" : "category-item"} onClick={() => toolCategory(87)}>
                                찾아요
                            </div>
                        </div>
                    </div>

<<<<<<< HEAD
                    <div className="tool-cards">{Array.isArray(tool) && tool.map((toolCard) => <Toolmain key={toolCard.toolIdx} tool={toolCard} toggleFavorite={toolCard.isFavorite} />)}</div>
=======
                    <div className="tool-cards">{Array.isArray(tool) && tool.map((toolCard) => <Toolmain key={toolCard.toolIdx} tool={toolCard} toggleFavorite={toggleFavorite} />)}</div>
>>>>>>> main
                </div>

                {/* <div className="advertise"></div> */}

                <div className="card-box">
                    <div className="top">
                        <div className="title-box">
                            <div className="title-main-main">
<<<<<<< HEAD
=======
                                <Store />
>>>>>>> main
                                <span>자재 마켓</span>
                            </div>
                            <div className="more" onClick={() => navigate(`/zipddak/productList`)}>
                                <span>전체보기</span>
                                <CirclePlus size={14} />
                            </div>
                        </div>
                        <div className="main-category">
<<<<<<< HEAD
=======
                            <div className={pActiveCategory === 0 ? "category-item active" : "category-item"} onClick={() => productCategory(0)}>
                                전체
                            </div>

>>>>>>> main
                            <div className={pActiveCategory === 1 ? "category-item active" : "category-item"} onClick={() => productCategory(1)}>
                                주방
                            </div>

                            <div className={pActiveCategory === 6 ? "category-item active" : "category-item"} onClick={() => productCategory(6)}>
                                욕실
                            </div>

                            <div className={pActiveCategory === 14 ? "category-item active" : "category-item"} onClick={() => productCategory(14)}>
                                중문/도어
                            </div>

                            <div className={pActiveCategory === 15 ? "category-item active" : "category-item"} onClick={() => productCategory(15)}>
                                창호/폴딩도어
                            </div>

                            <div className={pActiveCategory === 16 ? "category-item active" : "category-item"} onClick={() => productCategory(16)}>
                                벽지/장판/마루
                            </div>

                            <div className={pActiveCategory === 17 ? "category-item active" : "category-item"} onClick={() => productCategory(17)}>
                                타일
                            </div>

                            <div className={pActiveCategory === 18 ? "category-item active" : "category-item"} onClick={() => productCategory(18)}>
                                시트/필름
                            </div>

                            <div className={pActiveCategory === 19 ? "category-item active" : "category-item"} onClick={() => productCategory(19)}>
                                스위치/콘센트
                            </div>

                            <div className={pActiveCategory === 20 ? "category-item active" : "category-item"} onClick={() => productCategory(20)}>
                                커튼/블라인드
                            </div>

                            <div className={pActiveCategory === 21 ? "category-item active" : "category-item"} onClick={() => productCategory(21)}>
                                페인트
                            </div>

                            <div className={pActiveCategory === 22 ? "category-item active" : "category-item"} onClick={() => productCategory(22)}>
                                조명
                            </div>
                        </div>
                    </div>

                    <div className="product-cards">
<<<<<<< HEAD
                        {Array.isArray(product) && product.map((productCard) => <Product key={productCard.productIdx} product={productCard} toggleFavorite={productCard.isFavorite} />)}
=======
                        {Array.isArray(product) && product.map((productCard) => <Product key={productCard.productIdx} product={productCard} toggleFavorite={favoriteToggle} />)}
>>>>>>> main
                    </div>
                </div>

                <div className="card-box">
                    <div className="top">
                        <div className="title-box">
                            <div className="title-main-main">
<<<<<<< HEAD
=======
                                <MessageSquareHeart />
>>>>>>> main
                                <span>커뮤니티</span>
                            </div>
                            <div className="more" onClick={() => navigate(`/zipddak/community`)}>
                                <span>전체보기</span>
                                <CirclePlus size={14} />
                            </div>
                        </div>
                        <div className="main-category">
<<<<<<< HEAD
=======
                            <div className={cActiveCategory === 0 ? "category-item active" : "category-item"} onClick={() => communityCategory(0)}>
                                전체
                            </div>
>>>>>>> main
                            <div className={cActiveCategory === 76 ? "category-item active" : "category-item"} onClick={() => communityCategory(76)}>
                                우리집 자랑
                            </div>

                            <div className={cActiveCategory === 77 ? "category-item active" : "category-item"} onClick={() => communityCategory(77)}>
                                자재 토론회
                            </div>

                            <div className={cActiveCategory === 78 ? "category-item active" : "category-item"} onClick={() => communityCategory(78)}>
                                나만의 노하우
                            </div>

                            <div className={cActiveCategory === 79 ? "category-item active" : "category-item"} onClick={() => communityCategory(79)}>
                                전문가에게 묻다
                            </div>

                            <div className={cActiveCategory === 80 ? "category-item active" : "category-item"} onClick={() => communityCategory(80)}>
                                함께해요
                            </div>

                            <div className={cActiveCategory === 81 ? "category-item active" : "category-item"} onClick={() => communityCategory(81)}>
                                전문가 소식
                            </div>

                            <div className={cActiveCategory === 82 ? "category-item active" : "category-item"} onClick={() => communityCategory(82)}>
                                자유
                            </div>
                        </div>
                    </div>

                    <div className="community-cards">
<<<<<<< HEAD
                        <div className="grid-cm">{Array.isArray(community) && community.map((communityCard) => <Community key={communityCard.communityIdx} community={communityCard} />)}</div>
                        {/* <div className="row-cm maincom">
                            {community.map((comm) => {
                                <Community community={comm} />;
                            })}
                        </div> */}
=======
                        <div className="grid-cm">
                            {Array.isArray(community) && community.map((communityCard) =>
                                <Community key={communityCard.communityId} community={communityCard} />)}</div>
>>>>>>> main
                    </div>
                </div>
            </div>
        </>
    );
}
