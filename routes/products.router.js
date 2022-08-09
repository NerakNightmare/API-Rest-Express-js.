const express = require('express');

const productServices = require('../serivces/product.service');
const validatorHAndler = require('./../middleware/validator.handler');
const {createProductSchema, updateProductSchema,  getProductSchema } = require('../schemas/product.schema')

const router = express.Router();
const service = new productServices();


router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});


router.get('/filter', (req, res) =>{
  res.send('Im a filter');
});


router.get('/:id',
validatorHAndler(getProductSchema, 'params'),
async(req, res, next) =>{
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//post metod for append element / create element
router.post("/",
validatorHAndler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
});

//metod to update product
router.patch("/:id",
validatorHAndler(getProductSchema, 'params'),
validatorHAndler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedPRoduct = await service.update(id, body);
    res.json(updatedPRoduct);
  } catch (error) {
    next(error);
  }
});

//metod to delete product
router.delete("/:id",async (req, res) => {
  const { id } = req.params;
  const product = await service.delete(id);
  res.json(product)
});

module.exports = router;
