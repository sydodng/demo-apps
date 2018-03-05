const Category = require('../db/models').Category;
const Product = require('../db/models').Product;

module.exports = {
  create(req, res){
  	return Category
  	.create({
  	  name: req.body.name,
  	})
  	.then(category => res.status(201).send(category))
  	.catch(error => res.status(400).send(error));
  },

  list(req, res) {
  	return Category
  	  .findAll({
  	  	include: [{
  	  	  model: Product,
  	  	  as: 'products',
  	  	}]
  	  })
  	  .then(categories => res.status(200).send(categories))
  	  .then(error => res.status(400).send(error));
  },

  retrieve(req, res) {
  	return Category
  	  .findById(req.params.categoryId, {
  	  	include: [{
  	  	  model: Product,
  	  	  as: 'products',
  	  	}]
  	  })
  	  .then(category => {
  	  	if(!category){
  	  	  return res.status(400).send({message: `Category id=${req.params.categoryId} not found.`})
  	  	}
  	  	return res.status(200).send(category);
  	  })
  	  .catch(error => res.status(400).send(error));
  },

  update(req, res) {
  	return Category
  	  .findById(req.params.categoryId, {
  	  	include: [{
  	  	  model: Product,
  	  	  as: 'products',
  	  	}],
  	  })
  	  .then(category => {
  	  	if(!category){
  	  	  return res.status(400).send({message: `Category id=${req.params.categoryId} not found`});
  	  	}
  	  	return category
  	  	  .update({
  	  	  	name: req.body.name || category.name,
  	  	  })
  	  	  .then(() => res.status(200).send(category))
  	  	  .catch(error => res.status(400).send(error));
  	  })
  },

  delete(req, res) {
  	return Category
  	  .findById(req.params.categoryId)
  	  .then(category => {
  	  	if(!category){
  	  	  res.status(400).send({message: `Category id=${req.params.categoryId} not found`});
  	  	}
  	  	return category
  	  	  .destroy()
  	  	  .then(() => res.status(200).send({message: `CategoryId=${req.params.categoryId} deleted successfully.`}))
  	  	  .catch(error => res.status(400).send(error));
  	  })
  	  .catch(error => res.status(400).send(error));

  },
};