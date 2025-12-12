import { Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import modal from "../css/modal.module.css";
import { myAxios } from "../../config.jsx";

export default function ModalRefund({ refundModalOpen, setRefundModalOpen, selectedItems, targetItemIdx, orderIdx, refresh, resetChecked }) {
    const handleSave = async () => {
        try {
            let targetItems = [];

            if (targetItemIdx) {
                // 드롭다운 단일 처리
                targetItems = [targetItemIdx];
            } else {
                // 체크박스 다중 처리
                if (!selectedItems?.length) return alert("선택된 상품이 없습니다.");
                targetItems = selectedItems;
            }

            // → targetItems 로 API 호출
            const res = await myAxios()
                .post("/seller/refund/refundItems", {
                    orderIdx: orderIdx,
                    itemIds: targetItems,
                })
                .then((res) => {
                    console.log(res);
                    console.log(res.data);

                    if (res.data.success === true) {
                        alert(res.data.message);
                        setRefundModalOpen(false); //모달 닫기
                        resetChecked(); //체크박스 초기화
                        if (refresh) refresh(); // 새로고침
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.error(err);
            alert("환불 처리 실패");
        }
    };

    return (
        <>
            <Modal isOpen={refundModalOpen} toggle={() => setRefundModalOpen(false)} className={[modal.modalFrame, modal.refundModalFrame].join(" ")}>
                <ModalHeader toggle={() => setRefundModalOpen(false)} className={[modal.modalHeader, modal.refundModalHeader].join(" ")}>
                    환불 처리
                </ModalHeader>
                <ModalBody className={[modal.modalBody, modal.refundModalBody].join(" ")}>
                    <div className={modal.refundModalContent}>
                        <div className={modal.descRefundModalColumn}>
                            <p>선택된 상품 {selectedItems?.length}개를 환불 처리하시겠습니까?</p>
                            <p style={{ color: "red" }}>처리 후 취소할 수 없습니다.</p>
                        </div>
                        <div className={modal.refundModalContent} style={{ padding: "15px" }}>
                            <div className={modal.refundModalColumn}>
                                <span className="sub_title">환불 사유 </span>
                                <Input type="select" className={modal.selectReason}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </div>
                            <div className={modal.refundModalColumn}>
                                <span className="sub_title">환불 내용 </span>
                                <Input type="textarea" className={modal.writeReason} placeholder="환불처리에 대한 상세사유를 적어주세요! (최대 2000자)" />
                            </div>
                        </div>
                    </div>

                    <div className="btn_part">
                        <button className="primary-button" style={{ width: "100%", height: "33px" }} onClick={handleSave}>
                            저장
                        </button>
                        <button className="sub-button" style={{ width: "100%", height: "33px" }} onClick={() => setRefundModalOpen(false)}>
                            취소
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
