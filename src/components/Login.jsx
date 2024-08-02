import { FaLock } from "react-icons/fa";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../MyContext";
import axiosInstance from "../axios";

const Login = ({ setLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { user, updateUser } = useContext(MyContext);

  const navigator = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // get request on submit
  const onSubmit = async () => {
    if (userName.length === 0 || password.length === 0) {
      toast("Username and password cannot be empty");
      return;
    }

    const loginCred = {
      userName,
      password,
    };
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/login/",
        loginCred
      );
      updateUser(response.data);
      toast.success("Welcome " + response.data.userName);
      navigator("/");
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative bg-white flex items-center flex-col justify-center gap-10 rounded-2xl w-2/6 py-20 shadow-2xl">
          <IoChevronBackOutline
            className="absolute top-5 left-3 cursor-pointer w-8 h-8 hover:scale-110 duration-300"
            onClick={() => {
              navigator("/");
            }}
          />
          <div className="text-4xl">Welcome Back</div>
          <div className="w-full flex flex-col items-center gap-y-5 pt-5">
            {/* <div className="relative border-2 w-3/5 h-10 rounded-full pl-10 overflow-hidden">
              <MdEmail className="absolute left-3 top-3 h-4 w-4" />
              <input
                value={email}
                className="w-full h-full outline-none"
                placeholder="Email"
                type="email"
                onChange={onEmailChange}
              />
            </div> */}
            <div className="relative w-3/5 h-10">
              <MdEmail className="absolute left-3 top-3 h-4 w-4" />
              <input
                value={userName}
                className="w-full h-full outline-none pl-10 border-2 rounded-full hover:shadow-lg focus:shadow-lg duration-300"
                placeholder="Username"
                type="email"
                onChange={onEmailChange}
              />
            </div>
            <div className="relative w-3/5 h-10">
              <FaLock className="absolute left-3 top-3 h-4 w-4" />
              <input
                value={password}
                onChange={onPasswordChange}
                className="w-full h-full outline-none pl-10 border-2 rounded-full hover:shadow-lg focus:shadow-lg duration-300"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />

              {showPassword ? (
                <BiSolidShow
                  className="absolute right-3 top-3 h-4 w-4"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <BiSolidHide
                  className="absolute right-3 top-3 h-4 w-4"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}
            </div>
            <div className="pt-3">
              <button
                className="border-2 text-gray-100 bg-blue-700 hover:scale-105 duration-300 rounded-2xl px-10 py-1"
                onClick={onSubmit}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
