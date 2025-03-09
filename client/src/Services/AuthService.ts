import $api from "./httpCommon";
import { AuthResponse } from "../interfaces/authResponse";

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post<AuthResponse>("/clients/login", { email, password });
  }

  static async registration(email: string, password: string) {
    return $api.post<AuthResponse>("/clients/registration", { email, password });
  }

  static async logout() {
    return $api.post("/clients/logout");
  }
}
