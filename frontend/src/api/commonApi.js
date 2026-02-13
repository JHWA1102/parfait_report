import api from "./api";

// 코드 리스트 조회
export const getCodeList = async (mstCode) => {
  const response = await api.get("/common/code", {
    params: { mst_code: mstCode },
  });
  return response.data;
};
