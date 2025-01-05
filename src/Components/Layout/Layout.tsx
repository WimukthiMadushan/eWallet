import { Outlet } from "react-router-dom"
import NavBar from "../NavBar/NavBar"
import Footer from "../Footer/Footer"


function Layout() {
  return (
    <div className="layout h-100vh">
          <NavBar />
          <Outlet />
          <Footer/>
    </div>
  )
}

export default Layout