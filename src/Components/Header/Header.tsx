import { motion } from "framer-motion";
import header_image from "./../../assets/Header_img.jpg";
import wallet_img from "../../assets/wallet.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='flex items-center justify-center pt-[5rem] bg-gray-50'>
      <motion.div
        className="flex-1 text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-8 ml-[5rem]">
          <div className="flex items-center space-x-2">
            <motion.img
              src={wallet_img}
              alt="Wallet Logo"
              className="h-[5rem] w-[5rem]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <h1 className="text-[5rem] font-bold text-gray-800 mb-4 text-center">eWallet</h1>
          </div>
          <p className="text-md text-gray-600 mb-6">Your digital wallet solution for secure and easy transactions.</p>
          <Link to='dashboard'>
            <motion.button
              className="border rounded-md py-2 px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.div>
      <motion.div
  className="flex-1"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
>
  <img src={header_image} alt="header" className="mt-12" />
</motion.div>

    </div>
  );
}

export default Header;
