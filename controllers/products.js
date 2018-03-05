const Product = require('../db/models').Product;
module.exports = {
  create(req, res){
  	return Product
  	.create({
      display_name: req.body.display_name,
      price: req.body.price,
      short_desc: req.body.short_desc,
      long_desc: req.body.long_desc,
      is_active: req.body.is_active,
      thumbnail_image: req.body.thumbnail_image,
      manufacturer: req.body.manufacturer,
  	  weight: req.body.weight,
      categoryId: req.params.categoryId,
  	})
  	.then(product => res.status(201).send(product))
  	.catch(error => res.status(400).send(error));
  },

  list(req, res) {
  	return Product
  	  .all()
  	  .then(products => res.status(200).send(products))
  	  .then(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Product
      .findById(req.params.productId)
      .then(product => {
        if(!product){
          return res.status(400).send({message: `Product id=${req.params.productId} not found.`})
        }
        return res.status(200).send(product);
      })
      .catch(error => res.status(400).send(error));
  },

  update(req, res) {
    return Product
      .find({
          where: {
            id: req.params.productId,
            categoryId: req.params.categoryId,
          },
        })
      .then(product => {
        if (!product) {
          return res.status(404).send({
            message: `product id=${req.params.productId} Not Found`,
          });
        }

        return product
          .update({
            display_name: req.body.display_name || product.display_name,
            price: req.body.price || product.price,
            short_desc: req.body.short_desc || product.short_desc,
            long_desc: req.body.long_desc || product.long_desc,
            is_active: req.body.is_active || product.is_active,
            thumbnail_image: req.body.thumbnail_image || product.thumbnail_image,
            manufacturer: req.body.manufacturer || product.manufacturer,
            weight: req.body.weight || product.weight,
            categoryId: req.body.categoryId || product.categoryId,
          })
          .then(updatedProduct => res.status(200).send(updatedProduct))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  delete(req, res) {
    return Product
    .find({
        where: {
          id: req.params.productId,
          categoryId: req.params.categoryId,
        },
      })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: `Product id=${req.params.productId} Not Found`,
        });
      }

      return product
        .destroy()
        .then(() => res.status(200).send({message: `ProductId=${req.params.productId} deleted successfully.`}))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));

  },
};