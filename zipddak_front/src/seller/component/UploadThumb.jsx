import { FormGroup, Label, Input } from "reactstrap";
import Tippy from "@tippyjs/react";

export default function UploadThumb({ thumbRef, thumbPreview, handleThumbChange, deleteThumb }) {
    return (
        <>
            <FormGroup className="position-relative">
                <Label className="input_title" style={{ minWidth: "fit-content" }}>
                    썸네일<span className="required">*</span>
                </Label>
                <Tippy content="상품 이미지 첨부하기" theme="custom">
                    <img src="/Paperclip.svg" className="pointer" onClick={() => thumbRef.current.click()} />
                </Tippy>
                <Input type="file" accept="image/*" innerRef={thumbRef} onChange={handleThumbChange} hidden />
                {thumbPreview && (
                    <div id="thumbPreview" className="img_previewBox">
                        <div className="preview-wrap">
                            <img src={thumbPreview} className="preview-img" />
                            <button type="button" className="delete-btn" onClick={deleteThumb}>
                                <i class="bi bi-x"></i>
                            </button>
                        </div>
                    </div>
                )}
            </FormGroup>
        </>
    );
}
