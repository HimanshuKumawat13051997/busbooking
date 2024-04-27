import "./App.css";
import { Footer } from "./Components/Footer";
import { Navbar } from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { LoginModal } from "./Components/LoginModal";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <LoginModal />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
