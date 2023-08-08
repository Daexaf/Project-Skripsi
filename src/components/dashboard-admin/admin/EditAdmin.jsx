import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";

const EditAdmin = () => {
  const [filderData, setFilterData] = useState([]);
  const { id_admins } = useParams();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL2 + `admin/${id_admins}`)
      .then((res) => {
        const showData = res.data.data;
        setFilterData(showData);
        setLoading(false);
        setUsername(showData[0].username);
        setEmail(showData[0].email);
        setPassword(showData[0].password);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error ya ", error);
      });
  }, [id_admins]);

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const updatedData = {
      id_admins: id_admins,
      username: username,
      email: email,
      password: password,
    };
    axios.put(API_URL2 + `admin/${id_admins}`, updatedData).then((res) => {});
    navigate("/Admin/adminAcc");
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex m-2 p-2">
          <Link
            to="/Admin/adminAcc"
            className="px-4 py-2 bg-green-500 hover:bg-indigo-700 rounded-lg text-white text-decoration-none"
          >
            Daftar Admin
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {filderData.map((index) => (
              <div className="m-2 p-2 bg-slate-100 rounded" key={index}>
                <div className="space-y-8 divide-y divide-gray-200 w-1/2">
                  <form method="PUT" encType="multipart/form-data">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="mt-1 border">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="block w-full transition duration-150 ease-in-out appearance-none border border-black rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-sm text-red-400"></div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1 border">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full transition duration-150 ease-in-out appearance-none border border-black rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-sm text-red-400"></div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1 border">
                        <input
                          type="text"
                          id="password"
                          name="password"
                          className="block w-full transition duration-150 ease-in-out appearance-none border border-black rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="text-sm text-red-400"></div>
                    </div>

                    <div className="mt-6">
                      <Link to="/Admin/adminAcc">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                                "
                          onClick={(e) => handleSubmitData(e)}
                        >
                          Submit
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
export default EditAdmin;
