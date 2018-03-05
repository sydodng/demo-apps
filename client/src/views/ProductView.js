import React, { Component } from 'react';
import ProductForm from './ProductForm';

class ProductView extends Component {
  constructor(props){
    super(props);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.state = {
    response: []
    }
  }

  handleAddClick(){
    this.setState({mode: "add_product", id: null});
  }

  handleEditClick(product){
    console.log('edit:' + product.id);
    this.setState({mode: "edit_product", productId: product.id, categoryId: product.categoryId});
  }

  handleDeleteClick(product){
    console.log(`Deleting productId=${product.id}`);
    this.deleteProduct(product)
      .then(function(res){
        alert(res.message);
        window.location.reload();
      })
      .catch(err => console.log(err));
  }

  deleteProduct = async(product) => {
    console.log(`params: id=${product.id}, categoryId=${product.categoryId}`);
    const res = await fetch(`/api/products/${product.categoryId}/items/${product.id}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/products');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render(){
    let view = null;
    if(this.state.mode === 'edit_product'){
      view = <ProductForm productId={this.state.productId} categoryId={this.state.categoryId}/>;
      return view;
    }else if(this.state.mode === 'add_product'){
      view = <ProductForm />;
      return view;
    }


  	return(
  	  <div>
        <div>Total item(s): {this.state.response.length}</div>
        <div>
          <button className="btn btn-primary btn-xs" onClick={this.handleAddClick}>Add</button>
        </div>
        <table id='item-list' className="table table-striped table-bordered">
          <thead>
            <tr>
            <th width='10%'>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Weight (kg)</th>
              <th width='20%'>Created Date</th>
              <th width='15%'>Action</th>
            </tr>
          </thead>

          <tbody>
            {this.state.response.map((product,i) =>(
              <tr key={i}>
                <td>{product.id}</td>
                <td>{product.display_name}</td>
                <td>{product.short_desc}</td>
                <td>{product.price}</td>
                <td>{product.weight}</td>
                <td>{product.createdAt}</td>
                <td>
                  <button className="btn btn-primary btn-xs" onClick={this.handleDeleteClick.bind(this, product)}>Delete</button> &nbsp;
                  <button className="btn btn-primary btn-xs" onClick={this.handleEditClick.bind(this, product)}>Edit</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>



  	  </div>
	);
  }
}

export default ProductView;