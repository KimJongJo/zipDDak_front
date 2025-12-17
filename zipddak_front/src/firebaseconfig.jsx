import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD3XHWSo-j1SaGmDn5sRBHv1AnUewapIVU",
  authDomain: "kosta-2025-764a0.firebaseapp.com",
  projectId: "kosta-2025-764a0",
  storageBucket: "kosta-2025-764a0.firebasestorage.app",
  messagingSenderId: "416280136815",
  appId: "1:416280136815:web:48a43aa9e4e34fc517519a",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseMessaging = firebaseApp.messaging();

export function firebaseReqPermission(setFcmToken, setAlarm) {
  firebaseMessaging
    .requestPermission()
    .then(() => {
      return firebaseMessaging.getToken({
        vapidKey:
          "BIXPbBivcNvbXX7mnZUXcYE9NCszDfX7AGsXggFbJEIqSmwjnJwCuxLBaPFkvHf0m9h6HW2brlWMHShng0yV5HU",
      });
    })
    .then((token) => {
      console.log(token);
      setFcmToken(token);
    });

  firebaseMessaging.onMessage((payload) => {
    console.log(payload);
    let data = payload.data;

    setAlarm({
      notificationIdx: data.notificationIdx,
      type: data.type,
      title: data.title,
      content: data.content,
      sendUsername: data.sendUsername,
      recvUsername: data.recvUsername,
      refIdx:
        data.communityIdx ||
        data.estimateIdx ||
        data.rentalIdx ||
        data.requestIdx ||
        data.reviewIdx,
    });
  });
}

// 서비스 워커 등록: background 설정
export async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );
    console.log("Service Worker 등록 성공:", registration);
  } catch (err) {
    console.log("Service Worker 등록 실패:", err);
  }
}
