const express = require('express');

const router = express.Router();

router.get('/:categoryId/products/:productId',(req, res) =>{
  const { categoryId, productId} = req.params;
  if(categoryId === '1'){
    res.json( {
      categoryId,
      name: 'food',
      price: 1000,
      productId,
    });
  }
  res.json( {
    categoryId,
    name: 'other',
    price: 1000,
    productId,
  });
});

module.exports = router;
