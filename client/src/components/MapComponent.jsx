import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const { kakao } = window;

const MapComponent = ({ setIsLoading }) => {
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [markers, setMarkers] = useState([]);
  const [hospitalData, setHospitalData] = useState({});

  // 지도에서 병원 진료과별로 선택하기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/patient/reservation-map-view/");
        setHospitalData(response.data);
      } catch (error) {
        // 에러 처리
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (map) {
      if (Object.keys(hospitalData).length > 0) {
        createMarkers(hospitalData);
      }
    }
  }, [map, hospitalData]);
  // 모든 병원 데이터 가져옴

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}`;
    script.onload = initializeMap;
    document.body.appendChild(script);
  }, []);

  function addDecimalToString(stringValue) {
    // 문자열의 앞부분과 뒷부분을 나누어 소수점을 추가
    const integerPart = stringValue.slice(0, -7); // 소수점 앞부분
    const decimalPart = stringValue.slice(-7); // 소수점 뒷부분
    return `${integerPart}.${decimalPart}`;
  }
  const initializeMap = () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new kakao.maps.LatLng(0, 0),
      level: 9,
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new kakao.maps.LatLng(latitude, longitude);
          map.setCenter(userLocation);

          setIsLoading(false);
        },
        (error) => {
          toast.error("사용자 위치 가져오는데 실패했습니다.");
          setIsLoading(false);
        }
      );
    } else {
      toast.error("지리적 위치 정보를 사용할 수 없습니다.");
      setIsLoading(false);
    }

    setMap(map);
    createMarkers(hospitalData);
  };

  const createMarkers = (data) => {
    const newMarkers = [];
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    for (const specialty in data) {
      const hospitals = data[specialty];
      hospitals.forEach((hospital) => {
        if (selectedSpecialty === "" || specialty === selectedSpecialty) {
          const markerPosition = new kakao.maps.LatLng(
            addDecimalToString(hospital.mapy),
            addDecimalToString(hospital.mapx)
          );

          const marker = new kakao.maps.Marker({
            position: markerPosition,
            title: hospital.hospitalName,
            map: map,
          });

          kakao.maps.event.addListener(marker, "click", function () {
            openInfoWindow(marker, hospital);
          });

          newMarkers.push(marker);
        }
      });
    }

    setMarkers(newMarkers);
  };

  const openInfoWindow = (marker, hospital) => {
    const { id, hospitalName } = hospital;

    const content = `
    <div style="padding: 10px; background-color: #fff; border: 1px solid #ccc;">
 <button id="closeInfoWindowButton" style="position: absolute; top: 5px; right: 5px; color: black; border: none; padding: 5px 10px; cursor: pointer;">X</button>      <p style="font-weight: bold; margin-bottom: 5px;">${hospitalName}</p>
      <p style="font-size: 12px">${hospital.hospitalAddress}</p>
      <button id="infoWindowButton" style="background-color: #1798e1; color: #fff; border: none; padding: 5px 10px; cursor: pointer; margin-top: 5px;">예약하기</button>

      </div>`;

    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(
      addDecimalToString(hospital.mapy),
      addDecimalToString(hospital.mapx)
    );
    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
    const button = document.getElementById("infoWindowButton");
    button.addEventListener("click", () => handleButtonClick(id));
    const closeInfoWindowButton = document.getElementById(
      "closeInfoWindowButton"
    );
    closeInfoWindowButton.addEventListener("click", () => {
      customOverlay.setMap(null); // 오버레이를 숨깁니다.
    });
  };

  const handleButtonClick = (id) => {
    navigate(`/appointment/${id}`);
  };

  const getFilteredHospitals = () => {
    if (selectedSpecialty === "") {
      return hospitalData;
    } else {
      const filteredData = {};
      filteredData[selectedSpecialty] = hospitalData[selectedSpecialty];
      return filteredData;
    }
  };
  const updateMap = () => {
    const filteredHospitals = getFilteredHospitals();

    markers.forEach((marker) => {
      marker.setMap(null);
    });

    createMarkers(filteredHospitals);
  };

  useEffect(() => {
    updateMap();
  }, [selectedSpecialty]);

  return (
    <Container>
      <Options>
        <Option>
          <input
            type="radio"
            value=""
            checked={selectedSpecialty === ""}
            onChange={() => setSelectedSpecialty("")}
          />
          전체
        </Option>
        <Option>
          <input
            type="radio"
            value="내과"
            checked={selectedSpecialty === "내과"}
            onChange={() => {
              setSelectedSpecialty("내과");
            }}
          />
          내과
        </Option>
        <Option>
          <input
            type="radio"
            value="피부과"
            checked={selectedSpecialty === "피부과"}
            onChange={() => setSelectedSpecialty("피부과")}
          />
          피부과
        </Option>
        <Option>
          <input
            type="radio"
            value="안과"
            checked={selectedSpecialty === "안과"}
            onChange={() => setSelectedSpecialty("안과")}
          />
          안과
        </Option>
        <Option>
          <input
            type="radio"
            value="이비인후과"
            checked={selectedSpecialty === "이비인후과"}
            onChange={() => setSelectedSpecialty("이비인후과")}
          />
          이비인후과
        </Option>
        <Option>
          <input
            type="radio"
            value="치과"
            checked={selectedSpecialty === "치과"}
            onChange={() => setSelectedSpecialty("치과")}
          />
          치과
        </Option>
      </Options>
      <div id="map" style={{ width: "500px", height: "500px" }}></div>
    </Container>
  );
};

export default MapComponent;

const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 900px;
`;
const Options = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0rem 1.5rem 1.5rem;
  justify-content: space-between;
  width: 100%;
`;

const Option = styled.label`
  display: flex;
`;
