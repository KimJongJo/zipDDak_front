import { FormGroup, Label, Input } from "reactstrap";
import Tippy from "@tippyjs/react";

export default function UploadImages({ addRef, addPreviewList, handleAddChange, deleteAddImage }) {
    return (
        <>
            <FormGroup className="position-relative">
                <Label className="input_title">
                    추가이미지 (최대 5장까지)<span className="required">*</span>
                </Label>
                <Tippy content="상품의 추가이미지 첨부하기" theme="custom">
                    <img src="/Paperclip.svg" className="pointer" onClick={() => addRef.current.click()} />
                </Tippy>
                <Input type="file" accept="image/*" innerRef={addRef} onChange={handleAddChange} multiple hidden />
                {addPreviewList.length > 0 && (
                    <div className="img_previewBox">
                        {addPreviewList.map((img, idx) => (
                            <div key={idx} className="preview-wrap">
                                <img src={img} className="preview-img" />
                                <button className="delete-btn" onClick={() => deleteAddImage(idx)}>
                                    <i class="bi bi-x"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </FormGroup>
        </>
    );
}
