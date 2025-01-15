import { motion } from "framer-motion";
import { useAuth } from "../../Hooks/AuthContext";
import header_image from "./../../assets/Header_img.jpg";
import wallet_img from "../../assets/wallet.png";
import { Link } from "react-router-dom";

function Header() {
  const { authState } = useAuth();
  const { userId } = authState;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center pt-[10rem] bg-gray-50 px-4 md:px-0">
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="px-4 md:px-8 md:ml-[5rem]">
          <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-2 mb-4">
            <motion.img
              src={wallet_img}
              alt="Wallet Logo"
              className="h-[6rem] w-[6rem] md:h-[5rem] md:w-[5rem] mb-4 md:mb-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <h1 className="text-[3rem] md:text-[5rem] font-bold text-gray-800 text-center md:text-left">eWallet</h1>
          </div>
          <p className="text-md mt-0 md:text-md text-gray-600 mb-6">
            Your digital wallet solution for secure and easy transactions.
          </p>
          <Link to={`dashboard/${userId}`}>
            <motion.button
              className="border rounded-md py-2 px-6 md:px-8 hover:bg-slate-100 transition border-gray-800 text-gray-800 shadow-sm hover:shadow-md"
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
        className="flex-1 mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
      >
        <img src={header_image} alt="header" className="w-[60rem] max-w-xs md:max-w-md lg:max-w-lg mx-auto" />
      </motion.div>
    </div>
  );
}

export default Header;
