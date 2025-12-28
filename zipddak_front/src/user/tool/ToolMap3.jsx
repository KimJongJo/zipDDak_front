import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";
import { MapTool } from "../../main/component/Tool";

const LocationToolMap = () => {
    const [user] = useAtom(userAtom);
    const [token, setToken] = useAtom(tokenAtom);
    const mapRef = useRef(null);
    const map = useRef(null);
    const markers = useRef([]);
    const infowindow = useRef(null);

    const userAddress = user?.addr1?.split(" ").slice(0, 2).join(" ");

    const [tool, setTool] = useState([]);

    const mapTools = () => {
        console.log(userAddress);
        if (!userAddress) return;
        myAxios(token, setToken)
            .get(`tool/mapList`, {
                params: {
                    keyword: userAddress,
                    username: user.username,
                },
            })
            .then((res) => {
                console.log("API response:", res.data); // 배열인지 확인
                setTool(Array.isArray(res.data) ? res.data : [res.data]); // 배열 아니면 강제로 배열로
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (userAddress) {
            mapTools();
        }
    }, [userAddress]);

    // 관심 토글
    const toggleFavoriteTool = async (toolIdx) => {
        if (!user.username) {
            navigate("/zipddak/login");
            return;
        }

        await myAxios(token, setToken).post(`${baseUrl}/user/favoriteToggle/tool`, {
            toolIdx,
            username: user.username,
        });

        setTool((prev) => prev.map((t) => (t.toolIdx === toolIdx ? { ...t, favorite: !t.favorite } : t)));
    };

    useEffect(() => {
        if (!window.kakao || !mapRef.current || !tool?.length) return;

        // 1. 지도 초기화 (최초 1회)
        if (!map.current) {
            map.current = new window.kakao.maps.Map(mapRef.current, {
                center: new window.kakao.maps.LatLng(37.5665, 126.978),
                level: 3,
            });
            infowindow.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

            // [추가] 지도 자체를 클릭하면 열려있는 인포윈도우를 닫음
            window.kakao.maps.event.addListener(map.current, "click", () => {
                infowindow.current.close();
            });
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        // 주소 -> 좌표 변환을 Promise로 감싸기
        const getCoords = (t) => {
            return new Promise((resolve) => {
                const address = t.addr1 || t.tradeAddr1;
                if (!address) return resolve(null);

                geocoder.addressSearch(address, (result, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        resolve({
                            ...t,
                            lat: parseFloat(result[0].y),
                            lng: parseFloat(result[0].x),
                        });
                    } else {
                        resolve(null);
                    }
                });
            });
        };

        const updateMarkers = async () => {
            // 2. 모든 데이터를 좌표로 변환할 때까지 대기
            const results = await Promise.all(tool.map((t) => getCoords(t)));
            const validPositions = results.filter((p) => p !== null);

            // 3. 기존 마커 제거
            markers.current.forEach((m) => m.setMap(null));
            markers.current = [];

            const bounds = new window.kakao.maps.LatLngBounds();

            // 4. 좌표가 겹칠 경우 미세 조정 (Jittering)
            validPositions.forEach((pos, idx) => {
                let finalLat = pos.lat;
                let finalLng = pos.lng;

                // 이전 마커들과 위치가 정확히 같은지 확인
                for (let i = 0; i < idx; i++) {
                    if (validPositions[i].lat === finalLat && validPositions[i].lng === finalLng) {
                        // 위도/경도를 아주 미세하게 틀어줌 (약 2~5m 차이)
                        finalLat += (Math.random() - 0.5) * 0.0001;
                        finalLng += (Math.random() - 0.5) * 0.0001;
                    }
                }

                const markerPos = new window.kakao.maps.LatLng(finalLat, finalLng);
                const marker = new window.kakao.maps.Marker({
                    map: map.current,
                    position: markerPos,
                    title: pos.name,
                });

                // 마커 보관 및 범위 확장
                markers.current.push(marker);
                bounds.extend(markerPos);

                // 이벤트 등록
                // window.kakao.maps.event.addListener(marker, "mouseover", () => {
                //   infowindow.current.setContent(`<div style="padding:5px; font-size:12px;">${pos.name}</div>`);
                //   infowindow.current.open(map.current, marker);
                // });

                // 마커에 클릭 이벤트만 남기기
                window.kakao.maps.event.addListener(marker, "click", () => {
                    const content = `
    <div style="background:white; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.3); width:200px; overflow:hidden; font-family: sans-serif;">
      <img src="${pos.thumbnail}" style="width:100%; height:100px; object-fit:cover;" onerror="this.src='기본이미지경로'">
      <div style="padding:10px;">
        <div style="font-weight:bold; font-size:14px; margin-bottom:5px;">${pos.name}</div>
        <div style="color:#666; font-size:12px;">대여료: ${pos.rentalPrice.toLocaleString()}원</div>
        <button onclick="window.location.href='/detail/${pos.toolIdx}'" 
                style="margin-top:10px; width:100%; padding:8px; background:#007bff; color:white; border:none; border-radius:4px; cursor:pointer;">
          상세보기
        </button>
      </div>
    </div>
  `;

                    infowindow.current.setContent(content);
                    infowindow.current.open(map.current, marker);
                });

                // window.kakao.maps.event.addListener(marker, "mouseout", () => infowindow.current.close());
            });

            // 5. 마커가 하나라도 있으면 지도 범위 맞춤
            if (validPositions.length > 0) {
                map.current.setBounds(bounds);
            }
        };

        updateMarkers();
    }, [tool]);

    return (
        <>
            <div style={{ display: "flex", width: "100%"}}>
                <div
                    ref={mapRef}
                    style={{
                        width: "740px",
                        height: "480px",
                        borderRadius: "8px",
                    }}
                />

                <div style={{ width: "405px", overflowY: "auto", maxHeight: "480px", marginLeft: "20px" }}>
                    <div className="col-cm toolLocationcards">
                        {Array.isArray(tool) && tool.map((toolCard) => <MapTool key={toolCard.toolIdx} tool={toolCard} toggleFavoriteTool={toggleFavoriteTool} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationToolMap;
