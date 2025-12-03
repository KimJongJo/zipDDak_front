import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Product.css";

export default function Product({ product }) {
    // const product = {
    //     productName: "업체명",
    //     productIntro: "상품명 2줄까지 노출해야 하나 싶기도 근데 오늘의 집은 2줄 나옴 최대 글자수가 있는듯",
    //     sale: "30%",
    //     salePrice: 34900,
    //     reviewScore: 4.5,
    //     reviewCount: 5,
    // };

    return (
        <a href="#" className="Product-card">
            {/* 자재 이미지 */}
            <div className="product-image">
                <img src="/images/이미지테스트.png" alt="상품" />
                <i className="bi bi-heart favorite-icon"></i>
            </div>

            {/* 자재 정보 */}
            <div className="product-info">
                {/* 업체명 */}
                <span className="store-name">{product.productName}</span>
                {/* 업체 소개 */}
                <div className="product-name">{product.productIntro}</div>
                <div>
                    {/* 세일 퍼센트 */}
                    <span className="sale">{product.sale}</span>
                    {/* 세일 가격 */}
                    <span className="sale-price">{product.salePrice.toLocaleString()}</span>
                </div>
                <div>
                    <i className="bi bi-star-fill star-icon"></i>
                    {/* 평점 */}
                    <span className="review-count">{product.reviewScore}</span>
                    {/* 리뷰 수 */}(<span className="review-count">{product.reviewCount}</span>)
                </div>
            </div>
        </a>
    );
}
