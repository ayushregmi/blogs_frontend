import { FaLock, FaUser } from "react-icons/fa";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { MyContext } from "../MyContext";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(MyContext);

  const navigator = useNavigate();

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onNameChange = (e) => {
    setFullName(e.target.value);
  };

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // get request on submit
  const onSubmit = async () => {
    if (userName.length === 0 || fullName.length === 0 || password === 0) {
      toast("Name, Username and Password cannot be empty");
      return;
    }

    const registerCred = {
      fullName,
      userName,
      password,
    };

    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/users/create",
        registerCred
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
          <div className="text-4xl">Welcome</div>
          <div className="w-full flex flex-col items-center gap-y-5 pt-5">
            <div className="relative w-3/5 h-10">
              <FaUser className="absolute left-3 top-3 h-4 w-4" />
              <input
                value={fullName}
                className="w-full h-full outline-none pl-10 border-2 rounded-full hover:shadow-lg focus:shadow-lg duration-300"
                placeholder="Full Name"
                type="text"
                onChange={onNameChange}
              />
            </div>
            <div className="relative w-3/5 h-10">
              <MdEmail className="absolute left-3 top-3 h-4 w-4" />
              <input
                value={userName}
                className="w-full h-full outline-none pl-10 border-2 rounded-full hover:shadow-lg focus:shadow-lg duration-300"
                placeholder="Username"
                type="text"
                onChange={onUserNameChange}
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
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
