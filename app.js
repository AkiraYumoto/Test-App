const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

mongoose
    .connect(
    `mongodb+srv://AkiraYumoto:${process.env.MONGO_DB_PASS}@cluster0.j3vvk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
        app.listen(port, () => {
            console.log(`Servidor levantado en el puerto ${port}`)
        });    
        console.log('Conexión establecida')
    })
    .catch(err => console.log(err));

const productSchema = mongoose.Schema(
    {
    name: {type : String, required: true},
    price: Number
    },{timestamps: true});

const Product = mongoose.model('product', productSchema);

app.use(express.json());

app.post('/api/v1/products', (req, res,next) => {
  const newProduct = new Product(req.body);

  newProduct
  .save()
  .then((result) => res.status(201).json({ok: true}))
  .catch((err) => console.log(err));
   
})


app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

