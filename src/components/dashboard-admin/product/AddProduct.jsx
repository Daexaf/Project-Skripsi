import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL2 } from "../../../utils/constants";
import storage from "../../../utils/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DropdownButton, Dropdown } from "react-bootstrap";

const AddProduct = () => {
  const navigate = useNavigate();
  const [addKode, setAddKode] = useState("");
  const [addName, setAddName] = useState("");
  const [addHarga, setAddHarga] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [addGambar, setAddGambar] = useState(null);
  const [addIdC, setAddIdc] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    axios
      .get(API_URL2 + "categories")
      .then((res) => {
        console.log(res.data.data);
        const kate = res.data.data;
        setAddIdc(kate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

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
          setAddGambar(url);
          console.log(url);
        });
      }
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
    // setFile(e.target.files[0]);
    // console.log(e.target.files[0], "coba");
  };

  const handleIsActiveChange = (event) => {
    setIsReady(event.target.checked); // Mengupdate state dengan nilai checkbox
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API_URL2 + "product", {
        kode: addKode,
        name: addName,
        harga: addHarga,
        is_ready: isReady,
        gambar: addGambar,
        id_category: selectedCategory,
      })
      .then((response) => {
        console.log(response.data);
        navigate("/admin/product");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-5 border border-black">
      <form method="PUT" encType="multipart/form-data">
        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Kode Makanan
          </label>
          <div className="mt-1 border">
            <input
              type="text"
              id="kode"
              name="kode"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={addKode}
              onChange={(e) => {
                setAddKode(e.target.value);
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
            Nama Product
          </label>
          <div className="mt-1 border">
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={addName}
              onChange={(e) => {
                setAddName(e.target.value);
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
              id="harga"
              name="harga"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={addHarga}
              onChange={(e) => {
                setAddHarga(e.target.value);
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
              checked={isReady}
              onChange={handleIsActiveChange}
            />
          </div>
          <div className="text-sm text-red-400"></div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Gambar
          </label>
          <div className="mt-1">
            <input type="file" accept="" onChange={handleImageChange} />
            <p>{percent}"% Done"</p>
          </div>
          <div className="text-sm text-red-400"></div>
        </div>

        <div className="sm:col-span-6">
          <label
            htmlFor="idC"
            className="block text-sm font-medium text-gray-700"
          >
            Id Kategori
          </label>
          {/* <div className="mt-1 border">
            <input
              type="text"
              id="idC"
              name="idC"
              className="block w-full transition duration-150 ease-in-out appearance-none border border-blue-800 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              value={addIdC}
              onChange={(e) => {
                setAddIdc(e.target.value);
              }}
            />
          </div> */}
          <select
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {addIdC.map((category) => (
              <option
                key={category.id_categories}
                value={category.id_categories}
              >
                {category.name}
              </option>
            ))}
          </select>

          <div className="text-sm text-red-400"></div>
        </div>

        <div className="mt-6">
          <Link to="">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded text-white
                                "
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
