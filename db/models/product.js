'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    display_name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    short_desc: DataTypes.STRING,
    long_desc: DataTypes.STRING,
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    thumbnail_image: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    weight: DataTypes.DOUBLE
  }, {});

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE'
    });
  };

  return Product;
};