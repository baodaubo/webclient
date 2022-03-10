import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ProductsPane from "./Components/react-redux.jsx";
import User from "./Components/User/User";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { connect } from "react-redux";
import { userService } from "./Components/User/ProductService";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

var nextProductId = 3;

// MAP STATE TO PROPS
// Probably the most important method of the demo which handles the React/Redux integration.
// When state changes, this method is called, which then you can use to customly
// map the state into props that your React component can use
// MAP: state.productList <==> props.products
const mapStateToProps = (state) => {
  return {
    products: state.productList,
    pagination: state.pagination,
    isLogined: state.isLogined,
  };
};

// Example product: { productId : 4 , productName :'Profit' }
const getIndexByProductId = (products, productId) => {
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    if (product.productId === productId) {
      return i;
    }
  }
  return -1;
};

const pagination = {
  data: [],
  offset: 0,
  numberPerPage: 10,
  pageCount: 0,
  currentData: [],
};
// REDUCERS
// Reducers listen for actions that are dispatched and react depending on your logic
// All state in Redux is immutable(never changes) so we always have to return a new
// state object.
// We are going to copy the current state and return a new one based off the action creators above
const appReducer = (
  state = { productList: [], pagination: pagination },
  action
) => {
  // Clone Array.

  let products = state.productList.map((x) => x);
  let pagi = Object.assign({}, state.pagination);

  pagi.data = Object.assign([], products);

  console.log("products:" + JSON.stringify(products));
  console.log("state.producList:" + JSON.stringify(state.productList));
  // This is quite a common way of deciding which event to process
  // Note: ALL events will be coming through this reducer
  console.log("Actions", action); // Open your console to see what actions look like

  // Even better, install Redux DevTools and your mind will be blown
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "FETCH_PRODUCTS":
      products = action.data.products;
      pagi.data = action.data.products;
      pagi.pageCount = Math.ceil(pagi.data.length / pagi.numberPerPage);
      pagi.currentData = pagi.data.slice(
        pagi.offset,
        pagi.offset + pagi.numberPerPage
      );
      break;
    case "NEXT_PAGE":
      let offset = action.data.selected * pagi.numberPerPage;
      pagi.offset = offset;
      pagi.currentData = pagi.data.slice(offset, offset + pagi.numberPerPage);
      break;
    case "ADD_PRODUCT":
      if (products.length >= 1) {
        let idlast = products[products.length - 1].productId;
        idlast++;
        let product = { productId: idlast, productName: "" };
        products.push(product);

        userService.ReqAddNewProduct(product);

        pagi.data.push(product);
        pagi.pageCount = Math.ceil(pagi.data.length / pagi.numberPerPage);

        pagi.currentData = pagi.data.slice(
          pagi.offset,
          pagi.offset + pagi.numberPerPage
        );
      } else {
        let product = { productId: 1, productName: "" };
        products.push(product);
        userService.ReqAddNewProduct(product);
        pagi.data.push(product);
        pagi.currentData = pagi.data.slice(
          pagi.offset,
          pagi.offset + pagi.numberPerPage
        );
      }
      break;

    case "REMOVE_PRODUCT":
      let idx = getIndexByProductId(products, action.productId);
      if (idx !== -1) {
        products.splice(idx, 1); // Removes element at `idx`
        pagi.data.splice(idx, 1);
        pagi.pageCount = Math.ceil(pagi.data.length / pagi.numberPerPage);
        if (pagi.currentData.length > 1) {
          console.log("offset>1:" + pagi.offset);
          pagi.currentData = pagi.data.slice(
            pagi.offset,
            pagi.offset + pagi.numberPerPage
          );
        } else if (pagi.currentData.length <= 1) {
          console.log("offset===1:" + pagi.offset);
          if (pagi.offset >= 10) pagi.offset = pagi.offset - 10;

          pagi.currentData = pagi.data.slice(
            pagi.offset,
            pagi.offset + pagi.numberPerPage
          );
        }
      }
      //RemoveProduct(action.productId);
      break;
    case "EDIT_PRODUCT":
      let id = getIndexByProductId(products, action.data.productId);
      if (id !== -1) {
        products[id].productName = action.data.productName;
      }

      break;
  }
  // As above, we have to return a new state object each time (Redux store is immutable)
  // It makes sure we know our data can only be modified in one visible way
  // Also lets us time travel through our application state!

  const newState = {
    productList: products,
    pagination: pagi,
  };
  console.log("Current State", newState);
  return newState;
};

// REDUX STORE
// Create store initializes our Redux store and only has to be called once
// The first argument is our `appReducer` defined above, it is almost like a listener
// The second is just our initial state which is just a Javascript object
// The third is usually where enhancers/middleware goes
// In this example it just loads Redux DevTools so everyone can play around
let store = createStore(
  appReducer,
  applyMiddleware(thunk)
  // {
  //   productList:[]
  //   // [
  //   //   { productId: 1, productName: "React" },
  //   //   { productId: 2, productName: "Redux" },
  //   //   { productId: 3, productName: "Profit" },
  //   // ],
  // },
  //window.devToolsExtension ? window.devToolsExtension() : undefined
);

// We want to use Redux connect to attach our mapStateToProps to our ProductsPane (React Component)

// Render
//   ReactDOM.render(
//     <ReactRedux.Provider store={store}>
//       <MyApp />
//     </ReactRedux.Provider>,
//     document.getElementById('app')
//   );

const MyApp = connect(mapStateToProps)(ProductsPane);
const MyApp2 = connect(mapStateToProps)(User);
const MyApp3 = connect(mapStateToProps)(Login);

if (window.devToolsExtension) {
  window.devToolsExtension.open();
}

ReactDOM.render(
  <Provider store={store}>
    {/* <MyApp /> */}
    {/* <MyApp2 /> */}
    <Router>
      {/* <Login /> */}
      {/* <div id="route">
        <Link to="/Register">Sign Up</Link>
        ||
        <Link to="/Login">Sign In</Link>
      </div> */}
      <Switch>
        <Route exact path="/Login" component={MyApp3}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <Route exact path="/" component={MyApp2}></Route>
      </Switch>
    </Router>
    <ToastContainer />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
