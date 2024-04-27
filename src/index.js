import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MainBody } from "./Components/Main";
import { BusSearchResultPage } from "./Components/BusSearchResultPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import store from "./Redux/store";
import { Provider } from "react-redux";
import { Myprofile } from "./Components/MyProfile";
import { ProtectedRoute } from "./Components/ProtectedRoute";
import { Payment } from "./Components/Payment";
import { BookedDetails } from "./Components/BookedDetails";
import { Unbooked } from "./Components/Unbooked";
import { Userbooked } from "./Components/Userbooked";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainBody />,
      },
      {
        path: "/busbooking",
        element: <BusSearchResultPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/myprofile",
            element: <Myprofile />,
          },
        ],
      },
      {
        path: "/fillingpage",
        element: <Payment />,
      },
      {
        path: "/booked",
        element: <BookedDetails />,
      },
      {
        path: "/unbooked",
        element: <Unbooked />,
      },
      {
        path: "/userbooking",
        element: <Userbooked />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />{" "}
  </Provider>
);
