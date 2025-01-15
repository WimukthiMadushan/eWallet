import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";
import wallet_img from "../../assets/wallet.png";
import { User } from "lucide-react"; // Import User icon from Lucide
import { Menu, X } from "lucide-react"; // Import Menu and Close icons

function NavBar() {
  const { authState, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md px-6 md:px-10 fixed w-full z-10">
      <Link to="/" className="flex items-center space-x-2">
        <img src={wallet_img} alt="Wallet Logo" className="h-8 w-8 md:h-[3rem] md:w-[3rem]" />
        <span className="text-lg md:text-xl font-bold text-gray-800 md:text-[2rem]">eWallet</span>
      </Link>

      <div className="flex items-center md:hidden">
        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className={`flex-col md:flex md:flex-row md:items-center ${menuOpen ? "flex" : "hidden"} md:flex-row`}>
        {authState.username ? (
          <div className="relative flex items-center space-x-2 mt-4 md:mt-0">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-sm font-medium text-gray-800 hover:text-gray-600"
            >
              <User className="w-5 h-5 text-gray-800" />
              <span className="hidden md:block">Hi, {authState.username}!</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-[3rem] mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-20">
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/login' className="mt-4 md:mt-0">
            <button className="border rounded-md bg-none py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md text-sm">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
