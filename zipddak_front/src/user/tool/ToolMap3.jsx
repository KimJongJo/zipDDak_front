import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom, userAtom } from "../../atoms";
import { myAxios } from "../../config";

const LocationToolMap = () => {
  const [user] = useAtom(userAtom);
  const [token, setToken]= useAtom(tokenAtom);
  const mapRef = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const infowindow = useRef(null);
  const [selectedToolId, setSelectedToolId] = useState(null);

   const toolAddrString = "서울 강동구 아리수로 46-4";
    const toolAddress = toolAddrString.split(' ').slice(0, 2).join(' ');

    const toolDirectAddrString = "서울 강동구 아리수로 46-4";
    const toolDirectAddress = toolDirectAddrString.split(' ').slice(0, 2).join(' ');

  const [locationTools, setLocationTools]= useState([]);
  const addr = toolAddrString? toolAddress : toolDirectAddress;

  const mapTools = () => {
    console.log(addr)
    myAxios(token, setToken).get(`tool/mapList?keyword=${addr}`)
    .then(res=> {
        console.log(res.data);
        setLocationTools(res.data);
    })
    .catch(err=> {
        console.log(err);
    })
  }

  useEffect(()=> {
    mapTools();
  },[])


useEffect(() => {
  if (!window.kakao || !locationTools.length) return;

  const firstTool = locationTools[0];
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 지도 초기화
  geocoder.addressSearch(firstTool.addr1, (result, status) => {
    if (status !== window.kakao.maps.services.Status.OK) return;
    const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
    map.current = new window.kakao.maps.Map(mapRef.current, {
      center: coords,
      level: 3,
    });
    infowindow.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 마커 추가
    markers.current.forEach((m) => m.setMap(null));
    markers.current = [];

    locationTools.forEach((tool) => {
      geocoder.addressSearch(tool.addr1, (res, stat) => {
        if (stat === window.kakao.maps.services.Status.OK) {
          const pos = new window.kakao.maps.LatLng(res[0].y, res[0].x);
          const marker = new window.kakao.maps.Marker({
            position: pos,
            map: map.current,
            title: tool.name,
          });
          markers.current.push(marker);

          marker.addListener("click", () => {
            infowindow.current.setContent(
              `<div style="padding:5px;">${tool.name}<br>${tool.addr1}</div>`
            );
            infowindow.current.open(map.current, marker);
            setSelectedToolId(tool.id);
          });
        }
      });
    });
  });
}, [locationTools]);

  return (
    <div style={{ display: "flex" }}>
      <div ref={mapRef} style={{ width: "60%", height: "500px" }} />

      <div style={{ width: "40%", overflowY: "auto", maxHeight: "500px" }}>
        {locationTools.map((tool) => (
          <div
            key={tool.id}
            style={{
              border: selectedToolId === tool.id ? "2px solid blue" : "1px solid #ccc",
              margin: "5px",
              padding: "5px",
            }}
          >
            <strong>{tool.name}</strong>
            <div>{tool.addr1}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationToolMap;
