import { useState, useEffect, useContext } from "react";
// import { courseData } from "../dummyData/courseContent";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../axios";
import { MyContext } from "../MyContext";

const Dashboard = () => {
  const [createCourse, setCreateCourse] = useState(false);

  const { updateUser } = useContext(MyContext);

  return (
    <>
      <div className="min-h-screen flex items-start justify-center overflow-hidden">
        <div className="mt-20 w-2/3 p-10 bg-white rounded-2xl flex flex-col gap-8 shadow-2xl">
          <div className="flex flex-row items-center justify-between border-b-4 border-gray-500 pb-2">
            <div className="text-4xl">Dashboard</div>
            <button
              className="text-red-500"
              onClick={() => {
                updateUser(null);
                toast("Logged out");
              }}
            >
              Log out
            </button>
          </div>

          {createCourse ? (
            <CreateCourse setCreateCourse={setCreateCourse} />
          ) : (
            <DisplayCourses setCreateCourse={setCreateCourse} />
          )}
        </div>
      </div>
    </>
  );
};

const DisplayCourses = ({ setCreateCourse }) => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:8080/api/blogs/all"
        );

        setCourseData(response.data);
      } catch (error) {
        console.error(
          "There was an error creating the user:",
          error.response?.data || error.message
        );
      }
    };
    makeRequest();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between mb-5">
          <div className="text-2xl">Your courses</div>
          <button
            className="bg-green-500 py-1 px-2 hover: rounded-lg flex flex-row gap-2 items-center"
            onClick={() => {
              setCreateCourse(true);
            }}
          >
            <FaPlusCircle className="w-3 h-3" />
            <span>Create course</span>
          </button>
        </div>
        {courseData.map((course) => {
          return <Course _courseData={course} />;
        })}
      </div>
    </>
  );
};

const Course = ({ _courseData }) => {
  const [showContent, setShowContent] = useState(false);

  const { blogTitle, blogContent, user } = _courseData;
  const { userName } = user;
  return (
    <>
      <div className="border-b-2 border-gray-400 hover:bg-gray-100 py-2 px-2 duration-300 cursor-default">
        <div
          className="flex flex-row justify-between items-center"
          onClick={() => {
            setShowContent(!showContent);
          }}
        >
          <div>
            <span className="text-xl">{blogTitle}</span>{" "}
            <span className="text-[0.6rem] text-gray-500"> by {userName}</span>
          </div>
          <div>
            {showContent ? (
              <IoIosArrowDropupCircle className="w-4 h-4" />
            ) : (
              <IoIosArrowDropdownCircle />
            )}
          </div>
        </div>
        {showContent && <div className="my-10">{blogContent}</div>}
      </div>
    </>
  );
};

const CreateCourse = ({ setCreateCourse }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(MyContext);

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onContentChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = async () => {
    if (title.length === 0 || content.length === 0) {
      toast("Title or Content cannot be empty");
      return;
    }

    try {
      const newBlog = {
        blogTitle: title,
        blogContent: content,
        userName: user.userName,
      };

      const response = await axiosInstance.post(
        "http://localhost:8080/api/blogs/create",
        newBlog
      );

      toast.success(response.data);
    } catch (error) {
      console.error(
        "There was an error creating the user:",
        error.response?.data || error.message
      );
    }

    toast("Successfully added Course");
    setCreateCourse(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mb-5">
          <div className="text-2xl">Create Course</div>
          <button
            className="border-2 text-white bg-blue-700 duration-300 rounded-lg px-3 py-1"
            onClick={() => {
              setCreateCourse(false);
            }}
          >
            View Courses
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <input
            value={title}
            onChange={onTitleChange}
            className="border-2 outline-none px-2 h-8 rounded"
            placeholder="Course Title"
          />
          <textarea
            value={content}
            onChange={onContentChange}
            className="border-2 outline-none min-h-32 px-2 rounded"
            placeholder="Lesson"
          />
          <div className="flex flex-row justify-end px-2">
            <button
              className="py-2 px-4 text-gray-800 bg-green-500 rounded-lg hover:scale-105 duration-300"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
