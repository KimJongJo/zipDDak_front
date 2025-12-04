import product from "../css/productRegist.module.css";
import { FormGroup, Label, Input } from "reactstrap";

export default function CategorySelector({ selectedCategory, setSelectedCategory, subCategories }) {
    return (
        <FormGroup className="position-relative mb-4">
            <Label className="input_title">
                카테고리<span className="required">*</span>
            </Label>

            {/* 상위 카테고리 */}
            <div>
                {Object.keys(subCategories).map((cat) => (
                    <FormGroup key={cat} check inline>
                        <Label check>
                            <Input type="radio" name="productCategory" value={cat} onChange={(e) => setSelectedCategory(e.target.value)} />
                            {cat}
                        </Label>
                    </FormGroup>
                ))}
            </div>

            {/* 소카테고리 */}
            {subCategories[selectedCategory] && subCategories[selectedCategory].length > 0 && (
                <div className={[product.small_category, "mt-3"].join(" ")}>
                    {subCategories[selectedCategory].map((sub, idx) => (
                        <FormGroup check inline key={idx}>
                            <Label check>
                                <Input type="radio" name="subcategory" value={sub} />
                                {sub}
                            </Label>
                        </FormGroup>
                    ))}
                </div>
            )}
        </FormGroup>
    );
}
