
function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <p className="text-sm text-gray-600 cursor-pointer">
        © {new Date().getFullYear()} eWallet. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer