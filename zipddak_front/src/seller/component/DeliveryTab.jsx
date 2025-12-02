import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

const DeliveryTab = ({ register, errors }) => {
    return (
        <div className="deli_frame mb-2 ps-3">
            {/* 무료 배송 */}
            {/* <div className="deli_column1 position-relative">
                <FormGroup check inline>
                    <Label check>
                        <Input type="checkbox" {...register("delivery.freeShipping")} />
                        무료 배송
                    </Label>
                </FormGroup>
            </div> */}

            {/* 묶음/개별 배송 */}
            <div className="deli_column2 border_top position-relative">
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
            <div className="deli_column3 border_top position-relative">
                <FormGroup style={{ display: "flex", alignItems: "flex-end" }}>
                    <Label className=" ms-2">
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
                </FormGroup>

                {errors.delivery?.shippingFee && <p style={{ color: "red", fontSize: 13 }}>{errors.delivery.shippingFee.message}</p>}
            </div>
        </div>
    );
};

export default DeliveryTab;
