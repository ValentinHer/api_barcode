const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    handleError(err, res);
  }
});

router.get('/', async (_req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get('/:code', async (req, res) => {
  const { code } = req.params;
  const product = await Product.findOne({ barcode: code });
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.json(product);
});

/*router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.json(product);
});*/

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  try {
    const updated = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(updated);
  } catch (err) {
    handleError(err, res);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'ID inválido' });
  }
  const deleted = await Product.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Producto no encontrado' });
  }
  res.status(204).send();
});

function handleError(err, res) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos inválidos', details: err.errors });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'El código de barras ya existe' });
  }
  console.error(err);
  return res.status(500).json({ message: 'Error interno del servidor' });
}

module.exports = router;
