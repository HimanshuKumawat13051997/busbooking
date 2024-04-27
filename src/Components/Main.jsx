import Select from "react-select";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { buses } from "../Redux/Reducers/searchbus";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const cities = [
  { label: "Jaipur", value: "Jaipur" },
  { label: "Delhi", value: "Delhi" },
  { label: "Udaipur", value: "Udaipur" },
];

export const MainBody = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const busdetails = useSelector((state) => state.buses);
  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch(buses(data));
  };

  useEffect(() => {
    if (busdetails.success) {
      navigate("/busbooking");
    }
  }, [busdetails.success]);

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col justify-between mt-5 mx-2"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">From</h2>
          <Select
            options={cities}
            placeholder="Departure city"
            onChange={(e) => {
              setValue("from", e.value.toLowerCase());
            }}
          />
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">To</h2>
          <Select
            options={cities}
            placeholder="Destination city"
            onChange={(e) => {
              setValue("to", e.value.toLowerCase());
            }}
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold">Date of Travel</label>
        <input
          type="date"
          className="border p-2 w-full"
          {...register("date")}
        />
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Search
        </button>
      </div>
    </form>
  );
};
