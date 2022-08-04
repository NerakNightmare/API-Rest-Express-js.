const express = require('express');
const faker = require('faker'); //make fake info

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const products = [];
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(),10),
      image:faker.image.imageUrl(),
  })};
  res.json(products);
});


router.get('/filter', (req, res) =>{
  res.send('Im a filter');
});


router.get('/:id', (req, res) =>{
  const { id } = req.params;
  if(id === '999'){
    res.status(404).json( {
      message: 'Not Found'
    });
  }else{
    res.status(200).json( {
      id,
      name: 'Prodcut 2',
      price: 2000,
    });
  }
});

//post metod for append element / create element
router.post("/",(req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "Created",
    data: body
  })
});

//metod to update product
router.patch("/:id",(req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "update",
    data: body,
    id
  })
});

//metod to delete product
router.delete("/:id",(req, res) => {
  const { id } = req.params;
  res.json({
    message: "deleted",
    id
  })
});


module.exports = router;
