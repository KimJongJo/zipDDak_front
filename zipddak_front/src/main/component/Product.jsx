import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Product.css";
import {Heart} from 'lucide-react'
import { useNavigate } from "react-router";

export function Products({ product, toggleFavorite }) {
    const navigate = useNavigate();

    return (
        <div className="Product-cards"
        onClick={() => navigate(`/zipddak/product/${product.productIdx}`)}>
            <div className="product-images">
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

            <div className="product-infos">
                <span className="store-names">{product.brandName}</span>
                <div className="product-names">{product.name}</div>
                <div>
                    <span className="sales">{product.discount}%</span>
                    <span className="sale-prices">{product.salePrice.toLocaleString()}</span>
                </div>
                <div>
                    <i className="bi bi-star-fill star-icons"></i>
                    <span className="review-counts">{product.avgRating}</span>
                    (<span className="review-counts">{product.reviewCount}</span>)
                </div>
            </div>
        </div>
    );
}


