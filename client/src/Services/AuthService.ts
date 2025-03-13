import $api from "./httpCommon";
import { AuthResponse } from "../interfaces/authResponse";

export default class AuthService {
  static async login(email: string, password: string) {
    return $api.post<AuthResponse>("/clients/login", { email, password });
  }

  static async registration(name: string,email: string, password: string) {
    return $api.post<AuthResponse>("/clients/registration", {name, email, password });
  }

  static async logout() {
    return $api.post("/clients/logout");
  }
  static async activate(link:string) {
    return $api.get(`/clients/activate/${link}`);
  }

}
