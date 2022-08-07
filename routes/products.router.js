const express = require('express');

const productServices = require('../serivces/product.service')

const router = express.Router();
const service = new productServices();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});


router.get('/filter', (req, res) =>{
  res.send('Im a filter');
});


router.get('/:id', async(req, res) =>{
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

//post metod for append element / create element
router.post("/",async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

//metod to update product
router.patch("/:id",async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedPRoduct = await service.update(id, body);
    res.json(updatedPRoduct);
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
});

//metod to delete product
router.delete("/:id",async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product)
});


module.exports = router;
