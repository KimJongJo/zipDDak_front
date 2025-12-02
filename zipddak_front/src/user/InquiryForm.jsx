import { useRef, useState } from "react";
import { Input } from "reactstrap";

export default function InquiryForm() {
  const [type, setType] = useState("");
  const [images, setImages] = useState([]); // 이미지 미리보기 URL 배열
  const [files, setFiles] = useState([]); // 실제 업로드용 이미지 File 배열

  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages((prev) => [...prev, URL.createObjectURL(file)]);
    setFiles((prev) => [...prev, file]);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">1:1문의작성</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="labelInput-wrapper"
          style={{
            borderBottom: "none",
          }}
        >
          <label style={{ width: "120px" }}>
            문의유형
            <span
              style={{
                color: "#F21724",
                fontSize: "14px",
                fontWeight: "700",
                marginLeft: "2px",
              }}
            >
              *
            </span>
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="payment"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">결제</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="shipping"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">배송</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="order"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">취소/교환/반품</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="rental"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">대여</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="expert"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">전문가 매칭</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="account"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">계정</laebl>
            </div>
            <div className="mypage-radio">
              <Input
                id="inquiryType"
                type="radio"
                value="etc"
                name="inquiryType"
                onChange={handleTypeChange}
              />
              <laebl for="inquiryType">기타</laebl>
            </div>
          </div>
        </div>
        <div
          className="labelInput-wrapper"
          style={{
            borderBottom: "none",
          }}
        >
          <label style={{ width: "120px" }}>주문번호</label>
          <Input
            style={{ width: "798px" }}
            disabled={
              type === "order" || type === "payment" || type === "shipping"
                ? false
                : true
            }
          />
        </div>
        <div
          className="labelInput-wrapper"
          style={{
            borderBottom: "none",
          }}
        >
          <label style={{ width: "120px" }}>
            문의내용
            <span
              style={{
                color: "#F21724",
                fontSize: "14px",
                fontWeight: "700",
                marginLeft: "2px",
              }}
            >
              *
            </span>
          </label>
          <Input type="textarea" style={{ width: "798px" }} />
        </div>
        <div
          className="labelInput-wrapper"
          style={{
            borderBottom: "none",
          }}
        >
          <label style={{ width: "120px" }}>사진첨부</label>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              {images.map((img, idx) => (
                <div style={{ position: "relative" }}>
                  <img key={idx} src={img} width="60px" height="60px" />
                  <i
                    class="bi bi-x-circle-fill"
                    style={{
                      width: "16px",
                      height: "16px",
                      position: "absolute",
                      top: "-4px",
                      right: "-4px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImages((prev) => prev.filter((_, i) => i !== idx));
                      setFiles((prev) => prev.filter((_, i) => i !== idx));
                    }}
                  />
                </div>
              ))}
              {images.length < 5 && (
                <div
                  onClick={() => imgRef.current.click()}
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#000",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <i
                    class="bi bi-plus-lg"
                    style={{
                      fontSize: "30px",
                      color: "#fff",
                    }}
                  ></i>
                  <input
                    type="file"
                    hidden
                    ref={imgRef}
                    onChange={handleImageUpload}
                  />
                </div>
              )}
            </div>
            <p
              style={{
                color: "#A0A0A0",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "20px",
                margin: "0",
              }}
            >
              상품 불량 및 오배송의 경우, 해당 제품 사진을 등록 부탁드립니다.
              <br />
              첨부파일은 최대 5개까지 등록가능합니다.
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="primary-button"
          style={{ width: "200px", height: "40px", fontSize: "14px" }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
