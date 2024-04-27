import { useSelector } from "react-redux";
import { BookingCard } from "./BookingCard";

export const Userbooked = () => {
  const { hist } = useSelector((state) => state.history);

  return (
    <div className="mt-2">
      {hist.map((booking) => {
        return <BookingCard key={booking._id} booking={booking} />;
      })}
    </div>
  );
};
