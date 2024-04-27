import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Reducers/authLogin";
import { findhistory } from "../Redux/Reducers/UserBookingslicee";

export const Myprofile = () => {
  const data = useSelector((state) => state.authlog);
  const m = useSelector((state) => state.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useContext(() => {
    if (!data.refreshToken) {
      navigate("/");
    }
  });

  const id = data.data._id;

  const handlelogout = () => {
    dispatch(logout());
  };

  const handleDetails = () => {
    dispatch(findhistory(id));
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-2">
        <div className="text-center mb-4">
          <img
            className="w-20 h-20 rounded-full mx-auto mb-4"
            src="https://via.placeholder.com/150"
            alt="Profile"
          />
          <h1 className="text-2xl font-semibold">
            {data.data.firstname} {data.data.lastname}
          </h1>
        </div>
        <div className="text-left mb-4">
          <h2 className="text-lg font-semibold mb-2">About Me</h2>
          <span className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <div className="text-left">
          <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
          <p className="text-gray-600">
            Email: {data.data.email}
            <br />
            Phone: {data.data.mobilenumber}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="text-white w-20 h-8 rounded-md bg-black"
            onClick={handlelogout}
          >
            Logout
          </button>
          <Link to={"/userbooking"}>
            <button
              className="text-white w-48 h-8 rounded-md bg-black"
              onClick={handleDetails}
            >
              Booked Tickets
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
