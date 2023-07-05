import React, { useEffect, useState } from "react";
import {
  Hasil,
  ListCategories,
  NavbarComponent,
  Menus,
} from "../components/order/combined";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL, API_URL2 } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Order = () => {
  let [menus, setMenus] = useState([]);
  let [categoryChoose, setCategoryChoose] = useState("Cemilan");
  let [keranjangs, setKeranjangs] = useState([]);
  let { id_tables, id_products } = useParams();
  const timeTaken = useSelector((state) => state.counter.timeTaken);

  useEffect(() => {
    axios
      .get(API_URL2 + "product?category.name=" + categoryChoose)
      .then((res) => {
        const menus = res.data.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });

    axios
      .get(API_URL2 + `keranjangs?id_tables=${id_tables}`)
      .then((res) => {
        const keranjangs = res.data.data;
        setKeranjangs(keranjangs);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, [categoryChoose, id_tables]);
  // console.log(keranjangs, "hmmmmmmmmmmmmmmm");

  const changeCategory = (value) => {
    setCategoryChoose(value);
    setMenus([]);
    axios
      .get(API_URL2 + "product?category.name=" + value)
      .then((res) => {
        const menus = res.data.data;
        // console.log(menus);
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  };

  // const isiData = (value) => {
  //   axios.get(API_URL2 + "product/" + value.id_products).then((resProducts) => {
  //     console.log(resProducts.data.data[0].name, "resProducts");
  //     console.log(resProducts.data.data[0].harga, "ini harga");
  //     const name = resProducts.data.data[0].name;
  //     const harga = resProducts.data.data[0].harga;
  //   });
  // };

  // const masukKeranjang = (value) => {
  //   axios
  //     .get(API_URL2 + "keranjangs?id_tables=" + id_tables)
  //     .then((resKeranjang) => {
  //       const finder = resKeranjang.data.data.find((e) => {
  //         return e.product === value.id_products;
  //       });
  //       axios
  //         .get(API_URL2 + "product/" + value.id_products)
  //         .then((resProducts) => {
  //           console.log(resProducts.data.data[0].name, "resProducts");
  //           console.log(resProducts.data.data[0].harga, "ini harga");
  //           const name = resProducts.data.data[0].name;
  //           // const harga = resProducts.data.data[0].harga;
  //           if (!finder) {
  //             console.log("ini jalan");
  //             const keranjang = {
  //               jumlah: 1,
  //               total_harga: Number(value.harga),
  //               product: value.id_products,
  //               id_tables,
  //             };
  //             axios
  //               .post(API_URL2 + "keranjangs", keranjang)
  //               .then((res) => {
  //                 // console.log(res.data.data, "res.data.data");
  //                 const newArr = [...keranjangs, res.data.data];
  //                 console.log(newArr, "newArr");
  //                 setKeranjangs(newArr);
  //                 swal({
  //                   title: "Berhasil Masuk Keranjang",
  //                   text: "Berhasil tambah menu " + name,
  //                   icon: "success",
  //                   button: "tutup",
  //                   timer: 1500,
  //                 });
  //               })
  //               .catch((error) => {
  //                 console.log("Error ya ", error);
  //               });
  //           } else {
  //             console.log("ini ga jalan");
  //             const keranjang = {
  //               jumlah: finder.jumlah + 1,
  //               total_harga:
  //                 finder.total_harga + Number(resProducts.data.data[0].harga),
  //               product: value.id_products,
  //               id_keranjangs: finder.id_keranjangs,
  //             };
  //             console.log(keranjang, "ini keranjang line 98");
  //             axios
  //               .put(API_URL2 + "keranjangs/" + finder.id_keranjangs, keranjang)
  //               .then((res) => {
  //                 const oldData = keranjangs.filter((e) => {
  //                   return e.id !== res.data.data.id;
  //                 });
  //                 const finalData = [...oldData, res.data.data];
  //                 console.log(finalData, "newArr");
  //                 setKeranjangs(finalData);
  //                 swal({
  //                   title: "Berhasil Masuk Keranjang",
  //                   text:
  //                     "Berhasil tambah menu " + resProducts.data.data[0].name,
  //                   icon: "success",
  //                   button: "tutup",
  //                   timer: 1500,
  //                 });
  //               })
  //               .catch((error) => {
  //                 console.log("Error ya ", error);
  //               });
  //           }
  //         });
  //     })

  //     .catch((error) => {
  //       // axios
  //       //   .get(API_URL2 + "product/" + value.id_products)
  //       //   .then((resProducts) => {
  //       //     console.log(resProducts.data.data[0].name, "resProducts");
  //       //     console.log(resProducts.data.data[0].harga, "ini harga");
  //       //     const name = resProducts.data.data[0].name;
  //       //     const harga = resProducts.data.data[0].harga;

  //       if (error.response && error.response.data.statusCode === 404) {
  //         const keranjang = {
  //           jumlah: 1,
  //           total_harga: Number(value.harga),
  //           product: value.id_products,
  //           id_tables,
  //         };
  //         axios
  //           .get(API_URL2 + "product/" + value.id_products)
  //           .then((resProducts) => {
  //             const name = resProducts.data.data[0].name;
  //             const harga = resProducts.data.data[0].harga;
  //             axios
  //               .post(API_URL2 + "keranjangs", keranjang)
  //               .then((res) => {
  //                 const newArr = [...keranjangs, res.data.data];
  //                 setKeranjangs(newArr);
  //                 swal({
  //                   title: "Berhasil Masuk Keranjang",
  //                   text: "Berhasil tambah menu " + name,
  //                   icon: "success",
  //                   button: "tutup",
  //                   timer: 1500,
  //                 });
  //               })
  //               .catch((error) => {
  //                 console.log("Error ya ", error);
  //               });
  //           });
  //         return;
  //       } else {
  //         console.log(error);
  //       }
  //     });
  //   // });
  // };

  const masukKeranjang = async (value) => {
    const product = await axios.get(API_URL2 + "product/" + value.id_products);
    let keranjangData;
    // console.log(product, "ini get product");
    let finder;
    try {
      keranjangData = await axios.get(
        API_URL2 + `keranjangs?id_tables=${id_tables}`
      );
      console.log(keranjangData, "keranjang data");
      finder = Object.values(keranjangData.data.data).find((e) => {
        // console.log(finder, "finder data");
        return e.product[0].id_products === value.id_products;
      });
      console.log(finder, "ini finder 2");
    } catch {
      finder = false;
    }
    if (finder) {
      console.log("ini kalo salah");
      const keranjang = {
        jumlah: finder.jumlah + 1,
        total_harga: finder.total_harga + Number(value.harga),
        product: value.id_products,
        id_keranjangs: finder.id_keranjangs,
      };

      const kerangjang = await axios.put(
        API_URL2 + "keranjangs/" + finder.id_keranjangs,
        keranjang
      );
      swal({
        title: "Berhasil Masuk Keranjang",
        text: "Berhasil tambah menu " + product.data.data[0].name,
        icon: "success",
        button: "tutup",
        timer: 1500,
      });
      // const oldData = keranjangs.filter((e) => {
      //   console.log(e, "ee");
      //   return e.id !== kerangjang.data.data.id_keranjangs;
      // });
      // const finalData = [...oldData, kerangjang.data.data];
      // console.log(oldData, "old");
      // console.log(kerangjang, "data data data");
      const blablabla = await axios.get(
        API_URL2 + `keranjangs?id_tables=${id_tables}`
      );
      setKeranjangs(blablabla.data.data);
      console.log(blablabla, "bla data");
    } else {
      const data = {
        jumlah: 1,
        total_harga: product.data.data[0].harga,
        product: product.data.data[0].id_products,
        id_tables: id_tables,
      };
      const keranjang = await axios.post(API_URL2 + "keranjangs", data);
      const blablabla2 = await axios.get(
        API_URL2 + `keranjangs?id_tables=${id_tables}`
      );
      setKeranjangs(blablabla2.data.data);
      swal({
        title: "Berhasil Masuk Keranjang",
        text: "Berhasil tambah menu " + product.data.data[0].name,
        icon: "success",
        button: "tutup",
        timer: 1500,
      });
    }
  };

  return (
    <div className="testing h-screen">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={changeCategory}
              categoryChoose={categoryChoose}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => {
                    return (
                      <Menus
                        key={menu.id_products}
                        menu={menu}
                        masukKeranjang={masukKeranjang}
                      />
                    );
                  })}
              </Row>
            </Col>
            <Hasil
              keranjangs={keranjangs}
              idTable={id_tables}
              setKeranjangs={setKeranjangs}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Order;
