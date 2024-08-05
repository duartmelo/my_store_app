export interface LoginInterface {
  username: string;
  password: string;
}

export interface LoginRequestParamsInterface  {
  clientID: string;
  responseType: "code" | "token"; // code or token
  redirectUri?: string;
  scope: string;
  state: string;
}
