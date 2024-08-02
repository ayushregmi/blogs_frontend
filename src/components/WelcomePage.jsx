import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigator = useNavigate();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white flex items-center flex-col justify-center gap-10 rounded-2xl w-2/6 py-20 shadow-2xl">
          <div className="text-4xl">Welcome</div>
          <div className="flex flex-row w-full justify-around">
            <button
              className="text-lg text-gray-100 hover:scale-105 bg-blue-800 duration-300 w-3/12 py-1 rounded-lg"
              onClick={() => {
                navigator("/login");
              }}
            >
              Login
            </button>
            <button
              className="text-lg text-gray-100 hover:scale-105 bg-blue-800 duration-300 w-3/12 py-1 rounded-lg"
              onClick={() => {
                navigator("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomePage;
