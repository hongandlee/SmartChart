import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://smartchart.vercel.app/auth/kakao/callback",
          { code }
        );
        console.log(response);
        console.log(code);
        navigate("/mypage");
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>KakaoAuth</div>;
};

export default KakaoAuth;
