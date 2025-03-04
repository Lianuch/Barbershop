import IClient from "./IClient";

export interface AuthState {
  client: IClient | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}
