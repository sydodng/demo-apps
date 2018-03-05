const categoriesController = require('../controllers').categories;
const productsController = require('../controllers').products;

module.exports = (app) => {
  app.get('/api/welcome', (req, res) => res.status(200).send({
    message: 'Welcome to the Product Management API!',
  }));

  // category api
  app.post('/api/categories', categoriesController.create);
  app.get('/api/categories', categoriesController.list);
  app.get('/api/categories/:categoryId', categoriesController.retrieve);
  app.put('/api/categories/:categoryId', categoriesController.update);
  app.delete('/api/categories/:categoryId', categoriesController.delete);

  // product api
  app.post('/api/products/:categoryId/items', productsController.create);
  app.get('/api/products', productsController.list);
  app.get('/api/products/:categoryId/items/:productId', productsController.retrieve);
  app.put('/api/products/:categoryId/items/:productId', productsController.update);
  app.delete('/api/products/:categoryId/items/:productId', productsController.delete);


  app.all('/api/categories/:categoryId/items', (req, res) =>
    res.status(405).send({ message: 'Method Not Allowed' })
  );
};