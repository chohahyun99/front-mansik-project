
import axios from "axios";
import apiAuth from "@/apis/auth";

//게시물 목록
async function getBoardList(pageNo = 1) {
  let response = null;
  try {
    response = await axios.get("/board/list", { params: { pageNo: pageNo } }); //쿼리스트링 방식으로 넘어감
    return { result: "success", data: response.data };
  } catch (error) {
    //console.log(error);
    if (error.response) {
      //서버 응답이 존재
      if (error.response.status === 403) {
          //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if (await apiAuth.refreshToken()) {
         //재귀 호출을 할 경우 비동기 중복이 되므로 하단처럼 작성하는 것이 더 좋음
          response = await axios.get("/board/list", { params: { pageNo: pageNo } }); //쿼리스트링 방식으로 넘어감
          return { result: "success", data: response.data };
        }
      }
    } else {
      //서버 응답이 존재하지 않음[ 네트워크 오류 ]
      return { result: "fail-network" };
    }
  }
  if (response != null) {
    return response.data; //리턴된 json이 data에 생성됨
  } else {
    return null;
  }
}

//게시물 쓰기(멀티 파트로 구성해서 전달)
// async 를 쓰면 내부가 자체가 비동기 방식으로 실행되기 때문에 내부에서 까지 비동기 방식으로 진행 할 필요가 없다
//그러므로 axios의 비동기 방식을 동기 방식으로 변경하는 await를 사용한다
async function createBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.post("/board/", multipartFormData);
    dbBoard = response.data;
  } catch (error) {
    if (error.response) {
        //서버 응답이 존재
        if (error.response.status === 403) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          if (await apiAuth.refreshToken()) {
           //재귀 호출을 할 경우 비동기 중복이 되므로 하단처럼 작성하는 것이 더 좋음
           const response = await axios.post("/board/", multipartFormData);
           dbBoard = response.data;
          }
        }
      }
}
}


//게시물 가져오기
async function readBoard(bno, hit) {
  let board = null;
  try {
    const response = await axios.get(`/board/${bno}?hit=${hit}`);
    board = response.data;
  } catch (error) {
    if (error.response) {
        //서버 응답이 존재
        if (error.response.status === 403) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          if (await apiAuth.refreshToken()) {
            const response = await axios.get(`/board/${bno}?hit=${hit}`);
            board = response.data;
          }
        }
      }
  }
  return board;
}

//파일 다운로드
async function downloadBoardAttach(bno) {
  let blob = null;
  try {
    //다운로드 받을 방식이 blob 이라고 지정해야 response.data에 blob을 지정할 수 있음
    const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" });
    blob = response.data;
  } catch (error) {
    if (error.response) {
        //서버 응답이 존재
        if (error.response.status === 403) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          if (await apiAuth.refreshToken()) {
            const response = await axios.get(`/board/battach/${bno}`, { responseType: "blob" });
            blob = response.data;
          }
        }
      }
 }
  
  return blob;
}

//게시물 삭제
async function deleteBoard(bno) {
  let result = null;
  try {
    const response = await axios.delete(`/board/${bno}`);
    result = response.data.result;
  } catch (error) {
    if (error.response) {
        //서버 응답이 존재
        if (error.response.status === 403) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          if (await apiAuth.refreshToken()) {
           //재귀 호출을 할 경우 비동기 중복이 되므로 하단처럼 작성하는 것이 더 좋음
           const response = await axios.delete(`/board/${bno}`);
           result = response.data.result;
          }
        }
      }
  }
  return result;
}

//boardUpdate
async function updateBoard(multipartFormData) {
  let dbBoard = null;
  try {
    const response = await axios.put(`/board/`, multipartFormData);
    dbBoard = response.data;
  } catch (error) {
    if (error.response) {
        //서버 응답이 존재
        if (error.response.status === 403) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          if (await apiAuth.refreshToken()) {
           //재귀 호출을 할 경우 비동기 중복이 되므로 하단처럼 작성하는 것이 더 좋음
           const response = await axios.put(`/board/`, multipartFormData);
           dbBoard = response.data;
          }
        }
      }
  }
  return dbBoard;
}
//내보내기
export default {
  getBoardList: getBoardList,
  createBoard: createBoard,
  readBoard: readBoard,
  downloadBoardAttach: downloadBoardAttach,
  deleteBoard: deleteBoard,
  updateBoard: updateBoard,
};
