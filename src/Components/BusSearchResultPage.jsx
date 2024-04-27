// components/BusSearchResultPage.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  indexstorage,
  pricechange,
  seatst,
} from "../Redux/Reducers/passengerslice";

export const BusSearchResultPage = () => {
  const navigate = useNavigate();
  const { businfo, success } = useSelector((state) => state.buses);
  const data = useSelector((state) => state.authlog);
  const [show, setShow] = useState({});
  const [highlighted, setHigh] = useState({});
  const { seatnumber, price, URL, scheduleId } = useSelector(
    (state) => state.passenger
  );
  const dispatch = useDispatch();
  const handleSeatView = (busId) => {
    setShow((prev) => ({
      ...prev,
      [busId]: !prev[busId],
    }));
  };

  const handleSeatSelection = (busId, seat, price, item) => {
    if (item === true) {
      return;
    }
    if (highlighted[seat + busId] == true) {
      setHigh({
        ...highlighted,
        [seat + busId]: false,
      });
      const newSeat = { [busId]: null };
      dispatch(seatst(newSeat));
      dispatch(pricechange({ [busId]: null }));
      dispatch(indexstorage(null));
      return;
    }
    const deselectedSeats = {};
    Object.keys(highlighted).forEach((prevSeat) => {
      deselectedSeats[prevSeat + busId] = false;
    });
    setHigh({
      ...deselectedSeats,
      [seat + busId]: true,
    });
    const newSeat = { [busId]: seat };
    dispatch(seatst(newSeat));
    dispatch(pricechange({ [busId]: price }));
    dispatch(indexstorage(busId));
  };

  const handletoPayment = () => {
    if (!data.refreshToken) {
      alert("Please Login");
    } else {
      navigate("/fillingpage");
    }
  };

  if (!success) {
    return (
      <Navigate to="/">
        <div className="flex justify-center items-center flex-col">
          Error in Finding Buses
        </div>
      </Navigate>
    );
  }

  return (
    <div className="container mx-auto mt-8 ">
      <h2 className="text-2xl font-semibold mb-4">Bus Search Results for</h2>
      {businfo.map((bus) => (
        <div key={bus._id} className="border p-4 mb-4 ">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex gap-2 items-center">
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
            </div>
            <div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => handleSeatView(bus._id)}
              >
                {show[bus._id] == true ? "Hide Seats" : "View Seats"}
              </button>
            </div>
          </div>
          {show[bus._id] && (
            <div className="flex sm:flex-row flex-col justify-around items-center sm:items-start mt-5">
              <div className="flex gap-2">
                <div className="border-2 border-black-400 p-2 ">
                  <div className="text-[10px] flex justify-center">
                    Upper Birth
                  </div>
                  <div>
                    <div className="  flex gap-5">
                      <div className="busseats">
                        {bus.trip.seatingStructure.upperbirth[0].dualseats.map(
                          (item, index) => {
                            const seatColor = item.isSelected
                              ? "booked"
                              : highlighted[item.seatnumber + bus._id]
                              ? "highlighted"
                              : "nonhigh";
                            return (
                              <span
                                key={index}
                                className={`border border-black-200 h-[40px] w-[20px] inline-block rounded ${seatColor}`}
                                onClick={() =>
                                  handleSeatSelection(
                                    bus._id,
                                    item.seatnumber,
                                    item.price,
                                    item.isSelected
                                  )
                                }
                              ></span>
                            );
                          }
                        )}
                      </div>
                      <div className="singleseats">
                        {bus.trip.seatingStructure.upperbirth[1].singleseats.map(
                          (item, index) => {
                            const seatColor = item.isSelected
                              ? "booked"
                              : highlighted[item.seatnumber + bus._id]
                              ? "highlighted"
                              : "nonhigh";
                            return (
                              <span
                                key={index}
                                className={`border border-black-200 h-[40px] w-[20px] inline-block rounded ${seatColor}`}
                                onClick={() =>
                                  handleSeatSelection(
                                    bus._id,
                                    item.seatnumber,
                                    item.price,
                                    item.isSelected
                                  )
                                }
                              ></span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black-400 p-2 ">
                  <div className="text-[10px] flex justify-center">
                    Lower Birth
                  </div>
                  <div>
                    <div className="  flex gap-5">
                      <div className="busseats">
                        {bus.trip.seatingStructure.lowerbirth[0].dualseats.map(
                          (item, index) => {
                            const seatColor = item.isSelected
                              ? "booked"
                              : highlighted[item.seatnumber + bus._id]
                              ? "highlighted"
                              : "nonhigh";
                            return (
                              <span
                                key={index}
                                className={`border border-black-200 h-[40px] w-[20px] inline-block rounded ${seatColor}`}
                                onClick={() =>
                                  handleSeatSelection(
                                    bus._id,
                                    item.seatnumber,
                                    item.price,
                                    item.isSelected
                                  )
                                }
                              ></span>
                            );
                          }
                        )}
                      </div>
                      <div className="singleseats">
                        {bus.trip.seatingStructure.lowerbirth[1].singleseats.map(
                          (item, index) => {
                            const seatColor = item.isSelected
                              ? "booked"
                              : highlighted[item.seatnumber + bus._id]
                              ? "highlighted"
                              : "nonhigh";
                            return (
                              <span
                                key={index}
                                className={`border border-black-200 h-[40px] w-[20px] inline-block rounded ${seatColor}`}
                                onClick={() =>
                                  handleSeatSelection(
                                    bus._id,
                                    item.seatnumber,
                                    item.price,
                                    item.isSelected
                                  )
                                }
                              ></span>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-2 border-black-400 p-2 flex gap-2 flex flex-col ">
                  <div className="flex items-center gap-1">
                    <span className="w-[20px] h-[20px] bg-blue-700 inline-block rounded"></span>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-[20px] h-[20px] bg-slate-200 inline-block rounded"></span>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-[20px] h-[20px] bg-red-600 inline-block rounded"></span>
                    <span>Booked</span>
                  </div>
                </div>
              </div>
              <div className="border border-black-200 w-[250px] p-2 flex flex-col gap-4">
                <div>
                  <span>Boarding & Droping</span>
                  <div className="flex justify-between">
                    <span>{bus.trip.boarding}</span>
                    <span>{bus.trip.depertureTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{bus.trip.dropping}</span>
                    <span>{bus.trip.arrivalTime}</span>
                  </div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span>Seat No.</span>
                  <span>
                    {seatnumber ? seatnumber[bus._id] : "Select Seat"}
                  </span>
                </div>
                <hr />
                <div>
                  <span>Fare Details</span>
                  <div className="flex justify-between">
                    <span>Amount</span>
                    <span>INR: {price ? price[bus._id] : "Choose Seat"}</span>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={handletoPayment}
                  disabled={!price[bus._id] ? true : false}
                >
                  Proceed to Book
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
