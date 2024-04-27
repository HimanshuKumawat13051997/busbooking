export const BookingCard = ({ booking }) => {
  const { passenger_details, price, Bus_Details, createdAt } = booking;
  const {
    bus_name,
    bus_type,
    boarding,
    dropping,
    depertureTime,
    arrivalTime,
    bus_number,
  } = Bus_Details.trip;
  const { name, email, gender, age, mobilenumber } = passenger_details;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-gray-900">
        <h1 className="text-white font-semibold text-lg">Booking Details</h1>
      </div>
      <div className="py-4 px-4">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-gray-600 text-sm">Passenger Name:</p>
            <p className="text-gray-800 font-semibold">{name}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Email:</p>
            <p className="text-gray-800 font-semibold">{email}</p>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-gray-600 text-sm">Gender:</p>
            <p className="text-gray-800 font-semibold">{gender}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Age:</p>
            <p className="text-gray-800 font-semibold">{age}</p>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-gray-600 text-sm">Mobile Number:</p>
            <p className="text-gray-800 font-semibold">{mobilenumber}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Booking Date:</p>
            <p className="text-gray-800 font-semibold">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 text-sm">Bus Details:</p>
          <p className="text-gray-800 font-semibold">Bus No. ({bus_number})</p>
          <p className="text-gray-800 font-semibold">
            {bus_name} ({bus_type})
          </p>
          <p className="text-gray-600 text-sm">Departure: {depertureTime}</p>
          <p className="text-gray-600 text-sm">Arrival: {arrivalTime}</p>
          <p className="text-gray-600 text-sm">Boarding Point: {boarding}</p>
          <p className="text-gray-600 text-sm">Dropping Point: {dropping}</p>
        </div>
        <div className="mt-4">
          <p className="text-gray-600 text-sm">Price:</p>
          <p className="text-gray-800 font-semibold">₹{price}</p>
        </div>
      </div>
    </div>
  );
};
