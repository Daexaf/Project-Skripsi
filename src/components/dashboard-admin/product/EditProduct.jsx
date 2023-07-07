import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";
import storage from "../../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditProduct = () => {
  const [data, setData] = useState({
    kode: "",
    name: "",
    harga: 0,
    is_ready: false,
    gambar: "",
    id_category: "",
  });
  const { id_products, id_categories } = useParams();
  let [, setLoading] = useState(false);
  const navigate = useNavigate();
  const [, setPercent] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL2 + `categories`)
      .then((res) => {
        setCategories(res.data.data); // Menyimpan data kategori ke state
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error ya ", error);
      });
  }, []);

  const handleUpload = (file) => {
    if (!file) {
      alert("pilih dong");
    }
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // setData({ ...data, gambar: url });
          // console.log(url);
          setData((prevState) => ({
            ...prevState,
            gambar: url,
          }));
        });
      }
    );
  };

  const handleImageChange = (e) => {
    handleUpload(e.target.files[0]);
    // setFile(e.target.files[0]);
    // console.log(e.target.files[0], "coba");
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL2 + `product/${id_products}`)
      .then((res) => {
        const showData = res.data.data[0];
        setData(showData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error ya ", error);
      });
  }, [id_products, id_categories]);

  console.log(data, "data");

  const handleSubmitData = (e) => {
    e.preventDefault();
    console.log(data, "data data dtaa");
    axios.put(API_URL2 + `product/${id_products}`, data).then((res) => {
      console.log(res);
      navigate("/admin/product");
    });
  };

  return (
    <div className="py-12 bg-blue-500 ">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-blue-500">
        <div className="flex m-2 p-2 bg-blue-500">
          <Link
            to="/Admin/product"
            className="px-4 py-2 bg-green-500 hover:bg-indigo-700 rounded-lg text-white text-decoration-none"
          >
            Daftar Product
          </Link>
        </div>
        {data && (
          <div className="m-2 p-2 bg-slate-100 rounded border border-black">
            <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 border border-black">
              <form method="POST" encType="multipart/form-data">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kode
                  </label>
                  <div className="mt-1 border">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={data.kode}
                      onChange={(e) => {
                        setData({ ...data, kode: e.target.value });
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
                    Nama
                  </label>
                  <div className="mt-1 border">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={data.name}
                      onChange={(e) => {
                        setData({ ...data, name: e.target.value });
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
                    Harga
                  </label>
                  <div className="mt-1 border">
                    <input
                      type="number"
                      id="name"
                      name="name"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={data.harga}
                      onChange={(e) => {
                        setData({ ...data, harga: e.target.value });
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
                    Ready
                  </label>
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      checked={data.isReady}
                      onChange={(e) => {
                        setData({ ...data, is_ready: e.target.value });
                      }}
                    />
                  </div>
                  <div className="text-sm text-red-400"></div>
                </div>

                <div>
                  <label className="mt-1 border">
                    Select Image:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ID-Kategori
                  </label>
                  <div className="mt-1 border">
                    {/* <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={data.id_category}
                      onChange={(e) => {
                        setData({ ...data, id_category: e.target.value });
                      }}
                    /> */}
                    <select
                      id="id_category"
                      name="id_category"
                      className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={data.id_category}
                      onChange={(e) => {
                        setData({ ...data, id_category: e.target.value });
                      }}
                    >
                      <option value="">Pilih Kategori</option>
                      {categories.map((category) => (
                        <option
                          key={category.id_categories}
                          value={category.id_categories}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-sm text-red-400"></div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                            "
                    onClick={(e) => handleSubmitData(e)}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
