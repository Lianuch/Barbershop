import { About } from "../../components/About/About"
import { BarberList } from "../../components/BarberList/BarberList"
import { Contacts } from "../../components/Contacts/Contacts"
import { FavorsList } from "../../components/FavorList/FavorsList"
import { Favors } from "../../components/Favors/Favors"
import Footer from "../../components/Footer/Footer"
import { Header } from "../../components/Header/Header"

export const HomePage = () => {
  return (
    <>
    <Header/>  
    <About/>
    {/* <Favors/> */}
    <FavorsList/>
    <BarberList/> 
    <Contacts/>
    <Footer/>
    </>
  )
}
