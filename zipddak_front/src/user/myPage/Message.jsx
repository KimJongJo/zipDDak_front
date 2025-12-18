import { useEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import "../css/message.css";
import { useAtom, useAtomValue } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSearchParams } from "react-router";

export default function Message() {
  const [searchParams] = useSearchParams();
  const initialRoomId = searchParams.get("roomId");

  const [stompConnected, setStompConnected] = useState(false);
  const [chip, setChip] = useState("EXPERT");
  const [inputMessage, setInputMessage] = useState("");
  const [chatList, setChatList] = useState([]); // 채팅방 목록
  const [messages, setMessages] = useState([]); // 대화 내용
  const [selectMessageRoomIdx, setSelectMessageRoomIdx] = useState(
    initialRoomId ? Number(initialRoomId) : null
  ); // 선택한 채팅방

  const isFirstRender = useRef(true);
  const clientRef = useRef(null);
  const roomSubRef = useRef(null);
  const roomListSubRef = useRef(null);
  const bottomRef = useRef(null);

  const user = useAtomValue(userAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // 채팅방 목록 조회
  const getMessageRoomList = (type) => {
    myAxios(token, setToken)
      .get(
        "http://localhost:8080" +
          `/messageRoomList?username=${user.username}&type=${type}`
      )
      .then((res) => {
        setChatList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 채팅 전송
  const sendMessage = () => {
    if (!clientRef.current?.connected) return;

    clientRef.current.publish({
      destination: "/app/chat/send",
      body: JSON.stringify({
        messageRoomIdx: 1,
        content: inputMessage,
        sendUsername: user.username,
        recvUsername: "gyeongeh@gmail.com",
        sendButton: false,
      }),
    });

    setInputMessage("");
  };

  // 시간 포멧팅
  function timeAgo(isoString) {
    const time = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now - time) / 1000);

    if (diff < 60) return "방금 전";
    if (diff < 3600) return Math.floor(diff / 60) + "분 전";
    if (diff < 86400) return Math.floor(diff / 3600) + "시간 전";
    if (diff < 604800) return Math.floor(diff / 86400) + "일 전";
    if (diff < 2592000) return Math.floor(diff / 604800) + "주 전";
    if (diff < 31536000) return Math.floor(diff / 2592000) + "개월 전";

    return Math.floor(diff / 31536000) + "년 전";
  }

  // 최초 목록 조회
  useEffect(() => {
    if (user.username) getMessageRoomList(chip);
  }, [user.username, chip]);

  // STOMP 연결 (최초 1회)
  useEffect(() => {
    //  if (clientRef.current) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws-chat"),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log("STOMP connected");
      setStompConnected(true);

      // 목록 구독
      roomListSubRef.current = client.subscribe(
        `/topic/chat/rooms/${user.username}`,
        (msg) => {
          const update = JSON.parse(msg.body);
          setChatList((prev) =>
            prev.map((room) =>
              room.messageRoomIdx === update.messageRoomIdx
                ? { ...room, ...update }
                : room
            )
          );
        }
      );
    };

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, [user.username]);

  // 채팅방 선택 시 과거 대화 내역 조회 + 구독
  useEffect(() => {
    if (!stompConnected || !clientRef.current || !selectMessageRoomIdx) return;

    // 과거 메시지 조회
    myAxios(token, setToken)
      .get(
        `http://localhost:8080/messages?messageRoomIdx=${selectMessageRoomIdx}&username=${user.username}`
      )
      .then((res) => {
        setMessages(res.data);
      });

    // 이전 구독 해제
    roomSubRef.current?.unsubscribe();

    console.log("subscribe room:", selectMessageRoomIdx);

    roomSubRef.current = clientRef.current.subscribe(
      `/topic/chat/room/${selectMessageRoomIdx}`,
      (msg) => {
        const message = JSON.parse(msg.body);
        console.log("실시간 수신:", message);

        setMessages((prev) => [...prev, message]);
      }
    );

    return () => roomSubRef.current?.unsubscribe();
  }, [selectMessageRoomIdx, stompConnected]);

  // 채팅방 목록 로딩 후 자동 보정
  useEffect(() => {
    if (!initialRoomId) return;
    if (chatList.length === 0) return;

    const exists = chatList.some(
      (room) => room.messageRoomIdx === Number(initialRoomId)
    );

    if (exists) {
      setSelectMessageRoomIdx(Number(initialRoomId));
    }
  }, [chatList, initialRoomId]);

  // 새로운 메시지 도착 시 하단으로 스크롤
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div
      style={{
        display: "flex",
        margin: "0 auto",
        width: "1200px",
        padding: "0 16px",
        gap: "30px",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* 채팅 목록 */}
      <div
        style={{
          display: "flex",
          width: "430px",
          flexDirection: "column",
          padding: "48px 0",
          flex: 1.3,
          height: "100%",
          overflowY: "auto",
          paddingRight: "8px",
        }}
      >
        <h3 className="message-title">쪽지</h3>

        <div className="mypage-chipList">
          <div
            className={chip === "EXPERT" ? "isActive" : ""}
            onClick={() => {
              setChip("EXPERT");
              setSelectMessageRoomIdx(0);
              getMessageRoomList("EXPERT");
            }}
          >
            전문가
          </div>
          <div
            className={chip === "TOOL" ? "isActive" : ""}
            onClick={() => {
              setChip("TOOL");
              setSelectMessageRoomIdx(0);
              getMessageRoomList("TOOL");
            }}
          >
            공구대여
          </div>
        </div>

        <div className="message-list">
          {chatList.map((chat) => (
            <div
              className={
                selectMessageRoomIdx === chat.messageRoomIdx
                  ? "message-list-card-active"
                  : "message-list-card"
              }
              onClick={() => setSelectMessageRoomIdx(chat.messageRoomIdx)}
            >
              <div className="card-info-section">
                {chip === "TOOL" ? (
                  <img
                    src={`http://localhost:8080/imageView?type=profile&filename=${chat.userProfileImage}`}
                    width="48px"
                    height="48px"
                    style={{ borderRadius: "999px" }}
                  />
                ) : (
                  <img
                    src={`http://localhost:8080/imageView?type=expert&filename=${chat.expertProfileImage}`}
                    width="48px"
                    height="48px"
                  />
                )}
                <div>
                  <p>{chip === "TOOL" ? chat.nickname : chat.activityName}</p>
                  <span>
                    {chip === "TOOL"
                      ? chat.toolName
                      : `${chat.mainService} · ${chat.addr1}`}
                  </span>
                </div>
              </div>
              <div className="card-chat-section">
                <div>
                  <p>{chat.lastMessage}</p>
                  {chat.unreadCount !== 0 && (
                    <p className="confirmFalseCount-badge">
                      {chat.unreadCount}
                    </p>
                  )}
                </div>
                <span>{timeAgo(chat.updatedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 채팅 상세 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "48px 0",
          width: "100%",
          flex: 2,
          borderRight: "1px solid #EFF1F5",
          borderLeft: "1px solid #EFF1F5",
          height: "100vh",
          overflow: "hidden",
          paddingRight: "8px",
        }}
      >
        <div className="message-detail-title">
          <div>
            <img
              src=""
              width="32px"
              height="32px"
              style={{ borderRadius: "999px" }}
            />
            <p>전문가 활동명</p>
          </div>
          <button
            className="primary-button"
            style={{ width: "100px", height: "33px" }}
          >
            결제 요청하기
          </button>
        </div>

        <div className="message-detail-content">
          {messages.map((msg) =>
            msg.sendUsername === user.username ? (
              <div className="message-bubble-send">
                <span>{timeAgo(msg.createdAt)}</span>
                <p>{msg.content}</p>
              </div>
            ) : (
              <div className="message-bubble-recive">
                <img
                  src=""
                  width="32px"
                  height="32px"
                  style={{ borderRadius: "999px" }}
                />
                <div>
                  <p>{msg.content}</p>
                  <span>{timeAgo(msg.createdAt)}</span>
                </div>
              </div>
            )
          )}
          {/* <div className="message-bubble-recive hasButton">
            <img
              src=""
              width="32px"
              height="32px"
              style={{ borderRadius: "999px" }}
            />
            <div>
              <p>채팅내용</p>
              <span>날짜?</span>
            </div>
          </div> */}
          <div ref={bottomRef} />
        </div>

        <div className="message-detail-send">
          <Input
            placeholder="메시지를 입력하세요"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              // 한글 조합 중이면 무시
              if (e.isComposing) return;
              // 키 자동 반복 방지 (꾹 눌렀을 때)
              if (e.repeat) return;
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <i
            class="bi bi-arrow-up"
            style={{
              fontSize: "24px",
              color: "rgba(173, 173, 173, 1)",
              padding: "0 10px",
              cursor: "pointer",
            }}
            onClick={sendMessage}
          ></i>
        </div>
      </div>
    </div>
  );
}
