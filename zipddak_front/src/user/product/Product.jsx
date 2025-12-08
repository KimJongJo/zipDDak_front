import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Product.css";
import { useNavigate } from "react-router";

export default function Product({ product, toggleFavorite }) {
    const navigate = useNavigate();
    let username = "rlawhdwh";

    return (
        <div onClick={() => navigate(`/zipddak/product/${product.productIdx}`)} style={{ cursor: "pointer" }} className="Product-card">
            {/* 자재 이미지 */}
            <div className="product-image">
                <img src={`${product.storagePath}/${product.fileRename}`} alt="상품" />
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // 화면 이동 클릭 막음
                        // 로그인이 안되어있으면 막음
                        username && toggleFavorite();
                    }}
                    className="favorite-icon"
                >
                    {product.favorite ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                </button>
            </div>

            {/* 자재 정보 */}
            <div className="product-info">
                {/* 업체명 */}
                <span className="store-name">{product.brandName}</span>
                {/* 자재이름 */}
                <div className="product-name">{product.name}</div>
                <div>
                    {/* 세일 퍼센트 */}
                    <span className="sale">{product.discount}%</span>
                    {/* 세일 가격 */}
                    <span className="sale-price">{product.salePrice.toLocaleString()}</span>
                </div>
                <div>
                    <i className="bi bi-star-fill star-icon"></i>
                    {/* 평점 */}
                    <span className="review-count">{product.avgRating}</span>
                    {/* 리뷰 수 */}(<span className="review-count">{product.reviewCount}</span>)
                </div>
            </div>
        </div>
    );
}
