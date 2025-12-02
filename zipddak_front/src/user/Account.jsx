import { Input, Modal, ModalBody } from "reactstrap";
import DaumPostcode from "react-daum-postcode";
import { useRef, useState } from "react";

export default function Account() {
  // const [user, setUser] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [modal, setModal] = useState(false);

  const fileRef = useRef(null); // 숨겨진 <Input type="file" />을 대신 클릭하기 위한 ref
  const imgRef = useRef(null); // 이미지 미리보기용 <img> 태그의 src를 변경하기 위한 ref

  const handleComplate = (data) => {
    let { zonecode, address } = data;
    // setUser({ ...user, postcode: zonecode, address1: address });
  };

  const handleClose = (state) => {
    if (state == "COMPLETE_CLOSE") setModal(false);
  };

  const user = {
    profileImage: "https://via.placeholder.com/150",
    nickname: "han_dev",
    username: "han1234",
    password: "Test1234!",
    name: "한경은",
    phoneNumber: "010-1234-5678",
    birthDate: "1994-07-15",
    gender: "F",
    postcode: "06236",
    address1: "서울특별시 강남구 테헤란로 152",
    address2: "12층 1205호",
  };

  return (
    <div className="mypage-layout">
      <h1 className="mypage-title">회원정보 수정</h1>
      <div>
        <h3 className="mypage-sectionTitle">내 프로필</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>프로필 이미지</label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img
              src={user.profileImage}
              width="72px"
              height="72px"
              ref={imgRef}
              style={{ borderRadius: "999px" }}
            />
            <input
              type="file"
              hidden
              ref={fileRef}
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
                imgRef.current.src = URL.createObjectURL(e.target.files[0]);
              }}
            />
            <div style={{ display: "flex", gap: "4px" }}>
              <button
                className="secondary-button"
                style={{ width: "66px", height: "33px" }}
                onClick={() => fileRef.current.click()}
              >
                변경
              </button>
              <button
                className="secondary-button"
                style={{ width: "66px", height: "33px" }}
                onClick={() => (imgRef.current.src = "")}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>닉네임</label>
          <Input value={user.nickname} />
        </div>
      </div>
      <div>
        <h3 className="mypage-sectionTitle">내 정보</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>아이디</label>
          <p>{user.username}</p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>비밀번호</label>
          <Input type="password" />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>이름</label>
          <Input value={user.name} />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>휴대폰 번호</label>
          <Input value={user.phoneNumber} />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>생년월일</label>
          <Input type="date" value={user.birthDate} />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>성별</label>
          <p>{user.gender}</p>
        </div>
      </div>
      <div>
        <h3 className="mypage-sectionTitle">주소</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>우편번호</label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <p>{user.postcode}</p>
            <button
              className="secondary-button"
              style={{ width: "100px", height: "33px" }}
              onClick={() => setModal(!modal)}
            >
              우편번호 검색
            </button>
          </div>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>도로명 주소</label>
          <p>{user.address1}</p>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>상세 주소</label>
          <Input value={user.address2} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p
          style={{
            color: "#ADADAD",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "18px",
          }}
        >
          회원탈퇴
        </p>
        <button
          className="primary-button"
          style={{ width: "200px", height: "40px", fontSize: "14px" }}
        >
          완료
        </button>
        <span style={{ width: "48.4px" }} />
      </div>

      {/* 다음 주소 모달 */}
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalBody>
          <DaumPostcode onComplete={handleComplate} onClose={handleClose} />
        </ModalBody>
      </Modal>
    </div>
  );
}
