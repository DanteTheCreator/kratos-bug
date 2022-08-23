import axios from "axios";

export interface GetId  {
  id: Id;
  type: string;
  expires_at: string;
  issued_at: string;
  request_url: string;
  ui: {
    action: string;
  };
};

export type Id = {
  id: string;
};

export const getLoginFlow = async () => {
  try {
    const { data, status } = await axios.get<GetId>(
      "http://localhost:4433/self-service/login/browser",
      {
        params: {
          Accept: "application/json",
        },
      }
    );
    console.log(status);
    return data;
  } catch (e) {}
};
