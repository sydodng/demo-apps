import React, { Component } from 'react';

class CategoryForm extends Component {
  constructor(props){
  	super(props);
  	this.state = {
	  response: {},
	  message: ''
  	}

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(propsName, event) {
  	let category = this.state.response;
  	const target = event.target;
  	category[propsName] = target.value;
    this.setState({response: category});
  }

  handleSubmit(event) {
  	const category = this.state.response;
  	if(category && category.name === ''){
  		this.setState({
  			response: category,
  			message: "Category Name must be not empty"
  		});
  		event.preventDefault();
  	}else{
  	  // call restAPI update/add category
  	  if(this.props.id === undefined){
  	  	fetch(`/api/categories`, {
  	  	  method: 'POST',
  	  	  headers: {'content-type': 'application/json'},
  	  	  body: JSON.stringify(category)
  	    })
  	    .then(res => res.json())
  	    .catch(err => console.log(err));

  	  }else{
  	    fetch(`/api/categories/${this.props.id}`, {
  	  	  method: 'PUT',
  	  	  headers: {'content-type': 'application/json'},
  	  	  body: JSON.stringify(category)
  	    })
  	    .then(res => res.json())
  	    .catch(err => console.log(err));
  	  }
  	}
  }

  componentDidMount() {
  	if(this.props.id){
  	  this.getCategoryById(this.props.id)
        .then(res => this.setState({ response: res }))
        .catch(err => console.log(err));
    }
  }

  getCategoryById = async (id) => {
    const response = await fetch(`/api/categories/${id}`);
    const body = await response.json();
    
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render(){
  	return(
  	  <div id="form">
  	    <div className='error'>{this.state.message}</div>
  	    <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.response.name} onChange={this.handleChange.bind(this, 'name')} />
          </label>
          <input type="submit" value="Submit" />
          
        </form>
      </div>
	);
  }
}

export default CategoryForm;