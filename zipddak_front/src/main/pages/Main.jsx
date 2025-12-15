import "../../css/common.css";
import "../css/Main.css";
import { Button } from "reactstrap";
import { Search, CirclePlus, MapPin, ArrowRight } from "lucide-react";
import Expertmain from "../component/Expert";
import Expert from "../../user/expert/Expert";
import { Toolmain } from "../component/Tool";
import { Community } from "../component/Community";
import Product from '../../user/product/Product';
import { useEffect, useState } from "react";
import { myAxios } from "../../config";
import { useAtom } from "jotai";
import { keywordAtom, tokenAtom, userAtom } from "../../atoms";
import { useNavigate } from "react-router";

export default function Main() {

  const [user,setUser] = useAtom(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  const [product, setProduct] = useState([]);
  const [expert, setExpert] = useState([]);
  const [tool, setTool] = useState([]);
  const [community, setCommunity] = useState([]);

  //공구 주소 자르기
  const userAddressString = user?.addr1 || ''; 
  const userAdress = userAddressString.split(' ').slice(0, 2).join(' ');

  const navigate = useNavigate();

  //검색
  const [searchKeyword, setSearchKeyword] = useAtom(keywordAtom);

  const mainSearch = (e) => {
    e.preventDefault();

   if(searchKeyword.trim()) { 
        navigate(`/zipddak/main/search?keyword=${searchKeyword.trim()}`);
    } else {
        alert('검색어를 입력해주세요.');
    }
    
  }

  
  //전문가 리스트
  const [eCategory, setECategory] = useState();
  const [eActiveCategory, setEActiveCategory] = useState(0);

  const expertCategory = (categoryNo) => {
    setECategory(categoryNo);
    setEActiveCategory(categoryNo);
  }

  const expertList = () => {

      const categoryPharam= eCategory? eCategory : 0 ;
      const keywordPharam = '';
  
    myAxios(token, setToken).get(`/main/expert?keyword=${keywordPharam}&categoryNo=${categoryPharam}`)
    .then((res)=> {
      console.log(res.data);
      setExpert(res.data);
   
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  useEffect(()=> {

    expertList();
    
  },[user.username, eCategory,eActiveCategory])

 
  //상품 리스트
  const [pCategory, setPCategory] = useState();
  const [pActiveCategory, setPActiveCategory] = useState(1);

  const productCategory = (categoryNo) => {
    setPCategory(categoryNo);
    setPActiveCategory(categoryNo);
  }

  const productList = () => {

      const usernamePharam =user? user.username : '';
      const categoryPharam= pCategory? pCategory : 1 ;
      const keywordPharam = '';
  
    myAxios(token, setToken).get(`/main/product?username=${usernamePharam}&keyword=${keywordPharam}&categoryNo=${categoryPharam}`)
    .then((res)=> {
      console.log(res.data);
      setProduct(res.data);
   
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  useEffect(()=> {

    productList();
    
  },[user.username, pCategory])

  //공구 리스트
  const [tCategory, setTcategory] = useState();
  const [tActiveCategory, setTActiveCategory] = useState(83);

  const toolCategory = (categoryNo) => {
    setTcategory(categoryNo);
    setTActiveCategory(categoryNo);
  }

  const toolList = () => {

      const usernamePharam =user? user.username : '';
      const categoryPharam= tCategory? tCategory : 83 ;
      const keywordPharam = '';
  
    myAxios(token, setToken).get(`/main/tool?username=${usernamePharam}&keyword=${keywordPharam}&categoryNo=${categoryPharam}`)
    .then((res)=> {
      console.log(res.data);
      setTool(res.data);
   
    })
    .catch((err)=> {
      console.log(err);
    })
  }

  useEffect(()=> {

    toolList();
    
  },[user.username, tCategory,tActiveCategory])


  //커뮤니티 리스트
  // const [cCategory, setCCategory] = useState();
  // const [cActiveCategory, setCActiveCategory] = useState(76);

  // const communityCategory = (categoryNo) => {
  //   setCCategory(categoryNo);
  //   setCActiveCategory(categoryNo);
  // }

  // const communityList = () => {

  //     const usernamePharam =user? user.username : '';
  //     const categoryPharam= tCategory? tCategory : 76 ;
  //     const keywordPharam = '';
  
  //   myAxios(token, setToken).get(`/main/community?username=${usernamePharam}&keyword=${keywordPharam}&categoryNo=${categoryPharam}`)
  //   .then((res)=> {
  //     console.log(res.data);
  //     setCommunity(res.data);
   
  //   })
  //   .catch((err)=> {
  //     console.log(err);
  //   })
  // }

  // useEffect(()=> {

  //   communityList();
    
  // },[user.username, cCategory])



  
  return (
    <>
      <div className="Main-container">
        
          <form className="search-form" onSubmit={mainSearch}>
            <div className="search">
            <input
              className="search-input"
              type="text"
              placeholder="통합검색"
              onChange={(e)=> setSearchKeyword(e.target.value)}
              
            />
            </div>
            <Button className="primary-button" type="submit">
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
              <div className="title-main-main">추천 전문가</div>
              <div className="more" onClick={()=>navigate(`/zipddak/experts`)}>
                <span>전체보기</span>
                <CirclePlus size={14} />
              </div>
            </div>
            <div className="main-category">
              <div className={eActiveCategory === 0? "category-item active" : "category-item"}
              onClick={()=>expertCategory(0)}>전체</div>

              <div className={eActiveCategory === 23? "category-item active" : "category-item"}
              onClick={()=>expertCategory(23)}>시공/견적 컨설팅</div>

              <div className={eActiveCategory === 44? "category-item active" : "category-item"}
              onClick={()=>expertCategory(44)}>수리</div>

              <div className={eActiveCategory === 74? "category-item active" : "category-item"}
              onClick={()=>expertCategory(74)}>인테리어</div>
            </div>
          </div>

          <div className="cards">
             {
              expert.map(expertCard =>(
                <Expert key={expertCard.expertIdx} expert={expertCard} toggleFavorite={expertCard.isFavorite}/>
              ))
            }
            <div className="card-more">
              <ArrowRight />
            </div>
          </div>
        </div>

        <div className="card-box">
          <div className="top">
            <div className="title-box">
              <div className="title-main-main">
                <MapPin size={24} color="#FF5833" />
                <span>{user.addr1? `${userAdress} 공구대여`:'공구대여'}</span>
                {/* <MapPin size={24} color='#FF5833'/> */}
              </div>
              <div className="more" onClick={()=>navigate(`/zipddak/tool`)}>
                <span>전체보기</span>
                <CirclePlus size={14} />
              </div>
            </div>
            <div className="main-category">
              <div className={tActiveCategory === 83? "category-item active" : "category-item"}
              onClick={()=>toolCategory(83)}>전동공구</div>

              <div className={tActiveCategory === 84? "category-item active" : "category-item"}
              onClick={()=>toolCategory(84)}>일반공구</div>

              <div className={tActiveCategory === 85? "category-item active" : "category-item"}
              onClick={()=>toolCategory(85)}>생활용품</div>

              <div className={tActiveCategory === 86? "category-item active" : "category-item"}
              onClick={()=>toolCategory(86)}>기타공구</div>

              <div className={tActiveCategory === 87? "category-item active" : "category-item"}
              onClick={()=>toolCategory(87)}>찾아요</div>
            </div>
          </div>

          <div className="cards">
            {
              tool.map(toolCard =>(
                <Toolmain key={toolCard.toolIdx} tool={toolCard} toggleFavorite={toolCard.isFavorite}/>
              ))
            }
          </div>
        </div>

        {/* <div className="advertise"></div> */}

        <div className="card-box">
          <div className="top">
            <div className="title-box">
              <div className="title-main-main">
                <span>자재 마켓</span>
              </div>
              <div className="more" onClick={()=>navigate(`/zipddak/productList`)}>
                <span>전체보기</span>
                <CirclePlus size={14}/>
              </div>
            </div>
            <div className="main-category">
              <div className={pActiveCategory === 1? "category-item active" : "category-item"}
              onClick={()=>productCategory(1)}>주방</div>

              <div className={pActiveCategory === 6? "category-item active" : "category-item"}
              onClick={()=>productCategory(6)}>욕실</div>

              <div className={pActiveCategory === 14? "category-item active" : "category-item"}
              onClick={()=>productCategory(14)} >중문/도어</div>

              <div className={pActiveCategory === 15? "category-item active" : "category-item"}
              onClick={()=>productCategory(15)} >창호/폴딩도어</div>

              <div className={pActiveCategory === 16? "category-item active" : "category-item"} 
              onClick={()=>productCategory(16)} >벽지/장판/마루</div>

              <div className={pActiveCategory === 17? "category-item active" : "category-item"} 
              onClick={()=>productCategory(17)} >타일</div>

              <div className={pActiveCategory === 18? "category-item active" : "category-item"} 
              onClick={()=>productCategory(18)} >시트/필름</div>

              <div className={pActiveCategory === 19? "category-item active" : "category-item"} 
              onClick={()=>productCategory(19)} >스위치/콘센트</div>

              <div className={pActiveCategory === 20? "category-item active" : "category-item"} 
              onClick={()=>productCategory(20)} >커튼/블라인드</div>

              <div className={pActiveCategory === 21? "category-item active" : "category-item"}  
              onClick={()=>productCategory(21)} >페인트</div>

              <div className={pActiveCategory === 22? "category-item active" : "category-item"} 
              onClick={()=>productCategory(22)} >조명</div>
            </div>
          </div>

          <div className="cards">
            {
              product.map(productCard => (
              <Product key={productCard.productIdx} product={productCard} toggleFavorite={productCard.isFavorite}/>
              ))
            }
            
          </div>
        </div>

        <div className="card-box">
          <div className="top">
            <div className="title-box">
              <div className="title-main-main">
                <span>커뮤니티</span>
              </div>
              <div className="more" onClick={()=>navigate(`/zipddak/community`)}>
                <span>전체보기</span>
                <CirclePlus size={14} />
              </div>
            </div>
            <div className="main-category">
              <div className={pActiveCategory === 76? "category-item active" : "category-item"}
              onClick={()=>communityCategory(76)}>우리집 자랑</div>

              <div className={pActiveCategory === 77? "category-item active" : "category-item"}
              onClick={()=>communityCategory(77)}>자재 토론회</div>

              <div className={pActiveCategory === 78? "category-item active" : "category-item"}
              onClick={()=>communityCategory(78)}>나만의 노하우</div>

              <div className={pActiveCategory === 79? "category-item active" : "category-item"}
              onClick={()=>communityCategory(79)}>전문가에게 묻다</div>

              <div className={pActiveCategory === 80? "category-item active" : "category-item"}
              onClick={()=>communityCategory(80)}>함께해요</div>

              <div className={pActiveCategory === 81? "category-item active" : "category-item"}
              onClick={()=>communityCategory(81)}>전문가 소식</div>

              <div className={pActiveCategory === 82? "category-item active" : "category-item"}
              onClick={()=>communityCategory(82)}>자유</div>
            </div>
          </div>

          <div className="community-cards">
            <div className="row-cm maincom">
              <Community />
              <Community />
            </div>
            <div className="row-cm maincom">
              <Community />
              <Community />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
