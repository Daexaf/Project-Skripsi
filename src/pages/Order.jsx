import React, { useEffect, useState } from "react";
import {
  Hasil,
  ListCategories,
  NavbarComponent,
  Menus,
} from "../components/order/combined";
import { Row, Col, Container } from "react-bootstrap";
import { API_URL2 } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";

const Order = () => {
  let [menus, setMenus] = useState([]);
  let [categoryChoose, setCategoryChoose] = useState("Sop Durian Topping");
  let [keranjangs, setKeranjangs] = useState([]);
  let { id_tables } = useParams();

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
        setMenus(menus);
      })
      .catch((error) => {
        console.log("Error ya ", error);
      });
  };

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

      await axios.put(
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
      await axios.post(API_URL2 + "keranjangs", data);
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
