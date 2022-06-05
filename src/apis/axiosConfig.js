import axios from "axios";

//기본 경로 설정
//axios.defaults.baseURL = "http://localhost";
//윗줄, 개발 시에는 주석 처리, 빌드시에는 주석 해제

//요청 HTTP에 Authorization 헤더추가
function addAuthHeader(accessToken) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`; //accessToken을 헤더에 넣어줌
}

//요청 HTTP에 Authorization 헤더제거
function removeAuthHeader() {
  delete axios.headers.common["Authorization"];
}

export default {
  addAuthHeader,
  removeAuthHeader,
};