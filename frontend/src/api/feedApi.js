import api from "./api";

export const getFeedList = async ({ writerNo, password }) => {
  const response = await api.post("/feed/getFeedList", {
    writerNo,
    password,
  });
  return response.data;
};

export const registFeed = async (param) => {
  const response = await api.post("/feed/registFeed", param);
  return response.data;
};
