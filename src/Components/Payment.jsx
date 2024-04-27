import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { passengeraddition } from "../Redux/Reducers/passengerslice";

import { loadStripe } from "@stripe/stripe-js";

export const Payment = () => {
  const dispatch = useDispatch();
  const dataaa = useSelector((state) => state.authlog);
  const { seatnumber, price, scheduleId, passenger_details, URL } = useSelector(
    (state) => state.passenger
  );
  const { businfo, success } = useSelector((state) => state.buses);
  const { register, handleSubmit } = useForm();

  const submitForm = (data) => {
    localStorage.setItem(
      "passenger",
      JSON.stringify({
        seatnumber: seatnumber,
        price,
        scheduleId: scheduleId,
        passenger_details: data,
      })
    );
    dispatch(passengeraddition(data));
    const makePayment = async () => {
      let mainprice = price[scheduleId];
      let seat = seatnumber[scheduleId];
      let carts = [{ mainprice: mainprice, seat: seat }];
      const stripe = await loadStripe(
        "pk_test_51P5S8uSC6z6owDTtOk5RuU1O6roll4X0sIPgdPqNc4R6I9YL5vfj96rI9fmEy7ESU7EBCy4M0Taps2iJtKKYj3EJ00w1Ofmdpm"
      );

      const tt = {
        products: carts,
      };

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(
        "https://backendbusbooking.onrender.com/api/v1/payment",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(tt),
        }
      );

      const session = await response.json();
      localStorage.setItem("stripesession", JSON.stringify(session));

      window.location.href = session.url;
    };
    makePayment();
  };

  if (!success) {
    return (
      <Navigate to="/">
        <div className="flex justify-center items-center flex-col">
          Something Went Wrong
        </div>
      </Navigate>
    );
  }

  const bus = businfo.find((bus) => {
    return bus._id === scheduleId;
  });

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col sm:flex-row justify-around items-center sm:items-start"
    >
      <div className="w-3/4">
        <div className="flex flex-col gap-2 m-2 px-3 border border-black-200">
          <div className="flex gap-2 items-center ">
            <h3 className="text-xl font-semibold">{bus.trip.bus_name}</h3>
            <span className="text-[10px] inline-block bg-blue-400 w-[25px] flex justify-center items-center rounded-[5px] mt-1">
              {bus.trip.ratings}.0
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <span>{bus.trip.bus_type}</span>
            <hr className="w-[20px] border border-black" />
            <span>{bus.trip.totalseats}</span>
            <hr className="w-[20px] border border-black" />
            <span>{bus.trip.seatavailable}</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <span>{bus.trip.depertureTime},</span>
              <span>{bus.trip.scheduleDate}</span>
            </div>
            <hr className="w-[20px] border border-black" />
            <div className="flex gap-1 items-center">
              <span>{bus.trip.arrivalTime},</span>
              <span>{bus.trip.scheduleDate}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">{bus.trip.boarding}</div>
            <hr className="w-[20px] border border-black" />
            <div className="flex gap-1 items-center">{bus.trip.dropping}</div>
          </div>
        </div>
        <div>
          <div className="mx-2 text-xl font-bold">
            <span>Enter Passenger Detail</span>
          </div>
          <div className="gap-2 m-2 p-3 border border-black-200">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  {...register("name")}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="email"
                  type="email"
                  {...register("email")}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="gender"
                  {...register("gender")}
                  required
                >
                  <option>Select</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="age"
                >
                  Age (On yrs)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="age"
                  type="number"
                  {...register("age")}
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="mobile"
                >
                  Mobile No
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  id="mobile"
                  type="tel"
                  {...register("mobilenumber")}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" m-2 px-3 border border-black-200 w-[250px] h-[275px] flex flex-col gap-4">
        <div>
          <span>Fare Details</span>
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span>INR: {price ? price[bus._id] - 100 : "Choose Seat"}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>INR: 100</span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Seat No.</span>
          <span>{seatnumber ? seatnumber[bus._id] : "Select Seat"}</span>
        </div>
        <hr />
        <div>
          <span>Fare Details</span>
          <div className="flex justify-between">
            <span>Total Amount</span>
            <span>INR: {price ? price[bus._id] : "Choose Seat"}</span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Proceed to Book
        </button>
      </div>
    </form>
  );
};
