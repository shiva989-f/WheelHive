import { ToastContainer } from 'react-toastify'
import CarSearchBar from '../components/CarSearchBar'
import HeroComponent from '../components/HeroComponent'
import LoadCar from '../components/LoadCar'
import LogoutPopup from '../components/LogoutPopup'

const Home = () => {
    
    return (
        <div className='px-2 font-poppins md:px-8 lg:px-12'>
            {/* <Navbar /> */}
            <HeroComponent onLogoutOpen={()=> setIsLogoutOpen(true)} />
            <LoadCar/>
            <LogoutPopup />
            <ToastContainer />
        </div>
    )
}

export default Home
