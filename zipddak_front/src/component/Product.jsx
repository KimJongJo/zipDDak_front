import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Product.css";
import {Heart} from 'lucide-react'

export function Product() {
    const product = {
        productName: "업체명",
        productIntro: "상품명 2줄까지 노출해야 하나 싶기도 근데 오늘의 집은 2줄 나옴 최대 글자수가 있는듯",
        sale: "30%",
        salePrice: 34900,
        reviewScore: 4.5,
        reviewCount: 5
    };

    return (
        <a href="#" className="Product-card">
            {/* 자재 이미지 */}
            <div className="product-image">
                {/* <i className="bi bi-heart favorite-icon"></i> */}
                <div className="favorite-icon"><Heart /></div>
            </div>

            <div className="product-info">
                <span className="store-name">{product.productName}</span>
                <div className="product-name">{product.productIntro}</div>
                <div>
                    <span className="sale">{product.sale}</span>
                    <span className="sale-price">{product.salePrice.toLocaleString()}</span>
                </div>
                <div>
                    <i className="bi bi-star-fill star-icon"></i>
                    <span className="review-count">{product.reviewScore}</span>
                    (<span className="review-count">{product.reviewCount}</span>)
                </div>
            </div>
        </a>
    );
}

export function Products() {
    const product = {
        productName: "업체명",
        productIntro: "상품명 2줄까지 노출해야 하나 싶기도 근데 오늘의 집은 2줄 나옴 최대 글자수가 있는듯",
        sale: "30%",
        salePrice: 34900,
        reviewScore: 4.5,
        reviewCount: 5,
    };

    return (
        <a href="#" className="Product-cards">
            <div className="product-images">
                {/* <i className="bi bi-heart favorite-icons"></i> */}
                <div className="favorite-icon"><Heart /></div>
            </div>

            <div className="product-infos">
                <span className="store-names">{product.productName}</span>
                <div className="product-names">{product.productIntro}</div>
                <div>
                    <span className="sales">{product.sale}</span>
                    <span className="sale-prices">{product.salePrice.toLocaleString()}</span>
                </div>
                <div>
                    <i className="bi bi-star-fill star-icons"></i>
                    <span className="review-counts">{product.reviewScore}</span>
                    (<span className="review-counts">{product.reviewCount}</span>)
                </div>
            </div>
        </a>
    );
}


