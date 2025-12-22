import { useEffect, useState } from "react";

export default function KakaoMapTestPage() {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [marker, setMarker] = useState(null);

  const [address, setAddress] = useState("");
  const [selectedCoord, setSelectedCoord] = useState(null);
  const [savedCoord, setSavedCoord] = useState(null);

  /* ===============================
     1️⃣ 지도 초기화
  =============================== */
  useEffect(() => {
    if (!window.kakao) return;

    // ⭐ 핵심
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");

      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      const geocoderInstance = new window.kakao.maps.services.Geocoder();
      const markerInstance = new window.kakao.maps.Marker({
        position: options.center,
      });

      markerInstance.setMap(mapInstance);

      setMap(mapInstance);
      setGeocoder(geocoderInstance);
      setMarker(markerInstance);
    });
  }, []);

  /* ===============================
     2️⃣ 지도 클릭 → 좌표 → 주소
  =============================== */
  useEffect(() => {
    if (!map || !geocoder || !marker) return;

    const clickHandler = (mouseEvent) => {
      const latlng = mouseEvent.latLng;

      marker.setPosition(latlng);

      const lat = latlng.getLat();
      const lng = latlng.getLng();

      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const roadAddr = result[0].road_address?.address_name;
          const jibunAddr = result[0].address.address_name;

          setAddress(roadAddr || jibunAddr);
          setSelectedCoord({ lat, lng });
        }
      });
    };

    window.kakao.maps.event.addListener(map, "click", clickHandler);

    return () => {
      window.kakao.maps.event.removeListener(map, "click", clickHandler);
    };
  }, [map, geocoder, marker]);

  /* ===============================
     3️⃣ 저장된 좌표로 지도 복원
  =============================== */
  useEffect(() => {
    if (!map || !marker || !savedCoord) return;

    const position = new window.kakao.maps.LatLng(
      savedCoord.lat,
      savedCoord.lng
    );

    map.setCenter(position);
    marker.setPosition(position);
  }, [map, marker, savedCoord]);

  /* ===============================
     4️⃣ 주소 → 좌표
  =============================== */
  const searchByAddress = () => {
    if (!geocoder || !address) return;

    geocoder.addressSearch(address, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const lat = Number(result[0].y);
        const lng = Number(result[0].x);

        const position = new window.kakao.maps.LatLng(lat, lng);
        map.setCenter(position);
        marker.setPosition(position);

        setSelectedCoord({ lat, lng });
      }
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📍 Kakao Map 실험 페이지</h2>

      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <strong>선택한 주소:</strong>
        <div>{address || "지도 클릭"}</div>
      </div>

      {selectedCoord && (
        <div style={{ marginTop: "8px", fontSize: "14px" }}>
          위도: {selectedCoord.lat} / 경도: {selectedCoord.lng}
        </div>
      )}

      <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
        <button onClick={() => setSavedCoord(selectedCoord)}>
          좌표 저장
        </button>

        <button onClick={searchByAddress}>
          주소로 지도 이동
        </button>
      </div>
    </div>
  );
}
