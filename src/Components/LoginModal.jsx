import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { openandcloseLoginModal } from "../Redux/Reducers/Modal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useNavigate } from "react-router-dom";

export const LoginModal = () => {
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.Modal);
  const valueofform = useSelector((state) => state.formc);
  const dispatch = useDispatch();
  const handleopenandclose = () => {
    dispatch(openandcloseLoginModal(!isOpen));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleopenandclose}
      contentLabel="Login Modal"
      className="modal"
      overlayClassName="modal-overlay"
      ariaHideApp={false}
    >
      <div className="dd">
        <div className="insidedd p-5">
          <h2 className="text-lg font-semibold mb-4">
            {valueofform === "login" ? "Login" : "Register"}
          </h2>

          {valueofform === "login" ? <LoginForm /> : <RegisterForm />}

          <button
            className="bg-blue-500 text-white my-5 py-2 px-4 rounded hover:bg-blue-600"
            onClick={handleopenandclose}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
