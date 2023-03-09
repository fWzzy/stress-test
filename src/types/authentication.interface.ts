export interface IAuthenticationPayload {
  user: {
    id: number;
    idx: string;
  };
  payload: {
    access_token: string;
    refresh_token?: string;
  };
}
