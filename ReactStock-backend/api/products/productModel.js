import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: { type: String, required: true },
    image: { type: String, required: true },
    productType: { type: String, required: true },
    barcode: { type: String, required: true },
    amountAvailable: { type: Number, required: true },
    storeLocation: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;