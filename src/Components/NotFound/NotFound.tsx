import not_found from "./../../assets/Not_Found.jpg";

function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen">
      <img 
        src={not_found} 
        alt="Not Found" 
        className="w-[50%] object-cover" 
      />
    </div>
  );
}

export default NotFound;
