import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { useEffect, useState } from "react";
import axios from "axios";

export const BookedDetails = () => {
  const { data } = useSelector((state) => state.authlog);
  const userId = data._id;
  const passenger = JSON.parse(localStorage.getItem("passenger"));
  const transactionId = JSON.parse(localStorage.getItem("stripesession")).id;
  const scheduleId = passenger.scheduleId;
  const price = passenger.price[scheduleId];
  const seat = passenger.seatnumber[scheduleId];
  const passenger_details = passenger.passenger_details;
  const businfo = JSON.parse(localStorage.getItem("businfo"));
  const status = "success";
  const bus = businfo.find((bus) => {
    return bus._id === scheduleId;
  });
  const isBookingConfirmed = localStorage.getItem("bookingConfirmed");
  const [tickedID, setTikcetID] = useState("");

  useEffect(() => {
    if (transactionId) {
      const seatedit = async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };

          if (!isBookingConfirmed) {
            const { data } = await axios.patch(
              "https://backendbusbooking.onrender.com/api/v1/update-seat",
              { seat, scheduleId },
              config
            );
            localStorage.setItem("bookingConfirmed", true);
          }

          let { data } = await axios.post(
            "https://backendbusbooking.onrender.com/api/v1/bookingcomp",
            {
              userId,
              scheduleId,
              passenger_details,
              transactionId,
              status,
              price,
            },
            config
          );

          setTikcetID(data.data._id);
        } catch (error) {
          console.log(error);
        }
      };
      seatedit();
    }
  }, [transactionId, tickedID]);

  const handleProcced = () => {
    localStorage.removeItem("passenger");
    localStorage.removeItem("businfo");
    localStorage.removeItem("stripesession");
    localStorage.removeItem("bookingConfirmed");
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 p-8">
        <div>
          <SiTicktick color="green" size="100px" />
        </div>
        <h2 className="text-2xl font-bold">Booking has been Confirmed</h2>
        <div>
          <span className="text-lg font-semibold">Ticket ID: </span>
          <span className="">{tickedID}</span>
        </div>
        <div>
          <span className="text-lg font-semibold">Payent ID: </span>
          <span>{transactionId}</span>
        </div>
        <div>
          <span className="text-lg font-semibold">Passenger Details: </span>
          <span>
            {passenger_details.name}, {passenger_details.gender},{" "}
            {passenger_details.age}yrs
          </span>
        </div>
        <div>
          <span className="text-lg font-semibold">Price & Seat No. : </span>
          <span>
            INR: {price} & {seat}
          </span>
        </div>
        <div>
          <Link to="/">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleProcced}
            >
              Click To Book New
            </button>
          </Link>
        </div>
      </div>
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
    </div>
  );
};
