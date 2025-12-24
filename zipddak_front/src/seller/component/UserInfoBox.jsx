import actionBox from "../css/actionDropdown.module.css";
import { useAtom } from "jotai/react";
import { initUser, tokenAtom, userAtom } from "../../atoms";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const UserInfoBox = ({ pos, userId, onClose }) => {
    const boxRef = useRef(null);

    const [user, setUser] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);

    //박스 외부 클릭시 닫기
    useEffect(() => {
        const handleOutside = (e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener("click", handleOutside);
        return () => document.removeEventListener("click", handleOutside);
    }, [onClose]);

    // 화면 안에서 안 잘리도록 위치 보정
    useEffect(() => {
        if (!boxRef.current) return;

        const boxRect = boxRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;

        let newLeft = pos.x;

        // 오른쪽 화면 밖으로 나가면 왼쪽으로 이동
        if (boxRect.right > viewportWidth) {
            newLeft = viewportWidth - boxRect.width - 8;
        }

        // 왼쪽도 넘어가면 최소 여백 유지
        if (newLeft < 8) {
            newLeft = 8;
        }

        boxRef.current.style.left = `${newLeft}px`;
    }, [pos]);

    // 로그아웃
    const logout = () => {
        setUser(initUser);
        setToken(null);
        navigate("/seller/sellerLogin");
    };

    return ReactDOM.createPortal(
        <div
            ref={boxRef}
            className={actionBox.userInfoBox_frame}
            style={{
                top: pos.y,
                left: pos.x,
            }}
        >
            <div className={[actionBox.block_column].join(" ")}>
                <img src="/no_img.svg" style={{ width: "50%" }} />
                <span className={actionBox.compInfo}>업체명업체명업체명업체명업체명업체명업체명업체명</span>
            </div>
            <hr className="section_divider" />
            <div className={[actionBox.item_column].join(" ")}>{userId}</div>
            <div className={actionBox.item} onClick={logout}>
                로그아웃
            </div>
        </div>,
        document.body,
    );
};

export default UserInfoBox;
