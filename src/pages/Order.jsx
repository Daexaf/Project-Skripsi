import React, { useEffect, useState } from "react";
import {
  Hasil,
  ListCategories,
  NavbarComponent,
  Menus,
} from "../components/order/combined";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const Order = () => {
  let [menus, setMenus] = useState([]);
  let [categoryChoose, setCategoryChoose] = useState("Makanan");
  let [keranjangs, setKeranjangs] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(API_URL + "products?category.nama=" + categoryChoose)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });

    axios
      .get(API_URL + `keranjangs?id_tables=${id}`)
      .then((res) => {
        const keranjangs = res.data;
        setKeranjangs(keranjangs);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  }, [categoryChoose, id]);

  const changeCategory = (value) => {
    setCategoryChoose(value);
    setMenus([]);
    axios
      .get(API_URL + "products?category.nama=" + value)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  };

  const masukKeranjang = (value) => {
    axios
      .get(API_URL + "keranjangs?product.id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
            id_tables: id,
          };
          axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              const newArr = [...keranjangs, res.data];
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
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
            id_tables: id,
          };
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              const oldData = keranjangs.filter((e) => {
                return e.id !== res.data.id;
              });
              const finalData = [...oldData, res.data];
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={masukKeranjang}
                        hapusSatuan={() => console.log("hapus")}
                      />
                    );
                  })}
              </Row>
            </Col>
            <Hasil keranjangs={keranjangs} idTable={id} />
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Order;
