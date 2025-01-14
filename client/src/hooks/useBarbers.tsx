import { useEffect, useState } from 'react'
import { Barbers } from '../Types/Barbers'
import axios from 'axios'

export const useBarbers = () => {

  const [barber, setBarber] = useState<Barbers[]>([])

  useEffect(() => {
      const tempFetchBarbers = async () => {
          try{
            console.log("Fetching barbers...");

              const response = await axios.get("http://localhost:5000/barbers");
              setBarber(response.data);
              console.log("Data fetched:", response.data);

          }
          catch(e){
              console.log(e);
          }
      }
      tempFetchBarbers()
  }, [])



  return {
      barber

  }
}
