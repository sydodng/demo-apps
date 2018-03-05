import React, { Component } from 'react';
import CategoryView from './views/CategoryView';
import ProductView from './views/ProductView';

class App extends Component {
  constructor(props){
    super(props);
    this.handleCategoryPageClick = this.handleCategoryPageClick.bind(this);
    this.handleProductPageClick = this.handleProductPageClick.bind(this);
    this.state = {
      page: "category", // default page
    }
  }

  handleCategoryPageClick() {
    this.setState({
      page: "category",
    });
  }

  handleProductPageClick() {
    this.setState({
      page: "product",
    });
  }

  render() {
    const currentPage = this.state.page;
    let view = null;
    if(currentPage === 'category'){
      view = <CategoryView />;
    }else if (currentPage === 'product') {
      view = <ProductView />;
    }

    return (
      <section id="main" className='container'>
        <div>
          <button className="btn btn-link" onClick={this.handleCategoryPageClick}>Category &nbsp;</button>
          <button className="btn btn-link" onClick={this.handleProductPageClick}>Product</button>
        </div>

        {view}
      </section>

    );
  }
}

export default App;
