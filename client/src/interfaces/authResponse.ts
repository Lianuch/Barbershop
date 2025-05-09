import IClient from "./IClient";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  client: IClient;
}
