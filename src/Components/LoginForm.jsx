import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { openandcloseLoginModal } from "../Redux/Reducers/Modal";

export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.Modal);

  const { error, data } = useSelector((state) => state.authlog);

  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (data) {
      dispatch(openandcloseLoginModal(!isOpen));
      navigate("/myprofile");
    }
  }, [data, navigate]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("email")}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("password")}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
};
