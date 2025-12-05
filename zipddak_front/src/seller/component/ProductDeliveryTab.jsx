// css
import product from "../css/productRegist.module.css";

import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

const DeliveryTab = ({ register, errors }) => {
    return (
        <div className={[product.deli_frame, "ps-3"].join(" ")}>
            {/* 묶음/개별 배송 */}
            <div className="position-relative">
                <FormGroup check inline>
                    <Label check>
                        <Input type="radio" value="bundle" {...register("delivery.shippingType")} />
                        묶음 배송
                    </Label>
                </FormGroup>

                <FormGroup check inline>
                    <Label check>
                        <Input type="radio" value="single" {...register("delivery.shippingType")} />
                        개별 배송
                    </Label>
                </FormGroup>
            </div>

            {/* 배송비 */}
            <div className="position-relative" style={{ display: "flex", alignItems: "center" }}>
                <Label style={{ fontSize: "15px", fontWeight: "500", marginBottom: "0", marginRight: "10px" }}>
                    배송비<span className="required">*</span>
                </Label>

                <div className="unit_set">
                    <Input
                        className=" unit"
                        {...register("delivery.shippingFee", {
                            required: "배송비를 입력하세요.",
                            validate: (v) => /^[0-9]+$/.test(v) || "숫자만 입력하세요.",
                        })}
                    />
                    <span>원</span>
                </div>

                {errors.delivery?.shippingFee && <p style={{ color: "red", fontSize: 13 }}>{errors.delivery.shippingFee.message}</p>}
            </div>
        </div>
    );
};

export default DeliveryTab;
