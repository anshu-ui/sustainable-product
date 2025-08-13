// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: 'Recycled Plastic Bottle Coasters',
    description: 'Coasters made from 100% recycled plastic bottles, eco-friendly and durable.',
    imageURL: 'https://images.unsplash.com/photo-1595468136654-faa5b6ea3ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBsYXN0aWMlMjBib3R0bGUlMjBjb2FzdGVyfGVufDB8fDB8fHww',
    stockQty: 50,
    tags: ['recycled', 'eco-friendly', 'home-goods'],
    category: 'Home',
  },
  {
    name: 'Organic Cotton T-shirt',
    description: 'A  very comfortable T-shirt made from certified organic cotton, free from harmful chemicals.',
    imageURL: 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
    stockQty: 100,
    tags: ['organic', 'apparel', 'sustainable'],
    category: 'Apparel',
  },
  {
    name: 'Apple 15',
    description: 'apple introduce new 15 mobile phones',
    imageURL: 'https://plus.unsplash.com/premium_photo-1681396658834-b56190480934?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXBob25lfGVufDB8fDB8fHww',
    stockQty: 10,
    tags: ['mobile', 'tech'],
    category: 'Electronics',
  },
  {
    name: 'Organic Cotton T-shirt',
    description: 'A comfortable T-shirt made from certified organic cotton, free from harmful chemicals.',
    imageURL: 'https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww',
    stockQty: 100,
    tags: ['organic', 'apparel', 'sustainable'],
    category: 'Apparel',
  },
  {
    name: 'Recycled Plastic Bottle Coasters',
    description: 'Coasters made from 100% recycled plastic bottles, eco-friendly and durable.',
    imageURL: 'https://images.unsplash.com/photo-1595468136654-faa5b6ea3ebb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBsYXN0aWMlMjBib3R0bGUlMjBjb2FzdGVyfGVufDB8fDB8fHww',
    stockQty: 50,
    tags: ['recycled', 'eco-friendly', 'home-goods'],
    category: 'Home',
  },
];

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected for seeding');
    return Product.deleteMany({}); // Optional: clear existing data
  })
  .then(() => {
    return Product.insertMany(products);
  })
  .then(() => {
    console.log('Database successfully seeded!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  });