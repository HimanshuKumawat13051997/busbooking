import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { data } = useSelector((state) => state.authlog);

  if (!data) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :</h1>
        <span>
          <Navigate to="/" />
        </span>
      </div>
    );
  }

  return <Outlet />;
};
