const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    supplier: { type: String, required: true, trim: true },
    purchasePrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, required: true, min: 0 },
    purchaseDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    barcode: { type: String, required: true, trim: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
