import React, { Component } from 'react';

class ProductForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {
	  response: {},
    categories: [],
	  message: ''
  	}

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(propsName, event) {
  	let product = this.state.response;
  	const target = event.target;
  	product[propsName] = target.value;
    this.setState({response: product});
  }

  handleCategoryChange(event) {
    const target = event.target;
    this.setState({selectedCategoryId: target.value});
  }

  handleSubmit(event) {
  	const product = this.state.response;
  	if(product && product.display_name === ''){
  		this.setState({
  			response: product,
  			message: "Product Name must be not empty"
  		});
  		event.preventDefault();
  	}else{
  	  // call restAPI add new product
      let selectedCategoryId = this.state.selectedCategoryId;
  	  if(this.props.product === undefined){
  	  	fetch(`/api/products/${selectedCategoryId}/items`, {
  	  	  method: 'POST',
  	  	  headers: {'content-type': 'application/json'},
  	  	  body: JSON.stringify(product)
  	    })
  	    .then(res => res.json())
  	    .catch(err => console.log(err));

  	  }else{
        // call restAPI update product 
  	    fetch(`/api/products/${product.categoryId}/items/${product.id}`, {
  	  	  method: 'PUT',
  	  	  headers: {'content-type': 'application/json'},
  	  	  body: JSON.stringify(product)
  	    })
  	    .then(res => res.json())
  	    .catch(err => console.log(err));
  	  }
  	}
  }

  componentDidMount() {
    // get categories list
    this.getCategories()
      .then(res => this.setState({ 
        categories: res
      }))
      .catch(err => console.log(err));


  	if(this.props.productId && this.props.categoryId){
  	  this.getProductById(this.props.categoryId, this.props.productId)
        .then(res => this.setState({ response: res }))
        .catch(err => console.log(err));
    }


  }

  getProductById = async (categoryId, productId) => {
    const response = await fetch(`/api/products/${categoryId}/items/${productId}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };


  // get all categories
  getCategories = async () => {
    const response = await fetch('/api/categories');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render(){
  	return(
  	  <div id="form">
  	    <div className='error'>{this.state.message}</div>
  	    <form onSubmit={this.handleSubmit}>
          <div><label>
            Name: <input type="text" value={this.state.response.display_name} onChange={this.handleChange.bind(this, 'display_name')} />
          </label> </div>

          <div className="form-group">
            <label>Category</label> 
            <select className="custom-select" onChange={this.handleCategoryChange.bind(this)} disabled={this.props.productId? 'disabled' : ''}>
                <option value="0">Select one...</option>
                {this.state.categories.map( (category, i) =>
                  <option key={i} value={category.id} selected={this.state.response.categoryId === category.id}>{category.name}</option>  
                )}
            </select>

          </div>

          <div><label>
            Price: <input type="text" value={this.state.response.price} onChange={this.handleChange.bind(this, 'price')} />
          </label> </div>

          <div><label>
            Short Description: <input type="text" value={this.state.response.short_desc} onChange={this.handleChange.bind(this, 'short_desc')} />
          </label> </div>

          <div><label>
            Long Description: <input type="text" value={this.state.response.long_desc} onChange={this.handleChange.bind(this, 'long_desc')} />
          </label> </div>

          <div><label>
            Manufacturer: <input type="text" value={this.state.response.manufacturer} onChange={this.handleChange.bind(this, 'manufacturer')} />
          </label> </div>

          <div><label>
            Weight: <input type="text" value={this.state.response.weight} onChange={this.handleChange.bind(this, 'weight')} />
          </label> </div>
          <input type="submit" value="Submit" />
          
        </form>
      </div>
	);
  }
}

export default ProductForm;