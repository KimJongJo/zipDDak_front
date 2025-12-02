import { FormGroup, Input, Label, FormFeedback } from "reactstrap";
import Tippy from "@tippyjs/react";

const PickupTab = ({ register, errors }) => {
    return (
        <div className="addr_frame ps-3">
            <FormGroup className=" position-relative">
                <Label className="input_title">픽업 주소지</Label>

                <div className="addr_column mb-2">
                    <Tippy content="주소 검색" theme="custom">
                        <button type="button" className="small-button">
                            <i className="bi bi-search"></i>
                        </button>
                    </Tippy>

                    <Input style={{ width: "30%" }} placeholder="우편번호" readOnly {...register("pickup.postalCode")} />
                    <Input style={{ width: "70%" }} placeholder="도로명주소" readOnly {...register("pickup.roadAddress")} />
                </div>

                <div className="addr_column">
                    <Input
                        type="text"
                        placeholder="상세주소를 입력하세요"
                        {...register("pickup.detailAddress", {
                            required: "상세주소를 입력하세요.",
                        })}
                    />
                </div>
            </FormGroup>

            {errors.pickup?.detailAddress && <p style={{ color: "red", fontSize: 13 }}>{errors.pickup.detailAddress.message}</p>}
        </div>
    );
};

export default PickupTab;
