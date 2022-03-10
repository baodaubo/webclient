import { ToastContainer, toast } from "react-toastify";

const ReqRemoveProduct = async (id) => {
  try {
    let res = await fetch(
      "https://localhost:5001/WeatherForecast/RemoveProduct/" + id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err);
  }
};

const ReqGetProducts = async () => {
  try {
    let res = await fetch("https://localhost:5001/WeatherForecast/Products", {
      method: "GET",
    });
    let resdata = await res.json();
    return resdata;
  } catch (err) {
    console.error(err);
  }
};

const ReqEditProduct = async (item) => {
  try {
    let res = await fetch(
      "https://localhost:5001/WeatherForecast/EditProduct",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    if ((await res.status) === 200) {
      let stritem = item.productId.toString();
      document.getElementById(stritem).disabled = true;
    }

    return res.status;
  } catch (err) {
    console.error(err);
  }
};

const ReqAddNewProduct = async (item) => {
  try {
    let res = await fetch(
      "https://localhost:5001/WeatherForecast/AddNewProduct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    );
    if ((await res.status) === 200) {
      toast.info("ADD SUCCESSED", {
        position: "bottom-right",
      });
    } else {
      toast.error("ADD FAILED", {
        position: "bottom-right",
      });
    }

    //let resdata = await res.json();
    return res.status;
  } catch (err) {
    console.error(err);
  }
};

//module.exports = {ReqAddNewProduct, ReqEditProduct, ReqGetProducts, ReqRemoveProduct};
export const userService = {
  ReqAddNewProduct,
  ReqEditProduct,
  ReqGetProducts,
  ReqRemoveProduct,
};
