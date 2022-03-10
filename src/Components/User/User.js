import React from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import "./User.css";
import "./ProductService";
import {
  userService
} from "./ProductService";
import { ToastContainer, toast } from "react-toastify";
import Login from "../Login/Login";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

class User extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isLogined: false };
  }

  // EVENT HANDLERS
  // They are responsible for calling `dispatch` which will send events to redux

  addProduct = () => {
    var action = {
      type: "ADD_PRODUCT",
    };
    this.props.dispatch(action);
  };

  removeProduct = async (productId) => {
    let status = await userService.ReqRemoveProduct(productId);
    var action = {
      type: "REMOVE_PRODUCT",
      productId: productId,
    };

    if ((await status) === 200) {
      this.props.dispatch(action);
      toast.success("DELETE SUCCESSED", {
        position: "bottom-right",
      });
    } else return;
  };

  editProduct = (productId, event) => {
    var newName = event.target.value;
    var action = {
      type: "EDIT_PRODUCT",
      data: {
        productId: productId,
        productName: newName,
      },
    };
    this.props.dispatch(action);
  };

  fetchProducts = async () => {
    let res = await userService.ReqGetProducts();
    var action = {
      type: "FETCH_PRODUCTS",
      data: {
        products: await res,
      },
    };
    if ((await res.length) > 0) this.props.dispatch(action);
    else return;
  };

  Enableinput = (item) => {
    let stritem = item.toString();
    document.getElementById(stritem).disabled = false;
    document.getElementById(stritem).focus();
  };

  componentDidMount() {
    // const isLogined =
    //   this.props.location.state !== undefined
    //     ? this.props.location.state.isLogined
    //     : false;

    // this.setState({ isLogined: isLogined });
    const isLogined = localStorage.getItem("isLogined");
    if(isLogined === 'true')
      this.fetchProducts();
  }

  handlePageClick = (event) => {
    const selected = event.selected;

    var action = {
      type: "NEXT_PAGE",
      data: {
        selected: selected,
      },
    };
    this.props.dispatch(action);
  };

  SubmitEdit = async (item) => {
    let status = await userService.ReqEditProduct(item);
    if ((await status) === 200) {
      toast.info("UPDATE SUCCESSED", {
        position: "bottom-right",
      });
    }
  };

  Logout = () => {
    localStorage.removeItem("isLogined");
  }

  render() {
    // const isLogined = this.props.location.state !== undefined
    //     ? this.props.location.state.isLogined
    //     : false;

    // console.log("123:" + this.state.isLogined);
    const isLogined = localStorage.getItem("isLogined");

    if (isLogined !== 'true') {
      return (
        <Redirect
          to={{
            pathname: "/Login",
          }}
        />
      );
    }

    const pagination = this.props.pagination;

    const data = pagination.currentData;

    console.log("state:" + JSON.stringify(pagination));

    // Example product: { productId : 4 , productName :'Profit' }
    var trList =
      data &&
      data.map((product, index) => {
        return (
          <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>
              <input
                disabled
                id={product.productId}
                type="text"
                onChange={this.editProduct.bind(null, product.productId)}
                value={product.productName}
              />
              <button
                id={"btn-edit" + product.productId}
                type="button"
                onClick={this.Enableinput.bind(null, product.productId)}
              >
                Edit
              </button>
              <button
                id={"btn-submit" + product.productId}
                type="button"
                onClick={this.SubmitEdit.bind(null, {
                  productId: product.productId,
                  productName: product.productName,
                })}
              >
                Submit
              </button>
            </td>
            <td>
              <button
                onClick={this.removeProduct.bind(null, product.productId)}
              >
                Remove
              </button>
            </td>
          </tr>
        );
      });

    return (
      <div className="post">
        <a href="/Login" id="logout" onClick={this.Logout}>Logout</a>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{trList}</tbody>
        </table>
        <br />
        <button onClick={this.addProduct}>Create</button>
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pagination.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

export default User;
