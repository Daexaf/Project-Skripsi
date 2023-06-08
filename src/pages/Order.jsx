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

const Order = () => {
  let [menus, setMenus] = useState([]);
  let [categoryChoose, setCategoryChoose] = useState("Makanan");
  let [keranjangs, setKeranjangs] = useState([]);
  let { id_tables } = useParams();

  console.log(keranjangs, "keranjangs");

  useEffect(() => {
    axios
      .get(API_URL2 + "product?category.nama=" + categoryChoose)
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

  const changeCategory = (value) => {
    setCategoryChoose(value);
    setMenus([]);
    axios
      .get(API_URL2 + "product?category.nama=" + value)
      .then((res) => {
        const menus = res.data.data;
        // console.log(menus);
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL2 + "keranjangs?id_tables=" + id_tables)
      .then((resKeranjang) => {
        const finder = resKeranjang.data.data.find((e) => {
          return e.product === value.id_products;
        });
        axios
          .get(API_URL2 + "product/" + value.id_products)
          .then((resProducts) => {
            console.log(resProducts.data.data[0].nama, "resProducts");
            if (!finder) {
              const keranjang = {
                jumlah: 1,
                total_harga: Number(value.harga),
                product: value.id_products,
                id_tables,
              };
              axios
                .post(API_URL2 + "keranjangs", keranjang)
                .then((res) => {
                  console.log(res.data.data, "res.data.data");
                  const newArr = [...keranjangs, res.data.data];
                  setKeranjangs(newArr);
                  swal({
                    title: "Berhasil Masuk Keranjang",
                    text: "Berhasil tambah menu " + keranjang.product.nama,
                    icon: "success",
                    button: "tutup",
                    timer: 1500,
                  });
                })
                .catch((error) => {
                  console.log("Error ya ", error);
                });
            } else {
              const keranjang = {
                jumlah: finder.jumlah + 1,
                total_harga: finder.total_harga + Number(value.harga),
                product: value.id_products,
                id_keranjangs: finder.id_keranjangs,
              };
              axios
                .put(API_URL2 + "keranjangs/" + finder.id_keranjangs, keranjang)
                .then((res) => {
                  const oldData = keranjangs.filter((e) => {
                    return e.id !== res.data.data.id;
                  });
                  const finalData = [...oldData, res.data.data];
                  setKeranjangs(finalData);
                  swal({
                    title: "Berhasil Masuk Keranjang",
                    text: "Berhasil tambah menu " + keranjang.product.nama,
                    icon: "success",
                    button: "tutup",
                    timer: 1500,
                  });
                })
                .catch((error) => {
                  console.log("Error ya ", error);
                });
            }
          });
      })
      .catch((error) => {
        if (error.response && error.response.data.statusCode === 404) {
          const keranjang = {
            jumlah: 1,
            total_harga: Number(value.harga),
            product: value.id_products,
            id_tables,
          };
          axios
            .get(API_URL2 + "product/" + value.id_products)
            .then((resProducts) => {
              axios
                .post(API_URL2 + "keranjangs", keranjang)
                .then((res) => {
                  const newArr = [...keranjangs, res.data.data];
                  setKeranjangs(newArr);
                  swal({
                    title: "Berhasil Masuk Keranjang",
                    text: "Berhasil tambah menu " + keranjang.product.nama,
                    icon: "success",
                    button: "tutup",
                    timer: 1500,
                  });
                })
                .catch((error) => {
                  console.log("Error ya ", error);
                });
            });
          return;
        } else {
          console.log(error);
        }
      });
  };
  //

  return (
    <div className="testing">
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
            {/* <Hasil keranjangs={keranjangs} idTable={id} /> */}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Order;
