import { SlClose } from "react-icons/sl";
import { Link } from "react-router-dom";

export const Unbooked = () => {
  const handleProcced = () => {
    localStorage.removeItem("passenger");
    localStorage.removeItem("businfo");
    localStorage.removeItem("stripesession");
    localStorage.removeItem("bookingConfirmed");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-8">
      <div>
        <SlClose color="red" size="100px" />
      </div>
      <h2 className="text-2xl font-bold">Bus Booking Failed</h2>
      <Link to="/">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleProcced}
        >
          Click To Book New
        </button>
      </Link>
    </div>
  );
};
