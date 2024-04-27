import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authActions";
import { changeform } from "../Redux/Reducers/WhichForm";
import { useEffect } from "react";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.auth);

  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    dispatch(registerUser(data));
  };

  useEffect(() => {
    if (success) {
      dispatch(changeform("login"));
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("username")}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("email")}
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("password")}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mobileNumber" className="block mb-1">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobileNumber"
          placeholder="Mobile Number"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          {...register("mobilenumber")}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("firstname")}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            {...register("lastname")}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
};
