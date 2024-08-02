import "./App.css";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DashBoard from "./components/Dashboard";
import { useContext, useState } from "react";
import PageNotFound from "./components/PageNotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "./MyContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const { user, setUser } = useContext(MyContext);

  return (
    <>
      <div className="min-h-screen w-screen bg-gray-500">
        <ToastContainer
          autoClose={1000}
          pauseOnHover={false}
          closeOnClick={true}
        />
        <Routes>
          <Route
            path="/"
            element={
              user !== null ? (
                <DashBoard setLoggedIn={setLoggedIn}></DashBoard>
              ) : (
                <WelcomePage />
              )
            }
          />

          {user !== null || <Route path="/signup" element={<SignUp />} />}
          {user !== null || (
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
          )}

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
