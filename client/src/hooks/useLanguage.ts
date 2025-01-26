import { useEffect } from "react"
import { useAppSelector } from "./useAppSelector"
import i18n from "i18next";

export const useLanguage = ():void =>{
    const {currentLanguage} = useAppSelector((state)=>state.language)
    useEffect(()=>{
        i18n.changeLanguage(currentLanguage)
    },[currentLanguage])
}