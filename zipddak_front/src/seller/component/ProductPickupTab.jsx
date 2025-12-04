// css
import product from "../css/productRegist.module.css";

import { FormGroup, Input, Label, FormFeedback } from "reactstrap";

const PickupTab = ({ register, errors }) => {
    return (
        <div className={[product.pickup_frame, "ps-3"].join(" ")}>
            <div style={{ width: "100%" }}>
                <Label for="examplePassword" className="input_title" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    픽업지 주소
                    {/* <button type="button" className="small-button">
                        <i className="bi bi-search"></i>
                    </button> */}
                </Label>
                <div className="addr_column mb-2">
                    <Input style={{ width: "30%" }} placeholder="우편번호" readOnly />
                    <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly />
                </div>
                <div className="addr_column ">
                    <Input type="text" placeholder="상세주소를 입력하세요" />
                </div>
            </div>

            {errors.pickup?.detailAddress && <p style={{ color: "red", fontSize: 13 }}>{errors.pickup.detailAddress.message}</p>}
        </div>
    );
};

export default PickupTab;
