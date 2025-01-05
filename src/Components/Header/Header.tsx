import header_image from "./../../assets/Header_img.jpg";
import wallet_img from "../../assets/wallet.png";

function Header() {
  return (
    <div className='flex items-center justify-center pt-[5rem]  bg-gray-50'>
      <div className="flex-1 text-left">
      <div className="px-8 ml-[5rem]">
        <div className="flex items-center space-x-2">
        <img src={wallet_img} alt="Wallet Logo" className="h-[5rem] w-[5rem]" />
        <h1 className="text-[5rem] font-bold text-gray-800 mb-4 text-center">eWallet</h1>
      </div>
        <p className="text-md text-gray-600 mb-6">Your digital wallet solution for secure and easy transactions.</p>
        <button className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md">
          Get Started
        </button>
        </div>
      </div>
      <div className="flex-1">
        <img src={header_image} alt="header" className="mt-12"/>
      </div>
    </div>
  );
}

export default Header;
