import { Link } from "react-router-dom";
import wallet_img from "../../assets/wallet.png";

function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md px-10 fixed w-full z-10">
      <Link to="/" className="flex items-center space-x-2">
        <img src={wallet_img} alt="Wallet Logo" className="h-[3rem] w-[3rem]" />
        <span className="text-xl font-bold text-gray-800 text-[2rem]">eWallet</span>
      </Link>
      <Link to='/login'>
  <button className="border rounded-md bg-none py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md">
    Login
  </button>
</Link>
 
    </nav>
  );
}

export default NavBar;
