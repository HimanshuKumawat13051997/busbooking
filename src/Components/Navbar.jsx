import { useDispatch, useSelector } from "react-redux";
import { openandcloseLoginModal } from "../Redux/Reducers/Modal";
import { changeform } from "../Redux/Reducers/WhichForm";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const isOpen = useSelector((state) => state.Modal);
  const dispatch = useDispatch();
  const handleopenandclose = (event) => {
    const value = event.target.value;
    dispatch(changeform(value));
    dispatch(openandcloseLoginModal(!isOpen));
  };
  const { data } = useSelector((state) => state.authlog);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">BusBooking</div>
        {!data ? (
          <div>
            <button
              className="text-white mx-2"
              onClick={handleopenandclose}
              value="login"
            >
              Login
            </button>

            <button
              className="text-white mx-2"
              value="register"
              onClick={handleopenandclose}
            >
              Register
            </button>
          </div>
        ) : (
          <div>
            <Link to="myprofile">
              <button className="text-white mx-2" value="login">
                My Profile
              </button>
            </Link>
            <Link to="/">
              <button className="text-white mx-2" value="login">
                Book Ticket
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
