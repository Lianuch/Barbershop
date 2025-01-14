import React, { useEffect, useState } from 'react'
import { Barbers } from '../Types/Barbers'
import axios from 'axios'

export const useBarbers = () => {

  const [barber, setBarber] = useState<Barbers[]>([])

  useEffect(() => {
      const tempFetchBarbers = async () => {
          try{

              const response = await axios.get("http://localhost:5000/barbers");
              setBarber(response.data);
              
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
