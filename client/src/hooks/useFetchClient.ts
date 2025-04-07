import { useEffect, useState } from "react";
import ClientService from "../Services/clientService";
import IClient from "../interfaces/IClient";

  export const useFetchClient = () => {

    const [client, setClient] = useState<IClient | null>(null);
    
  
    useEffect(() => {
      const fetchClient = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
          }
        try {
          const response = await ClientService.fetchClient(token);
  
          if (response?.data) {
            setClient(response.data);
          } else {
            setClient(null);
          }
        } catch (e) {
          console.log(e);
          setClient(null);
        }
      };
  
      fetchClient();
    
    },[] )
    
    
    return client;
  }
  