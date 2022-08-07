const faker = require('faker'); //make fake info

class productServices{
   constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image:faker.image.imageUrl(),
    })};
  }

  async create(data){
    const  newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  find(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });
  }

  async findOne(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product Not found');
    }
    return this.products.find(index);
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product Not found');
    }
    const product = this.products[index];

    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Product Not found');
    }
    this.products.splice(index,1);
    return {message: 'sucessfull delete', id};
  }

}

module.exports = productServices;
