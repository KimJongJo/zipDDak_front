import { Input } from "reactstrap";

export function Account() {
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
      <h1 className="mypage-title">개인정보 관리</h1>
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
        <h3 className="mypage-sectionTitle">정산 관리</h3>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>예금주</label>
          <Input />
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>은행명</label>
          <Input type="select" style={{ width: "200px" }} required>
            <option value="" disabled selected hidden>
              은행을 선택해주세요
            </option>
            <option>국민은행</option>
            <option>신한은행</option>
            <option>우리은행</option>
            <option>하나은행</option>
            <option>농협은행</option>
            <option>기업은행</option>
            <option>SC제일은행</option>
          </Input>
        </div>
        <div className="labelInput-wrapper">
          <label style={{ width: "120px" }}>계좌번호</label>
          <Input />
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
    </div>
  );
}
