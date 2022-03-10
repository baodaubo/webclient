
import React from 'react';

class ProductsPane extends React.Component {
    constructor (props, context) {
      super(props, context);
    }
   
    // EVENT HANDLERS
    // They are responsible for calling `dispatch` which will send events to redux
    addProduct = () => {
      var action = {
          type: 'ADD_PRODUCT'
      };
      this.props.dispatch(action);
    }
   
    removeProduct  = (productId) =>  {
      var action = {
        type: 'REMOVE_PRODUCT',
        productId: productId
      };
      this.props.dispatch(action);
    }
   
    editProduct = (productId, event) =>   {
      var newName =  event.target.value;
      var action = {
        type: 'EDIT_PRODUCT',
        data: {
          productId: productId,
          productName: newName
        }
      };
      this.props.dispatch(action);
    }
   
   
    render () {
      const products = this.props.products;
   
      // Example product: { productId : 4 , productName :'Profit' }
      var trList = products.map( (product, index) => {
        return (<tr key={product.productId}>
          <td>{product.productId}</td>
          <td><input type="text" onChange={this.editProduct.bind(null, product.productId)} value={product.productName} /></td>
          <td>
            abc
          </td>
          <td>
            <button onClick={this.removeProduct.bind(null, product.productId)}>
               Remove
            </button>
          </td>
        </tr>);
      });
   
   
      return (<div>
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {trList}
          </tbody>
        </table>
        <br/>
        <button onClick={this.addProduct}>
            Create
        </button>
      </div>);
    }
  }
   
  
  export default ProductsPane;