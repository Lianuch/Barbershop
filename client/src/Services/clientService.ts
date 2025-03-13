import IClient from "../interfaces/IClient";
import $api from "./httpCommon";
import { AxiosResponse } from "axios";

export default class ClientService {
  static fetchClients(): Promise<AxiosResponse<IClient[]>> {
    return $api.get<IClient[]>("/clients");
  }

  static async fetchClient(token: string) {
    return $api.get("/clients/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }
}
