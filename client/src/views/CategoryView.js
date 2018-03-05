import React, { Component } from 'react';
import CategoryForm from './CategoryForm';

class CategoryView extends Component {
  constructor(props){
  	super(props);

  	this.handleAddClick = this.handleAddClick.bind(this);
  	this.state = {
	  response: []
  	}
  }

  handleAddClick(){
  	this.setState({mode: "add_category", categoryId: null});
  }

  handleDeleteClick(id){
  	console.log(`Deleting categoryId=${id}`);
  	this.deleteCategory(id)
  	  .then(function(res){
  	  	alert(res.message);
  	  	window.location.reload();
  	  })
      .catch(err => console.log(err));
  }

  deleteCategory = async(id) => {
  	const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'}
    });
    const body = await res.json();
    if (res.status !== 200) throw Error(body.message);
    return body;
  }

  handleEditClick(id){
  	this.setState({mode: "edit_category", categoryId: id});
  	
  }

  componentDidMount() {
    this.getCategories()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  }

  getCategories = async () => {
    const response = await fetch('/api/categories');
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render(){
  	let view = null;
  	if(this.state.mode === 'edit_category'){
  	  view = <CategoryForm id={this.state.categoryId}/>;
  	  return view;
  	}else if(this.state.mode === 'add_category'){
  	  view = <CategoryForm />;
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
		      <th width='20%'>Created Date</th>
		      <th width='15%'>Action</th>
		    </tr>
		  </thead>

		  <tbody>
		    {this.state.response.map(category =>(
		      <tr key={category.id}>
		        <td>{category.id}</td>
		        <td>{category.name}</td>
		        <td>{category.createdAt}</td>
		        <td>
		          <button className="btn btn-primary btn-xs" onClick={this.handleDeleteClick.bind(this, category.id)}>Delete</button> &nbsp;
		          <button className="btn btn-primary btn-xs" onClick={this.handleEditClick.bind(this, category.id)}>Edit</button>
		        </td>
		      </tr>
		    ))}

		  </tbody>
		</table>  
  	  </div>
	);
  }
}

export default CategoryView;